import{r as t,j as e,b as F}from"./index-DWEWwXZw.js";import{S as M}from"./SEOHead-B8UjB-pD.js";let w=null;function O(){return w||(w=new Worker(new URL("/assets/pyodide.worker-D_OLqx67.js",import.meta.url),{type:"classic"})),w}function L(){const[a,l]=t.useState("idle"),[n,o]=t.useState(""),[r,p]=t.useState(""),[u,m]=t.useState([]),f=t.useRef(null);t.useEffect(()=>(f.current=O(),()=>void 0),[]);const j=t.useCallback((y,v=[])=>{const c=f.current;if(!c)return;l("loading"),o(""),p(""),m([]);const x=[],h=C=>{const{type:S,text:N,message:E,status:_}=C.data;switch(S){case"status":l(_);break;case"stdout":{const k=/__SVG_START__([\s\S]*?)__SVG_END__/g;let g=N,d;for(;(d=k.exec(N))!==null;)x.push(d[1]),g=g.replace(d[0],"");x.length>0&&m([...x]),g.trim()&&o(s=>s+g);break}case"stderr":o(k=>k+N);break;case"error":l("error"),p(E),c.removeEventListener("message",h);break;case"done":l("done"),c.removeEventListener("message",h);break}};c.addEventListener("message",h),c.postMessage({type:"run",code:y,inputs:v})},[]),i=t.useCallback(()=>{l("idle"),o(""),p(""),m([])},[]);return{status:a,output:n,errorMsg:r,svgOutputs:u,runCode:j,resetOutput:i}}const R={idle:{icon:"fa-circle-play",label:"실행 대기",color:"#6B7280"},loading:{icon:"fa-spinner fa-spin",label:"Pyodide 로딩...",color:"#F59E0B"},running:{icon:"fa-gear fa-spin",label:"실행 중...",color:"#3B82F6"},done:{icon:"fa-circle-check",label:"완료",color:"#10B981"},error:{icon:"fa-circle-xmark",label:"오류",color:"#EF4444"}};function I({initialCode:a="",title:l=""}){const[n,o]=t.useState(a),[r,p]=t.useState(!1),[u,m]=t.useState(""),f=t.useRef(null),j=t.useRef(null),{status:i,output:y,errorMsg:v,svgOutputs:c,runCode:x,resetOutput:h}=L(),C=t.useCallback(()=>{j.current&&f.current&&(j.current.scrollTop=f.current.scrollTop)},[]),S=n.split(`
`).length,N=Array.from({length:S},(s,b)=>b+1),E=t.useCallback(s=>{if(s.key==="Tab"){s.preventDefault();const{selectionStart:b,selectionEnd:T}=s.target,A=n.slice(0,b),B=n.slice(T),D=A+"    "+B;o(D),requestAnimationFrame(()=>{s.target.selectionStart=s.target.selectionEnd=b+4})}(s.ctrlKey||s.metaKey)&&s.key==="Enter"&&(s.preventDefault(),_())},[n]),_=t.useCallback(()=>{if(/\binput\s*\(/.test(n)&&!r){p(!0);return}const s=u?u.split(`
`):[];x(n,s),p(!1)},[n,u,r,x]),k=t.useCallback(()=>{navigator.clipboard.writeText(n)},[n]),g=t.useCallback(()=>{o(a),h(),p(!1),m("")},[a,h]),d=R[i]||R.idle;return e.jsxs("div",{className:"code-editor",children:[l&&e.jsxs("div",{className:"code-editor-title",children:[e.jsx("i",{className:"fa-solid fa-code"})," ",l]}),e.jsxs("div",{className:"code-editor-toolbar",children:[e.jsxs("button",{className:"editor-btn",onClick:k,children:[e.jsx("i",{className:"fa-solid fa-copy"})," 복사"]}),e.jsxs("button",{className:"editor-btn",onClick:g,children:[e.jsx("i",{className:"fa-solid fa-rotate-left"})," 초기화"]}),e.jsxs("div",{className:"editor-status",children:[e.jsx("i",{className:`fa-solid ${d.icon}`,style:{color:d.color}}),e.jsx("span",{style:{color:d.color},children:d.label})]}),e.jsx("span",{className:"editor-shortcut",children:"Ctrl+Enter"})]}),e.jsxs("div",{className:"code-editor-body",children:[e.jsx("div",{className:"line-numbers",ref:j,children:N.map(s=>e.jsx("div",{className:"line-num",children:s},s))}),e.jsx("textarea",{ref:f,className:"code-textarea",value:n,onChange:s=>o(s.target.value),onScroll:C,onKeyDown:E,spellCheck:!1,autoComplete:"off",autoCorrect:"off"})]}),e.jsx("div",{className:"code-editor-actions",children:e.jsxs("button",{className:"editor-btn editor-btn-run",onClick:_,disabled:i==="loading"||i==="running",children:[e.jsx("i",{className:`fa-solid ${i==="running"?"fa-spinner fa-spin":"fa-play"}`}),i==="loading"?"Pyodide 로딩...":i==="running"?"실행 중...":"실행하기"]})}),r&&e.jsxs("div",{className:"code-input-area",children:[e.jsxs("label",{children:[e.jsx("i",{className:"fa-solid fa-keyboard"})," 입력값 (input마다 줄바꿈):"]}),e.jsx("textarea",{value:u,onChange:s=>m(s.target.value),placeholder:"input() 에 전달할 값을 한 줄씩 입력하세요",rows:3}),e.jsxs("button",{className:"editor-btn editor-btn-run",onClick:_,children:[e.jsx("i",{className:"fa-solid fa-play"})," 입력값과 함께 실행"]})]}),(y||v||c.length>0)&&e.jsxs("div",{className:"code-output-area",children:[e.jsxs("div",{className:"code-output-header",children:[e.jsx("i",{className:"fa-solid fa-terminal"})," 출력 결과"]}),c.map((s,b)=>e.jsx("div",{className:"svg-output",dangerouslySetInnerHTML:{__html:s}},b)),y&&e.jsx("pre",{className:"code-output",children:y}),v&&e.jsx("pre",{className:"code-error",children:v})]})]})}const P=[{label:"기본 분석",icon:"fa-solid fa-chart-simple",code:`import pandas as pd
import numpy as np

# 샘플 데이터 생성
data = {
    '이름': ['김철수', '이영희', '박민수', '최지영', '정하나'],
    '나이': [28, 34, 22, 45, 31],
    '점수': [85, 92, 78, 95, 88],
    '등급': ['B', 'A', 'C', 'A', 'B']
}
df = pd.DataFrame(data)

print("=== 데이터프레임 ===")
print(df)
print()
print("=== 기술통계 ===")
print(df.describe())
print()
print(f"평균 점수: {df['점수'].mean():.1f}")
print(f"최고 점수: {df['점수'].max()}")`},{label:"EDA 분석",icon:"fa-solid fa-magnifying-glass-chart",code:`import pandas as pd
import numpy as np

# 매출 데이터 생성
np.random.seed(42)
n = 100
data = {
    '날짜': pd.date_range('2024-01-01', periods=n),
    '매출': np.random.normal(500000, 100000, n).astype(int),
    '카테고리': np.random.choice(['전자제품', '의류', '식품'], n),
    '지역': np.random.choice(['서울', '부산', '대구', '인천'], n)
}
df = pd.DataFrame(data)

print("=== 데이터 개요 ===")
print(f"Shape: {df.shape}")
print(f"\\n결측치:\\n{df.isnull().sum()}")
print(f"\\n카테고리별 평균 매출:")
print(df.groupby('카테고리')['매출'].mean().round(0))
print(f"\\n지역별 매출 합계:")
print(df.groupby('지역')['매출'].sum().apply(lambda x: f'{x:,}원'))`},{label:"시각화",icon:"fa-solid fa-chart-pie",code:`import matplotlib.pyplot as plt
import numpy as np

# 데이터
categories = ['전자제품', '의류', '식품', '가구', '도서']
sales = [450, 320, 280, 190, 150]
colors = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# 바 차트
axes[0].bar(categories, sales, color=colors)
axes[0].set_title('Category Sales', fontsize=14, fontweight='bold')
axes[0].set_ylabel('Sales (만원)')

# 파이 차트
axes[1].pie(sales, labels=categories, colors=colors, autopct='%1.0f%%', startangle=90)
axes[1].set_title('Sales Distribution', fontsize=14, fontweight='bold')

plt.tight_layout()
plt.show()`},{label:"통계 분석",icon:"fa-solid fa-chart-line",code:`import numpy as np

# 두 그룹의 시험 점수
np.random.seed(42)
group_a = np.random.normal(75, 10, 30)  # 평균 75, 표준편차 10
group_b = np.random.normal(80, 12, 30)  # 평균 80, 표준편차 12

print("=== 그룹 A 통계 ===")
print(f"평균: {group_a.mean():.2f}")
print(f"중앙값: {np.median(group_a):.2f}")
print(f"표준편차: {group_a.std():.2f}")
print(f"최소/최대: {group_a.min():.1f} / {group_a.max():.1f}")

print("\\n=== 그룹 B 통계 ===")
print(f"평균: {group_b.mean():.2f}")
print(f"중앙값: {np.median(group_b):.2f}")
print(f"표준편차: {group_b.std():.2f}")
print(f"최소/최대: {group_b.min():.1f} / {group_b.max():.1f}")

# 상관관계
x = np.random.randn(50)
y = 0.7 * x + np.random.randn(50) * 0.5
corr = np.corrcoef(x, y)[0, 1]
print(f"\\n상관계수: {corr:.4f}")`}];function K(){const[a,l]=t.useState(0),{incrementCodeRuns:n}=F();return e.jsxs(e.Fragment,{children:[e.jsx(M,{title:"실습장",description:"브라우저에서 직접 Python 코드를 실행해보세요. Pandas, NumPy, Matplotlib 지원."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsxs("h1",{children:[e.jsx("i",{className:"fa-solid fa-terminal"})," 실습장"]}),e.jsx("p",{children:"브라우저에서 직접 Python 코드를 실행해보세요 — Pandas, NumPy, Matplotlib 지원"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",flexWrap:"wrap"},children:P.map((o,r)=>e.jsxs("button",{onClick:()=>l(r),className:"community-submit-btn",style:{fontSize:"0.85rem",padding:"0.5rem 1rem",opacity:a===r?1:.6,background:a===r?void 0:"var(--bg-medium-gray)",color:a===r?void 0:"var(--text-secondary)",borderColor:a===r?void 0:"var(--border-light)"},children:[e.jsx("i",{className:o.icon,style:{marginRight:"6px"}}),o.label]},r))}),e.jsx(I,{initialCode:P[a].code,title:P[a].label},a),e.jsxs("div",{className:"callout-box",style:{marginTop:"1.5rem"},children:[e.jsxs("h3",{children:[e.jsx("i",{className:"fa-solid fa-lightbulb"})," 사용 방법"]}),e.jsxs("ul",{style:{marginTop:"0.5rem",paddingLeft:"1.2rem",lineHeight:"1.8"},children:[e.jsx("li",{children:"위 템플릿을 선택하거나 직접 코드를 작성하세요"}),e.jsxs("li",{children:[e.jsx("strong",{children:"실행"})," 버튼 또는 ",e.jsx("code",{children:"Ctrl+Enter"}),"로 코드를 실행합니다"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Pyodide"})," 기반으로 브라우저에서 직접 Python이 실행됩니다"]}),e.jsx("li",{children:"Pandas, NumPy, Matplotlib, Seaborn 등 데이터 분석 라이브러리를 지원합니다"}),e.jsx("li",{children:"첫 실행 시 Pyodide 로딩에 수 초가 걸릴 수 있습니다"})]})]})]})})})]})}export{K as default};
