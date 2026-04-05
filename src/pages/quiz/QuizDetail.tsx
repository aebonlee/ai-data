import { useParams, useNavigate } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import QuizComponent from '../../components/QuizComponent'
import { quizzes } from '../../data/quizzes'
import { useProgress } from '../../contexts/ProgressContext'

export default function QuizDetail() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { saveQuizScore, getQuizBestScore, getQuizAttempts } = useProgress()

  const quiz = quizzes[quizId]
  if (!quiz) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '120px 0' }}>
        <h2>퀴즈를 찾을 수 없습니다</h2>
        <button className="community-submit-btn" onClick={() => navigate('/quiz')} style={{ marginTop: '1rem' }}>
          도장깨기 홈으로
        </button>
      </section>
    )
  }

  const handleComplete = (score) => {
    saveQuizScore(quizId, score)
  }

  const bestScore = getQuizBestScore(quizId)
  const attempts = getQuizAttempts(quizId)

  return (
    <>
      <SEOHead title={`${quiz.title} 퀴즈`} description={quiz.description} />

      <section className="page-header" style={{ background: `linear-gradient(135deg, ${quiz.color}, ${quiz.color}AA)` }}>
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/quiz')}>
            <i className="fa-solid fa-arrow-left" /> 도장깨기 목록
          </button>
          <h1><i className={quiz.icon} /> {quiz.title}</h1>
          <p>{quiz.description}</p>
          {bestScore !== undefined && (
            <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
              <span>최고 점수: <strong style={{ color: 'white' }}>{bestScore}점</strong></span>
              <span>시도 횟수: <strong style={{ color: 'white' }}>{attempts.length}회</strong></span>
            </div>
          )}
        </div>
      </section>

      <section className="section quiz-content-wrapper">
        <div className="container" style={{ maxWidth: '800px' }}>
          <QuizComponent quiz={quiz} quizId={quizId} onComplete={handleComplete} />
        </div>
      </section>
    </>
  )
}
