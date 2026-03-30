import{j as n,L as t}from"./index-DSj272Qi.js";import{S as s}from"./SEOHead-Dvt2fwGA.js";import{C as e}from"./CodeEditor-BUA_pBI1.js";const r=`# 변수와 자료형
name = "데이터 분석"    # 문자열 (str)
score = 95.5            # 실수 (float)
count = 100             # 정수 (int)
is_valid = True         # 불리언 (bool)

print(f"이름: {name}, 타입: {type(name).__name__}")
print(f"점수: {score}, 타입: {type(score).__name__}")
print(f"개수: {count}, 타입: {type(count).__name__}")
print(f"유효: {is_valid}, 타입: {type(is_valid).__name__}")

# 타입 변환
print("\\n[타입 변환]")
num_str = "42"
num_int = int(num_str)
num_float = float(num_str)
print(f"문자열 '{num_str}' → 정수: {num_int}, 실수: {num_float}")

# f-string 포맷팅
price = 15000
quantity = 3
total = price * quantity
print(f"\\n단가: {price:,}원 x {quantity}개 = {total:,}원")`,i=`# 리스트 (List) - 순서가 있는 변경 가능한 컬렉션
fruits = ["사과", "바나나", "체리", "딸기", "포도"]
print("[리스트]")
print(f"전체: {fruits}")
print(f"첫 번째: {fruits[0]}")
print(f"마지막: {fruits[-1]}")
print(f"슬라이싱: {fruits[1:3]}")

# 리스트 조작
fruits.append("키위")
fruits.insert(0, "망고")
print(f"추가 후: {fruits}")
print(f"길이: {len(fruits)}")

# 딕셔너리 (Dictionary) - 키-값 쌍
print("\\n[딕셔너리]")
student = {
    "이름": "홍길동",
    "나이": 25,
    "전공": "데이터사이언스",
    "학점": 3.8
}
print(f"이름: {student['이름']}")
print(f"전공: {student['전공']}")

# 딕셔너리 순회
for key, value in student.items():
    print(f"  {key}: {value}")

# 딕셔너리 리스트 (실무에서 자주 사용)
print("\\n[딕셔너리 리스트]")
employees = [
    {"이름": "김철수", "부서": "개발", "연봉": 5000},
    {"이름": "이영희", "부서": "마케팅", "연봉": 4500},
    {"이름": "박민수", "부서": "개발", "연봉": 5500}
]
for emp in employees:
    print(f"  {emp['이름']} ({emp['부서']}): {emp['연봉']:,}만원")`,a=`# 조건문
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"점수: {score} → 학점: {grade}")

# 삼항 연산자
status = "합격" if score >= 60 else "불합격"
print(f"상태: {status}")

# for 반복문
print("\\n[for 반복문]")
sales = [120, 85, 200, 150, 90, 180]
total = 0
for i, s in enumerate(sales):
    total += s
    print(f"  {i+1}월: {s}만원 (누적: {total}만원)")

# 리스트 컴프리헨션
print("\\n[리스트 컴프리헨션]")
doubles = [x * 2 for x in sales]
print(f"2배: {doubles}")

high_sales = [s for s in sales if s >= 150]
print(f"150 이상: {high_sales}")

# 딕셔너리 컴프리헨션
months = {f"{i+1}월": s for i, s in enumerate(sales)}
print(f"월별: {months}")

# while 반복문
print("\\n[while 반복문]")
balance = 10000
month = 0
while balance > 0:
    balance -= 1500
    month += 1
    if balance < 0:
        balance = 0
print(f"{month}개월 후 잔고 소진")`,l=`# 함수 정의
def calculate_average(data):
    """리스트의 평균을 계산합니다."""
    if len(data) == 0:
        return 0
    return sum(data) / len(data)

def analyze_sales(sales_list):
    """매출 데이터의 기본 통계를 반환합니다."""
    return {
        "평균": calculate_average(sales_list),
        "최대": max(sales_list),
        "최소": min(sales_list),
        "합계": sum(sales_list),
        "개수": len(sales_list)
    }

monthly_sales = [150, 200, 180, 220, 190, 250]
result = analyze_sales(monthly_sales)
print("[매출 통계]")
for key, value in result.items():
    print(f"  {key}: {value:,.0f}")

# 람다 함수
print("\\n[람다 함수]")
square = lambda x: x ** 2
print(f"3의 제곱: {square(3)}")

# 리스트 + 람다 활용
data = [("김철수", 85), ("이영희", 92), ("박민수", 78), ("정수연", 95)]
data_sorted = sorted(data, key=lambda x: x[1], reverse=True)
print("\\n성적 순위:")
for rank, (name, score) in enumerate(data_sorted, 1):
    print(f"  {rank}위: {name} ({score}점)")

# *args, **kwargs
def summary(*args, **kwargs):
    print(f"  위치 인수: {args}")
    print(f"  키워드 인수: {kwargs}")

print("\\n[가변 인수]")
summary(1, 2, 3, name="분석", level="초급")`,o=`# 모듈과 NumPy 기초
import numpy as np

# 배열 생성
arr = np.array([10, 20, 30, 40, 50])
print("[NumPy 기본]")
print(f"배열: {arr}")
print(f"타입: {arr.dtype}")
print(f"형태: {arr.shape}")

# 벡터 연산 (Python 리스트보다 훨씬 빠름)
print(f"\\n전체 x 2: {arr * 2}")
print(f"전체 + 10: {arr + 10}")
print(f"합계: {arr.sum()}, 평균: {arr.mean():.1f}")

# 2차원 배열
print("\\n[2차원 배열]")
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(matrix)
print(f"형태: {matrix.shape}")
print(f"행 합계: {matrix.sum(axis=1)}")
print(f"열 평균: {matrix.mean(axis=0)}")

# 랜덤 데이터 생성 (분석에서 자주 사용)
print("\\n[랜덤 데이터]")
np.random.seed(42)
scores = np.random.normal(loc=75, scale=10, size=100)  # 평균 75, 표준편차 10
print(f"평균: {scores.mean():.1f}")
print(f"표준편차: {scores.std():.1f}")
print(f"최소: {scores.min():.1f}, 최대: {scores.max():.1f}")

# 불리언 인덱싱
high = scores[scores >= 90]
print(f"90점 이상: {len(high)}명 ({len(high)/len(scores)*100:.1f}%)")

# 유용한 함수들
print("\\n[유용한 함수]")
print(f"arange: {np.arange(0, 10, 2)}")
print(f"linspace: {np.linspace(0, 1, 5)}")
print(f"zeros: {np.zeros(5)}")
print(f"ones: {np.ones(3)}")`;function d(){return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Python 기초",description:"데이터 분석을 위한 Python 프로그래밍 기초를 학습합니다."}),n.jsx("section",{className:"page-header",children:n.jsxs("div",{className:"container",children:[n.jsx("h1",{children:"Python 기초"}),n.jsx("p",{children:"데이터 분석을 위한 Python 프로그래밍 기초를 학습합니다"})]})}),n.jsx("section",{className:"section lesson-content",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"playground-body",children:[n.jsx("h2",{children:"Python이란?"}),n.jsx("p",{children:"Python은 간결하고 읽기 쉬운 문법으로 데이터 분석, 인공지능, 웹 개발 등 다양한 분야에서 사용되는 프로그래밍 언어입니다. 특히 풍부한 데이터 관련 라이브러리 생태계(Pandas, NumPy, Matplotlib, Scikit-learn) 덕분에 데이터 분석의 표준 언어로 자리잡았습니다."}),n.jsx("h2",{children:"변수와 자료형"}),n.jsx("p",{children:"Python의 기본 자료형은 정수(int), 실수(float), 문자열(str), 불리언(bool)입니다. 변수에 값을 대입하면 자동으로 타입이 결정됩니다."}),n.jsx(e,{title:"변수와 자료형",initialCode:r}),n.jsx("h2",{children:"리스트와 딕셔너리"}),n.jsx("p",{children:"리스트는 순서가 있는 데이터 모음이고, 딕셔너리는 키-값 쌍으로 구성됩니다. 데이터 분석에서 가장 많이 사용되는 자료구조입니다."}),n.jsx(e,{title:"리스트와 딕셔너리",initialCode:i}),n.jsx("h2",{children:"조건문과 반복문"}),n.jsx("p",{children:"조건문(if/elif/else)으로 분기를 처리하고, 반복문(for/while)으로 데이터를 순회합니다. 리스트 컴프리헨션은 Python만의 강력한 문법입니다."}),n.jsx(e,{title:"조건문과 반복문",initialCode:a}),n.jsx("h2",{children:"함수와 람다"}),n.jsx("p",{children:"함수를 정의하여 코드를 재사용하고, 람다 함수로 간단한 연산을 한 줄로 표현합니다. 데이터 분석에서 apply(), sorted() 등과 함께 람다를 자주 사용합니다."}),n.jsx(e,{title:"함수와 람다",initialCode:l}),n.jsx("h2",{children:"모듈과 NumPy 기초"}),n.jsx("p",{children:"NumPy는 Python 과학 계산의 핵심 라이브러리입니다. 대규모 배열 연산을 빠르게 처리하며, Pandas의 기반이 됩니다."}),n.jsx(e,{title:"모듈과 NumPy 기초",initialCode:o}),n.jsxs("div",{className:"callout-box",children:[n.jsx("h3",{children:"데이터 분석에서 Python을 쓰는 이유"}),n.jsx("p",{children:"Pandas, NumPy, Matplotlib, Scikit-learn 등 강력한 데이터 분석 라이브러리가 풍부하고, Google Colab 같은 무료 클라우드 환경에서 바로 실행할 수 있으며, ChatGPT가 Python 코드 생성을 가장 잘 지원합니다."})]}),n.jsxs("div",{className:"lesson-nav",children:[n.jsx(t,{to:"/intro/what-is-data-analysis",className:"lesson-nav-btn prev",children:"← 이전: AI 데이터 분석이란?"}),n.jsx(t,{to:"/intro/pandas-intro",className:"lesson-nav-btn next",children:"다음: Pandas 기초 →"})]})]})})})]})}export{d as default};
