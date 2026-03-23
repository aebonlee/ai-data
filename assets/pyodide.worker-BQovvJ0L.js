(function(){"use strict";const l="https://cdn.jsdelivr.net/pyodide/v0.27.0/full/",c=["numpy","pandas","scipy","scikit-learn","statsmodels","matplotlib","seaborn","openpyxl","xlrd","regex","pyyaml","jsonschema","beautifulsoup4"];let p=null;async function f(){return p||(importScripts(l+"pyodide.js"),p=await loadPyodide({indexURL:l,stdout:a=>self.postMessage({type:"stdout",text:a+`
`}),stderr:a=>self.postMessage({type:"stderr",text:a+`
`})}),p)}function m(a){const o=new Set,n=[/^\s*import\s+([\w]+)/gm,/^\s*from\s+([\w]+)/gm];for(const i of n){let t;for(;(t=i.exec(a))!==null;){const s=t[1],r={sklearn:"scikit-learn",bs4:"beautifulsoup4",yaml:"pyyaml",cv2:"opencv-python",PIL:"Pillow",np:"numpy",pd:"pandas",sns:"seaborn",plt:"matplotlib"}[s]||s;c.includes(r)&&o.add(r)}}return o.has("seaborn")&&o.add("matplotlib"),[...o]}self.onmessage=async function(a){const{type:o,code:n,inputs:i}=a.data;if(o==="run")try{self.postMessage({type:"status",status:"loading"});const t=await f(),s=m(n);s.length>0&&(self.postMessage({type:"stdout",text:`📦 패키지 로딩: ${s.join(", ")}...
`}),await t.loadPackagesFromImports(n,{messageCallback:()=>{}}));try{if(!t.FS.analyzePath("/tmp/NanumGothic.ttf").exists){const e=await fetch("https://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z_tLfxno73g.ttf");if(e.ok){const r=await e.arrayBuffer();t.FS.writeFile("/tmp/NanumGothic.ttf",new Uint8Array(r))}}}catch{}if(await t.runPythonAsync(`
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
`),i&&i.length>0){const e=i.join(`
`);await t.runPythonAsync(`
import sys, io
sys.stdin = io.StringIO(${JSON.stringify(e+`
`)})
`)}self.postMessage({type:"status",status:"running"}),await t.runPythonAsync(n),self.postMessage({type:"done"})}catch(t){let s=t.message||String(t);const e=s.match(/(?:Traceback[\s\S]*?)?((?:[\w.]+Error|Exception): .+)$/m);e&&(s=e[0]),self.postMessage({type:"error",message:s})}}})();
