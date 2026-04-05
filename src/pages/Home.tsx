import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const curriculum = [
  { step: 'STEP 01', icon: 'fa-solid fa-database', title: 'AI 데이터 분석이란?', desc: 'AI를 활용한 데이터 분석의 개념과 활용 분야를 알아봅니다.', topics: 'AI 분석 개요 / CRISP-DM / 활용 사례', path: '/intro/what-is-data-analysis' },
  { step: 'STEP 02', icon: 'fa-brands fa-python', title: 'Python 기초', desc: '데이터 분석을 위한 Python 프로그래밍 기초를 학습합니다.', topics: '변수 / 자료형 / 함수 / 반복문 / NumPy', path: '/intro/python-basics' },
  { step: 'STEP 03', icon: 'fa-solid fa-table', title: 'Pandas 기초', desc: '데이터 처리의 핵심 라이브러리 Pandas 사용법을 배웁니다.', topics: 'DataFrame / 인덱싱 / groupby / merge', path: '/intro/pandas-intro' },
  { step: 'STEP 04', icon: 'fa-solid fa-robot', title: 'ChatGPT 활용', desc: 'ChatGPT를 데이터 분석 보조 도구로 활용하는 방법을 배웁니다.', topics: '프롬프트 작성 / 코드 생성 / 시각화', path: '/intro/chatgpt' },
  { step: 'STEP 05', icon: 'fa-solid fa-layer-group', title: '데이터 유형 이해', desc: '정형/비정형 데이터, 수치/범주형 데이터의 특성을 이해합니다.', topics: '수치형 / 범주형 / 날짜 / 스케일링', path: '/intro/data-types' },
  { step: 'STEP 06', icon: 'fa-solid fa-chart-pie', title: '그래프의 종류', desc: '데이터 분석에서 사용하는 주요 그래프 유형과 활용법을 학습합니다.', topics: '막대 / 선 / 파이 / 히스토그램 / 산점도 / 박스플롯', path: '/intro/chart-types' },
  { step: 'STEP 07', icon: 'fa-solid fa-square-root-variable', title: '통계 기초 이해', desc: '데이터 분석에 필요한 기본 통계 개념을 직관적으로 학습합니다.', topics: '평균 / 표준편차 / 사분위수 / 정규분포 / 상관계수', path: '/intro/basic-stats' },
  { step: 'STEP 08', icon: 'fa-solid fa-broom', title: '데이터 전처리', desc: '결측치 처리, 이상치 탐지, 데이터 변환 기법을 학습합니다.', topics: '결측치 / 이상치 / 인코딩 / 피처 엔지니어링', path: '/learn/preprocessing' },
  { step: 'STEP 09', icon: 'fa-solid fa-magnifying-glass-chart', title: '탐색적 데이터 분석', desc: 'EDA를 통해 데이터의 패턴과 인사이트를 발견합니다.', topics: '분포 / 상관관계 / 피벗 / 대시보드', path: '/learn/eda' },
  { step: 'STEP 10', icon: 'fa-solid fa-calculator', title: '통계 분석', desc: '데이터 분석에 필요한 통계 개념과 검정을 학습합니다.', topics: '기술통계 / 확률분포 / 가설검정 / 상관분석', path: '/learn/statistics' },
  { step: 'STEP 11', icon: 'fa-solid fa-chart-line', title: '시각화 기법', desc: 'Matplotlib, Seaborn을 활용한 데이터 시각화를 학습합니다.', topics: 'Matplotlib / Seaborn / 대시보드', path: '/learn/visualization' },
  { step: 'STEP 12', icon: 'fa-solid fa-tags', title: '분류 분석', desc: '분류 알고리즘으로 범주를 예측하는 머신러닝을 학습합니다.', topics: '로지스틱회귀 / 의사결정나무 / 랜덤포레스트', path: '/learn/classification' },
  { step: 'STEP 13', icon: 'fa-solid fa-arrow-trend-up', title: '회귀 분석', desc: '회귀 알고리즘으로 연속값을 예측하는 머신러닝을 학습합니다.', topics: '선형회귀 / 의사결정나무 / RMSE / R2', path: '/learn/regression' },
  { step: 'STEP 14', icon: 'fa-solid fa-cart-shopping', title: '매출 데이터 분석', desc: '실제 매출 데이터를 활용한 분석 프로젝트를 수행합니다.', topics: '매출 트렌드 / 카테고리 / 고객 / 대시보드', path: '/practice/sales' },
  { step: 'STEP 15', icon: 'fa-solid fa-file-lines', title: '보고서 자동 생성', desc: 'AI를 활용하여 분석 보고서를 자동으로 생성합니다.', topics: 'KPI / 차트 / HTML 보고서 / 자동화', path: '/practice/report' }
]

