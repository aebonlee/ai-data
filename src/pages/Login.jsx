import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SEOHead from '../components/SEOHead'

export default function Login() {
  const [step, setStep] = useState('methods')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, signIn, signInWithGoogle, signInWithKakao } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const errDesc = params.get('error_description')
    if (errDesc) setError(errDesc)
  }, [])

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) setError(err.message)
  }

  const handleGoogle = async () => {
    setError('')
    const { error: err } = await signInWithGoogle()
    if (err) setError(err.message)
  }

  const handleKakao = async () => {
    setError('')
    const { error: err } = await signInWithKakao()
    if (err) setError(err.message)
  }

  return (
    <div className="auth-page">
      <SEOHead title="로그인" />
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="brand-ai">AI</span> <span className="brand-prompt">Data</span>
          </div>
          <h2 className="auth-title">로그인</h2>
          <p className="auth-subtitle">AI 데이터 분석 학습을 시작하세요</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {step === 'methods' ? (
          <div className="auth-methods">
            <button className="auth-method-btn google" onClick={handleGoogle}>
              <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google로 로그인
            </button>
            <button className="auth-method-btn kakao" onClick={handleKakao}>
              <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#3C1E1E" d="M12 3C6.48 3 2 6.36 2 10.5c0 2.68 1.78 5.03 4.48 6.38-.15.54-.97 3.49-1.01 3.72 0 0-.02.17.09.23.11.07.24.01.24.01.32-.04 3.68-2.42 4.26-2.84.62.09 1.27.14 1.94.14 5.52 0 10-3.36 10-7.5S17.52 3 12 3z"/></svg>
              Kakao로 로그인
            </button>
            <button className="auth-method-btn email" onClick={() => setStep('email')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              이메일로 로그인
            </button>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleEmailLogin}>
            <div className="auth-field">
              <label>이메일</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일 주소" required />
            </div>
            <div className="auth-field">
              <label>비밀번호</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" required />
            </div>
            <div className="auth-form-actions">
              <button type="button" className="auth-back-btn" onClick={() => setStep('methods')}>뒤로</button>
              <button type="submit" className="auth-submit" style={{ flex: 1 }} disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </div>
          </form>
        )}

        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <Link to="/forgot-password" style={{ fontSize: '13px', color: 'var(--text-light)' }}>
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <div className="auth-link">
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  )
}
