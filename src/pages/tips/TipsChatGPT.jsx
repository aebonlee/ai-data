import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function TipsChatGPT() {
  return (
    <>
      <SEOHead title="ChatGPT 활용 팁" description="데이터 분석에서 ChatGPT를 효과적으로 활용하는 팁" />
      <section className="page-header"><div className="container"><h1>ChatGPT 활용 팁</h1><p>데이터 분석에서 ChatGPT를 200% 활용하는 프롬프트 기법</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>1. 역할 부여 프롬프트</h2>
            <div className="code-block">
              <div className="code-header">프롬프트</div>
              <pre><code>{`"너는 10년 경력의 데이터 분석가야.
다음 매출 데이터를 분석하고, 경영진에게 보고할 수 있는
핵심 인사이트 5가지를 뽑아줘.
데이터: [CSV 데이터 붙여넣기]"`}</code></pre>
            </div>

            <h2>2. 단계별 요청</h2>
            <div className="code-block">
              <div className="code-header">프롬프트</div>
              <pre><code>{`"다음 데이터 분석을 단계별로 진행해줘:
Step 1: 데이터 로딩 및 구조 파악
Step 2: 결측치/이상치 처리
Step 3: 기술통계 분석
Step 4: 시각화 코드 작성
Step 5: 인사이트 요약
각 단계별로 Python 코드와 설명을 함께 제공해줘."`}</code></pre>
            </div>

            <h2>3. 코드 디버깅</h2>
            <div className="code-block">
              <div className="code-header">프롬프트</div>
              <pre><code>{`"다음 Python 코드에서 에러가 발생해.
에러 메시지와 코드를 분석해서 수정해줘.

코드: [에러 코드 붙여넣기]
에러: [에러 메시지 붙여넣기]

수정된 코드와 함께 에러의 원인도 설명해줘."`}</code></pre>
            </div>

            <h2>4. 시각화 커스텀</h2>
            <div className="code-block">
              <div className="code-header">프롬프트</div>
              <pre><code>{`"다음 조건으로 매출 대시보드 차트를 만들어줘:
- 라이브러리: matplotlib + seaborn
- 차트: 2x2 서브플롯 (라인, 바, 파이, 히트맵)
- 스타일: 다크 배경, 모던한 색상
- 한글 폰트: Malgun Gothic
- 데이터: 월별 매출, 카테고리별 매출, 지역별 비중, 상관관계"
`}</code></pre>
            </div>

            <h2>5. 분석 보고서 작성</h2>
            <div className="code-block">
              <div className="code-header">프롬프트</div>
              <pre><code>{`"다음 분석 결과를 비즈니스 보고서 형태로 작성해줘:
- 대상: 마케팅팀 팀장
- 형식: 요약 → 핵심 발견 → 상세 분석 → 권장 사항
- 톤: 전문적이지만 이해하기 쉽게
- 데이터: [분석 결과 붙여넣기]"`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>핵심 원칙</h3>
              <p>구체적으로 요청하기, 맥락(데이터 구조, 목적) 제공하기, 출력 형식 지정하기, 한 번에 하나씩 요청하기. 이 4가지 원칙만 지키면 ChatGPT의 데이터 분석 보조 능력을 최대한 활용할 수 있습니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/tips" className="lesson-nav-btn prev">&larr; 도구 팁 목록</Link>
              <Link to="/tips/python" className="lesson-nav-btn next">다음: Python 팁 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
