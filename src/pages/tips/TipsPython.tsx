import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function TipsPython() {
  return (
    <>
      <SEOHead title="Python 팁" description="데이터 분석을 위한 Python 고급 테크닉과 생산성 팁" />
      <section className="page-header"><div className="container"><h1>Python 팁</h1><p>데이터 분석을 위한 Python 고급 테크닉과 생산성 팁</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>1. f-string 포매팅</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 숫자 포매팅
revenue = 1234567890
print(f"매출: {revenue:,}원")           # 매출: 1,234,567,890원
print(f"매출: {revenue:,.0f}원")        # 매출: 1,234,567,890원

ratio = 0.8567
print(f"비율: {ratio:.1%}")             # 비율: 85.7%
print(f"비율: {ratio:.2f}")             # 비율: 0.86

# 정렬
for name, score in [("김철수", 95), ("이영희", 88)]:
    print(f"{name:<6} | {score:>5}점")`}</code></pre>
            </div>

            <h2>2. 리스트/딕셔너리 컴프리헨션</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 리스트 컴프리헨션
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# 딕셔너리 컴프리헨션
scores = {'김철수': 85, '이영희': 92, '박민수': 78}
grades = {k: ('A' if v >= 90 else 'B') for k, v in scores.items()}

# 중첩 컴프리헨션
matrix = [[i*3+j for j in range(3)] for i in range(3)]

# 조건부 변환
data = [1, -2, 3, -4, 5]
abs_data = [abs(x) for x in data]`}</code></pre>
            </div>

            <h2>3. 유용한 내장 함수</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# enumerate - 인덱스와 함께 반복
for i, name in enumerate(['김철수', '이영희', '박민수'], 1):
    print(f"{i}. {name}")

# zip - 여러 리스트 동시 반복
names = ['A', 'B', 'C']
scores = [90, 85, 88]
for n, s in zip(names, scores):
    print(f"{n}: {s}")

# map, filter
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x*2, numbers))
big = list(filter(lambda x: x > 3, numbers))

# sorted with key
students = [('김철수', 85), ('이영희', 92), ('박민수', 78)]
by_score = sorted(students, key=lambda x: x[1], reverse=True)`}</code></pre>
            </div>

            <h2>4. 에러 처리</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# 파일 읽기 안전하게
try:
    df = pd.read_csv('data.csv')
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
    df = pd.DataFrame()
except pd.errors.EmptyDataError:
    print("빈 파일입니다.")
    df = pd.DataFrame()

# with 문으로 리소스 관리
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("분석 결과")`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>생산성 향상 팁</h3>
              <p>Google Colab의 자동완성(Tab)을 적극 활용하고, 자주 쓰는 코드는 함수로 만들어두세요. ChatGPT에게 "이 코드를 더 pythonic하게 리팩토링해줘"라고 요청하면 개선점을 빠르게 파악할 수 있습니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/tips/chatgpt" className="lesson-nav-btn prev">&larr; 이전: ChatGPT 활용 팁</Link>
              <Link to="/tips/pandas" className="lesson-nav-btn next">다음: Pandas 팁 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
