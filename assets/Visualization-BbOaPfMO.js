import{j as t,L as a}from"./index-CpaC8Bka.js";import{S as o}from"./SEOHead-CIyTwIY_.js";import{C as e}from"./CodeEditor-C27BVmyA.js";const s=`import matplotlib.pyplot as plt
import numpy as np

# Matplotlib 기초
months = ['1월', '2월', '3월', '4월', '5월', '6월']
sales = [120, 135, 148, 162, 175, 190]
costs = [80, 85, 92, 98, 105, 110]

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 라인 차트
axes[0].plot(months, sales, marker='o', color='#6366f1', linewidth=2, label='매출')
axes[0].plot(months, costs, marker='s', color='#ef4444', linewidth=2, label='비용')
axes[0].fill_between(range(len(months)), sales, costs, alpha=0.1, color='#10b981')
axes[0].set_title('월별 매출/비용 추이', fontweight='bold')
axes[0].set_ylabel('금액 (억원)')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 바 차트
x = np.arange(len(months))
width = 0.35
axes[1].bar(x - width/2, sales, width, label='매출', color='#6366f1')
axes[1].bar(x + width/2, costs, width, label='비용', color='#ef4444')
axes[1].set_xticks(x)
axes[1].set_xticklabels(months)
axes[1].set_title('월별 매출/비용 비교', fontweight='bold')
axes[1].legend()

# 파이 차트
categories = ['전자제품', '의류', '식품', '도서', '기타']
values = [35, 25, 20, 12, 8]
colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']
axes[2].pie(values, labels=categories, autopct='%1.1f%%', colors=colors, startangle=90)
axes[2].set_title('카테고리별 매출 비중', fontweight='bold')

plt.tight_layout()
plt.show()`,l=`import matplotlib.pyplot as plt
import numpy as np

# Matplotlib 고급: subplots, twin axes, annotation
np.random.seed(42)
months = range(1, 13)
revenue = [150, 165, 180, 195, 210, 225, 200, 215, 230, 245, 260, 280]
profit_rate = [12, 13, 14, 15, 16, 15, 13, 14, 16, 17, 18, 19]

fig, ax1 = plt.subplots(figsize=(12, 6))

# 쌍축 차트 (Twin Axes)
color1 = '#6366f1'
ax1.bar(months, revenue, color=color1, alpha=0.7, label='매출 (억원)')
ax1.set_xlabel('월', fontsize=12)
ax1.set_ylabel('매출 (억원)', color=color1, fontsize=12)
ax1.tick_params(axis='y', labelcolor=color1)

ax2 = ax1.twinx()
color2 = '#ef4444'
ax2.plot(months, profit_rate, color=color2, marker='o', linewidth=2, label='영업이익률 (%)')
ax2.set_ylabel('영업이익률 (%)', color=color2, fontsize=12)
ax2.tick_params(axis='y', labelcolor=color2)

# 주석 (Annotation)
max_idx = profit_rate.index(max(profit_rate))
ax2.annotate(f'최고 {max(profit_rate)}%',
            xy=(max_idx+1, max(profit_rate)),
            xytext=(max_idx-1, max(profit_rate)+2),
            arrowprops=dict(arrowstyle='->', color='red'),
            fontsize=11, color='red', fontweight='bold')

plt.title('월별 매출과 영업이익률', fontsize=14, fontweight='bold')
fig.legend(loc='upper left', bbox_to_anchor=(0.1, 0.95))
plt.tight_layout()
plt.show()`,i=`import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd

# Seaborn 통계 시각화
np.random.seed(42)
n = 150
df = pd.DataFrame({
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업'], n),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '경력': np.random.randint(1, 20, n),
    '성과': np.random.randint(60, 100, n)
})
df['연봉'] = df['연봉'] + df['경력'] * 80

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 히스토그램 + KDE
sns.histplot(data=df, x='연봉', kde=True, ax=axes[0,0], color='#6366f1')
axes[0,0].set_title('연봉 분포', fontweight='bold')

# 바이올린 플롯
sns.violinplot(data=df, x='부서', y='연봉', ax=axes[0,1], palette='Set2')
axes[0,1].set_title('부서별 연봉 분포', fontweight='bold')

# 회귀선이 포함된 산점도
sns.regplot(data=df, x='경력', y='연봉', ax=axes[1,0],
            scatter_kws={'alpha': 0.4, 's': 20}, color='#6366f1')
axes[1,0].set_title('경력 vs 연봉', fontweight='bold')

# 박스플롯
sns.boxplot(data=df, x='부서', y='만족도', ax=axes[1,1], palette='Set3')
axes[1,1].set_title('부서별 만족도', fontweight='bold')

plt.suptitle('Seaborn 통계 시각화', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,n=`import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd

