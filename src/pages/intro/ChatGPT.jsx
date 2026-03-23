import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function ChatGPT() {
  return (
    <>
      <SEOHead title="ChatGPT 활용" description="ChatGPT를 데이터 분석 보조 도구로 활용하는 방법을 배웁니다." />
      <section className="page-header"><div className="container"><h1>ChatGPT 활용</h1><p>ChatGPT를 데이터 분석 보조 도구로 활용하는 방법을 배웁니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>ChatGPT와 데이터 분석</h2>
            <p>ChatGPT는 데이터 분석의 강력한 보조 도구입니다. 코드 생성, 데이터 해석, 분석 방법론 추천, 결과 설명 등 분석의 전 과정에서 활용할 수 있습니다.</p>

            <h2>효과적인 프롬프트 작성법</h2>
            <p>ChatGPT를 데이터 분석에 효과적으로 활용하려면 명확하고 구체적인 프롬프트를 작성해야 합니다.</p>

            <div className="code-block">
              <div className="code-header">프롬프트 예시</div>
              <pre><code>{`# 나쁜 프롬프트
"매출 데이터 분석해줘"

# 좋은 프롬프트
"다음 조건의 매출 데이터를 분석하는 Python 코드를 작성해줘:
- CSV 파일에 date, product, quantity, price 컬럼이 있음
- 월별 총 매출 트렌드를 라인 차트로 시각화
- 상위 5개 제품의 매출 비중을 파이 차트로 표시
- pandas와 matplotlib 사용
- 한글 폰트 설정 포함"`}</code></pre>
            </div>

            <h2>활용 사례 1: 코드 생성</h2>
            <div className="code-block">
              <div className="code-header">ChatGPT에게 요청할 프롬프트</div>
              <pre><code>{`"다음 데이터프레임에서 결측치를 확인하고,
수치형 컬럼은 중앙값으로, 범주형 컬럼은 최빈값으로
채우는 Python 함수를 작성해줘."`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-header">ChatGPT의 응답 (예시)</div>
              <pre><code>{`import pandas as pd

def fill_missing_values(df):
    """결측치를 자동으로 처리합니다."""
    for col in df.columns:
        if df[col].isnull().sum() == 0:
            continue
        if df[col].dtype in ['int64', 'float64']:
            df[col].fillna(df[col].median(), inplace=True)
        else:
            df[col].fillna(df[col].mode()[0], inplace=True)
    return df

# 사용 예시
df = pd.read_csv('data.csv')
print(f"처리 전 결측치:\\n{df.isnull().sum()}")
df = fill_missing_values(df)
print(f"처리 후 결측치:\\n{df.isnull().sum()}")`}</code></pre>
            </div>

            <h2>활용 사례 2: 결과 해석</h2>
            <div className="code-block">
              <div className="code-header">프롬프트 예시</div>
              <pre><code>{`"다음 상관관계 분석 결과를 비전문가도 이해할 수 있게 설명해줘:
- 가격 vs 판매량: r = -0.72
- 광고비 vs 매출: r = 0.85
- 고객만족도 vs 재구매율: r = 0.91"

→ ChatGPT가 상관계수의 의미, 강도, 방향을
  비즈니스 관점에서 쉽게 설명해줍니다.`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>ChatGPT 활용 팁</h3>
              <p>데이터의 구조(컬럼명, 데이터 타입)를 구체적으로 알려주세요. 원하는 출력 형태(차트, 표, 보고서)를 명시하세요. 사용할 라이브러리를 지정하면 더 정확한 코드를 받을 수 있습니다. 생성된 코드는 반드시 검증 후 사용하세요.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/intro/pandas-intro" className="lesson-nav-btn prev">&larr; 이전: Pandas 입문</Link>
              <Link to="/intro/data-types" className="lesson-nav-btn next">다음: 데이터 유형 이해 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