const features = [
  { icon: 'fa-solid fa-flask', title: '실데이터 분석 실습', desc: '실제 데이터셋을 활용한 프로젝트 기반 학습으로 실무 역량을 키웁니다.' },
  { icon: 'fa-solid fa-chart-pie', title: 'AI 기반 시각화', desc: 'AI 도구와 Python 라이브러리를 결합하여 효과적인 데이터 시각화를 학습합니다.' },
  { icon: 'fa-solid fa-file-export', title: '보고서 자동화', desc: 'ChatGPT와 Python을 활용하여 분석 보고서를 자동으로 생성하는 기술을 배웁니다.' }
]

const targets = [
  { icon: 'fa-solid fa-chart-bar', title: '데이터 분석가 지망생', desc: '데이터 분석 분야로 진입하고 싶은 분들을 위한 체계적인 학습 과정입니다.' },
  { icon: 'fa-solid fa-briefcase', title: '기획자 / 마케터', desc: '데이터 기반 의사결정 능력을 키우고 싶은 기획자와 마케터에게 적합합니다.' },
  { icon: 'fa-solid fa-graduation-cap', title: '학생 / 연구자', desc: '논문이나 프로젝트에 데이터 분석을 활용하고 싶은 학생과 연구자를 위합니다.' }
]

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: `${15 + Math.random() * 15}s`,
  delay: `${Math.random() * 10}s`
}))

export default function Home() {
  return (
    <>
      <SEOHead />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-effect">
          <div className="particles">
            {particles.map(p => (
              <div
                key={p.id}
                className="particle"
                style={{ left: p.left, top: p.top, '--duration': p.duration, animationDelay: p.delay } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="container hero-content">
          <h2 className="hero-title">
            <span className="title-line">AI를 활용한</span>
            <span className="title-line"><span className="highlight">데이터 분석</span> 마스터</span>
          </h2>
          <p className="hero-description">
            Python과 AI 도구를 활용하여 데이터를 분석하고,
            인사이트를 도출하며, 보고서를 자동 생성하는 기술을 배웁니다.
          </p>
          <div className="hero-buttons">
            <Link to="/intro/what-is-data-analysis" className="btn btn-primary">학습 시작하기</Link>
            <Link to="/playground" className="btn btn-secondary">실습장 체험</Link>
          </div>
          <div className="hero-tags">
            <span className="hero-tag">Python</span>
            <span className="hero-tag">Pandas</span>
            <span className="hero-tag">ChatGPT</span>
            <span className="hero-tag">시각화</span>
            <span className="hero-tag">중급</span>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"><div className="wheel" /></div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section" style={{ background: 'var(--bg-light-gray)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">커리큘럼</h2>
            <p className="section-subtitle">AI 데이터 분석의 기초부터 실전까지, 15단계로 체계적으로 학습합니다</p>
          </div>
          <div className="curriculum-grid">
            {curriculum.map((item, i) => (
              <Link to={item.path} key={i} className="curriculum-card">
                <span className="curriculum-step">{item.step}</span>
                <div className="curriculum-icon"><i className={item.icon} /></div>
                <h3 className="curriculum-card-title">{item.title}</h3>
                <p className="curriculum-card-desc">{item.desc}</p>
                <span className="curriculum-topics">{item.topics}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">특징</h2>
            <p className="section-subtitle">실무 중심의 데이터 분석 학습을 위한 핵심 기능</p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon"><i className={f.icon} /></div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="section" style={{ background: 'var(--bg-light-gray)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">대상</h2>
            <p className="section-subtitle">이런 분들에게 추천합니다</p>
          </div>
          <div className="target-grid">
            {targets.map((t, i) => (
              <div key={i} className="target-card">
                <div className="target-icon"><i className={t.icon} /></div>
                <h3 className="target-title">{t.title}</h3>
                <p className="target-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
