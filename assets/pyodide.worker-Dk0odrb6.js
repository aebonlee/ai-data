(function(){"use strict";const r="https://cdn.jsdelivr.net/pyodide/v0.27.0/full/",f=["numpy","pandas","scipy","scikit-learn","statsmodels","matplotlib","seaborn","openpyxl","xlrd","regex","pyyaml","jsonschema","beautifulsoup4"];let p=null;async function c(){return p||(importScripts(r+"pyodide.js"),p=await loadPyodide({indexURL:r,stdout:e=>self.postMessage({type:"stdout",text:e+`
`}),stderr:e=>self.postMessage({type:"stderr",text:e+`
`})}),p)}function m(e){const o=new Set,a=[/^\s*import\s+([\w]+)/gm,/^\s*from\s+([\w]+)/gm];for(const n of a){let t;for(;(t=n.exec(e))!==null;){const s=t[1],l={sklearn:"scikit-learn",bs4:"beautifulsoup4",yaml:"pyyaml",cv2:"opencv-python",PIL:"Pillow",np:"numpy",pd:"pandas",sns:"seaborn",plt:"matplotlib"}[s]||s;f.includes(l)&&o.add(l)}}return o.has("seaborn")&&o.add("matplotlib"),[...o]}self.onmessage=async function(e){const{type:o,code:a,inputs:n}=e.data;if(o==="run")try{self.postMessage({type:"status",status:"loading"});const t=await c(),s=m(a);if(s.length>0&&(self.postMessage({type:"stdout",text:`📦 패키지 로딩: ${s.join(", ")}...
`}),await t.loadPackagesFromImports(a,{messageCallback:()=>{}})),await t.runPythonAsync(`
import sys, io
try:
    import matplotlib
    matplotlib.use('agg')
    import matplotlib.pyplot as plt
    import matplotlib.font_manager as fm

    # Download and register Korean font (Nanum Gothic)
    if not any('NanumGothic' in f.name for f in fm.fontManager.ttflist):
        from pyodide.http import pyfetch
        import pathlib
        font_url = 'https://cdn.jsdelivr.net/gh/googlefonts/nanum@main/fonts/NanumGothic-Regular.ttf'
        font_path = pathlib.Path('/tmp/NanumGothic.ttf')
        if not font_path.exists():
            resp = await pyfetch(font_url)
            font_data = await resp.bytes()
            font_path.write_bytes(font_data)
        fm.fontManager.addfont(str(font_path))

    # Apply Korean font globally
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
except ImportError:
    pass
`),n&&n.length>0){const i=n.join(`
`);await t.runPythonAsync(`
import sys, io
sys.stdin = io.StringIO(${JSON.stringify(i+`
`)})
`)}self.postMessage({type:"status",status:"running"}),await t.runPythonAsync(a),self.postMessage({type:"done"})}catch(t){let s=t.message||String(t);const i=s.match(/(?:Traceback[\s\S]*?)?((?:[\w.]+Error|Exception): .+)$/m);i&&(s=i[0]),self.postMessage({type:"error",message:s})}}})();
