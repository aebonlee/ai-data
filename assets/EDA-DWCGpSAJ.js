import{j as n,L as t}from"./index-p8N1kvnq.js";import{S as a}from"./SEOHead-CNpWiLys.js";import{C as e}from"./CodeEditor-CM0ArTsA.js";const o=`import pandas as pd
import numpy as np

# 데이터 개요 파악
np.random.seed(42)
n = 200
df = pd.DataFrame({
    '나이': np.random.randint(20, 60, n),
    '연봉': (np.random.normal(4500, 1200, n)).astype(int),
    '경력': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장', '부장'], n, p=[0.35, 0.25, 0.2, 0.12, 0.08]),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '이직여부': np.random.choice(['유지', '이직'], n, p=[0.75, 0.25])
})

print(f"데이터 크기: {df.shape}")
print(f"\\n[처음 5행]")
print(df.head())
print(f"\\n[데이터 타입]")
print(df.dtypes)
print(f"\\n[기술통계]")
print(df.describe().round(1))
print(f"\\n[결측치]")
print(df.isnull().sum())
print(f"\\n[고유값]")
for col in df.select_dtypes(include='object'):
    print(f"  {col}: {df[col].nunique()}개 → {df[col].unique()}")`,s=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

np.random.seed(42)
n = 200
df = pd.DataFrame({
    '나이': np.random.randint(20, 60, n),
    '연봉': (np.random.normal(4500, 1200, n)).astype(int),
    '경력': np.random.randint(0, 30, n),
    '만족도': np.random.uniform(1, 5, n).round(1)
})

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 히스토그램
axes[0,0].hist(df['연봉'], bins=20, color='#6366f1', edgecolor='white', alpha=0.8)
axes[0,0].axvline(df['연봉'].mean(), color='red', linestyle='--', label=f"평균: {df['연봉'].mean():.0f}")
axes[0,0].axvline(df['연봉'].median(), color='green', linestyle='--', label=f"중앙값: {df['연봉'].median():.0f}")
axes[0,0].set_title('연봉 분포 (히스토그램)', fontweight='bold')
axes[0,0].legend()

# KDE (커널 밀도 추정)
from scipy import stats
x = np.linspace(df['나이'].min(), df['나이'].max(), 100)
kde = stats.gaussian_kde(df['나이'])
axes[0,1].fill_between(x, kde(x), alpha=0.3, color='#8b5cf6')
axes[0,1].plot(x, kde(x), color='#8b5cf6', linewidth=2)
axes[0,1].set_title('나이 분포 (KDE)', fontweight='bold')

# 박스플롯
axes[1,0].boxplot([df['나이'], df['경력'], df['만족도']],
                   labels=['나이', '경력', '만족도'])
axes[1,0].set_title('수치형 변수 박스플롯', fontweight='bold')

# 히스토그램 + 통계
axes[1,1].hist(df['만족도'], bins=15, color='#10b981', edgecolor='white', alpha=0.8)
axes[1,1].set_title('만족도 분포', fontweight='bold')
axes[1,1].axvline(df['만족도'].mean(), color='red', linestyle='--')

