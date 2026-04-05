import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getWorkbooks, incrementWorkbookViews } from '../../services/workbookService'
import { supabase } from '../../config/supabase'
import SEOHead from '../../components/SEOHead'

export default function WorkbookHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [workbooks, setWorkbooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => { loadWorkbooks() }, [])

  const loadWorkbooks = async () => { setLoading(true); const { data } = await getWorkbooks(); setWorkbooks(data || []); setLoading(false) }

  const toggleExpand = (wb) => {
    if (expandedId === wb.id) { setExpandedId(null) } else { setExpandedId(wb.id); incrementWorkbookViews(wb.id) }
  }

  const handleFileAction = (e) => { if (!user) { e.preventDefault(); alert('파일을 보려면 로그인이 필요합니다.'); navigate('/login') } }

  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return null
    if (fileUrl.startsWith('http')) return fileUrl
    return `${import.meta.env.BASE_URL}${fileUrl.replace(/^\//, '')}`
  }

  return (
    <>
      <SEOHead title="워크북" description="AI 데이터 분석 워크북 - 주차별 실습 자료" />
      <section className="page-header"><div className="container"><h1>워크북</h1><p>실습 중심의 워크북으로 데이터 분석 역량을 키워보세요</p></div></section>
      <section className="section">
        <div className="container">
          {!supabase ? <div className="lecture-empty">Supabase가 설정되지 않았습니다.</div> : (
            <>
              {user && <div className="lecture-toolbar"><Link to="/workbooks/write" className="lecture-write-btn">워크북 등록</Link></div>}
              {loading ? <div className="lecture-loading"><div className="loading-spinner" /></div> : workbooks.length === 0 ? <div className="lecture-empty">등록된 워크북이 없습니다.</div> : (
                <div className="lecture-table-wrapper">
                  <table className="lecture-table">
                    <thead><tr><th className="lecture-col-week">주차</th><th>제목</th><th className="lecture-col-actions">자료</th></tr></thead>
                    <tbody>
                      {workbooks.map((wb) => {
                        const isExpanded = expandedId === wb.id
                        const fileUrl = getFileUrl(wb.file_url)
                        return (
                          <React.Fragment key={wb.id}>
                            <tr className={isExpanded ? 'active-row' : ''} style={{ cursor: 'pointer' }} onClick={() => toggleExpand(wb)}>
                              <td className="lecture-col-week"><span className="lecture-week-badge">Week {wb.week_number}</span></td>
                              <td className="lecture-title-cell"><div className="lecture-title-row"><span className={`lecture-expand-icon ${isExpanded ? 'expanded' : ''}`}>&#9654;</span><span>{wb.title}</span></div></td>
                              <td className="lecture-col-actions" onClick={e => e.stopPropagation()}>
                                <div className="lecture-btn-group">
                                  {fileUrl ? (<><a className="lecture-btn newtab" href={fileUrl} target="_blank" rel="noopener noreferrer" onClick={handleFileAction}>보기</a><a className="lecture-btn download" href={fileUrl} download onClick={handleFileAction}>다운로드</a></>) : <span className="lecture-no-file">파일 없음</span>}
                                  {user && user.id === wb.author_id && <Link to={`/workbooks/edit/${wb.id}`} className="lecture-btn edit-btn">수정</Link>}
                                </div>
                              </td>
                            </tr>
                            {isExpanded && <tr className="lecture-dropdown-row"><td colSpan="3"><div className="lecture-dropdown-content">{wb.content ? <div className="lecture-content-text">{wb.content.split('\n').map((l, i) => <p key={i}>{l || '\u00A0'}</p>)}</div> : <p className="lecture-content-empty">내용이 없습니다.</p>}</div></td></tr>}
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
