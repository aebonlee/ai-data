import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { createPost } from '../../services/communityService'
import SEOHead from '../../components/SEOHead'

const categories = ['자유', '질문', '팁 공유', '데이터 공유']

export default function CommunityWrite() {
  const { user  }: any = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('자유')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!user) { navigate('/login', { replace: true }); return null }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) { setError('제목과 내용을 모두 입력해주세요.'); return }
    setLoading(true); setError('')
    const authorName = user.user_metadata?.display_name || user.email?.split('@')[0] || '익명'
    const { data, error: err } = await createPost({ title: title.trim(), content: content.trim(), category, authorId: user.id, authorName })
    if (err) { setError(err.message); setLoading(false) } else { navigate(`/community/${data.id}`) }
  }

  return (
    <>
      <SEOHead title="글쓰기 - 커뮤니티" />
      <section className="page-header"><div className="container"><h1>글쓰기</h1><p>커뮤니티에 새 글을 작성합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">
            <form className="community-form" onSubmit={handleSubmit}>
              {error && <div className="community-error">{error}</div>}
              <div className="community-form-group">
                <label htmlFor="category">카테고리</label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="community-form-group">
                <label htmlFor="title">제목</label>
                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="제목을 입력하세요" maxLength={200} />
              </div>
              <div className="community-form-group">
                <label htmlFor="content">내용</label>
                <textarea id="content" value={content} onChange={e => setContent(e.target.value)} placeholder="내용을 입력하세요" />
              </div>
              <div className="community-form-actions">
                <Link to="/community" className="community-cancel-btn">취소</Link>
                <button type="submit" className="community-submit-btn" disabled={loading}>{loading ? '등록 중...' : '등록'}</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
