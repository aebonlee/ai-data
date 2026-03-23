import{j as s,L as e}from"./index-D-hwknUC.js";import{S as l}from"./SEOHead-DshhaxsV.js";function n(){return s.jsxs(s.Fragment,{children:[s.jsx(l,{title:"설문 데이터 분석",description:"설문조사 데이터를 수집, 정리, 분석하는 방법을 학습합니다."}),s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"설문 데이터 분석"}),s.jsx("p",{children:"설문조사 데이터를 수집, 정리, 분석하는 방법을 학습합니다"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsx("h2",{children:"설문 데이터의 특징"}),s.jsx("p",{children:"설문조사 데이터는 리커트 척도, 다중 선택, 자유 응답 등 다양한 형태를 포함합니다. 각 유형에 맞는 분석 방법을 적용해야 합니다."}),s.jsx("h2",{children:"데이터 정리"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Python"}),s.jsx("pre",{children:s.jsx("code",{children:`import pandas as pd

df = pd.read_csv('survey_results.csv')

# 리커트 척도 매핑
scale_map = {'매우 불만족': 1, '불만족': 2, '보통': 3, '만족': 4, '매우 만족': 5}
df['만족도_점수'] = df['만족도'].map(scale_map)

# 다중 선택 분리 (예: "Python,Excel,R")
skills = df['사용기술'].str.get_dummies(sep=',')
print(f"기술별 응답수:\\n{skills.sum().sort_values(ascending=False)}")

# 기술통계
print(f"평균 만족도: {df['만족도_점수'].mean():.2f}")
print(f"응답자 수: {len(df)}")
print(f"만족도 분포:\\n{df['만족도'].value_counts()}")`})})]}),s.jsx("h2",{children:"교차 분석"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Python"}),s.jsx("pre",{children:s.jsx("code",{children:`import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# 그룹별 만족도 비교
group_sat = df.groupby('부서')['만족도_점수'].mean().sort_values()

plt.figure(figsize=(10, 5))
group_sat.plot(kind='barh', color='steelblue')
plt.title('부서별 평균 만족도')
plt.xlabel('만족도 점수')
plt.show()

# 교차표
cross = pd.crosstab(df['부서'], df['만족도'], normalize='index')
cross.plot(kind='bar', stacked=True, figsize=(10, 5))
plt.title('부서별 만족도 분포')
plt.legend(title='만족도')
plt.show()

# 통계적 유의성 검정
groups = [g['만족도_점수'].values for _, g in df.groupby('부서')]
f_stat, p_value = stats.f_oneway(*groups)
print(f"ANOVA F={f_stat:.2f}, p={p_value:.4f}")`})})]}),s.jsx("h2",{children:"자유 응답 분석"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Python"}),s.jsx("pre",{children:s.jsx("code",{children:`from collections import Counter

# 간단한 키워드 빈도 분석
all_text = ' '.join(df['자유응답'].dropna())
words = all_text.split()
word_freq = Counter(words).most_common(20)
print("상위 20 키워드:", word_freq)

# ChatGPT 활용 프롬프트
prompt = f"""
다음 설문 자유응답 {len(df)}건을 분석하여:
1. 주요 테마 3~5개로 분류
2. 긍정/부정 의견 요약
3. 개선 제안 사항 정리
응답 데이터: {df['자유응답'].dropna().tolist()[:50]}
"""`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"설문 분석 팁"}),s.jsx("p",{children:"응답률과 편향을 반드시 확인하세요. 리커트 척도는 중앙경향편향을 주의하고, 자유 응답은 ChatGPT를 활용하면 빠르게 주제 분류와 감성 분석이 가능합니다."})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/practice/customer",className:"lesson-nav-btn prev",children:"← 이전: 고객 데이터 분석"}),s.jsx(e,{to:"/practice/timeseries",className:"lesson-nav-btn next",children:"다음: 시계열 분석 →"})]})]})})})]})}export{n as default};
