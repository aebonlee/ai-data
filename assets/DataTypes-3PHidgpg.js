import{j as n,L as t}from"./index-CpaC8Bka.js";import{S as r}from"./SEOHead-CIyTwIY_.js";import{C as d}from"./CodeEditor-C27BVmyA.js";const a=`import pandas as pd
import numpy as np

# 수치형 데이터: 연속형 vs 이산형
df = pd.DataFrame({
    '나이': [25, 30, 35, 28, 42],           # 연속형 (Continuous)
    '자녀수': [0, 1, 2, 1, 3],               # 이산형 (Discrete)
    '연봉': [3500, 4200, 5100, 3800, 6000],  # 연속형
    '평가점수': [4.2, 3.8, 4.5, 3.9, 4.7]   # 연속형
})

print("[수치형 데이터]")
print(df)

# 연속형: 평균, 중앙값, 표준편차 활용
print("\\n[연속형 - 기술통계]")
print(f"나이 평균: {df['나이'].mean():.1f}세")
print(f"연봉 중앙값: {df['연봉'].median():,.0f}만원")
print(f"연봉 표준편차: {df['연봉'].std():,.0f}만원")

# 이산형: 빈도수, 최빈값 활용
print("\\n[이산형 - 빈도 분석]")
print(f"자녀수 분포:")
print(df['자녀수'].value_counts().sort_index())
print(f"최빈값: {df['자녀수'].mode()[0]}명")`,i=`import pandas as pd

# 범주형 데이터: 명목형 vs 순서형
df = pd.DataFrame({
    '성별': ['남', '여', '남', '여', '남', '여', '남', '여'],
    '혈액형': ['A', 'B', 'O', 'AB', 'A', 'O', 'B', 'A'],
    '학력': ['고졸', '대졸', '석사', '대졸', '박사', '대졸', '석사', '고졸'],
    '만족도': ['보통', '만족', '불만', '만족', '매우만족', '보통', '만족', '불만']
})

# 명목형 (Nominal): 순서 없음
print("[명목형 - 성별]")
print(df['성별'].value_counts())
print(f"비율: 남 {(df['성별']=='남').mean()*100:.0f}%, 여 {(df['성별']=='여').mean()*100:.0f}%")

print("\\n[명목형 - 혈액형]")
print(df['혈액형'].value_counts())

# 순서형 (Ordinal): 순서 있음
print("\\n[순서형 - 학력 (순서 지정)]")
edu_order = pd.CategoricalDtype(categories=['고졸', '대졸', '석사', '박사'], ordered=True)
df['학력'] = df['학력'].astype(edu_order)
print(df['학력'].value_counts().sort_index())

# 순서형 비교 가능
print(f"\\n석사 이상: {(df['학력'] >= '석사').sum()}명")

# 교차표
print("\\n[교차표 - 성별 x 학력]")
print(pd.crosstab(df['성별'], df['학력']))`,e=`import pandas as pd
import numpy as np

# 날짜/시간 데이터 다루기
dates = pd.date_range('2024-01-01', periods=10, freq='D')
df = pd.DataFrame({
    '날짜': dates,
    '매출': np.random.randint(100, 500, 10) * 1000
})

print("[날짜 데이터]")
print(df)
print(f"\\n타입: {df['날짜'].dtype}")

# 날짜 속성 추출
df['연도'] = df['날짜'].dt.year
df['월'] = df['날짜'].dt.month
df['일'] = df['날짜'].dt.day
df['요일'] = df['날짜'].dt.day_name()
df['요일번호'] = df['날짜'].dt.dayofweek  # 0=월요일

print("\\n[날짜 속성 추출]")
print(df[['날짜', '연도', '월', '일', '요일']])

# 날짜 필터링
print("\\n[5일 이후 데이터]")
print(df[df['날짜'] >= '2024-01-05'][['날짜', '매출']])

# 날짜 차이 계산
df['경과일'] = (df['날짜'] - df['날짜'].iloc[0]).dt.days
print("\\n[경과일 계산]")
print(df[['날짜', '경과일', '매출']])`,s=`import pandas as pd
import numpy as np

# 데이터 타입 변환 실습
df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수'],
    '나이': ['28', '32', '25'],       # 문자열로 된 숫자
    '매출': ['1,500', '2,200', '1,800'], # 콤마가 있는 숫자
    '입사일': ['2020-03-15', '2018-07-20', '2022-01-10'],
    '정규직': ['True', 'True', 'False']
})

print("[변환 전]")
print(df.dtypes)
print()

# 타입 변환
df['나이'] = df['나이'].astype(int)
df['매출'] = df['매출'].str.replace(',', '').astype(int)
df['입사일'] = pd.to_datetime(df['입사일'])
df['정규직'] = df['정규직'].map({'True': True, 'False': False})

print("[변환 후]")
print(df.dtypes)
print()
print(df)`,p=`import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# 스케일링/정규화
data = pd.DataFrame({
    '나이': [25, 30, 35, 28, 42, 22, 55, 38],
    '연봉': [3500, 4200, 5100, 3800, 6000, 3000, 8000, 4800],
    '경력': [2, 5, 10, 3, 15, 1, 25, 8]
})

print("[원본 데이터]")
print(data)
print(f"\\n[범위 비교]")
for col in data.columns:
    print(f"  {col}: {data[col].min()} ~ {data[col].max()} (범위: {data[col].max()-data[col].min()})")

# Min-Max 정규화 (0~1 범위)
scaler_mm = MinMaxScaler()
normalized = pd.DataFrame(
    scaler_mm.fit_transform(data),
    columns=data.columns
)
print("\\n[Min-Max 정규화 (0~1)]")
print(normalized.round(3))

# 표준화 (평균 0, 표준편차 1)
scaler_std = StandardScaler()
standardized = pd.DataFrame(
    scaler_std.fit_transform(data),
    columns=data.columns
)
print("\\n[표준화 (Z-Score)]")
print(standardized.round(3))

print("\\n[표준화 후 통계]")
print(f"평균: {standardized.mean().round(2).values}")
print(f"표준편차: {standardized.std().round(2).values}")

print("\\n[스케일링 선택 가이드]")
print("Min-Max: 값의 범위를 0~1로 맞출 때 (신경망 입력)")
print("Standard: 정규분포 가정 모델에 적합 (선형회귀, SVM)")`;function f(){return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"데이터 유형 이해",description:"정형/비정형 데이터, 수치/범주형 데이터의 특성을 이해합니다."}),n.jsx("section",{className:"page-header",children:n.jsxs("div",{className:"container",children:[n.jsx("h1",{children:"데이터 유형 이해"}),n.jsx("p",{children:"다양한 데이터 유형의 특성을 이해하고 적절한 처리 방법을 학습합니다"})]})}),n.jsx("section",{className:"section lesson-content",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"playground-body",children:[n.jsx("h2",{children:"정형 vs 비정형 데이터"}),n.jsx("p",{children:"데이터 분석의 첫 단계는 데이터의 유형을 정확히 파악하는 것입니다. 데이터 유형에 따라 전처리, 분석 기법, 시각화 방법이 달라집니다."}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("strong",{children:"정형 데이터 (Structured)"})," — 행과 열로 구성된 테이블 형태. CSV, Excel, DB 테이블. Pandas로 직접 처리 가능"]}),n.jsxs("li",{children:[n.jsx("strong",{children:"비정형 데이터 (Unstructured)"})," — 텍스트, 이미지, 오디오, 비디오. NLP, 컴퓨터 비전 등 AI 기술로 처리"]}),n.jsxs("li",{children:[n.jsx("strong",{children:"반정형 데이터 (Semi-structured)"})," — JSON, XML, HTML. 일정한 구조는 있지만 테이블 형태는 아님"]})]}),n.jsx("h2",{children:"수치형 데이터 (연속형/이산형)"}),n.jsx("p",{children:"수치형 데이터는 산술 연산이 가능한 데이터입니다. 연속형은 소수점이 의미 있고(키, 무게, 온도), 이산형은 정수값만 가능합니다(자녀수, 주문수)."}),n.jsx(d,{title:"수치형 데이터: 연속형 vs 이산형",initialCode:a}),n.jsx("h2",{children:"범주형 데이터 (명목형/순서형)"}),n.jsx("p",{children:"범주형 데이터는 카테고리를 나타냅니다. 명목형은 순서가 없고(성별, 혈액형), 순서형은 순서가 있습니다(학력, 만족도)."}),n.jsx(d,{title:"범주형 데이터: 명목형 vs 순서형",initialCode:i}),n.jsx("h2",{children:"날짜/시간 데이터"}),n.jsx("p",{children:"날짜 데이터는 시계열 분석의 기본입니다. Pandas의 datetime 타입으로 연/월/일/요일 추출, 필터링, 차이 계산이 가능합니다."}),n.jsx(d,{title:"날짜/시간 데이터 다루기",initialCode:e}),n.jsx("h2",{children:"데이터 타입 변환"}),n.jsx("p",{children:"실무 데이터는 문자열로 된 숫자, 콤마가 포함된 금액 등 타입이 맞지 않는 경우가 많습니다. 분석 전에 적절한 타입으로 변환해야 합니다."}),n.jsx(d,{title:"데이터 타입 변환",initialCode:s}),n.jsx("h2",{children:"스케일링과 정규화"}),n.jsx("p",{children:"변수마다 단위와 범위가 다르면 머신러닝 모델의 성능에 영향을 줍니다. 스케일링으로 범위를 통일합니다."}),n.jsx(d,{title:"스케일링과 정규화",initialCode:p}),n.jsxs("div",{className:"callout-box",children:[n.jsx("h3",{children:"데이터 유형 판단 가이드"}),n.jsx("p",{children:"수치형 데이터는 산술 연산이 가능한지, 범주형은 카테고리 구분이 목적인지를 기준으로 판단합니다. 예를 들어 우편번호, 전화번호는 숫자이지만 범주형 데이터입니다. 데이터 타입을 잘못 설정하면 분석 결과가 왜곡될 수 있으므로 항상 먼저 확인하세요."})]}),n.jsxs("div",{className:"lesson-nav",children:[n.jsx(t,{to:"/intro/chatgpt",className:"lesson-nav-btn prev",children:"← 이전: ChatGPT 활용"}),n.jsx(t,{to:"/intro/chart-types",className:"lesson-nav-btn next",children:"다음: 그래프의 종류 →"})]})]})})})]})}export{f as default};
