import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../config/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accountBlock, setAccountBlock] = useState(null)

  const clearAccountBlock = useCallback(() => setAccountBlock(null), [])

  // visited_sites / signup_domain / check_user_status 처리
  const handlePostAuth = useCallback(async (userId) => {
    if (!supabase || !userId) return

    const currentDomain = window.location.hostname
    const { data } = await supabase
      .from('user_profiles')
      .select('signup_domain, visited_sites')
      .eq('id', userId)
      .single()

    if (data) {
      const updates = {}
      if (!(data as any).signup_domain) (updates as any).signup_domain = currentDomain
      const sites = Array.isArray((data as any).visited_sites) ? (data as any).visited_sites : []
      if (!sites.includes(currentDomain)) {
        (updates as any).visited_sites = [...sites, currentDomain]
      }
      if (Object.keys(updates).length > 0) {
        supabase.from('user_profiles').update(updates).eq('id', userId).then(() => {})
      }
    }

    // 계정 상태 체크
    try {
      const { data: statusData } = await supabase.rpc('check_user_status', {
        target_user_id: userId,
        current_domain: currentDomain,
      })
      if (statusData && statusData.status && statusData.status !== 'active') {
        setAccountBlock({
          status: statusData.status,
          reason: statusData.reason || '',
          suspended_until: statusData.suspended_until || null,
        })
        await supabase.auth.signOut()
        setUser(null)
        return
      }
    } catch {
      // check_user_status 함수 미존재 시 무시
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) handlePostAuth(u.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (event === 'SIGNED_IN' && u) {
        supabase.from('user_profiles')
          .update({ last_sign_in_at: new Date().toISOString() })
          .eq('id', u.id)
          .then(() => {})

        // Domain tracking
        const hostname = window.location.hostname
        supabase
          .from('user_profiles')
          .select('visited_sites')
          .eq('id', u.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              const sites = (profile as any).visited_sites || []
              if (!sites.includes(hostname)) {
                supabase.from('user_profiles')
                  .update({ visited_sites: [...sites, hostname] })
                  .eq('id', u.id)
                  .then(() => {})
              }
            }
          })

        handlePostAuth(u.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [handlePostAuth])

  const signUp = async (email, password, fullName) => {
    if (!supabase) return { error: { message: 'Supabase가 설정되지 않았습니다.' } }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/',
        data: { full_name: fullName }
      }
    })
    if (error) throw error
    if (data?.user) {
      await supabase.from('user_profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName || '',
        signup_domain: window.location.hostname,
        visited_sites: [window.location.hostname],
      }, { onConflict: 'id' })
    }
    return { data, error }
  }

  const signIn = async (email, password) => {
    if (!supabase) return { error: { message: 'Supabase가 설정되지 않았습니다.' } }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signInWithGoogle = async () => {
    if (!supabase) return { error: { message: 'Supabase가 설정되지 않았습니다.' } }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/' }
    })
    return { data, error }
  }

  const signInWithKakao = async () => {
    if (!supabase) return { error: { message: 'Supabase가 설정되지 않았습니다.' } }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: window.location.origin + '/' }
    })
    return { data, error }
  }

  const resetPassword = async (email) => {
    if (!supabase) return { error: { message: 'Supabase가 설정되지 않았습니다.' } }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login',
    })
    return { data, error }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, accountBlock, clearAccountBlock, signUp, signIn, signInWithGoogle, signInWithKakao, resetPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
