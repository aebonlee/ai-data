import{r as o,j as e}from"./index-CTmMw0pD.js";import{S as d}from"./SEOHead-DpCKq1X5.js";const i=[{label:"기본 분석",code:`import pandas as pd
import matplotlib.pyplot as plt

# 데이터 로딩
df = pd.read_csv('data.csv')
print(df.head())
print(df.describe())

# 시각화
df['column'].hist(bins=20)
plt.title('데이터 분포')
plt.show()`},{label:"EDA 템플릿",code:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv('data.csv')

# 기본 정보
print(f"Shape: {df.shape}")
print(f"결측치:\\n{df.isnull().sum()}")
print(f"기술통계:\\n{df.describe()}")

# 상관관계
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('상관관계 히트맵')
plt.show()`},{label:"시각화 템플릿",code:`import matplotlib.pyplot as plt
import seaborn as sns

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. 라인 차트
axes[0,0].plot([1,2,3,4,5], [10,15,13,17,20], 'o-')
axes[0,0].set_title('추이')

# 2. 바 차트
axes[0,1].bar(['A','B','C'], [30,25,40])
axes[0,1].set_title('비교')

# 3. 파이 차트
axes[1,0].pie([40,30,30], labels=['A','B','C'], autopct='%1.0f%%')
axes[1,0].set_title('비중')

# 4. 히스토그램
import numpy as np
axes[1,1].hist(np.random.randn(1000), bins=30)
axes[1,1].set_title('분포')

plt.tight_layout()
plt.show()`}];function x(){const[s,a]=o.useState(i[0].code),[l,r]=o.useState(!1),n=()=>{navigator.clipboard.writeText(s),r(!0),setTimeout(()=>r(!1),2e3)};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"실습장",description:"데이터 분석 코드를 작성하고 테스트해보세요."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"실습장"}),e.jsx("p",{children:"코드 템플릿을 활용하여 데이터 분석을 시작하세요"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",marginBottom:"1rem",flexWrap:"wrap"},children:i.map((t,p)=>e.jsx("button",{onClick:()=>a(t.code),className:"community-submit-btn",style:{fontSize:"0.85rem",padding:"0.4rem 1rem"},children:t.label},p))}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("textarea",{value:s,onChange:t=>a(t.target.value),style:{width:"100%",minHeight:"400px",fontFamily:"monospace",fontSize:"0.9rem",padding:"1rem",borderRadius:"8px",border:"1px solid var(--border-color)",background:"var(--bg-secondary)",color:"var(--text-primary)",resize:"vertical"}}),e.jsx("button",{onClick:n,style:{position:"absolute",top:"0.5rem",right:"0.5rem",padding:"0.3rem 0.8rem",borderRadius:"4px",border:"none",background:"var(--primary)",color:"white",cursor:"pointer",fontSize:"0.8rem"},children:l?"복사됨!":"복사"})]}),e.jsxs("div",{className:"callout-box",style:{marginTop:"1rem"},children:[e.jsx("h3",{children:"사용 방법"}),e.jsx("p",{children:'1. 위 템플릿을 선택하거나 직접 코드를 작성하세요. 2. "복사" 버튼으로 코드를 복사합니다. 3. Google Colab이나 Jupyter Notebook에 붙여넣어 실행하세요.'})]})]})})})]})}export{x as default};
