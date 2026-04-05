import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getPosts } from '../../services/communityService'
import SEOHead from '../../components/SEOHead'

const categories = ['전체', '자유', '질문', '팁 공유', '데이터 공유']
const PAGE_SIZE = 10

export default function CommunityList() {
  const { user  }: any = useAuth()
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState('전체')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { loadPosts() }, [page, category])

  async function loadPosts() {
    setLoading(true)
    setError('')
    const { data, error: err, count } = await getPosts(page, PAGE_SIZE, category)
    if (err) { setError(err.message) } else { setPosts(data || []); setTotalCount(count || 0) }
    setLoading(false)
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    if (diff < 60000) return '방금 전'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  return (
    <>
      <SEOHead title="커뮤니티" description="AI 데이터 분석 커뮤니티 - 질문, 팁 공유, 데이터 공유" />
      <section className="page-header">
        <div className="container"><h1>커뮤니티</h1><p>데이터 분석에 대해 질문하고 팁을 공유하세요</p></div>
      </section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body" style={{ maxWidth: '900px' }}>
            <div className="community-toolbar">
              <div className="community-category-filter">
                {categories.map(cat => (
                  <button key={cat} className={`community-category-btn${category === cat ? ' active' : ''}`} onClick={() => { setCategory(cat); setPage(1) }}>{cat}</button>
                ))}
              </div>
              {user && <Link to="/community/write" className="community-write-btn">+ 글쓰기</Link>}
            </div>
            {error && <div className="community-error">{error}</div>}
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><div className="loading-spinner" /></div>
            ) : posts.length === 0 ? (
              <div className="community-empty"><p>게시글이 없습니다.</p>{user && <Link to="/community/write" className="community-write-btn" style={{ marginTop: '1rem' }}>첫 글을 작성해보세요</Link>}</div>
            ) : (
              <div className="community-post-list">
                {posts.map(post => (
                  <Link to={`/community/${post.id}`} className="community-post-item" key={post.id}>
                    <span className="community-post-category">{post.category || '자유'}</span>
                    <div className="community-post-info">
                      <div className="community-post-title">{post.title}</div>
                      <div className="community-post-meta"><span>{post.author_name}</span><span>{formatDate(post.created_at)}</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="community-pagination">
                <button className="community-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>이전</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`community-page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="community-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>다음</button>
              </div>
            )}
            {!user && <div className="community-login-prompt" style={{ marginTop: '1.5rem' }}><Link to="/login">로그인</Link>하면 글을 작성할 수 있습니다.</div>}
          </div>
        </div>
      </section>
    </>
  )
}
