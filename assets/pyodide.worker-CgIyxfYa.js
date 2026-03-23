(function(){"use strict";const l="https://cdn.jsdelivr.net/pyodide/v0.27.0/full/",c=["numpy","pandas","scipy","scikit-learn","statsmodels","matplotlib","seaborn","openpyxl","xlrd","regex","pyyaml","jsonschema","beautifulsoup4"];let a=null;async function d(){return a||(importScripts(l+"pyodide.js"),a=await loadPyodide({indexURL:l,stdout:e=>self.postMessage({type:"stdout",text:e}),stderr:e=>self.postMessage({type:"stderr",text:e})}),await a.runPythonAsync(`
import sys, io
class _MockShow:
    @staticmethod
    def show(*a, **kw):
        import matplotlib
        matplotlib.use('agg')
        import matplotlib.pyplot as plt
        buf = io.BytesIO()
        plt.savefig(buf, format='svg', bbox_inches='tight')
        buf.seek(0)
        svg = buf.read().decode('utf-8')
        print('__SVG_START__' + svg + '__SVG_END__')
        plt.close('all')
`),a)}function u(e){const o=new Set,n=[/^\s*import\s+([\w]+)/gm,/^\s*from\s+([\w]+)/gm];for(const i of n){let t;for(;(t=i.exec(e))!==null;){const s=t[1],r={sklearn:"scikit-learn",bs4:"beautifulsoup4",yaml:"pyyaml",cv2:"opencv-python",PIL:"Pillow",np:"numpy",pd:"pandas",sns:"seaborn",plt:"matplotlib"}[s]||s;c.includes(r)&&o.add(r)}}return o.has("seaborn")&&o.add("matplotlib"),[...o]}self.onmessage=async function(e){const{type:o,code:n,inputs:i}=e.data;if(o==="run")try{self.postMessage({type:"status",status:"loading"});const t=await d(),s=u(n);if(s.length>0&&(self.postMessage({type:"stdout",text:`📦 패키지 로딩: ${s.join(", ")}...
`}),await t.loadPackagesFromImports(n,{messageCallback:()=>{}})),await t.runPythonAsync(`
import sys, io
try:
    import matplotlib
    matplotlib.use('agg')
    import matplotlib.pyplot as plt
    _orig_show = plt.show
    def _patched_show(*a, **kw):
        buf = io.BytesIO()
        plt.savefig(buf, format='svg', bbox_inches='tight', dpi=100)
        buf.seek(0)
        svg = buf.read().decode('utf-8')
        print('__SVG_START__' + svg + '__SVG_END__')
        plt.close('all')
    plt.show = _patched_show
except ImportError:
    pass
`),i&&i.length>0){const p=i.join(`
`);await t.runPythonAsync(`
import sys, io
sys.stdin = io.StringIO(${JSON.stringify(p+`
`)})
`)}self.postMessage({type:"status",status:"running"}),await t.runPythonAsync(n),self.postMessage({type:"done"})}catch(t){let s=t.message||String(t);const p=s.match(/(?:Traceback[\s\S]*?)?((?:[\w.]+Error|Exception): .+)$/m);p&&(s=p[0]),self.postMessage({type:"error",message:s})}}})();
