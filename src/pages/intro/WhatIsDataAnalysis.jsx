import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function WhatIsDataAnalysis() {
  return (
    <>
      <SEOHead title="AI 데이터 분석이란?" description="AI를 활용한 데이터 분석의 개념, 활용 분야, 분석 프로세스를 알아봅니다." />
      <section className="page-header"><div className="container"><h1>AI 데이터 분석이란?</h1><p>AI를 활용한 데이터 분석의 개념과 활용 분야를 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>데이터 분석의 정의</h2>
            <p>데이터 분석(Data Analysis)이란 원시 데이터를 수집, 정리, 변환하여 유의미한 정보와 인사이트를 도출하는 과정입니다. AI 기술의 발전으로 분석의 범위와 정확도가 비약적으로 향상되고 있습니다.</p>

            <h2>AI의 역할</h2>
            <p>AI는 데이터 분석의 모든 단계에서 핵심적인 역할을 수행합니다. 데이터 수집 자동화, 결측치 처리, 패턴 인식, 최적 시각화 추천 등 분석 전 과정을 지원합니다.</p>

            <div className="callout-box">
              <h3>AI 데이터 분석의 핵심 장점</h3>
              <p>대규모 데이터 처리 속도가 빠르고, 숨겨진 패턴을 찾아내며, 반복 작업을 자동화하여 분석가가 인사이트 도출에 집중할 수 있게 합니다.</p>
            </div>

            <h2>활용 분야</h2>
            <h3>마케팅</h3>
            <p>고객 세그먼테이션, A/B 테스트 분석, 캠페인 효과 측정, 고객 생애 가치(CLV) 예측 등에 활용됩니다.</p>
            <h3>금융</h3>
            <p>신용 리스크 평가, 사기 탐지, 포트폴리오 최적화, 주가 예측 등에 사용됩니다.</p>
            <h3>의료/헬스케어</h3>
            <p>환자 진단 보조, 의료 영상 분석, 신약 개발, 감염병 확산 예측 등에 활용됩니다.</p>

            <h2>데이터 분석 프로세스</h2>
            <ol>
              <li><strong>수집 (Collection)</strong> - 다양한 소스에서 원시 데이터를 수집합니다.</li>
              <li><strong>전처리 (Preprocessing)</strong> - 결측치 처리, 이상치 제거, 데이터 변환을 수행합니다.</li>
              <li><strong>분석 (Analysis)</strong> - 통계 분석, 머신러닝 모델링으로 패턴을 파악합니다.</li>
              <li><strong>시각화 (Visualization)</strong> - 분석 결과를 차트와 그래프로 표현합니다.</li>
              <li><strong>인사이트 도출 (Insight)</strong> - 의사결정에 활용할 수 있는 인사이트를 도출합니다.</li>
            </ol>

            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# AI 데이터 분석 기본 워크플로우
import pandas as pd
import matplotlib.pyplot as plt

# 1. 데이터 수집
df = pd.read_csv('sales_data.csv')

# 2. 전처리
df = df.dropna()
df['date'] = pd.to_datetime(df['date'])

# 3. 분석
monthly = df.groupby(df['date'].dt.month)['revenue'].sum()

# 4. 시각화
monthly.plot(kind='bar', color='steelblue')
plt.title('월별 매출 현황')
plt.show()

# 5. 인사이트
print(f"최고 매출 월: {monthly.idxmax()}월")`}</code></pre>
            </div>

            <div className="lesson-nav">
              <Link to="/" className="lesson-nav-btn prev">&larr; 홈</Link>
              <Link to="/intro/python-basics" className="lesson-nav-btn next">다음: Python 기초 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
