import { supabase } from '../config/supabase'

const noSupabase = { data: null, error: { message: 'Supabase가 설정되지 않았습니다.' } }

export async function getPosts(page = 1, pageSize = 10, category = null) {
  if (!supabase) return { ...noSupabase, count: 0 }

  let query = supabase
    .from('ad_posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (category && category !== '전체') {
    query = query.eq('category', category)
  }

  const { data, error, count } = await query
  return { data, error, count }
}

export async function getPost(id) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('ad_posts')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createPost({ title, content, category, authorId, authorName }) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('ad_posts')
    .insert([{ title, content, category, author_id: authorId, author_name: authorName }])
    .select()
    .single()
  return { data, error }
}

export async function deletePost(id) {
  if (!supabase) return noSupabase
  const { error } = await supabase
    .from('ad_posts')
    .delete()
    .eq('id', id)
  return { error }
}

export async function getComments(postId) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('ad_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export async function createComment({ postId, content, authorId, authorName }) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('ad_comments')
    .insert([{ post_id: postId, content, author_id: authorId, author_name: authorName }])
    .select()
    .single()
  return { data, error }
}

export async function deleteComment(id) {
  if (!supabase) return noSupabase
  const { error } = await supabase
    .from('ad_comments')
    .delete()
    .eq('id', id)
  return { error }
}
