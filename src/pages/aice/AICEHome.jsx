import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

const classificationRounds = [
  { round: 1, file: '/aice/classification-1.pdf', label: '분류 1회차' },
  { round: 2, file: '/aice/classification-2.pdf', label: '분류 2회차' },
  { round: 3, file: '/aice/classification-3.pdf', label: '분류 3회차' },
]

const regressionRounds = [
  { round: 1, file: '/aice/regression-1.pdf', label: '회귀 1회차' },
  { round: 2, file: '/aice/regression-2.pdf', label: '회귀 2회차' },
  { round: 3, file: '/aice/regression-3.pdf', label: '회귀 3회차' },
]

export default function AICEHome() {
  return (
    <>
      <SEOHead title="AICE Associate" description="AICE Associate 자격증 실습 - 분류와 회귀 문제를 풀어봅니다." />
      <section className="page-header">
        <div className="container">
          <h1>AICE Associate</h1>
          <p>AI 자격증(AICE Associate) 실전 연습 - 분류 & 회귀</p>
        </div>
      </section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>AICE Associate란?</h3>
              <p><strong>AICE(AI Certificate for Everyone)</strong>는 KT에서 주관하는 AI 역량 인증 시험입니다.
              Associate 등급은 Python과 scikit-learn을 활용한 <strong>분류(Classification)</strong>와 <strong>회귀(Regression)</strong> 문제 해결 능력을 평가합니다.</p>
              <p>아래 기출 문제 PDF를 보면서 CodeEditor로 직접 풀어보세요!</p>
            </div>

            <h2>분류(Classification) 실습</h2>
            <p>주어진 데이터를 바탕으로 범주(클래스)를 예측하는 문제입니다. Logistic Regression, Decision Tree, Random Forest 등의 알고리즘을 사용합니다.</p>
            <div className="curriculum-grid">
              {classificationRounds.map(r => (
                <div key={r.round} className="curriculum-card">
                  <span className="curriculum-step" style={{ background: '#6366f1', color: '#fff' }}>분류</span>
                  <h3 className="curriculum-card-title">{r.label}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    <a href={r.file} target="_blank" rel="noopener noreferrer"
                       className="lesson-nav-btn next" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                      PDF 보기
                    </a>
                    <a href={r.file} download
                       className="lesson-nav-btn prev" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                      다운로드
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link to="/aice/classification" className="lesson-nav-btn next" style={{ fontSize: '1rem', padding: '0.6rem 1.5rem' }}>
                분류 실습 시작 &rarr;
              </Link>
            </div>

            <h2 style={{ marginTop: '2.5rem' }}>회귀(Regression) 실습</h2>
            <p>주어진 데이터를 바탕으로 연속적인 수치를 예측하는 문제입니다. Linear Regression, Decision Tree, Random Forest 등의 알고리즘을 사용합니다.</p>
            <div className="curriculum-grid">
              {regressionRounds.map(r => (
                <div key={r.round} className="curriculum-card">
                  <span className="curriculum-step" style={{ background: '#10b981', color: '#fff' }}>회귀</span>
                  <h3 className="curriculum-card-title">{r.label}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    <a href={r.file} target="_blank" rel="noopener noreferrer"
                       className="lesson-nav-btn next" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                      PDF 보기
                    </a>
                    <a href={r.file} download
                       className="lesson-nav-btn prev" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                      다운로드
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link to="/aice/regression" className="lesson-nav-btn next" style={{ fontSize: '1rem', padding: '0.6rem 1.5rem' }}>
                회귀 실습 시작 &rarr;
              </Link>
            </div>

            <div className="callout-box" style={{ marginTop: '2.5rem' }}>
              <h3>시험 팁</h3>
              <ul>
                <li><strong>데이터 탐색</strong>: shape, info(), describe(), isnull().sum()으로 데이터를 먼저 파악하세요.</li>
                <li><strong>전처리</strong>: 결측치 처리(fillna, dropna), 범주형 인코딩(LabelEncoder, get_dummies)을 꼭 수행하세요.</li>
                <li><strong>모델 선택</strong>: Random Forest가 안정적인 성능을 보여줍니다.</li>
                <li><strong>평가</strong>: 분류는 accuracy/f1_score, 회귀는 RMSE/R2를 확인하세요.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
