import SEOHead from '../components/SEOHead'
import { badges } from '../data/badges'
import { useBadge } from '../contexts/BadgeContext'
import { useProgress } from '../contexts/ProgressContext'

const TIER_ORDER = ['platinum', 'gold', 'silver', 'bronze']
const TIER_LABELS = {
  platinum: { label: '플래티넘', icon: 'fa-solid fa-gem', color: '#7C3AED' },
  gold: { label: '골드', icon: 'fa-solid fa-crown', color: '#F59E0B' },
  silver: { label: '실버', icon: 'fa-solid fa-shield', color: '#6B7280' },
  bronze: { label: '브론즈', icon: 'fa-solid fa-medal', color: '#CD7F32' },
}

export default function BadgeCollection() {
  const { earnedBadges } = useBadge()
  const { codeRuns, streak, quizScores } = useProgress()

  const totalBadges = badges.length
  const earnedCount = earnedBadges.length

  const grouped = {}
  for (const tier of TIER_ORDER) {
    grouped[tier] = badges.filter(b => b.tier === tier)
  }

  return (
    <>
      <SEOHead title="배지 컬렉션" description="획득한 배지를 확인하세요." />

      <section className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-award" /> 배지 컬렉션</h1>
          <p>도장깨기와 활동으로 배지를 모아보세요!</p>
          <div className="badge-overview-stats">
            <div className="badge-stat">
              <span className="badge-stat-num">{earnedCount}</span>
              <span className="badge-stat-label">획득 배지</span>
            </div>
            <div className="badge-stat">
              <span className="badge-stat-num">{totalBadges}</span>
              <span className="badge-stat-label">전체 배지</span>
            </div>
            <div className="badge-stat">
              <span className="badge-stat-num">{codeRuns}</span>
              <span className="badge-stat-label">코드 실행</span>
            </div>
            <div className="badge-stat">
              <span className="badge-stat-num">{streak.count}</span>
              <span className="badge-stat-label">연속 학습</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section badge-collection-section">
        <div className="container">
          {TIER_ORDER.map(tier => {
            const tierBadges = grouped[tier]
            if (!tierBadges || tierBadges.length === 0) return null
            const tierInfo = TIER_LABELS[tier]

            return (
              <div key={tier} className="badge-group">
                <h2 className="badge-group-title">
                  <i className={`badge-group-icon ${tierInfo.icon}`} style={{ color: tierInfo.color }} />
                  {tierInfo.label} ({tierBadges.filter(b => earnedBadges.includes(b.id)).length}/{tierBadges.length})
                </h2>
                <div className="badge-grid">
                  {tierBadges.map(badge => {
                    const isEarned = earnedBadges.includes(badge.id)
                    return (
                      <div key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                        <div className="badge-icon-wrapper">
                          <i className={`badge-icon ${badge.icon}`} style={{ color: isEarned ? tierInfo.color : '#9CA3AF' }} />
                          {isEarned && (
                            <div className="badge-check">
                              <i className="fa-solid fa-check" style={{ color: 'white', fontSize: '10px' }} />
                            </div>
                          )}
                        </div>
                        <div className="badge-info">
                          <div className="badge-title">{badge.title}</div>
                          <div className="badge-description">{badge.description}</div>
                          <span className={`badge-tier tier-${tier}`}>{tierInfo.label}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
