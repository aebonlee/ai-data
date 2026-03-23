import { supabase } from '../config/supabase'

const noSupabase = { data: null, error: { message: 'Supabase가 설정되지 않았습니다.' } }

export async function getWorkbooks() {
  if (!supabase) return { ...noSupabase, data: [] }
  const { data, error } = await supabase
    .from('ad_workbooks')
    .select('*')
    .eq('is_published', true)
    .order('week_number', { ascending: true })
  return { data: data || [], error }
}

export async function getWorkbook(id) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('ad_workbooks')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createWorkbook({ weekNumber, title, content, fileUrl, isPublished, authorId, authorName }) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('ad_workbooks')
    .insert([{
      week_number: weekNumber,
      title,
      content,
      file_url: fileUrl,
      is_published: isPublished,
      author_id: authorId,
      author_name: authorName
    }])
    .select()
    .single()
  return { data, error }
}

export async function updateWorkbook(id, { weekNumber, title, content, fileUrl, isPublished }) {
  if (!supabase) return noSupabase
  const { data, error } = await supabase
    .from('ad_workbooks')
    .update({
      week_number: weekNumber,
      title,
      content,
      file_url: fileUrl,
      is_published: isPublished
    })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteWorkbook(id) {
  if (!supabase) return noSupabase
  const { error } = await supabase
    .from('ad_workbooks')
    .delete()
    .eq('id', id)
  return { error }
}

export async function incrementWorkbookViews(id) {
  if (!supabase) return
  await supabase.rpc('ad_increment_workbook_views', { workbook_id: id }).catch(() => {
    supabase
      .from('ad_workbooks')
      .select('views')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          supabase
            .from('ad_workbooks')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', id)
            .then(() => {})
        }
      })
  })
}
