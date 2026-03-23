import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const allPages = [
  { title: 'AI 데이터 분석이란?', path: '/intro/what-is-data-analysis', category: '입문' },
  { title: 'Python 기초', path: '/intro/python-basics', category: '입문' },
  { title: 'Pandas 입문', path: '/intro/pandas-intro', category: '입문' },
  { title: 'ChatGPT 활용', path: '/intro/chatgpt', category: '입문' },
  { title: '데이터 유형 이해', path: '/intro/data-types', category: '입문' },
  { title: '데이터 전처리', path: '/learn/preprocessing', category: '학습' },
  { title: '탐색적 데이터 분석', path: '/learn/eda', category: '학습' },
  { title: '통계 기초', path: '/learn/statistics', category: '학습' },
  { title: 'AI 시각화 기법', path: '/learn/visualization', category: '학습' },
  { title: '매출 데이터 분석', path: '/practice/sales', category: '실습' },
  { title: '고객 데이터 분석', path: '/practice/customer', category: '실습' },
  { title: '설문 데이터 분석', path: '/practice/survey', category: '실습' },
  { title: '시계열 분석', path: '/practice/timeseries', category: '실습' },
  { title: '보고서 자동 생성', path: '/practice/report', category: '실습' },
]

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ad-favorites') || '[]')
    setFavorites(saved)
  }, [])

  const toggleFavorite = (path) => {
    const updated = favorites.includes(path) ? favorites.filter(f => f !== path) : [...favorites, path]
    setFavorites(updated)
    localStorage.setItem('ad-favorites', JSON.stringify(updated))
  }

  const favoritePages = allPages.filter(p => favorites.includes(p.path))

  return (
    <>
      <SEOHead title="즐겨찾기" description="자주 사용하는 학습 페이지를 즐겨찾기에 추가하세요." />
      <section className="page-header"><div className="container"><h1>즐겨찾기</h1><p>자주 사용하는 학습 페이지를 관리하세요</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">
            {favoritePages.length > 0 && (
              <>
                <h2>내 즐겨찾기</h2>
                <div className="curriculum-grid">
                  {favoritePages.map((p, i) => (
                    <div key={i} className="curriculum-card" style={{ position: 'relative' }}>
                      <button onClick={() => toggleFavorite(p.path)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#f59e0b' }}>&#9733;</button>
                      <span className="curriculum-step">{p.category}</span>
                      <Link to={p.path}><h3 className="curriculum-card-title">{p.title}</h3></Link>
                    </div>
                  ))}
                </div>
              </>
            )}
            <h2 style={{ marginTop: '2rem' }}>전체 학습 목록</h2>
            <div className="curriculum-grid">
              {allPages.map((p, i) => (
                <div key={i} className="curriculum-card" style={{ position: 'relative' }}>
                  <button onClick={() => toggleFavorite(p.path)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: favorites.includes(p.path) ? '#f59e0b' : '#ccc' }}>
                    {favorites.includes(p.path) ? '\u2605' : '\u2606'}
                  </button>
                  <span className="curriculum-step">{p.category}</span>
                  <Link to={p.path}><h3 className="curriculum-card-title">{p.title}</h3></Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
