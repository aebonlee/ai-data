import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SEOHead from '../components/SEOHead'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const { error: err } = await resetPassword(email)
      if (err) throw err
      setSent(true)
    } catch (err) {
      setError(err.message || '비밀번호 재설정 이메일 전송에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <SEOHead title="비밀번호 찾기" />
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="brand-ai">AI</span> <span className="brand-prompt">Data</span>
          </div>
          <h2 className="auth-title">비밀번호 찾기</h2>
          <p className="auth-subtitle">가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#22c55e" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ fontWeight: 600, marginBottom: '8px' }}>재설정 이메일이 발송되었습니다!</p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              이메일을 확인하여 비밀번호를 재설정해주세요.
            </p>
            <Link to="/login" className="auth-submit" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', width: '100%' }}>
              로그인으로 돌아가기
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">이메일</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="가입한 이메일 주소" required autoFocus />
            </div>
            <div className="auth-form-actions">
              <Link to="/login" className="auth-back-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>뒤로</Link>
              <button type="submit" className="auth-submit" disabled={loading} style={{ flex: 1 }}>
                {loading ? '보내는 중...' : '재설정 링크 보내기'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
