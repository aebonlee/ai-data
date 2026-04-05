import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../config/supabase'
import { useAuth } from './AuthContext'

const ProgressContext = createContext<any>(null)

const STORAGE_KEY = 'ad-progress'

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      return {
        quizScores: data.quizScores || {},
        codeRuns: data.codeRuns || 0,
        streak: data.streak || { count: 0, lastDate: null },
      }
    }
  } catch {}
  return { quizScores: {}, codeRuns: 0, streak: { count: 0, lastDate: null } }
}

export function ProgressProvider({ children }) {
  const { user  }: any = useAuth()
  const [state, setState] = useState(loadProgress)
  const syncTimerRef = useRef(null)

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Sync to Supabase (debounced)
  useEffect(() => {
    if (!user || !supabase) return
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
    syncTimerRef.current = setTimeout(() => {
      let earnedBadges
      try {
        earnedBadges = JSON.parse(localStorage.getItem('ad-badges') || '[]')
      } catch { earnedBadges = [] }

      supabase.from('ad_user_progress').upsert({
        user_id: user.id,
        code_runs: state.codeRuns,
        streak_count: state.streak.count,
        streak_last_date: state.streak.lastDate || null,
        earned_badges: earnedBadges,
        quiz_data: state.quizScores,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' }).then(({ error }) => {
        if (error) console.error('진행 데이터 동기화 오류:', error.message)
      })
    }, 2000)
    return () => { if (syncTimerRef.current) clearTimeout(syncTimerRef.current) }
  }, [user, state])

  const saveQuizScore = useCallback((quizId, score) => {
    const now = new Date().toISOString()
    setState(prev => {
      const existing = prev.quizScores[quizId] || { attempts: [], bestScore: 0 }
      const newAttempts = [...existing.attempts, { score, date: now }]
      const bestScore = Math.max(existing.bestScore, score)

      // Update streak
      const today = new Date().toISOString().split('T')[0]
      let streak = { ...prev.streak }
      if (streak.lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        streak = streak.lastDate === yesterday
          ? { count: streak.count + 1, lastDate: today }
          : { count: 1, lastDate: today }
      }

      return {
        ...prev,
        streak,
        quizScores: {
          ...prev.quizScores,
          [quizId]: { attempts: newAttempts, bestScore }
        }
      }
    })

    // Sync quiz score to Supabase
    if (user && supabase) {
      supabase.from('ad_quiz_scores').upsert({
        user_id: user.id,
        quiz_id: quizId,
        score,
        max_score: 100,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,quiz_id' }).catch(() => {})
    }
  }, [user])

  const incrementCodeRuns = useCallback(() => {
    setState(prev => {
      const today = new Date().toISOString().split('T')[0]
      let streak = { ...prev.streak }
      if (streak.lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        streak = streak.lastDate === yesterday
          ? { count: streak.count + 1, lastDate: today }
          : { count: 1, lastDate: today }
      }
      return { ...prev, codeRuns: prev.codeRuns + 1, streak }
    })
  }, [])

  const getQuizBestScore = useCallback((quizId) => {
    return state.quizScores[quizId]?.bestScore
  }, [state.quizScores])

  const getQuizAttempts = useCallback((quizId) => {
    return state.quizScores[quizId]?.attempts || []
  }, [state.quizScores])

  return (
    <ProgressContext.Provider value={{
      quizScores: state.quizScores,
      codeRuns: state.codeRuns,
      streak: state.streak,
      saveQuizScore,
      incrementCodeRuns,
      getQuizBestScore,
      getQuizAttempts,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used within ProgressProvider')
  return context
}
