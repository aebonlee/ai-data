import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function Preprocessing() {
  return (
    <>
      <SEOHead title="데이터 전처리" description="결측치 처리, 이상치 탐지, 데이터 변환 기법을 학습합니다." />
      <section className="page-header"><div className="container"><h1>데이터 전처리</h1><p>결측치 처리, 이상치 탐지, 데이터 변환 기법을 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>전처리의 중요성</h2>
            <p>실무 데이터는 결측치, 이상치, 불일치 등 다양한 문제를 포함합니다. "Garbage In, Garbage Out" — 데이터 품질이 분석 결과의 품질을 결정합니다.</p>

            <h2>결측치 처리</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd
import numpy as np

df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수', None, '정수연'],
    '나이': [28, None, 25, 30, None],
    '매출': [1500, 2200, None, 1600, 1900]
})

# 결측치 확인
print(df.isnull().sum())
print(f"전체 결측 비율: {df.isnull().mean().mean():.1%}")

# 삭제 방식
df_dropped = df.dropna()           # 결측치가 있는 행 삭제
df_dropped_col = df.dropna(axis=1) # 결측치가 있는 열 삭제

# 대체 방식
df['나이'].fillna(df['나이'].median(), inplace=True)  # 중앙값
df['매출'].fillna(df['매출'].mean(), inplace=True)    # 평균값
df['이름'].fillna('미상', inplace=True)               # 고정값

print(df)`}</code></pre>
            </div>

            <h2>이상치 탐지</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import numpy as np

data = pd.Series([10, 12, 11, 13, 12, 100, 11, 14, 10, 13])

# IQR 방식
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

outliers = data[(data < lower) | (data > upper)]
print(f"이상치: {outliers.values}")

# Z-Score 방식
z_scores = (data - data.mean()) / data.std()
outliers_z = data[abs(z_scores) > 2]
print(f"Z-Score 이상치: {outliers_z.values}")

# 이상치 제거
clean_data = data[(data >= lower) & (data <= upper)]
print(f"정제 후: {clean_data.values}")`}</code></pre>
            </div>

            <h2>데이터 인코딩</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 레이블 인코딩 - 순서가 있는 범주형
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['등급_코드'] = le.fit_transform(df['등급'])

# 원-핫 인코딩 - 순서가 없는 범주형
df_encoded = pd.get_dummies(df, columns=['부서'])
print(df_encoded)`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>전처리 체크리스트</h3>
              <p>1) 결측치 비율 확인 → 2) 이상치 탐지 및 처리 → 3) 데이터 타입 변환 → 4) 범주형 인코딩 → 5) 수치형 스케일링. 이 순서를 따르면 체계적인 전처리가 가능합니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/intro/data-types" className="lesson-nav-btn prev">&larr; 이전: 데이터 유형 이해</Link>
              <Link to="/learn/eda" className="lesson-nav-btn next">다음: 탐색적 데이터 분석 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
