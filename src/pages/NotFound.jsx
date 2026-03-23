import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <SEOHead title="404" />
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">페이지를 찾을 수 없습니다</h1>
        <p className="not-found-desc">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn primary">홈으로</Link>
          <Link to="/intro/what-is-data-analysis" className="not-found-btn secondary">학습 시작</Link>
        </div>
      </div>
    </div>
  )
}
