import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function EDA() {
  return (
    <>
      <SEOHead title="탐색적 데이터 분석" description="EDA를 통해 데이터의 패턴과 인사이트를 발견합니다." />
      <section className="page-header"><div className="container"><h1>탐색적 데이터 분석 (EDA)</h1><p>데이터의 패턴과 인사이트를 탐색하고 발견하는 방법을 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>EDA란?</h2>
            <p>탐색적 데이터 분석(Exploratory Data Analysis)은 데이터를 다양한 각도에서 살펴보며 패턴, 이상치, 관계를 발견하는 과정입니다. 본격적인 분석이나 모델링에 앞서 데이터를 이해하는 필수 단계입니다.</p>

            <h2>데이터 개요 파악</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('sales_data.csv')

# 기본 정보
print(df.shape)          # 행, 열 수
print(df.info())         # 데이터 타입, 결측치
print(df.describe())     # 기술 통계
print(df.head(10))       # 처음 10행

# 결측치 현황
missing = df.isnull().sum()
print(missing[missing > 0])

# 고유값 확인
for col in df.select_dtypes(include='object'):
    print(f"{col}: {df[col].nunique()}개 - {df[col].unique()[:5]}")`}</code></pre>
            </div>

            <h2>분포 분석</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# 히스토그램 - 수치형 분포
df['매출'].hist(bins=20, ax=axes[0], color='steelblue')
axes[0].set_title('매출 분포')

# 박스플롯 - 이상치 확인
df.boxplot(column='매출', by='카테고리', ax=axes[1])
axes[1].set_title('카테고리별 매출')

# 카운트플롯 - 범주형 분포
df['지역'].value_counts().plot(kind='bar', ax=axes[2])
axes[2].set_title('지역별 건수')

plt.tight_layout()
plt.show()`}</code></pre>
            </div>

            <h2>상관관계 분석</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 상관관계 행렬
corr = df.select_dtypes(include='number').corr()

# 히트맵 시각화
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap='coolwarm',
            center=0, fmt='.2f')
plt.title('변수 간 상관관계')
plt.show()

# 산점도 - 두 변수 관계
sns.scatterplot(data=df, x='광고비', y='매출', hue='지역')
plt.title('광고비 vs 매출')
plt.show()`}</code></pre>
            </div>

            <h2>그룹별 비교</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 피벗 테이블
pivot = df.pivot_table(
    values='매출',
    index='지역',
    columns='카테고리',
    aggfunc='mean'
)
print(pivot)

# 크로스탭
cross = pd.crosstab(df['지역'], df['등급'], normalize='index')
print(cross)`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>EDA 핵심 질문</h3>
              <p>① 데이터의 크기와 구조는? ② 결측치와 이상치가 있는가? ③ 각 변수의 분포는 어떤 형태인가? ④ 변수 간 어떤 상관관계가 있는가? ⑤ 그룹별로 차이가 있는가? 이 질문들에 답하면 EDA가 완성됩니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/learn/preprocessing" className="lesson-nav-btn prev">&larr; 이전: 데이터 전처리</Link>
              <Link to="/learn/statistics" className="lesson-nav-btn next">다음: 통계 기초 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
