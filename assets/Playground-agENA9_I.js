import{r as t,j as e,b as D}from"./index-BZspq3eO.js";import{S as M}from"./SEOHead-C_Le33Vc.js";let w=null;function z(){return w||(w=new Worker(new URL("/assets/pyodide.worker-BQovvJ0L.js",import.meta.url),{type:"classic"})),w}function L(){const[a,l]=t.useState("idle"),[n,o]=t.useState(""),[r,d]=t.useState(""),[p,u]=t.useState([]),m=t.useRef(null);t.useEffect(()=>(m.current=z(),()=>void 0),[]);const h=t.useCallback((g,b=[])=>{const c=m.current;if(!c)return;l("loading"),o(""),d(""),u([]);const y=[],f=N=>{const{type:_,text:k,message:S,status:j}=N.data;switch(_){case"status":l(j);break;case"stdout":o(v=>v+k);break;case"svg":y.push(N.data.svg),u([...y]);break;case"stderr":o(v=>v+k);break;case"error":l("error"),d(S),c.removeEventListener("message",f);break;case"done":l("done"),c.removeEventListener("message",f);break}};c.addEventListener("message",f),c.postMessage({type:"run",code:g,inputs:b})},[]),i=t.useCallback(()=>{l("idle"),o(""),d(""),u([])},[]);return{status:a,output:n,errorMsg:r,svgOutputs:p,runCode:h,resetOutput:i}}const P={idle:{icon:"fa-circle-play",label:"실행 대기",color:"#6B7280"},loading:{icon:"fa-spinner fa-spin",label:"Pyodide 로딩...",color:"#F59E0B"},running:{icon:"fa-gear fa-spin",label:"실행 중...",color:"#3B82F6"},done:{icon:"fa-circle-check",label:"완료",color:"#10B981"},error:{icon:"fa-circle-xmark",label:"오류",color:"#EF4444"}};function O({initialCode:a="",title:l=""}){const[n,o]=t.useState(a),[r,d]=t.useState(!1),[p,u]=t.useState(""),m=t.useRef(null),h=t.useRef(null),{status:i,output:g,errorMsg:b,svgOutputs:c,runCode:y,resetOutput:f}=L(),N=t.useCallback(()=>{h.current&&m.current&&(h.current.scrollTop=m.current.scrollTop)},[]),_=n.split(`
`).length,k=Array.from({length:_},(s,x)=>x+1),S=t.useCallback(s=>{if(s.key==="Tab"){s.preventDefault();const{selectionStart:x,selectionEnd:R}=s.target,A=n.slice(0,x),F=n.slice(R),T=A+"    "+F;o(T),requestAnimationFrame(()=>{s.target.selectionStart=s.target.selectionEnd=x+4})}(s.ctrlKey||s.metaKey)&&s.key==="Enter"&&(s.preventDefault(),j())},[n]),j=t.useCallback(()=>{if(/\binput\s*\(/.test(n)&&!r){d(!0);return}const s=p?p.split(`
`):[];y(n,s),d(!1)},[n,p,r,y]),v=t.useCallback(()=>{navigator.clipboard.writeText(n)},[n]),B=t.useCallback(()=>{o(a),f(),d(!1),u("")},[a,f]),C=P[i]||P.idle;return e.jsxs("div",{className:"code-editor",children:[l&&e.jsxs("div",{className:"code-editor-title",children:[e.jsx("i",{className:"fa-solid fa-code"})," ",l]}),e.jsxs("div",{className:"code-editor-toolbar",children:[e.jsxs("button",{className:"editor-btn",onClick:v,children:[e.jsx("i",{className:"fa-solid fa-copy"})," 복사"]}),e.jsxs("button",{className:"editor-btn",onClick:B,children:[e.jsx("i",{className:"fa-solid fa-rotate-left"})," 초기화"]}),e.jsxs("div",{className:"editor-status",children:[e.jsx("i",{className:`fa-solid ${C.icon}`,style:{color:C.color}}),e.jsx("span",{style:{color:C.color},children:C.label})]}),e.jsx("span",{className:"editor-shortcut",children:"Ctrl+Enter"})]}),e.jsxs("div",{className:"code-editor-body",children:[e.jsx("div",{className:"line-numbers",ref:h,children:k.map(s=>e.jsx("div",{className:"line-num",children:s},s))}),e.jsx("textarea",{ref:m,className:"code-textarea",value:n,onChange:s=>o(s.target.value),onScroll:N,onKeyDown:S,spellCheck:!1,autoComplete:"off",autoCorrect:"off"})]}),e.jsx("div",{className:"code-editor-actions",children:e.jsxs("button",{className:"editor-btn editor-btn-run",onClick:j,disabled:i==="loading"||i==="running",children:[e.jsx("i",{className:`fa-solid ${i==="running"?"fa-spinner fa-spin":"fa-play"}`}),i==="loading"?"Pyodide 로딩...":i==="running"?"실행 중...":"실행하기"]})}),r&&e.jsxs("div",{className:"code-input-area",children:[e.jsxs("label",{children:[e.jsx("i",{className:"fa-solid fa-keyboard"})," 입력값 (input마다 줄바꿈):"]}),e.jsx("textarea",{value:p,onChange:s=>u(s.target.value),placeholder:"input() 에 전달할 값을 한 줄씩 입력하세요",rows:3}),e.jsxs("button",{className:"editor-btn editor-btn-run",onClick:j,children:[e.jsx("i",{className:"fa-solid fa-play"})," 입력값과 함께 실행"]})]}),(g||b||c.length>0)&&e.jsxs("div",{className:"code-output-area",children:[e.jsxs("div",{className:"code-output-header",children:[e.jsx("i",{className:"fa-solid fa-terminal"})," 출력 결과"]}),c.map((s,x)=>e.jsx("div",{className:"svg-output",dangerouslySetInnerHTML:{__html:s}},x)),g&&e.jsx("pre",{className:"code-output",children:g}),b&&e.jsx("pre",{className:"code-error",children:b})]})]})}const E=[{label:"기본 분석",icon:"fa-solid fa-chart-simple",code:`import pandas as pd
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
axes[0].set_title('카테고리별 매출', fontsize=14, fontweight='bold')
axes[0].set_ylabel('매출 (만원)')

# 파이 차트
axes[1].pie(sales, labels=categories, colors=colors, autopct='%1.0f%%', startangle=90)
axes[1].set_title('매출 비율', fontsize=14, fontweight='bold')

plt.tight_layout()
plt.show()`},{label:"통계 분석",icon:"fa-solid fa-chart-line",code:`import numpy as np
import matplotlib.pyplot as plt

# 두 그룹의 시험 점수
np.random.seed(42)
group_a = np.random.normal(75, 10, 30)
group_b = np.random.normal(80, 12, 30)

print("=== 그룹 A 통계 ===")
print(f"평균: {group_a.mean():.2f}")
print(f"중앙값: {np.median(group_a):.2f}")
print(f"표준편차: {group_a.std():.2f}")

print("\\n=== 그룹 B 통계 ===")
print(f"평균: {group_b.mean():.2f}")
print(f"중앙값: {np.median(group_b):.2f}")
print(f"표준편차: {group_b.std():.2f}")

# 상관관계
x = np.random.randn(50)
y = 0.7 * x + np.random.randn(50) * 0.5
corr = np.corrcoef(x, y)[0, 1]
print(f"\\n상관계수: {corr:.4f}")

# 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

axes[0].hist(group_a, bins=8, alpha=0.7, color='#7C3AED', label='그룹 A')
axes[0].hist(group_b, bins=8, alpha=0.7, color='#3B82F6', label='그룹 B')
axes[0].set_title('점수 분포 비교', fontsize=14, fontweight='bold')
axes[0].set_xlabel('점수')
axes[0].set_ylabel('빈도')
axes[0].legend()

axes[1].scatter(x, y, color='#10B981', alpha=0.6, edgecolors='white')
axes[1].set_title(f'상관관계 (r={corr:.2f})', fontsize=14, fontweight='bold')
axes[1].set_xlabel('X')
axes[1].set_ylabel('Y')

plt.tight_layout()
plt.show()`}];function K(){const[a,l]=t.useState(0),{incrementCodeRuns:n}=D();return e.jsxs(e.Fragment,{children:[e.jsx(M,{title:"실습장",description:"브라우저에서 직접 Python 코드를 실행해보세요. Pandas, NumPy, Matplotlib 지원."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsxs("h1",{children:[e.jsx("i",{className:"fa-solid fa-terminal"})," 실습장"]}),e.jsx("p",{children:"브라우저에서 직접 Python 코드를 실행해보세요 — Pandas, NumPy, Matplotlib 지원"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",flexWrap:"wrap"},children:E.map((o,r)=>e.jsxs("button",{onClick:()=>l(r),className:"community-submit-btn",style:{fontSize:"0.85rem",padding:"0.5rem 1rem",opacity:a===r?1:.6,background:a===r?void 0:"var(--bg-medium-gray)",color:a===r?void 0:"var(--text-secondary)",borderColor:a===r?void 0:"var(--border-light)"},children:[e.jsx("i",{className:o.icon,style:{marginRight:"6px"}}),o.label]},r))}),e.jsx(O,{initialCode:E[a].code,title:E[a].label},a),e.jsxs("div",{className:"callout-box",style:{marginTop:"1.5rem"},children:[e.jsxs("h3",{children:[e.jsx("i",{className:"fa-solid fa-lightbulb"})," 사용 방법"]}),e.jsxs("ul",{style:{marginTop:"0.5rem",paddingLeft:"1.2rem",lineHeight:"1.8"},children:[e.jsx("li",{children:"위 템플릿을 선택하거나 직접 코드를 작성하세요"}),e.jsxs("li",{children:[e.jsx("strong",{children:"실행"})," 버튼 또는 ",e.jsx("code",{children:"Ctrl+Enter"}),"로 코드를 실행합니다"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Pyodide"})," 기반으로 브라우저에서 직접 Python이 실행됩니다"]}),e.jsx("li",{children:"Pandas, NumPy, Matplotlib, Seaborn 등 데이터 분석 라이브러리를 지원합니다"}),e.jsx("li",{children:"첫 실행 시 Pyodide 로딩에 수 초가 걸릴 수 있습니다"})]})]})]})})})]})}export{K as default};
