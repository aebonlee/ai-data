import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const initial = user?.user_metadata?.display_name?.charAt(0)?.toUpperCase()
    || user?.email?.charAt(0)?.toUpperCase()
    || '?'

  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : '-'

  return (
    <div className="profile-page">
      <SEOHead title="내 프로필" />
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{initial}</div>
            <div>
              <h2 className="profile-name">{user?.user_metadata?.display_name || '학습자'}</h2>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <span className="profile-field-label">이메일</span>
              <span className="profile-field-value">{user?.email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">이름</span>
              <span className="profile-field-value">{user?.user_metadata?.display_name || '-'}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">가입일</span>
              <span className="profile-field-value">{createdAt}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">인증 방법</span>
              <span className="profile-field-value">{user?.app_metadata?.provider || 'email'}</span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn btn-secondary" onClick={handleSignOut}>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  )
}