# 범주형 시각화
np.random.seed(42)
n = 200
df = pd.DataFrame({
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1]),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '이직여부': np.random.choice(['유지', '이직'], n, p=[0.75, 0.25])
})

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 카운트플롯
sns.countplot(data=df, x='부서', hue='이직여부', ax=axes[0,0],
              palette=['#10b981', '#ef4444'])
axes[0,0].set_title('부서별 이직 현황', fontweight='bold')

# 스택 바 차트
cross = pd.crosstab(df['부서'], df['이직여부'], normalize='index')
cross.plot(kind='bar', stacked=True, ax=axes[0,1],
           color=['#10b981', '#ef4444'])
axes[0,1].set_title('부서별 이직 비율', fontweight='bold')
axes[0,1].set_ylabel('비율')
axes[0,1].tick_params(axis='x', rotation=0)
axes[0,1].legend(title='이직여부')

# 히트맵 (교차표)
cross2 = pd.crosstab(df['부서'], df['직급'])
sns.heatmap(cross2, annot=True, fmt='d', cmap='YlOrRd', ax=axes[1,0])
axes[1,0].set_title('부서 x 직급 분포', fontweight='bold')

# 포인트플롯
sns.pointplot(data=df, x='직급', y='연봉', hue='이직여부',
              ax=axes[1,1], palette=['#6366f1', '#ef4444'],
              order=['사원', '대리', '과장', '차장'])
axes[1,1].set_title('직급별 평균 연봉', fontweight='bold')

plt.suptitle('범주형 시각화', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,r=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# 시계열 시각화
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365, freq='D')
base = 100 + np.cumsum(np.random.normal(0.1, 2, 365))
seasonal = 15 * np.sin(np.arange(365) * 2 * np.pi / 365)
noise = np.random.normal(0, 3, 365)
ts = pd.Series(base + seasonal + noise, index=dates)

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 원본 시계열
axes[0,0].plot(ts, color='#6366f1', alpha=0.6, linewidth=0.8)
axes[0,0].plot(ts.rolling(30).mean(), color='#ef4444', linewidth=2, label='30일 이동평균')
axes[0,0].set_title('일별 매출 추이', fontweight='bold')
axes[0,0].legend()
axes[0,0].grid(True, alpha=0.3)

# 월별 집계
monthly = ts.resample('ME').agg(['mean', 'std'])
axes[0,1].bar(range(len(monthly)), monthly['mean'], yerr=monthly['std'],
              color='#6366f1', alpha=0.7, capsize=3)
axes[0,1].set_title('월별 평균 매출 (오차막대)', fontweight='bold')
axes[0,1].set_xticks(range(0, 12, 2))
axes[0,1].set_xticklabels(['1월', '3월', '5월', '7월', '9월', '11월'])

# 요일별 패턴
daily_pattern = ts.groupby(ts.index.dayofweek).mean()
days = ['월', '화', '수', '목', '금', '토', '일']
axes[1,0].bar(days, daily_pattern.values, color='#10b981')
axes[1,0].set_title('요일별 평균 매출', fontweight='bold')

# 히스토그램
axes[1,1].hist(ts, bins=30, color='#f59e0b', edgecolor='white')
axes[1,1].axvline(ts.mean(), color='red', linestyle='--', label=f'평균: {ts.mean():.1f}')
axes[1,1].set_title('매출 분포', fontweight='bold')
axes[1,1].legend()

