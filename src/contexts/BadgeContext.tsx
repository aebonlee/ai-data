import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { badges } from '../data/badges'
import { useProgress } from './ProgressContext'
import { quizzes } from '../data/quizzes'

const BadgeContext = createContext()

const STORAGE_KEY = 'ad-badges'
const ALL_QUIZ_IDS = Object.keys(quizzes)

export function BadgeProvider({ children }) {
  const [earnedBadges, setEarnedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [newBadge, setNewBadge] = useState(null)

  const { quizScores, codeRuns, streak, getQuizBestScore } = useProgress()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(earnedBadges))
  }, [earnedBadges])

  // Evaluate badge conditions
  useEffect(() => {
    const newlyEarned = []
    const completedQuizCount = Object.values(quizScores).filter(s => s?.attempts?.length > 0).length

    for (const badge of badges) {
      if (earnedBadges.includes(badge.id)) continue

      const { condition } = badge
      let earned = false

      switch (condition.type) {
        case 'quiz_any_completed':
          earned = completedQuizCount >= condition.count
          break
        case 'quiz_passed': {
          const bs = getQuizBestScore(condition.quizId)
          earned = bs !== undefined && bs >= condition.minScore
          break
        }
        case 'quiz_perfect':
          earned = getQuizBestScore(condition.quizId) === 100
          break
        case 'all_quizzes_passed':
          earned = ALL_QUIZ_IDS.length > 0 &&
            ALL_QUIZ_IDS.every(id => { const bs = getQuizBestScore(id); return bs !== undefined && bs >= 70 })
          break
        case 'all_quizzes_perfect':
          earned = ALL_QUIZ_IDS.length > 0 &&
            ALL_QUIZ_IDS.every(id => getQuizBestScore(id) === 100)
          break
        case 'code_runs':
          earned = codeRuns >= condition.count
          break
        case 'streak':
          earned = streak.count >= condition.days
          break
        case 'all_badges_earned': {
          const otherBadges = badges.filter(b => b.id !== badge.id)
          earned = otherBadges.every(b => earnedBadges.includes(b.id) || newlyEarned.includes(b.id))
          break
        }
        default:
          break
      }

      if (earned) newlyEarned.push(badge.id)
    }

    if (newlyEarned.length > 0) {
      setEarnedBadges(prev => [...prev, ...newlyEarned])
      const badgeData = badges.find(b => b.id === newlyEarned[0])
      if (badgeData) setNewBadge(badgeData)
    }
  }, [quizScores, codeRuns, streak, earnedBadges, getQuizBestScore])

  const dismissBadgeNotification = useCallback(() => {
    setNewBadge(null)
  }, [])

  return (
    <BadgeContext.Provider value={{ earnedBadges, newBadge, dismissBadgeNotification }}>
      {children}
      {newBadge && (
        <div className="badge-notification" onClick={dismissBadgeNotification}>
          <div className="badge-notification-content">
            <div className="badge-notification-icon"><i className={newBadge.icon} /></div>
            <div className="badge-notification-text">
              <span className="badge-notification-label">새 배지 획득!</span>
              <span className="badge-notification-title">{newBadge.title}</span>
              <span className="badge-notification-desc">{newBadge.description}</span>
            </div>
          </div>
        </div>
      )}
    </BadgeContext.Provider>
  )
}

export function useBadge() {
  const context = useContext(BadgeContext)
  if (!context) throw new Error('useBadge must be used within BadgeProvider')
  return context
}
