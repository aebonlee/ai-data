import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function Sales() {
  return (
    <>
      <SEOHead title="매출 데이터 분석" description="실제 매출 데이터를 활용한 분석 프로젝트를 수행합니다." />
      <section className="page-header"><div className="container"><h1>매출 데이터 분석</h1><p>실제 매출 데이터를 활용한 분석 프로젝트를 수행합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>프로젝트 개요</h2>
            <p>온라인 쇼핑몰의 매출 데이터를 분석하여 매출 트렌드 파악, 핵심 고객 세그먼트 발견, 매출 예측 모델을 구축합니다.</p>

            <h2>1단계: 데이터 로딩 및 탐색</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 데이터 로딩
df = pd.read_csv('online_sales.csv')

# 기본 탐색
print(f"데이터 크기: {df.shape}")
print(f"컬럼: {list(df.columns)}")
print(df.head())
print(df.describe())

# 날짜 변환
df['order_date'] = pd.to_datetime(df['order_date'])
df['year'] = df['order_date'].dt.year
df['month'] = df['order_date'].dt.month
df['weekday'] = df['order_date'].dt.day_name()`}</code></pre>
            </div>

            <h2>2단계: 매출 트렌드 분석</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 월별 매출 추이
monthly = df.groupby(df['order_date'].dt.to_period('M'))['revenue'].sum()

plt.figure(figsize=(12, 5))
monthly.plot(kind='line', marker='o', color='#6366f1')
plt.title('월별 매출 추이')
plt.ylabel('매출액')
plt.grid(True, alpha=0.3)
plt.show()

# 요일별 매출 패턴
weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
weekday_sales = df.groupby('weekday')['revenue'].mean().reindex(weekday_order)

plt.figure(figsize=(10, 5))
weekday_sales.plot(kind='bar', color='steelblue')
plt.title('요일별 평균 매출')
plt.xticks(rotation=45)
plt.show()`}</code></pre>
            </div>

            <h2>3단계: 카테고리 분석</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 카테고리별 매출 비중
category_sales = df.groupby('category')['revenue'].sum().sort_values(ascending=False)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
category_sales.plot(kind='bar', ax=axes[0], color='#6366f1')
axes[0].set_title('카테고리별 총 매출')

category_sales.plot(kind='pie', ax=axes[1], autopct='%1.1f%%')
axes[1].set_title('매출 비중')
plt.tight_layout()
plt.show()

# 카테고리별 평균 주문 금액
cat_avg = df.groupby('category').agg(
    평균매출=('revenue', 'mean'),
    주문수=('order_id', 'count'),
    총매출=('revenue', 'sum')
).sort_values('총매출', ascending=False)
print(cat_avg)`}</code></pre>
            </div>

            <h2>4단계: 인사이트 정리</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 핵심 지표 요약
print("=" * 40)
print("매출 분석 핵심 인사이트")
print("=" * 40)
print(f"총 매출: {df['revenue'].sum():,.0f}원")
print(f"평균 주문 금액: {df['revenue'].mean():,.0f}원")
print(f"최고 매출 카테고리: {category_sales.index[0]}")
print(f"최고 매출 월: {monthly.idxmax()}")
print(f"고객 수: {df['customer_id'].nunique():,}명")`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>실습 과제</h3>
              <p>본인만의 매출 데이터(또는 Kaggle의 공개 데이터셋)를 활용하여 위 분석을 직접 수행해보세요. ChatGPT에게 "매출 데이터 EDA 코드를 작성해줘"라고 요청하면 출발점을 빠르게 만들 수 있습니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/learn/visualization" className="lesson-nav-btn prev">&larr; 이전: AI 시각화 기법</Link>
              <Link to="/practice/customer" className="lesson-nav-btn next">다음: 고객 데이터 분석 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
