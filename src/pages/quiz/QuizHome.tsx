import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import { quizzes } from '../../data/quizzes'
import { useProgress } from '../../contexts/ProgressContext'

export default function QuizHome() {
  const { getQuizBestScore, getQuizAttempts  }: any = useProgress()
  const quizList = Object.entries(quizzes)

  return (
    <>
      <SEOHead title="도장깨기" description="데이터 분석 실력을 테스트하는 퀴즈 도장깨기에 도전하세요." />

      <section className="page-header">
        <div className="container">
          <h1><i className="fa-solid fa-stamp" /> 도장깨기</h1>
          <p>데이터 분석 실력을 테스트하고 배지를 획득하세요!</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="quiz-cards-grid">
            {quizList.map(([id, quiz]: [string, any]) => {
              const bestScore = getQuizBestScore(id)
              const attempts = getQuizAttempts(id)
              const passed = bestScore !== undefined && bestScore >= quiz.passingScore

              return (
                <Link to={`/quiz/${id}`} key={id} className="quiz-card" style={{ textDecoration: 'none' }}>
                  <div className="quiz-card-header" style={{ background: `linear-gradient(135deg, ${quiz.color}, ${quiz.color}CC)` }}>
                    <span className="quiz-card-icon"><i className={quiz.icon} /></span>
                    <h3>{quiz.title}</h3>
                  </div>
                  <div className="quiz-card-body">
                    <p>{quiz.description}</p>
                    <div className="quiz-card-meta">
                      <span><i className="fa-solid fa-list-ol" /> {quiz.questions.length}문제</span>
                      <span><i className="fa-solid fa-clock" /> {Math.floor(quiz.timeLimit / 60)}분</span>
                      <span><i className="fa-solid fa-bullseye" /> {quiz.passingScore}점 이상</span>
                    </div>
                    {attempts.length > 0 && (
                      <div className={`quiz-card-score ${passed ? 'passed' : 'failed'}`}>
                        최고 점수: {bestScore}점 ({attempts.length}회 시도)
                      </div>
                    )}
                  </div>
                  <div className="quiz-card-action">
                    <button className="community-submit-btn" style={{ width: '100%', justifyContent: 'center' }}>
                      {attempts.length > 0 ? '다시 도전' : '도전하기'} <i className="fa-solid fa-arrow-right" />
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
