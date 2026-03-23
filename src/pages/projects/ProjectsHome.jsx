import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

const projects = [
  {
    id: 1,
    title: '카페 매출 분석',
    path: '/projects/cafe-sales',
    level: '초급',
    levelColor: '#10B981',
    icon: '☕',
    description: 'Pandas groupby와 시계열 분석으로 카페 매출 데이터를 분석하고 바/라인 차트로 시각화합니다.',
    skills: ['Pandas groupby', '시계열', '바/라인 차트']
  },
  {
    id: 2,
    title: '학생 성적 분석',
    path: '/projects/student-scores',
    level: '초급',
    levelColor: '#10B981',
    icon: '📊',
    description: '기술통계와 히스토그램으로 학생 성적 데이터를 분석하고 과목 간 상관관계를 파악합니다.',
    skills: ['기술통계', '히스토그램', '상관분석']
  },
  {
    id: 3,
    title: '설문조사 대시보드',
    path: '/projects/survey-dashboard',
    level: '중급',
    levelColor: '#F59E0B',
    icon: '📋',
    description: '크로스탭으로 범주형 설문 데이터를 분석하고 파이 차트로 대시보드를 구성합니다.',
    skills: ['크로스탭', '범주형 데이터', '파이 차트']
  },
  {
    id: 4,
    title: '날씨 패턴 분석',
    path: '/projects/weather-pattern',
    level: '중급',
    levelColor: '#F59E0B',
    icon: '🌤',
    description: '시계열 기상 데이터에 이동평균을 적용하고 이상치를 탐지하여 패턴을 분석합니다.',
    skills: ['시계열', '이동평균', '이상치 탐지']
  },
  {
    id: 5,
    title: '상품 리뷰 분석',
    path: '/projects/product-review',
    level: '중급',
    levelColor: '#F59E0B',
    icon: '⭐',
    description: '상품 리뷰 텍스트를 기초 분석하고 평점과 리뷰의 관계를 다중 시각화합니다.',
    skills: ['텍스트 기초분석', '다중 시각화']
  },
  {
    id: 6,
    title: '인사 데이터 분석',
    path: '/projects/hr-analytics',
    level: '고급',
    levelColor: '#EF4444',
    icon: '👥',
    description: '다변량 인사 데이터를 박스플롯과 히트맵으로 분석하여 조직 인사이트를 도출합니다.',
    skills: ['다변량 분석', '박스플롯', '히트맵']
  }
]

export default function ProjectsHome() {
  return (
    <>
      <SEOHead title="프로젝트" description="6개의 미니 프로젝트를 통해 데이터 분석을 실습합니다." />
      <section className="page-header">
        <div className="container">
          <h1>미니 프로젝트</h1>
          <p>6개의 실전 프로젝트로 데이터 분석 역량을 키워보세요</p>
        </div>
      </section>
      <section className="section lesson-content">
        <div className="container">
          <div className="playground-body">
            <div className="callout-box">
              <h3>프로젝트 안내</h3>
              <p>각 프로젝트는 <strong>4단계</strong>로 구성되며, 브라우저에서 직접 Python 코드를 실행할 수 있습니다.
              단계별로 코드를 순서대로 실행하면 변수가 공유되어 연계 분석이 가능합니다.</p>
            </div>
            <div className="curriculum-grid" style={{ marginTop: '2rem' }}>
              {projects.map(p => (
                <Link to={p.path} key={p.id} className="curriculum-card" style={{ textDecoration: 'none', position: 'relative' }}>
                  <span className="curriculum-step" style={{ background: p.levelColor, color: '#fff' }}>{p.level}</span>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                  <h3 className="curriculum-card-title">{p.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.5rem 0' }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                    {p.skills.map((s, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>{s}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
