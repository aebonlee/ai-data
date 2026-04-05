import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getPost, deletePost, getComments, createComment, deleteComment } from '../../services/communityService'
import SEOHead from '../../components/SEOHead'

export default function CommunityView() {
  const { id  }: any = useParams()
  const { user  }: any = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [commentLoading, setCommentLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { loadPost(); loadComments() }, [id])

  async function loadPost() {
    setLoading(true)
    const { data, error: err } = await getPost(id)
    if (err) setError(err.message); else setPost(data)
    setLoading(false)
  }

  async function loadComments() {
    const { data } = await getComments(id)
    setComments(data || [])
  }

  async function handleDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    const { error: err } = await deletePost(id)
    if (err) setError(err.message); else navigate('/community')
  }

  async function handleCommentSubmit(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    setCommentLoading(true)
    const authorName = user.user_metadata?.display_name || user.email?.split('@')[0] || '익명'
    const { error: err } = await createComment({ postId: id, content: commentText.trim(), authorId: user.id, authorName })
    if (err) setError(err.message); else { setCommentText(''); loadComments() }
    setCommentLoading(false)
  }

  async function handleCommentDelete(commentId) {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return
    const { error: err } = await deleteComment(commentId)
    if (err) setError(err.message); else loadComments()
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  if (loading) return (<><section className="page-header"><div className="container"><h1>커뮤니티</h1></div></section><section className="section lesson-content"><div className="container"><div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><div className="loading-spinner" /></div></div></section></>)

  if (!post) return (<><section className="page-header"><div className="container"><h1>커뮤니티</h1></div></section><section className="section lesson-content"><div className="container"><div className="community-empty"><p>게시글을 찾을 수 없습니다.</p><Link to="/community" className="community-back-btn">목록으로 돌아가기</Link></div></div></section></>)

  return (
    <>
      <SEOHead title={`${post.title} - 커뮤니티`} description={post.content.substring(0, 100)} />
      <section className="page-header"><div className="container"><h1>커뮤니티</h1><p>게시글 상세보기</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">
            <Link to="/community" className="community-back-btn">&larr; 목록으로</Link>
            {error && <div className="community-error">{error}</div>}
            <div className="community-detail">
              <div className="community-detail-header">
                <span className="community-detail-category">{post.category || '자유'}</span>
                <h2 className="community-detail-title">{post.title}</h2>
                <div className="community-detail-meta">
                  <span>{post.author_name}</span><span>{formatDate(post.created_at)}</span>
                  {user && user.id === post.author_id && <div className="community-detail-actions"><button onClick={handleDelete}>삭제</button></div>}
                </div>
              </div>
              <div className="community-detail-content">{post.content}</div>
              <div className="community-comments">
                <h3>댓글 {comments.length}개</h3>
                {comments.map(comment => (
                  <div className="community-comment" key={comment.id}>
                    <div className="community-comment-header">
                      <span className="community-comment-author">{comment.author_name}</span>
                      <span className="community-comment-date">{formatDate(comment.created_at)}</span>
                      {user && user.id === comment.author_id && <button className="community-comment-delete" onClick={() => handleCommentDelete(comment.id)}>삭제</button>}
                    </div>
                    <div className="community-comment-body">{comment.content}</div>
                  </div>
                ))}
                {user ? (
                  <form className="community-comment-form" onSubmit={handleCommentSubmit}>
                    <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="댓글을 입력하세요" />
                    <button type="submit" disabled={commentLoading || !commentText.trim()}>{commentLoading ? '등록 중...' : '댓글 등록'}</button>
                  </form>
                ) : <div className="community-login-prompt"><Link to="/login">로그인</Link>하면 댓글을 작성할 수 있습니다.</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
