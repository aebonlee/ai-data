import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function DataTypes() {
  return (
    <>
      <SEOHead title="데이터 유형 이해" description="정형/비정형 데이터, 수치/범주형 데이터의 특성을 이해합니다." />
      <section className="page-header"><div className="container"><h1>데이터 유형 이해</h1><p>다양한 데이터 유형의 특성을 이해하고 적절한 처리 방법을 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>데이터의 분류</h2>
            <p>데이터 분석의 첫 단계는 데이터의 유형을 정확히 파악하는 것입니다. 데이터 유형에 따라 전처리 방법, 분석 기법, 시각화 방법이 달라집니다.</p>

            <h2>정형 데이터 vs 비정형 데이터</h2>
            <h3>정형 데이터 (Structured Data)</h3>
            <p>행과 열로 구성된 테이블 형태의 데이터입니다. CSV, Excel, 데이터베이스 테이블이 대표적이며, Pandas로 직접 처리할 수 있습니다.</p>

            <h3>비정형 데이터 (Unstructured Data)</h3>
            <p>텍스트, 이미지, 오디오, 비디오 등 일정한 형태가 없는 데이터입니다. NLP, 컴퓨터 비전 등 AI 기술로 처리합니다.</p>

            <h2>수치형 데이터</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd
import numpy as np

df = pd.DataFrame({
    '나이': [25, 30, 35, 28, 42],        # 연속형 (Continuous)
    '자녀수': [0, 1, 2, 1, 3],            # 이산형 (Discrete)
    '연봉': [3500, 4200, 5100, 3800, 6000] # 연속형
})

# 기술통계
print(df.describe())

# 연속형: 평균, 중앙값, 표준편차 활용
print(f"평균 나이: {df['나이'].mean():.1f}")
print(f"연봉 중앙값: {df['연봉'].median():,.0f}")

# 이산형: 빈도수, 최빈값 활용
print(f"자녀수 분포:\\n{df['자녀수'].value_counts()}")`}</code></pre>
            </div>

            <h2>범주형 데이터</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`df = pd.DataFrame({
    '성별': ['남', '여', '남', '여', '남'],        # 명목형
    '학력': ['고졸', '대졸', '석사', '대졸', '박사'], # 순서형
    '등급': ['B', 'A', 'A', 'C', 'A']              # 순서형
})

# 명목형: 빈도수, 비율 분석
print(df['성별'].value_counts())
print(df['성별'].value_counts(normalize=True))

# 순서형: 순서 지정 후 정렬
grade_order = pd.CategoricalDtype(
    categories=['C', 'B', 'A'], ordered=True
)
df['등급'] = df['등급'].astype(grade_order)
print(df.sort_values('등급'))`}</code></pre>
            </div>

            <h2>스케일링</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`from sklearn.preprocessing import MinMaxScaler, StandardScaler

data = pd.DataFrame({
    '나이': [25, 30, 35, 28, 42],
    '연봉': [3500, 4200, 5100, 3800, 6000]
})

# Min-Max 정규화 (0~1 범위)
scaler = MinMaxScaler()
normalized = pd.DataFrame(
    scaler.fit_transform(data),
    columns=data.columns
)
print("Min-Max 정규화:\\n", normalized)

# 표준화 (평균 0, 표준편차 1)
scaler = StandardScaler()
standardized = pd.DataFrame(
    scaler.fit_transform(data),
    columns=data.columns
)
print("표준화:\\n", standardized)`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>데이터 유형 판단 가이드</h3>
              <p>수치형 데이터는 산술 연산이 가능한지, 범주형은 카테고리 구분이 목적인지를 기준으로 판단합니다. 예를 들어 우편번호는 숫자이지만 범주형 데이터입니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/intro/chatgpt" className="lesson-nav-btn prev">&larr; 이전: ChatGPT 활용</Link>
              <Link to="/learn/preprocessing" className="lesson-nav-btn next">다음: 데이터 전처리 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
