import { useState, useRef, useCallback } from 'react'
import { useCodeRunner } from '../hooks/useCodeRunner'

const STATUS_MAP = {
  idle: { icon: 'fa-circle-play', label: '실행 대기', color: '#6B7280' },
  loading: { icon: 'fa-spinner fa-spin', label: 'Pyodide 로딩...', color: '#F59E0B' },
  running: { icon: 'fa-gear fa-spin', label: '실행 중...', color: '#3B82F6' },
  done: { icon: 'fa-circle-check', label: '완료', color: '#10B981' },
  error: { icon: 'fa-circle-xmark', label: '오류', color: '#EF4444' },
}

export default function CodeEditor({ initialCode = '', title = '' }) {
  const [code, setCode] = useState(initialCode)
  const [showInput, setShowInput] = useState(false)
  const [userInput, setUserInput] = useState('')
  const textareaRef = useRef(null)
  const lineNumRef = useRef(null)
  const { status, output, errorMsg, svgOutputs, runCode, resetOutput } = useCodeRunner()

  // Sync scroll between textarea and line numbers
  const handleScroll = useCallback(() => {
    if (lineNumRef.current && textareaRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  // Line numbers
  const lineCount = code.split('\n').length
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1)

  // Handle Tab key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const { selectionStart, selectionEnd } = e.target
      const before = code.slice(0, selectionStart)
      const after = code.slice(selectionEnd)
      const newCode = before + '    ' + after
      setCode(newCode)
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 4
      })
    }
    // Ctrl+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleRun()
    }
  }, [code])

  const handleRun = useCallback(() => {
    if (/\binput\s*\(/.test(code) && !showInput) {
      setShowInput(true)
      return
    }
    const inputs = userInput ? userInput.split('\n') : []
    runCode(code, inputs)
    setShowInput(false)
  }, [code, userInput, showInput, runCode])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
  }, [code])

  const handleReset = useCallback(() => {
    setCode(initialCode)
    resetOutput()
    setShowInput(false)
    setUserInput('')
  }, [initialCode, resetOutput])

  const statusInfo = STATUS_MAP[status] || STATUS_MAP.idle

  return (
    <div className="code-editor">
      {title && <div className="code-editor-title"><i className="fa-solid fa-code" /> {title}</div>}

      {/* 상단: 복사/초기화 + 상태 */}
      <div className="code-editor-toolbar">
        <button className="editor-btn" onClick={handleCopy}><i className="fa-solid fa-copy" /> 복사</button>
        <button className="editor-btn" onClick={handleReset}><i className="fa-solid fa-rotate-left" /> 초기화</button>
        <div className="editor-status">
          <i className={`fa-solid ${statusInfo.icon}`} style={{ color: statusInfo.color }} />
          <span style={{ color: statusInfo.color }}>{statusInfo.label}</span>
        </div>
        <span className="editor-shortcut">Ctrl+Enter</span>
      </div>

      {/* 코드 편집 영역 */}
      <div className="code-editor-body">
        <div className="line-numbers" ref={lineNumRef}>
          {lines.map(n => <div key={n} className="line-num">{n}</div>)}
        </div>
        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={code}
          onChange={e => setCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {/* 실행 버튼 영역 (코드 아래) */}
      <div className="code-editor-actions">
        <button className="editor-btn editor-btn-run" onClick={handleRun} disabled={status === 'loading' || status === 'running'}>
          <i className={`fa-solid ${status === 'running' ? 'fa-spinner fa-spin' : 'fa-play'}`} />
          {status === 'loading' ? 'Pyodide 로딩...' : status === 'running' ? '실행 중...' : '실행하기'}
        </button>
      </div>

      {showInput && (
        <div className="code-input-area">
          <label><i className="fa-solid fa-keyboard" /> 입력값 (input마다 줄바꿈):</label>
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="input() 에 전달할 값을 한 줄씩 입력하세요"
            rows={3}
          />
          <button className="editor-btn editor-btn-run" onClick={handleRun}>
            <i className="fa-solid fa-play" /> 입력값과 함께 실행
          </button>
        </div>
      )}

      {(output || errorMsg || svgOutputs.length > 0) && (
        <div className="code-output-area">
          <div className="code-output-header">
            <i className="fa-solid fa-terminal" /> 출력 결과
          </div>
          {svgOutputs.map((svg, i) => (
            <div key={i} className="svg-output" dangerouslySetInnerHTML={{ __html: svg }} />
          ))}
          {output && <pre className="code-output">{output}</pre>}
          {errorMsg && <pre className="code-error">{errorMsg}</pre>}
        </div>
      )}
    </div>
  )
}
