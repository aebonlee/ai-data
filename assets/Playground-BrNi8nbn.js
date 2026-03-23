import{r as i,b as o,j as a}from"./index-D-hwknUC.js";import{S as l}from"./SEOHead-DshhaxsV.js";import{C as p}from"./CodeEditor-CFLhylfW.js";const s=[{label:"기본 분석",icon:"fa-solid fa-chart-simple",code:`import pandas as pd
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
plt.show()`}];function x(){const[e,r]=i.useState(0),{incrementCodeRuns:d}=o();return a.jsxs(a.Fragment,{children:[a.jsx(l,{title:"실습장",description:"브라우저에서 직접 Python 코드를 실행해보세요. Pandas, NumPy, Matplotlib 지원."}),a.jsx("section",{className:"page-header",children:a.jsxs("div",{className:"container",children:[a.jsxs("h1",{children:[a.jsx("i",{className:"fa-solid fa-terminal"})," 실습장"]}),a.jsx("p",{children:"브라우저에서 직접 Python 코드를 실행해보세요 — Pandas, NumPy, Matplotlib 지원"})]})}),a.jsx("section",{className:"section lesson-content",children:a.jsx("div",{className:"container",children:a.jsxs("div",{className:"playground-body",children:[a.jsx("div",{style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",flexWrap:"wrap"},children:s.map((n,t)=>a.jsxs("button",{onClick:()=>r(t),className:"community-submit-btn",style:{fontSize:"0.85rem",padding:"0.5rem 1rem",opacity:e===t?1:.6,background:e===t?void 0:"var(--bg-medium-gray)",color:e===t?void 0:"var(--text-secondary)",borderColor:e===t?void 0:"var(--border-light)"},children:[a.jsx("i",{className:n.icon,style:{marginRight:"6px"}}),n.label]},t))}),a.jsx(p,{initialCode:s[e].code,title:s[e].label},e),a.jsxs("div",{className:"callout-box",style:{marginTop:"1.5rem"},children:[a.jsxs("h3",{children:[a.jsx("i",{className:"fa-solid fa-lightbulb"})," 사용 방법"]}),a.jsxs("ul",{style:{marginTop:"0.5rem",paddingLeft:"1.2rem",lineHeight:"1.8"},children:[a.jsx("li",{children:"위 템플릿을 선택하거나 직접 코드를 작성하세요"}),a.jsxs("li",{children:[a.jsx("strong",{children:"실행"})," 버튼 또는 ",a.jsx("code",{children:"Ctrl+Enter"}),"로 코드를 실행합니다"]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Pyodide"})," 기반으로 브라우저에서 직접 Python이 실행됩니다"]}),a.jsx("li",{children:"Pandas, NumPy, Matplotlib, Seaborn 등 데이터 분석 라이브러리를 지원합니다"}),a.jsx("li",{children:"첫 실행 시 Pyodide 로딩에 수 초가 걸릴 수 있습니다"})]})]})]})})})]})}export{x as default};