plt.suptitle('시계열 시각화', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,p=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# 종합 대시보드 구성
np.random.seed(42)
categories = ['전자제품', '의류', '식품', '가구', '도서']
months = ['1월', '2월', '3월', '4월', '5월', '6월']
sales_data = np.random.randint(50, 200, (5, 6))

fig = plt.figure(figsize=(16, 10))

# 1) 카테고리별 총매출 (왼쪽 상단)
ax1 = fig.add_subplot(2, 3, 1)
totals = sales_data.sum(axis=1)
colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']
ax1.barh(categories, totals, color=colors)
ax1.set_title('카테고리별 총매출', fontweight='bold')

# 2) 월별 추이 (중앙 상단, 2칸)
ax2 = fig.add_subplot(2, 3, (2, 3))
for i, cat in enumerate(categories):
    ax2.plot(months, sales_data[i], marker='o', label=cat, linewidth=2)
ax2.set_title('카테고리별 월 매출 추이', fontweight='bold')
ax2.legend(loc='upper left', fontsize=8)
ax2.grid(True, alpha=0.3)

# 3) 매출 비중 (왼쪽 하단)
ax3 = fig.add_subplot(2, 3, 4)
ax3.pie(totals, labels=categories, autopct='%1.1f%%', colors=colors, startangle=90)
ax3.set_title('매출 비중', fontweight='bold')

# 4) 성장률 (중앙 하단)
ax4 = fig.add_subplot(2, 3, 5)
growth = ((sales_data[:, -1] - sales_data[:, 0]) / sales_data[:, 0] * 100).round(1)
bar_colors = ['#10b981' if g > 0 else '#ef4444' for g in growth]
ax4.bar(categories, growth, color=bar_colors)
ax4.set_title('6개월 성장률 (%)', fontweight='bold')
ax4.tick_params(axis='x', rotation=45)
ax4.axhline(y=0, color='gray', linestyle='--')

# 5) KPI 요약 (오른쪽 하단)
ax5 = fig.add_subplot(2, 3, 6)
ax5.axis('off')
kpi_text = f"""총 매출: {totals.sum():,}억
월평균: {sales_data.mean():.0f}억
최고 카테고리: {categories[totals.argmax()]}
최고 성장: {categories[growth.argmax()]} ({growth.max():.1f}%)
"""
ax5.text(0.1, 0.5, kpi_text, fontsize=13, verticalalignment='center',
         fontfamily='monospace', bbox=dict(boxstyle='round', facecolor='#f0f0f0'))
ax5.set_title('KPI 요약', fontweight='bold')

plt.suptitle('매출 분석 종합 대시보드', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()`;function f(){return t.jsxs(t.Fragment,{children:[t.jsx(o,{title:"시각화 기법",description:"Matplotlib, Seaborn을 활용한 데이터 시각화를 학습합니다."}),t.jsx("section",{className:"page-header",children:t.jsxs("div",{className:"container",children:[t.jsx("h1",{children:"시각화 기법"}),t.jsx("p",{children:"Matplotlib, Seaborn을 활용한 데이터 시각화를 학습합니다"})]})}),t.jsx("section",{className:"section lesson-content",children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"playground-body",children:[t.jsx("h2",{children:"Matplotlib 기초"}),t.jsx("p",{children:"Matplotlib은 Python의 가장 기본적인 시각화 라이브러리입니다. 라인, 바, 파이 차트 등 모든 기본 차트를 지원합니다."}),t.jsx(e,{title:"Matplotlib 기초: 라인, 바, 파이",initialCode:s}),t.jsx("h2",{children:"Matplotlib 고급: subplots, twin axes"}),t.jsx("p",{children:"쌍축 차트로 서로 다른 단위의 데이터를 하나의 차트에 표현하고, 주석(annotation)으로 핵심 포인트를 강조합니다."}),t.jsx(e,{title:"Matplotlib 고급: 쌍축 차트 + 주석",initialCode:l}),t.jsx("h2",{children:"Seaborn 통계 시각화"}),t.jsx("p",{children:"Seaborn은 Matplotlib 기반의 통계 시각화 라이브러리입니다. 더 아름다운 디폴트 스타일과 통계적 기능을 제공합니다."}),t.jsx(e,{title:"Seaborn 통계 시각화",initialCode:i}),t.jsx("h2",{children:"범주형 시각화"}),t.jsx("p",{children:"범주형 변수의 빈도, 비율, 교차 분석을 시각화합니다. 카운트플롯, 스택 바, 히트맵, 포인트플롯 등을 활용합니다."}),t.jsx(e,{title:"범주형 시각화",initialCode:n}),t.jsx("h2",{children:"시계열 시각화"}),t.jsx("p",{children:"시간에 따른 데이터의 변화를 시각화합니다. 이동평균, 월별 집계, 요일별 패턴 등을 표현합니다."}),t.jsx(e,{title:"시계열 시각화",initialCode:r}),t.jsx("h2",{children:"종합 대시보드 구성"}),t.jsx("p",{children:"여러 차트를 하나의 figure에 배치하여 종합적인 분석 대시보드를 구성합니다."}),t.jsx(e,{title:"종합 대시보드 구성",initialCode:p}),t.jsxs("div",{className:"callout-box",children:[t.jsx("h3",{children:"시각화 선택 가이드"}),t.jsx("p",{children:"추이 → 라인 차트 / 비교 → 바 차트 / 비중 → 파이 차트 / 분포 → 히스토그램, 박스플롯 / 관계 → 산점도 / 상관관계 → 히트맵. 데이터의 목적에 맞는 차트를 선택하는 것이 핵심입니다."})]}),t.jsxs("div",{className:"lesson-nav",children:[t.jsx(a,{to:"/learn/statistics",className:"lesson-nav-btn prev",children:"← 이전: 통계 분석"}),t.jsx(a,{to:"/learn/classification",className:"lesson-nav-btn next",children:"다음: 분류 분석 →"})]})]})})})]})}export{f as default};