plt.suptitle('단변량 분석: 수치형 변수', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,r=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

np.random.seed(42)
n = 200
df = pd.DataFrame({
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장', '부장'], n, p=[0.35, 0.25, 0.2, 0.12, 0.08]),
    '이직여부': np.random.choice(['유지', '이직'], n, p=[0.75, 0.25])
})

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 부서별 빈도
dept_counts = df['부서'].value_counts()
axes[0].bar(dept_counts.index, dept_counts.values, color='#6366f1')
axes[0].set_title('부서별 인원수', fontweight='bold')
axes[0].tick_params(axis='x', rotation=45)

# 파이차트 - 이직 비율
turnover = df['이직여부'].value_counts()
axes[1].pie(turnover.values, labels=turnover.index, autopct='%1.1f%%',
            colors=['#10b981', '#ef4444'], startangle=90)
axes[1].set_title('이직 비율', fontweight='bold')

# 직급별 빈도
rank_order = ['사원', '대리', '과장', '차장', '부장']
rank_counts = df['직급'].value_counts().reindex(rank_order)
axes[2].barh(rank_counts.index, rank_counts.values, color='#f59e0b')
axes[2].set_title('직급별 인원수', fontweight='bold')
axes[2].invert_yaxis()

plt.suptitle('단변량 분석: 범주형 변수', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,i=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

np.random.seed(42)
n = 200
df = pd.DataFrame({
    '나이': np.random.randint(20, 60, n),
    '연봉': (np.random.normal(4500, 1200, n)).astype(int),
    '경력': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업'], n),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '이직여부': np.random.choice(['유지', '이직'], n, p=[0.75, 0.25])
})

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 산점도: 경력 vs 연봉
colors = {'유지': '#10b981', '이직': '#ef4444'}
for label, group in df.groupby('이직여부'):
    axes[0].scatter(group['경력'], group['연봉'], label=label,
                    color=colors[label], alpha=0.6, s=30)
axes[0].set_xlabel('경력 (년)')
axes[0].set_ylabel('연봉 (만원)')
axes[0].set_title('경력 vs 연봉', fontweight='bold')
axes[0].legend()

# 박스플롯: 부서별 연봉
dept_data = [df[df['부서']==d]['연봉'].values for d in ['마케팅', '개발', '기획', '영업']]
bp = axes[1].boxplot(dept_data, labels=['마케팅', '개발', '기획', '영업'], patch_artist=True)
colors_box = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd']
for patch, color in zip(bp['boxes'], colors_box):
    patch.set_facecolor(color)
axes[1].set_title('부서별 연봉 분포', fontweight='bold')

# 교차표 시각화
cross = pd.crosstab(df['부서'], df['이직여부'], normalize='index')
cross.plot(kind='bar', ax=axes[2], color=['#10b981', '#ef4444'], stacked=True)
axes[2].set_title('부서별 이직 비율', fontweight='bold')
axes[2].set_ylabel('비율')
axes[2].tick_params(axis='x', rotation=45)
axes[2].legend(title='이직여부')

plt.suptitle('이변량 분석', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,d=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

np.random.seed(42)
n = 200
df = pd.DataFrame({
    '나이': np.random.randint(20, 60, n),
    '연봉': (np.random.normal(4500, 1200, n)).astype(int),
    '경력': np.random.randint(0, 30, n),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '성과점수': np.random.randint(60, 100, n)
})
# 상관관계가 있도록 조정
df['연봉'] = df['연봉'] + df['경력'] * 80
df['성과점수'] = df['성과점수'] + (df['만족도'] * 5).astype(int)

# 상관관계 행렬
corr = df.corr().round(2)
print("[상관관계 행렬]")
print(corr)

# 히트맵
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0, fmt='.2f',
            square=True, linewidths=0.5)
plt.title('변수 간 상관관계 히트맵', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# 강한 상관관계 찾기
print("\\n[강한 상관관계 (|r| > 0.3)]")
for i in range(len(corr.columns)):
    for j in range(i+1, len(corr.columns)):
        r = corr.iloc[i, j]
        if abs(r) > 0.3:
            print(f"  {corr.columns[i]} ↔ {corr.columns[j]}: r = {r:.2f}")`,l=`import pandas as pd
import numpy as np

np.random.seed(42)
n = 200
df = pd.DataFrame({
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1]),
    '연봉': (np.random.normal(4500, 1200, n)).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '성과점수': np.random.randint(60, 100, n)
})

# 피벗 테이블
print("[피벗 테이블 - 부서x직급별 평균 연봉]")
pivot = df.pivot_table(values='연봉', index='부서', columns='직급', aggfunc='mean').round(0)
print(pivot)

# 다중 집계
print("\\n[부서별 종합 분석]")
summary = df.groupby('부서').agg(
    인원=('연봉', 'count'),
    평균연봉=('연봉', 'mean'),
    평균만족도=('만족도', 'mean'),
    평균성과=('성과점수', 'mean')
).round(1)
summary = summary.sort_values('평균연봉', ascending=False)
print(summary)

# 교차표
print("\\n[교차표 - 부서 x 직급]")
cross = pd.crosstab(df['부서'], df['직급'], margins=True)
print(cross)`,p=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

np.random.seed(42)
n = 200
df = pd.DataFrame({
    '나이': np.random.randint(20, 60, n),
    '연봉': (np.random.normal(4500, 1200, n)).astype(int),
    '경력': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업'], n),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '이직여부': np.random.choice(['유지', '이직'], n, p=[0.75, 0.25])
})
df['연봉'] = df['연봉'] + df['경력'] * 80

fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# 1. 연봉 분포
axes[0,0].hist(df['연봉'], bins=20, color='#6366f1', edgecolor='white')
axes[0,0].set_title('연봉 분포')
axes[0,0].axvline(df['연봉'].mean(), color='red', linestyle='--')

# 2. 부서별 인원
dept = df['부서'].value_counts()
axes[0,1].bar(dept.index, dept.values, color=['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'])
axes[0,1].set_title('부서별 인원')

# 3. 이직 비율
turnover = df['이직여부'].value_counts()
axes[0,2].pie(turnover.values, labels=turnover.index, autopct='%1.1f%%',
              colors=['#10b981', '#ef4444'])
axes[0,2].set_title('이직 비율')

# 4. 경력 vs 연봉
axes[1,0].scatter(df['경력'], df['연봉'], alpha=0.4, color='#6366f1', s=20)
axes[1,0].set_xlabel('경력')
axes[1,0].set_ylabel('연봉')
axes[1,0].set_title('경력 vs 연봉')

# 5. 부서별 연봉 박스플롯
dept_data = [df[df['부서']==d]['연봉'].values for d in df['부서'].unique()]
axes[1,1].boxplot(dept_data, labels=df['부서'].unique())
axes[1,1].set_title('부서별 연봉')
axes[1,1].tick_params(axis='x', rotation=45)

# 6. 만족도 분포
axes[1,2].hist(df['만족도'], bins=15, color='#10b981', edgecolor='white')
axes[1,2].set_title('만족도 분포')

plt.suptitle('종합 EDA 대시보드', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

# 핵심 인사이트
print("=" * 45)
print("EDA 핵심 인사이트")
print("=" * 45)
print(f"총 인원: {len(df)}명")
print(f"평균 연봉: {df['연봉'].mean():,.0f}만원")
print(f"이직률: {(df['이직여부']=='이직').mean()*100:.1f}%")
print(f"평균 만족도: {df['만족도'].mean():.1f}/5.0")`;function x(){return n.jsxs(n.Fragment,{children:[n.jsx(a,{title:"탐색적 데이터 분석",description:"EDA를 통해 데이터의 패턴과 인사이트를 발견합니다."}),n.jsx("section",{className:"page-header",children:n.jsxs("div",{className:"container",children:[n.jsx("h1",{children:"탐색적 데이터 분석 (EDA)"}),n.jsx("p",{children:"데이터의 패턴과 인사이트를 탐색하고 발견하는 방법을 학습합니다"})]})}),n.jsx("section",{className:"section lesson-content",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"playground-body",children:[n.jsx("h2",{children:"EDA란?"}),n.jsx("p",{children:"탐색적 데이터 분석(Exploratory Data Analysis)은 데이터를 다양한 각도에서 살펴보며 패턴, 이상치, 관계를 발견하는 과정입니다. 본격적인 분석이나 모델링에 앞서 데이터를 이해하는 필수 단계입니다."}),n.jsx("h2",{children:"데이터 개요 파악"}),n.jsx("p",{children:"데이터의 크기, 타입, 기술통계, 결측치, 고유값을 먼저 확인합니다."}),n.jsx(e,{title:"데이터 개요 파악",initialCode:o}),n.jsx("h2",{children:"단변량 분석: 히스토그램, KDE, 박스플롯"}),n.jsx("p",{children:"각 변수의 분포를 개별적으로 파악합니다. 수치형은 히스토그램과 박스플롯으로 분포와 이상치를 확인합니다."}),n.jsx(e,{title:"단변량 분석: 수치형 변수",initialCode:s}),n.jsx("h2",{children:"범주형 분석: value_counts, 파이차트"}),n.jsx("p",{children:"범주형 변수의 빈도와 비율을 파악합니다. 불균형한 범주가 있는지 확인합니다."}),n.jsx(e,{title:"단변량 분석: 범주형 변수",initialCode:r}),n.jsx("h2",{children:"이변량 분석: scatter, boxplot, crosstab"}),n.jsx("p",{children:"두 변수 간의 관계를 분석합니다. 산점도, 그룹별 박스플롯, 교차표로 패턴을 발견합니다."}),n.jsx(e,{title:"이변량 분석",initialCode:i}),n.jsx("h2",{children:"상관분석 히트맵"}),n.jsx("p",{children:"모든 수치형 변수 간의 상관관계를 한눈에 파악합니다. |r| > 0.5이면 강한 상관, 0.3~0.5이면 중간 상관입니다."}),n.jsx(e,{title:"상관분석 히트맵",initialCode:d}),n.jsx("h2",{children:"피벗테이블과 그룹별 비교"}),n.jsx("p",{children:"그룹별 통계를 피벗테이블과 교차표로 요약합니다."}),n.jsx(e,{title:"피벗테이블과 그룹별 비교",initialCode:l}),n.jsx("h2",{children:"종합 EDA 대시보드"}),n.jsx("p",{children:"여러 분석 결과를 하나의 대시보드로 구성하여 전체적인 인사이트를 정리합니다."}),n.jsx(e,{title:"종합 EDA 대시보드",initialCode:p}),n.jsxs("div",{className:"callout-box",children:[n.jsx("h3",{children:"EDA 핵심 질문"}),n.jsx("p",{children:"1) 데이터의 크기와 구조는? 2) 결측치와 이상치가 있는가? 3) 각 변수의 분포는 어떤 형태인가? 4) 변수 간 어떤 상관관계가 있는가? 5) 그룹별로 차이가 있는가? 이 질문들에 답하면 EDA가 완성됩니다."})]}),n.jsxs("div",{className:"lesson-nav",children:[n.jsx(t,{to:"/learn/preprocessing",className:"lesson-nav-btn prev",children:"← 이전: 데이터 전처리"}),n.jsx(t,{to:"/learn/statistics",className:"lesson-nav-btn next",children:"다음: 통계 분석 →"})]})]})})})]})}export{x as default};
