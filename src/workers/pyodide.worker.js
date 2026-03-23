/* Pyodide Web Worker for AI Data - Python Code Execution */
const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/'

const LOADABLE_PACKAGES = [
  'numpy', 'pandas', 'scipy', 'scikit-learn', 'statsmodels',
  'matplotlib', 'seaborn', 'openpyxl', 'xlrd',
  'regex', 'pyyaml', 'jsonschema', 'beautifulsoup4'
]

let pyodide = null

async function initPyodide() {
  if (pyodide) return pyodide
  importScripts(PYODIDE_CDN + 'pyodide.js')
  pyodide = await loadPyodide({
    indexURL: PYODIDE_CDN,
    stdout: (text) => self.postMessage({ type: 'stdout', text: text + '\n' }),
    stderr: (text) => self.postMessage({ type: 'stderr', text: text + '\n' }),
  })

  return pyodide
}

function detectPackages(code) {
  const found = new Set()
  const patterns = [
    /^\s*import\s+([\w]+)/gm,
    /^\s*from\s+([\w]+)/gm,
  ]
  for (const pat of patterns) {
    let m
    while ((m = pat.exec(code)) !== null) {
      const pkg = m[1]
      // Map aliases
      const aliases = {
        'sklearn': 'scikit-learn',
        'bs4': 'beautifulsoup4',
        'yaml': 'pyyaml',
        'cv2': 'opencv-python',
        'PIL': 'Pillow',
        'np': 'numpy',
        'pd': 'pandas',
        'sns': 'seaborn',
        'plt': 'matplotlib',
      }
      const mapped = aliases[pkg] || pkg
      if (LOADABLE_PACKAGES.includes(mapped)) found.add(mapped)
    }
  }
  // Special: if matplotlib or seaborn, ensure matplotlib
  if (found.has('seaborn')) found.add('matplotlib')
  return [...found]
}

self.onmessage = async function (e) {
  const { type, code, inputs } = e.data

  if (type === 'run') {
    try {
      self.postMessage({ type: 'status', status: 'loading' })
      const py = await initPyodide()

      // Load needed packages
      const pkgs = detectPackages(code)
      if (pkgs.length > 0) {
        self.postMessage({ type: 'stdout', text: `📦 패키지 로딩: ${pkgs.join(', ')}...\n` })
        await py.loadPackagesFromImports(code, { messageCallback: () => {} })
      }

      // Download Korean font via JS fetch (more reliable than Python pyfetch)
      try {
        if (!py.FS.analyzePath('/tmp/NanumGothic.ttf').exists) {
          const fontResp = await fetch('https://cdn.jsdelivr.net/gh/googlefonts/nanum@main/fonts/NanumGothic-Regular.ttf')
          if (fontResp.ok) {
            const buf = await fontResp.arrayBuffer()
            py.FS.writeFile('/tmp/NanumGothic.ttf', new Uint8Array(buf))
          }
        }
      } catch (e) { /* font download failed, continue */ }

      // Setup matplotlib with Korean font + show override
      await py.runPythonAsync(`
import sys, io
try:
    import matplotlib
    matplotlib.use('agg')
    import matplotlib.pyplot as plt
    import matplotlib.font_manager as fm
    import os

    # Register Korean font if available
    if os.path.exists('/tmp/NanumGothic.ttf'):
        if not any('NanumGothic' in f.name for f in fm.fontManager.ttflist):
            fm.fontManager.addfont('/tmp/NanumGothic.ttf')
        plt.rcParams['font.family'] = 'NanumGothic'
    plt.rcParams['axes.unicode_minus'] = False

    def _patched_show(*a, **kw):
        import js
        from pyodide.ffi import to_js
        buf = io.BytesIO()
        plt.savefig(buf, format='svg', bbox_inches='tight', dpi=100)
        buf.seek(0)
        svg = buf.read().decode('utf-8')
        js.postMessage(to_js({'type': 'svg', 'svg': svg}, dict_converter=js.Object.fromEntries))
        plt.close('all')
    plt.show = _patched_show
except Exception:
    pass
`)

      // Inject stdin if inputs provided
      if (inputs && inputs.length > 0) {
        const inputStr = inputs.join('\n')
        await py.runPythonAsync(`
import sys, io
sys.stdin = io.StringIO(${JSON.stringify(inputStr + '\n')})
`)
      }

      self.postMessage({ type: 'status', status: 'running' })
      await py.runPythonAsync(code)
      self.postMessage({ type: 'done' })
    } catch (err) {
      // Extract meaningful error
      let msg = err.message || String(err)
      // Clean up Pyodide traceback noise
      const pyErr = msg.match(/(?:Traceback[\s\S]*?)?((?:[\w.]+Error|Exception): .+)$/m)
      if (pyErr) msg = pyErr[0]
      self.postMessage({ type: 'error', message: msg })
    }
  }
}
