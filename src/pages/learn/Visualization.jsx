import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function Visualization() {
  return (
    <>
      <SEOHead title="AI 시각화 기법" description="Matplotlib, Seaborn 등을 활용한 데이터 시각화를 학습합니다." />
      <section className="page-header"><div className="container"><h1>AI 시각화 기법</h1><p>Matplotlib, Seaborn, Plotly를 활용한 데이터 시각화를 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>시각화의 중요성</h2>
            <p>데이터 시각화는 복잡한 데이터를 직관적으로 이해할 수 있게 해주는 핵심 기술입니다. 적절한 차트 유형을 선택하면 데이터의 패턴과 인사이트를 효과적으로 전달할 수 있습니다.</p>

            <h2>Matplotlib 기본</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import matplotlib.pyplot as plt
import numpy as np

# 한글 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

# 라인 차트
months = ['1월', '2월', '3월', '4월', '5월', '6월']
sales = [150, 180, 200, 170, 220, 250]

plt.figure(figsize=(10, 5))
plt.plot(months, sales, 'o-', color='#6366f1', linewidth=2)
plt.fill_between(range(len(months)), sales, alpha=0.1, color='#6366f1')
plt.title('월별 매출 추이', fontsize=14, fontweight='bold')
plt.ylabel('매출 (만원)')
plt.grid(True, alpha=0.3)
plt.show()`}</code></pre>
            </div>

            <h2>Seaborn 활용</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import seaborn as sns
import pandas as pd

df = pd.read_csv('sales_data.csv')

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 히스토그램 + KDE
sns.histplot(df['매출'], kde=True, ax=axes[0, 0], color='steelblue')
axes[0, 0].set_title('매출 분포')

# 박스플롯
sns.boxplot(data=df, x='카테고리', y='매출', ax=axes[0, 1])
axes[0, 1].set_title('카테고리별 매출')

# 히트맵
corr = df.select_dtypes(include='number').corr()
sns.heatmap(corr, annot=True, cmap='coolwarm', ax=axes[1, 0])
axes[1, 0].set_title('상관관계')

# 산점도
sns.scatterplot(data=df, x='광고비', y='매출', hue='지역', ax=axes[1, 1])
axes[1, 1].set_title('광고비 vs 매출')

plt.tight_layout()
plt.show()`}</code></pre>
            </div>

            <h2>차트 유형 선택 가이드</h2>
            <div className="code-block">
              <div className="code-header">가이드</div>
              <pre><code>{`# 시간에 따른 변화 → 라인 차트
# 카테고리 비교 → 바 차트
# 비율/구성 → 파이 차트, 도넛 차트
# 분포 확인 → 히스토그램, 박스플롯
# 두 변수 관계 → 산점도
# 상관관계 → 히트맵
# 여러 변수 비교 → 레이더 차트`}</code></pre>
            </div>

            <h2>Plotly 인터랙티브 차트</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import plotly.express as px

# 인터랙티브 산점도
fig = px.scatter(df, x='광고비', y='매출',
                 color='카테고리', size='수량',
                 hover_data=['제품명'],
                 title='광고비 대비 매출 분석')
fig.show()

# 인터랙티브 라인 차트
fig = px.line(df, x='날짜', y='매출',
              color='카테고리',
              title='카테고리별 매출 추이')
fig.show()`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>ChatGPT로 시각화 코드 생성하기</h3>
              <p>ChatGPT에게 "이 데이터를 시각화해줘"라고 요청할 때, 데이터 구조(컬럼명, 타입), 원하는 차트 유형, 색상/스타일 선호도를 함께 알려주면 바로 사용 가능한 시각화 코드를 생성해줍니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/learn/statistics" className="lesson-nav-btn prev">&larr; 이전: 통계 기초</Link>
              <Link to="/practice/sales" className="lesson-nav-btn next">다음: 매출 데이터 분석 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
