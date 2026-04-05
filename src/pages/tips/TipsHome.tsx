import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

const tips = [
  { icon: 'fa-solid fa-robot', title: 'ChatGPT 활용 팁', desc: '데이터 분석에서 ChatGPT를 200% 활용하는 프롬프트 기법', path: '/tips/chatgpt' },
  { icon: 'fa-brands fa-python', title: 'Python 팁', desc: '데이터 분석을 위한 Python 고급 테크닉과 생산성 팁', path: '/tips/python' },
  { icon: 'fa-solid fa-table', title: 'Pandas 팁', desc: 'Pandas 고급 기능과 성능 최적화 테크닉', path: '/tips/pandas' },
  { icon: 'fa-solid fa-chart-line', title: '시각화 팁', desc: '효과적이고 아름다운 데이터 시각화를 위한 팁', path: '/tips/visualization' },
  { icon: 'fa-solid fa-gears', title: '자동화 팁', desc: '반복 작업을 자동화하여 생산성을 높이는 방법', path: '/tips/automation' }
]

export default function TipsHome() {
  return (
    <>
      <SEOHead title="도구 팁" description="데이터 분석 도구별 실용적인 팁과 테크닉을 모았습니다." />
      <section className="page-header"><div className="container"><h1>도구 팁</h1><p>데이터 분석 도구별 실용적인 팁과 테크닉을 모았습니다</p></div></section>
      <section className="section">
        <div className="container">
          <div className="curriculum-grid">
            {tips.map((tip, i) => (
              <Link to={tip.path} key={i} className="curriculum-card">
                <div className="curriculum-icon"><i className={tip.icon} /></div>
                <h3 className="curriculum-card-title">{tip.title}</h3>
                <p className="curriculum-card-desc">{tip.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
