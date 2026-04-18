import{j as e,L as t}from"./index-Cdny89u7.js";import{S as n}from"./SEOHead-BXuTlAiM.js";import{C as s}from"./CodeEditor-Czw2WAP5.js";const a=`import numpy as np
import pandas as pd

np.random.seed(42)
n = 200

# 설문 데이터 생성
df = pd.DataFrame({
    '응답자ID': range(1, n+1),
    '성별': np.random.choice(['남', '여'], n),
    '연령대': np.random.choice(['20대', '30대', '40대', '50대'], n, p=[0.3, 0.35, 0.2, 0.15]),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '근무만족도': np.random.randint(1, 6, n),
    '급여만족도': np.random.randint(1, 6, n),
    '복지만족도': np.random.randint(1, 6, n),
    '성장가능성': np.random.randint(1, 6, n),
    '워라밸': np.random.randint(1, 6, n),
    '추천의향': np.random.randint(0, 11, n),
    '개선사항': np.random.choice(['급여인상', '복지확대', '유연근무', '교육지원', '소통강화', '시설개선'], n)
})

print(f"데이터 크기: {df.shape}")
print(f"\\n[처음 10행]")
print(df.head(10))
print(f"\\n[기술통계]")
print(df.describe().round(1))`,i=`import matplotlib.pyplot as plt

# 리커트 척도 분석 (1~5점)
likert_cols = ['근무만족도', '급여만족도', '복지만족도', '성장가능성', '워라밸']

print("[항목별 평균 점수]")
means = df[likert_cols].mean().sort_values(ascending=False)
for col, val in means.items():
    bar = '█' * int(val * 4)
    print(f"  {col:<8}: {val:.2f} {bar}")

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 평균 비교
colors = ['#6366f1' if v >= 3 else '#ef4444' for v in means.values]
axes[0].barh(means.index, means.values, color=colors)
axes[0].axvline(x=3, color='gray', linestyle='--', alpha=0.5, label='보통(3점)')
axes[0].set_title('항목별 평균 만족도', fontweight='bold')
axes[0].set_xlim(1, 5)
axes[0].legend()

# 분포 비교
for col in likert_cols:
    dist = df[col].value_counts().sort_index()
    axes[1].plot(dist.index, dist.values, marker='o', label=col)
axes[1].set_title('만족도 분포 비교', fontweight='bold')
axes[1].set_xlabel('점수')
axes[1].set_ylabel('응답 수')
axes[1].legend(fontsize=8)

plt.tight_layout()
plt.show()`,r=`import matplotlib.pyplot as plt
import pandas as pd

# 교차분석: 그룹별 만족도 비교
print("[부서별 평균 만족도]")
dept_sat = df.groupby('부서')[['근무만족도', '급여만족도', '복지만족도']].mean().round(2)
print(dept_sat)

print("\\n[연령대별 평균 만족도]")
age_sat = df.groupby('연령대')[['근무만족도', '급여만족도', '워라밸']].mean().round(2)
print(age_sat)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

dept_sat.plot(kind='bar', ax=axes[0], colormap='Set2')
axes[0].set_title('부서별 만족도 비교', fontweight='bold')
axes[0].set_ylabel('평균 점수')
axes[0].tick_params(axis='x', rotation=45)
axes[0].legend(fontsize=8)

age_sat.plot(kind='bar', ax=axes[1], colormap='Set3')
axes[1].set_title('연령대별 만족도 비교', fontweight='bold')
axes[1].set_ylabel('평균 점수')
axes[1].tick_params(axis='x', rotation=0)
axes[1].legend(fontsize=8)

plt.tight_layout()
plt.show()`,o=`from scipy import stats
import numpy as np

# 통계 검정: 그룹 간 차이
print("[t-검정: 성별 근무만족도 차이]")
male = df[df['성별']=='남']['근무만족도']
female = df[df['성별']=='여']['근무만족도']
t_stat, p_val = stats.ttest_ind(male, female)
print(f"  남성 평균: {male.mean():.2f}, 여성 평균: {female.mean():.2f}")
print(f"  t={t_stat:.3f}, p={p_val:.4f}")
print(f"  결론: {'유의한 차이 있음' if p_val < 0.05 else '유의한 차이 없음'}")

print("\\n[ANOVA: 부서별 급여만족도 차이]")
groups = [df[df['부서']==d]['급여만족도'].values for d in df['부서'].unique()]
f_stat, p_val = stats.f_oneway(*groups)
print(f"  F={f_stat:.3f}, p={p_val:.4f}")
print(f"  결론: {'부서 간 유의한 차이 있음' if p_val < 0.05 else '부서 간 유의한 차이 없음'}")

print("\\n[카이제곱: 성별 x 개선사항 독립성]")
import pandas as pd
cross = pd.crosstab(df['성별'], df['개선사항'])
chi2, p_val, dof, expected = stats.chi2_contingency(cross)
print(f"  χ²={chi2:.3f}, p={p_val:.4f}")
print(f"  결론: {'연관성 있음' if p_val < 0.05 else '독립적(연관 없음)'}")

# 상관분석
print("\\n[만족도 항목 간 상관관계]")
likert_cols = ['근무만족도', '급여만족도', '복지만족도', '성장가능성', '워라밸']
corr = df[likert_cols].corr()
for i in range(len(likert_cols)):
    for j in range(i+1, len(likert_cols)):
        r = corr.iloc[i, j]
        if abs(r) > 0.15:
            print(f"  {likert_cols[i]} ↔ {likert_cols[j]}: r={r:.3f}")`,l=`import matplotlib.pyplot as plt
import pandas as pd

# 다중 선택 분석: 개선사항
print("[개선사항 빈도]")
improve = df['개선사항'].value_counts()
print(improve)

# NPS (Net Promoter Score)
promoters = (df['추천의향'] >= 9).sum()
detractors = (df['추천의향'] <= 6).sum()
nps = (promoters - detractors) / len(df) * 100

print(f"\\n[NPS 분석]")
print(f"추천(9-10): {promoters}명 ({promoters/len(df)*100:.1f}%)")
print(f"중립(7-8): {((df['추천의향'] >= 7) & (df['추천의향'] <= 8)).sum()}명")
print(f"비추천(0-6): {detractors}명 ({detractors/len(df)*100:.1f}%)")
print(f"NPS: {nps:.1f}")

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

improve.plot(kind='barh', ax=axes[0], color='#6366f1')
axes[0].set_title('개선사항 빈도', fontweight='bold')

# NPS 분포
bins = range(0, 12)
axes[1].hist(df['추천의향'], bins=bins, color='#10b981', edgecolor='white', align='left')
axes[1].axvline(x=6.5, color='red', linestyle='--', label='비추천 경계')
axes[1].axvline(x=8.5, color='orange', linestyle='--', label='추천 경계')
axes[1].set_title(f'추천의향 분포 (NPS: {nps:.1f})', fontweight='bold')
axes[1].set_xlabel('추천의향 (0~10)')
axes[1].legend()

plt.tight_layout()
plt.show()`,p=`# 자유응답 분석 (키워드 빈도)
import pandas as pd
import numpy as np

# 자유응답 시뮬레이션
np.random.seed(42)
keywords = ['급여', '복지', '워라밸', '소통', '교육', '성장', '문화', '시설', '리더십', '야근']
weights = [0.18, 0.15, 0.14, 0.12, 0.1, 0.08, 0.08, 0.06, 0.05, 0.04]

responses = []
for _ in range(200):
    n_kw = np.random.randint(1, 4)
    selected = np.random.choice(keywords, n_kw, replace=False, p=weights)
    responses.append(', '.join(selected))

# 키워드 빈도 분석
from collections import Counter
all_keywords = []
for r in responses:
    all_keywords.extend([k.strip() for k in r.split(',')])

freq = Counter(all_keywords)
freq_df = pd.DataFrame(freq.most_common(), columns=['키워드', '빈도'])
print("[자유응답 키워드 빈도]")
print(freq_df)

# 키워드 동시 출현 분석
print("\\n[키워드 동시 출현 TOP 5]")
from itertools import combinations
pairs = []
for r in responses:
    kws = sorted([k.strip() for k in r.split(',')])
    pairs.extend(combinations(kws, 2))
pair_freq = Counter(pairs).most_common(5)
for pair, count in pair_freq:
    print(f"  {pair[0]} + {pair[1]}: {count}회")`,d=`import matplotlib.pyplot as plt
import numpy as np

# 종합 보고서
fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# 1) 항목별 평균
likert_cols = ['근무만족도', '급여만족도', '복지만족도', '성장가능성', '워라밸']
means = df[likert_cols].mean().sort_values()
colors = ['#ef4444' if v < 3 else '#f59e0b' if v < 3.5 else '#10b981' for v in means.values]
axes[0,0].barh(means.index, means.values, color=colors)
axes[0,0].axvline(x=3, color='gray', linestyle='--')
axes[0,0].set_title('항목별 평균 만족도')
axes[0,0].set_xlim(1, 5)

# 2) 부서별 종합
dept_avg = df.groupby('부서')[likert_cols].mean().mean(axis=1).sort_values()
axes[0,1].barh(dept_avg.index, dept_avg.values, color='#6366f1')
axes[0,1].set_title('부서별 종합 만족도')
axes[0,1].set_xlim(1, 5)

# 3) NPS
promoters = (df['추천의향'] >= 9).sum()
passives = ((df['추천의향'] >= 7) & (df['추천의향'] <= 8)).sum()
detractors = (df['추천의향'] <= 6).sum()
axes[0,2].pie([promoters, passives, detractors],
              labels=['추천', '중립', '비추천'],
              autopct='%1.1f%%', colors=['#10b981', '#f59e0b', '#ef4444'])
nps = (promoters - detractors) / len(df) * 100
axes[0,2].set_title(f'NPS: {nps:.1f}')

# 4) 개선사항
improve = df['개선사항'].value_counts()
axes[1,0].bar(improve.index, improve.values, color='#8b5cf6')
axes[1,0].set_title('개선사항 빈도')
axes[1,0].tick_params(axis='x', rotation=45)

# 5) 연령대별 추천의향
age_nps = df.groupby('연령대')['추천의향'].mean()
axes[1,1].bar(age_nps.index, age_nps.values, color='#f59e0b')
axes[1,1].set_title('연령대별 평균 추천의향')
axes[1,1].set_ylabel('추천의향 (0~10)')

# 6) 요약
axes[1,2].axis('off')
summary = f"""응답자 수: {len(df)}명
전체 평균 만족도: {df[likert_cols].mean().mean():.2f}/5.0
NPS: {nps:.1f}
최고 만족 항목: {means.index[-1]}
최저 만족 항목: {means.index[0]}
1순위 개선사항: {improve.index[0]}"""
axes[1,2].text(0.1, 0.5, summary, fontsize=12, verticalalignment='center',
               fontfamily='monospace', bbox=dict(boxstyle='round', facecolor='#f0f0f0'))
axes[1,2].set_title('종합 요약')

plt.suptitle('직원 만족도 설문 종합 보고서', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()`;function x(){return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"설문 데이터 분석",description:"리커트 척도, NPS, 교차분석으로 설문 데이터를 분석합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"설문 데이터 분석"}),e.jsx("p",{children:"리커트 척도, NPS, 교차분석으로 설문 데이터를 분석합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsx("p",{children:"직원 만족도 설문 데이터를 생성하고, 리커트 분석, 교차분석, 통계검정, NPS, 자유응답 분석, 종합 보고서를 작성합니다."})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"만족도 항목"})," — 근무, 급여, 복지, 성장가능성, 워라밸 (1~5점 리커트)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"추천의향"})," — 0~10점 (NPS 산출용)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"개선사항"})," — 급여인상, 복지확대, 유연근무 등"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"인구통계"})," — 성별, 연령대, 부서"]})]}),e.jsx("h2",{children:"1단계: 데이터 생성"}),e.jsx(s,{title:"1단계: 데이터 생성",initialCode:a}),e.jsx("h2",{children:"2단계: 리커트 분석"}),e.jsx(s,{title:"2단계: 리커트 분석",initialCode:i}),e.jsx("h2",{children:"3단계: 교차분석"}),e.jsx(s,{title:"3단계: 교차분석",initialCode:r}),e.jsx("h2",{children:"4단계: 통계검정"}),e.jsx(s,{title:"4단계: 통계검정",initialCode:o}),e.jsx("h2",{children:"5단계: NPS + 다중선택 분석"}),e.jsx(s,{title:"5단계: NPS + 다중선택",initialCode:l}),e.jsx("h2",{children:"6단계: 자유응답 분석"}),e.jsx(s,{title:"6단계: 자유응답 분석",initialCode:p}),e.jsx("h2",{children:"7단계: 종합 보고서"}),e.jsx(s,{title:"7단계: 종합 보고서",initialCode:d}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(t,{to:"/practice/customer",className:"lesson-nav-btn prev",children:"← 이전: 고객 데이터 분석"}),e.jsx(t,{to:"/practice/timeseries",className:"lesson-nav-btn next",children:"다음: 시계열 데이터 분석 →"})]})]})})})]})}export{x as default};
