import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SEOHead from '../components/SEOHead'

export default function Register() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)
    const { error: err } = await signUp(email, password, displayName)
    setLoading(false)

    if (err) {
      setError(err.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="auth-page">
      <SEOHead title="회원가입" />
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="brand-ai">AI</span> <span className="brand-prompt">Data</span>
          </div>
          <h2 className="auth-title">회원가입</h2>
          <p className="auth-subtitle">AI 데이터 분석 학습을 시작하세요</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success ? (
          <div className="auth-success">
            회원가입이 완료되었습니다! 이메일을 확인해주세요.<br />
            <Link to="/login" style={{ color: '#16a34a', fontWeight: 600 }}>로그인 페이지로 이동</Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>이름</label>
              <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="표시 이름" required />
            </div>
            <div className="auth-field">
              <label>이메일</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일 주소" required />
            </div>
            <div className="auth-field">
              <label>비밀번호</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="6자 이상" required />
            </div>
            <div className="auth-field">
              <label>비밀번호 확인</label>
              <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="비밀번호 재입력" required />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>
        )}

        <div className="auth-link">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  )
}
