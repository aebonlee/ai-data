import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function Survey() {
  return (
    <>
      <SEOHead title="설문 데이터 분석" description="설문조사 데이터를 수집, 정리, 분석하는 방법을 학습합니다." />
      <section className="page-header"><div className="container"><h1>설문 데이터 분석</h1><p>설문조사 데이터를 수집, 정리, 분석하는 방법을 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>설문 데이터의 특징</h2>
            <p>설문조사 데이터는 리커트 척도, 다중 선택, 자유 응답 등 다양한 형태를 포함합니다. 각 유형에 맞는 분석 방법을 적용해야 합니다.</p>

            <h2>데이터 정리</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd

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
print(f"만족도 분포:\\n{df['만족도'].value_counts()}")`}</code></pre>
            </div>

            <h2>교차 분석</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import matplotlib.pyplot as plt
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
print(f"ANOVA F={f_stat:.2f}, p={p_value:.4f}")`}</code></pre>
            </div>

            <h2>자유 응답 분석</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`from collections import Counter

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
"""`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>설문 분석 팁</h3>
              <p>응답률과 편향을 반드시 확인하세요. 리커트 척도는 중앙경향편향을 주의하고, 자유 응답은 ChatGPT를 활용하면 빠르게 주제 분류와 감성 분석이 가능합니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/practice/customer" className="lesson-nav-btn prev">&larr; 이전: 고객 데이터 분석</Link>
              <Link to="/practice/timeseries" className="lesson-nav-btn next">다음: 시계열 분석 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
