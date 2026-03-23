import { useState, useCallback, useRef, useEffect } from 'react'

let sharedWorker = null
let listenerCount = 0

function getWorker() {
  if (!sharedWorker) {
    sharedWorker = new Worker(
      new URL('../workers/pyodide.worker.js', import.meta.url),
      { type: 'classic' }
    )
  }
  listenerCount++
  return sharedWorker
}

function releaseWorker() {
  listenerCount--
  // Keep worker alive for reuse
}

export function useCodeRunner() {
  const [status, setStatus] = useState('idle') // idle | loading | running | done | error
  const [output, setOutput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [svgOutputs, setSvgOutputs] = useState([])
  const workerRef = useRef(null)

  useEffect(() => {
    workerRef.current = getWorker()
    return () => releaseWorker()
  }, [])

  const runCode = useCallback((code, inputs = []) => {
    const worker = workerRef.current
    if (!worker) return

    setStatus('loading')
    setOutput('')
    setErrorMsg('')
    setSvgOutputs([])

    const svgs = []

    const handler = (e) => {
      const { type, text, message, status: s } = e.data

      switch (type) {
        case 'status':
          setStatus(s)
          break
        case 'stdout': {
          // Check for SVG output from matplotlib
          const svgRegex = /__SVG_START__([\s\S]*?)__SVG_END__/g
          let cleaned = text
          let match
          while ((match = svgRegex.exec(text)) !== null) {
            svgs.push(match[1])
            cleaned = cleaned.replace(match[0], '')
          }
          if (svgs.length > 0) setSvgOutputs([...svgs])
          if (cleaned.trim()) setOutput(prev => prev + cleaned)
          break
        }
        case 'stderr':
          setOutput(prev => prev + text)
          break
        case 'error':
          setStatus('error')
          setErrorMsg(message)
          worker.removeEventListener('message', handler)
          break
        case 'done':
          setStatus('done')
          worker.removeEventListener('message', handler)
          break
      }
    }

    worker.addEventListener('message', handler)
    worker.postMessage({ type: 'run', code, inputs })
  }, [])

  const resetOutput = useCallback(() => {
    setStatus('idle')
    setOutput('')
    setErrorMsg('')
    setSvgOutputs([])
  }, [])

  return { status, output, errorMsg, svgOutputs, runCode, resetOutput }
}
