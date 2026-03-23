import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function PythonBasics() {
  return (
    <>
      <SEOHead title="Python 기초" description="데이터 분석을 위한 Python 프로그래밍 기초를 학습합니다." />
      <section className="page-header"><div className="container"><h1>Python 기초</h1><p>데이터 분석을 위한 Python 프로그래밍 기초를 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>Python이란?</h2>
            <p>Python은 간결하고 읽기 쉬운 문법으로 데이터 분석, 인공지능, 웹 개발 등 다양한 분야에서 사용되는 프로그래밍 언어입니다. 특히 풍부한 데이터 관련 라이브러리 생태계 덕분에 데이터 분석의 표준 언어로 자리잡았습니다.</p>

            <h2>변수와 자료형</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 변수 선언
name = "데이터 분석"    # 문자열 (str)
score = 95.5            # 실수 (float)
count = 100             # 정수 (int)
is_valid = True         # 불리언 (bool)

# 리스트 - 순서가 있는 데이터 모음
fruits = ["사과", "바나나", "체리"]
numbers = [1, 2, 3, 4, 5]

# 딕셔너리 - 키-값 쌍
student = {
    "이름": "홍길동",
    "나이": 25,
    "전공": "데이터사이언스"
}

print(f"이름: {student['이름']}, 점수: {score}")`}</code></pre>
            </div>

            <h2>조건문과 반복문</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 조건문
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
print(f"학점: {grade}")

# for 반복문
sales = [120, 85, 200, 150, 90]
total = 0
for s in sales:
    total += s
print(f"총 매출: {total}")

# 리스트 컴프리헨션
doubles = [x * 2 for x in sales]
high_sales = [s for s in sales if s >= 100]
print(f"높은 매출: {high_sales}")`}</code></pre>
            </div>

            <h2>함수</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 함수 정의
def calculate_average(data):
    """리스트의 평균을 계산합니다."""
    return sum(data) / len(data)

def analyze_sales(sales_list):
    """매출 데이터의 기본 통계를 반환합니다."""
    return {
        "평균": calculate_average(sales_list),
        "최대": max(sales_list),
        "최소": min(sales_list),
        "합계": sum(sales_list)
    }

monthly_sales = [150, 200, 180, 220, 190]
result = analyze_sales(monthly_sales)
for key, value in result.items():
    print(f"{key}: {value:,.0f}")`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>데이터 분석에서 Python을 쓰는 이유</h3>
              <p>Pandas, NumPy, Matplotlib, Scikit-learn 등 강력한 데이터 분석 라이브러리가 풍부하고, Google Colab 같은 무료 클라우드 환경에서 바로 실행할 수 있으며, ChatGPT가 Python 코드 생성을 가장 잘 지원합니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/intro/what-is-data-analysis" className="lesson-nav-btn prev">&larr; 이전: AI 데이터 분석이란?</Link>
              <Link to="/intro/pandas-intro" className="lesson-nav-btn next">다음: Pandas 입문 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
