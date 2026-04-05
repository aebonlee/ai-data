import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { createLecture } from '../../services/lectureService'
import SEOHead from '../../components/SEOHead'

export default function LectureWrite() {
  const { user  }: any = useAuth()
  const navigate = useNavigate()
  const [weekNumber, setWeekNumber] = useState(1)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!user) { navigate('/login', { replace: true }); return null }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('제목을 입력해주세요.'); return }
    setLoading(true); setError('')
    const authorName = user.user_metadata?.display_name || user.email?.split('@')[0] || '익명'
    const { error: err } = await createLecture({ weekNumber, title: title.trim(), content: content.trim(), fileUrl: fileUrl.trim(), isPublished, authorId: user.id, authorName })
    if (err) { setError(err.message); setLoading(false) } else { navigate('/lectures') }
  }

  return (
    <>
      <SEOHead title="강의안 등록" />
      <section className="page-header"><div className="container"><h1>강의안 등록</h1><p>새 강의안을 등록합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">
            <form className="lecture-write-form" onSubmit={handleSubmit}>
              {error && <div className="community-error">{error}</div>}
              <div className="lecture-form-row">
                <div className="lecture-form-group lecture-form-group-small">
                  <label>주차</label>
                  <input type="number" min="1" max="20" value={weekNumber} onChange={e => setWeekNumber(Number(e.target.value))} />
                </div>
                <div className="lecture-form-group lecture-form-group-grow">
                  <label>제목</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="강의안 제목" />
                </div>
              </div>
              <div className="lecture-form-group">
                <label>내용</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="강의안 내용을 입력하세요" />
              </div>
              <div className="lecture-form-group">
                <label>파일 URL</label>
                <div className="lecture-form-file-input">
                  <span className="lecture-form-file-prefix">https://</span>
                  <input type="text" value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="파일 다운로드 URL (선택)" />
                </div>
              </div>
              <label className="lecture-form-checkbox">
                <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} /> 공개
              </label>
              <div className="lecture-form-actions">
                <Link to="/lectures" className="community-cancel-btn">취소</Link>
                <button type="submit" className="community-submit-btn" disabled={loading}>{loading ? '등록 중...' : '등록'}</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
