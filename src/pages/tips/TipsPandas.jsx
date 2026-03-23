import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function TipsPandas() {
  return (
    <>
      <SEOHead title="Pandas 팁" description="Pandas 고급 기능과 성능 최적화 테크닉" />
      <section className="page-header"><div className="container"><h1>Pandas 팁</h1><p>Pandas 고급 기능과 성능 최적화 테크닉</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>1. 메서드 체이닝</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd

# 메서드 체이닝으로 깔끔하게
result = (
    df
    .query('매출 > 1000')
    .groupby('카테고리')['매출']
    .agg(['mean', 'sum', 'count'])
    .sort_values('sum', ascending=False)
    .head(10)
)

# assign으로 새 컬럼 추가하며 체이닝
result = (
    df
    .assign(매출등급=lambda x: pd.cut(x['매출'], bins=[0, 1000, 5000, float('inf')], labels=['하', '중', '상']))
    .groupby('매출등급')
    .size()
)`}</code></pre>
            </div>

            <h2>2. apply vs 벡터 연산</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 느린 방법: apply
df['할인가'] = df['가격'].apply(lambda x: x * 0.9)

# 빠른 방법: 벡터 연산
df['할인가'] = df['가격'] * 0.9

# 조건부 값 설정
# 느린 방법
df['등급'] = df['매출'].apply(lambda x: 'A' if x >= 5000 else 'B')

# 빠른 방법: np.where
import numpy as np
df['등급'] = np.where(df['매출'] >= 5000, 'A', 'B')

# 여러 조건: np.select
conditions = [df['매출'] >= 5000, df['매출'] >= 2000]
choices = ['A', 'B']
df['등급'] = np.select(conditions, choices, default='C')`}</code></pre>
            </div>

            <h2>3. 유용한 함수들</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# value_counts - 빈도 분석의 핵심
df['카테고리'].value_counts()                    # 빈도수
df['카테고리'].value_counts(normalize=True)       # 비율
df['카테고리'].value_counts().head(5)             # 상위 5

# crosstab - 교차표
pd.crosstab(df['지역'], df['카테고리'], margins=True)

# pivot_table - 엑셀 피벗테이블
pd.pivot_table(df, values='매출', index='지역',
               columns='카테고리', aggfunc='mean')

# cut / qcut - 구간 나누기
df['매출구간'] = pd.cut(df['매출'], bins=5)         # 균등 구간
df['매출분위'] = pd.qcut(df['매출'], q=4, labels=['Q1','Q2','Q3','Q4'])  # 분위수`}</code></pre>
            </div>

            <h2>4. 메모리 최적화</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 데이터 타입 최적화
print(df.memory_usage(deep=True))

# 범주형으로 변환 (문자열 → category)
for col in df.select_dtypes(include='object'):
    if df[col].nunique() / len(df) < 0.5:
        df[col] = df[col].astype('category')

# 정수 타입 다운캐스트
df['수량'] = pd.to_numeric(df['수량'], downcast='integer')

print(f"최적화 후: {df.memory_usage(deep=True).sum() / 1024:.0f} KB")`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>Pandas 성능 팁</h3>
              <p>가능하면 apply 대신 벡터 연산을 사용하세요. 대용량 데이터는 category 타입으로 변환하면 메모리를 절약합니다. query()와 eval()은 복잡한 조건에서 더 읽기 쉽습니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/tips/python" className="lesson-nav-btn prev">&larr; 이전: Python 팁</Link>
              <Link to="/tips/visualization" className="lesson-nav-btn next">다음: 시각화 팁 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
