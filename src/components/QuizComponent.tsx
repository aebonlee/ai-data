import { useState, useEffect, useCallback, useRef } from 'react'

export default function QuizComponent({ quiz, quizId, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [finished, setFinished] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState([])
  const timerRef = useRef(null)

  const questions = quiz.questions
  const total = questions.length

  // Shuffle options for current question
  useEffect(() => {
    const q = questions[currentQ]
    const indices = q.options.map((_, i) => i)
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]
    }
    setShuffledOptions(indices)
  }, [currentQ, questions])

  // Timer
  useEffect(() => {
    if (finished) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [finished])

  const handleSelect = useCallback((optionIdx) => {
    if (answered) return
    setSelected(optionIdx)
    setAnswered(true)
  }, [answered])

  const handleNext = useCallback(() => {
    const newAnswers = [...answers, { selected, correct: questions[currentQ].correct }]
    setAnswers(newAnswers)

    if (currentQ + 1 >= total) {
      clearInterval(timerRef.current)
      setFinished(true)
      // Calculate score
      const correctCount = newAnswers.filter(a => a.selected === a.correct).length
      const score = Math.round((correctCount / total) * 100)
      if (onComplete) onComplete(score)
    } else {
      setCurrentQ(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
    }
  }, [answers, selected, currentQ, total, questions, onComplete])

  const handleRetry = useCallback(() => {
    setCurrentQ(0)
    setSelected(null)
    setAnswered(false)
    setAnswers([])
    setTimeLeft(quiz.timeLimit)
    setFinished(false)
  }, [quiz.timeLimit])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  // Result screen
  if (finished) {
    const correctCount = answers.filter(a => a.selected === a.correct).length
    const score = Math.round((correctCount / total) * 100)
    const passed = score >= quiz.passingScore

    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className={`quiz-score-circle ${passed ? 'passed' : 'failed'}`}>
            <span className="score-number">{score}</span>
            <span className="score-label">점</span>
          </div>
          <h2 className="quiz-result-title">
            {passed ? '축하합니다! 🎉' : '아쉽네요 😢'}
          </h2>
          <p className="quiz-result-detail">
            {total}문제 중 {correctCount}문제 정답 ({score}점)
            {passed ? ` — ${quiz.passingScore}점 이상으로 통과!` : ` — ${quiz.passingScore}점 이상이 필요합니다.`}
          </p>

          <div className="quiz-answers-review">
            {answers.map((a, i) => (
              <span key={i} className={`review-item ${a.selected === a.correct ? 'correct' : 'wrong'}`}>
                Q{i + 1} {a.selected === a.correct ? '✓' : '✗'}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="community-submit-btn" onClick={handleRetry}>
              <i className="fa-solid fa-rotate-left" /> 다시 풀기
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]
  const letters = ['A', 'B', 'C', 'D']

  return (
    <div className="quiz-container">
      <div className="quiz-header-bar">
        <div className="quiz-progress">
          <span>{currentQ + 1} / {total}</span>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
          </div>
        </div>
        <div className={`quiz-timer ${timeLeft <= 30 ? 'warning' : ''}`}>
          <i className="fa-solid fa-clock" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="quiz-question">
        <p className="question-text">{q.question}</p>
        {q.code && <pre className="question-code">{q.code}</pre>}
      </div>

      <div className="quiz-options">
        {shuffledOptions.map((origIdx, displayIdx) => {
          let cls = 'quiz-option'
          if (answered) {
            if (origIdx === q.correct) cls += ' correct'
            else if (origIdx === selected) cls += ' wrong'
          } else if (origIdx === selected) {
            cls += ' selected'
          }

          return (
            <button
              key={origIdx}
              className={cls}
              onClick={() => handleSelect(origIdx)}
              disabled={answered}
            >
              <span className="option-letter">{letters[displayIdx]}</span>
              <span className="option-text">{q.options[origIdx]}</span>
              {answered && origIdx === q.correct && <i className="fa-solid fa-check option-icon" style={{ color: '#10B981' }} />}
              {answered && origIdx === selected && origIdx !== q.correct && <i className="fa-solid fa-xmark option-icon" style={{ color: '#EF4444' }} />}
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          <div className="quiz-explanation">
            <i className="fa-solid fa-lightbulb" style={{ color: '#F59E0B', marginRight: 8 }} />
            {q.explanation}
          </div>
          <div className="quiz-actions">
            <button className="community-submit-btn" onClick={handleNext}>
              {currentQ + 1 >= total ? '결과 보기' : '다음 문제'} <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
