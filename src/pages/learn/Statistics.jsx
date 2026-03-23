import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function Statistics() {
  return (
    <>
      <SEOHead title="통계 기초" description="데이터 분석에 필요한 기초 통계 개념을 학습합니다." />
      <section className="page-header"><div className="container"><h1>통계 기초</h1><p>데이터 분석에 필요한 기초 통계 개념을 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>기술통계</h2>
            <p>기술통계(Descriptive Statistics)는 데이터의 특성을 요약하는 기본적인 통계입니다. 중심경향치와 산포도를 통해 데이터의 전반적인 모습을 파악합니다.</p>

            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd
import numpy as np

data = pd.Series([85, 92, 78, 95, 88, 76, 91, 83, 89, 94])

# 중심경향치
print(f"평균(Mean): {data.mean():.1f}")
print(f"중앙값(Median): {data.median():.1f}")
print(f"최빈값(Mode): {data.mode()[0]}")

# 산포도
print(f"분산(Variance): {data.var():.1f}")
print(f"표준편차(Std): {data.std():.1f}")
print(f"범위(Range): {data.max() - data.min()}")
print(f"IQR: {data.quantile(0.75) - data.quantile(0.25)}")

# 분포 형태
print(f"왜도(Skewness): {data.skew():.2f}")
print(f"첨도(Kurtosis): {data.kurtosis():.2f}")`}</code></pre>
            </div>

            <h2>확률분포</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`from scipy import stats
import matplotlib.pyplot as plt

# 정규분포
x = np.linspace(-4, 4, 100)
y = stats.norm.pdf(x, 0, 1)

plt.figure(figsize=(10, 4))
plt.subplot(1, 2, 1)
plt.plot(x, y, 'b-')
plt.fill_between(x, y, alpha=0.3)
plt.title('정규분포 (표준)')

# 실제 데이터의 정규성 검정
sample = np.random.normal(100, 15, 200)
stat, p_value = stats.shapiro(sample)
print(f"Shapiro-Wilk 검정: p-value = {p_value:.4f}")
print("정규분포" if p_value > 0.05 else "비정규분포")`}</code></pre>
            </div>

            <h2>가설검정</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# t-검정: 두 그룹의 평균 비교
group_a = [85, 92, 78, 95, 88, 91, 83, 89]  # A 방법
group_b = [76, 82, 90, 71, 85, 79, 88, 74]  # B 방법

t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"t-통계량: {t_stat:.3f}")
print(f"p-value: {p_value:.4f}")

alpha = 0.05
if p_value < alpha:
    print("→ 두 그룹의 평균에 유의미한 차이가 있습니다.")
else:
    print("→ 두 그룹의 평균에 유의미한 차이가 없습니다.")

# 카이제곱 검정: 범주형 변수 독립성
observed = pd.DataFrame({
    '만족': [40, 30],
    '불만족': [10, 20]
}, index=['A그룹', 'B그룹'])

chi2, p, dof, expected = stats.chi2_contingency(observed)
print(f"카이제곱: {chi2:.3f}, p-value: {p:.4f}")`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>통계 분석 선택 가이드</h3>
              <p>두 그룹 평균 비교 → t-검정, 세 그룹 이상 비교 → ANOVA, 범주형 변수 관계 → 카이제곱 검정, 연속형 변수 관계 → 상관분석/회귀분석. p-value가 0.05 미만이면 통계적으로 유의미합니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/learn/eda" className="lesson-nav-btn prev">&larr; 이전: 탐색적 데이터 분석</Link>
              <Link to="/learn/visualization" className="lesson-nav-btn next">다음: AI 시각화 기법 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
