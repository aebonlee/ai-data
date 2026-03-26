import{j as n,L as t}from"./index-tyjzxV2o.js";import{S as a}from"./SEOHead-4-PSmMus.js";import{C as e}from"./CodeEditor-DDWdqFEU.js";const d=`import pandas as pd

# 딕셔너리로 DataFrame 생성
data = {
    '이름': ['김철수', '이영희', '박민수', '정수연', '최진호'],
    '나이': [28, 32, 25, 30, 35],
    '부서': ['마케팅', '개발', '마케팅', '기획', '개발'],
    '매출': [1500, 2200, 1800, 1600, 2500],
    '입사년도': [2020, 2018, 2022, 2019, 2017]
}
df = pd.DataFrame(data)

# 기본 탐색
print("[DataFrame 생성]")
print(df)
print(f"\\n크기: {df.shape} (행: {df.shape[0]}, 열: {df.shape[1]})")
print(f"컬럼: {list(df.columns)}")
print(f"\\n[데이터 타입]")
print(df.dtypes)
print(f"\\n[기술 통계]")
print(df.describe())
print(f"\\n[정보 요약]")
print(df.info())`,r=`import pandas as pd

df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수', '정수연', '최진호'],
    '나이': [28, 32, 25, 30, 35],
    '부서': ['마케팅', '개발', '마케팅', '기획', '개발'],
    '매출': [1500, 2200, 1800, 1600, 2500]
})

# loc: 라벨 기반 인덱싱
print("[loc - 라벨 기반]")
print(df.loc[0, '이름'])
print()
print(df.loc[0:2, ['이름', '매출']])

# iloc: 위치 기반 인덱싱
print("\\n[iloc - 위치 기반]")
print(df.iloc[0, 0])
print()
print(df.iloc[:3, :2])

# 불리언 인덱싱 (조건 필터링)
print("\\n[불리언 인덱싱]")
marketing = df[df['부서'] == '마케팅']
print("마케팅 부서:")
print(marketing)

high_sales = df[df['매출'] >= 1800]
print("\\n매출 1800 이상:")
print(high_sales)

# 복합 조건
young_marketing = df[(df['나이'] < 30) & (df['부서'] == '마케팅')]
print("\\n30세 미만 & 마케팅:")
print(young_marketing)

# isin() 활용
print("\\n[isin 필터링]")
target_depts = df[df['부서'].isin(['마케팅', '기획'])]
print(target_depts)`,i=`import pandas as pd

df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수', '정수연', '최진호'],
    '나이': [28, 32, 25, 30, 35],
    '부서': ['마케팅', '개발', '마케팅', '기획', '개발'],
    '매출': [1500, 2200, 1800, 1600, 2500]
})

# 새 열 추가
df['매출등급'] = df['매출'].apply(lambda x: '상' if x >= 2000 else ('중' if x >= 1600 else '하'))
print("[apply - 매출 등급 추가]")
print(df)

# map으로 값 변환
dept_eng = {'마케팅': 'Marketing', '개발': 'Development', '기획': 'Planning'}
df['부서_EN'] = df['부서'].map(dept_eng)
print("\\n[map - 부서명 영문 변환]")
print(df)

# 열 삭제
df_clean = df.drop(columns=['부서_EN'])

# 조건부 값 수정
df.loc[df['매출'] < 1600, '매출'] = 1600
print("\\n[조건부 수정 - 최소 매출 1600 보장]")
print(df[['이름', '매출']])`,s=`import pandas as pd

df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수', '정수연', '최진호', '한지민'],
    '부서': ['마케팅', '개발', '마케팅', '기획', '개발', '기획'],
    '매출': [1500, 2200, 1800, 1600, 2500, 1900],
    '고객수': [30, 45, 35, 28, 50, 32]
})

# 기본 groupby
print("[부서별 매출 평균]")
print(df.groupby('부서')['매출'].mean())

# 여러 집계 함수
print("\\n[부서별 다중 집계]")
dept_stats = df.groupby('부서').agg(
    인원=('이름', 'count'),
    평균매출=('매출', 'mean'),
    총매출=('매출', 'sum'),
    최고매출=('매출', 'max'),
    평균고객=('고객수', 'mean')
).round(0)
print(dept_stats)

# 비율 계산
dept_stats['매출비중'] = (dept_stats['총매출'] / dept_stats['총매출'].sum() * 100).round(1)
print("\\n[매출 비중 추가]")
print(dept_stats)`,p=`import pandas as pd

df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수', '정수연', '최진호'],
    '매출': [1500, 2200, 1800, 1600, 2500],
    '고객수': [30, 45, 35, 28, 50]
})

# 정렬
print("[매출 기준 내림차순 정렬]")
print(df.sort_values('매출', ascending=False))

# 랭킹
df['매출순위'] = df['매출'].rank(ascending=False).astype(int)
df['고객순위'] = df['고객수'].rank(ascending=False).astype(int)
print("\\n[순위 추가]")
print(df)

# 누적합/누적비율
df_sorted = df.sort_values('매출', ascending=False).reset_index(drop=True)
df_sorted['누적매출'] = df_sorted['매출'].cumsum()
df_sorted['누적비율'] = (df_sorted['누적매출'] / df_sorted['매출'].sum() * 100).round(1)
print("\\n[파레토 분석 - 누적 비율]")
print(df_sorted[['이름', '매출', '누적매출', '누적비율']])`,o=`import pandas as pd

# 두 개의 DataFrame
employees = pd.DataFrame({
    '사원ID': [1, 2, 3, 4, 5],
    '이름': ['김철수', '이영희', '박민수', '정수연', '최진호'],
    '부서ID': [10, 20, 10, 30, 20]
})

departments = pd.DataFrame({
    '부서ID': [10, 20, 30, 40],
    '부서명': ['마케팅', '개발', '기획', '영업']
})

# merge (SQL의 JOIN과 동일)
print("[merge - inner join]")
merged = pd.merge(employees, departments, on='부서ID')
print(merged)

print("\\n[merge - left join]")
merged_left = pd.merge(employees, departments, on='부서ID', how='left')
print(merged_left)

# concat (행/열 방향 결합)
df1 = pd.DataFrame({'이름': ['A', 'B'], '점수': [90, 85]})
df2 = pd.DataFrame({'이름': ['C', 'D'], '점수': [78, 92]})

print("\\n[concat - 행 방향 결합]")
combined = pd.concat([df1, df2], ignore_index=True)
print(combined)

# 실무 활용: 월별 데이터 결합
jan = pd.DataFrame({'제품': ['A', 'B', 'C'], '1월매출': [100, 200, 150]})
feb = pd.DataFrame({'제품': ['A', 'B', 'C'], '2월매출': [120, 180, 170]})
print("\\n[merge - 월별 데이터 결합]")
monthly = pd.merge(jan, feb, on='제품')
monthly['증감률'] = ((monthly['2월매출'] - monthly['1월매출']) / monthly['1월매출'] * 100).round(1)
print(monthly)`;function f(){return n.jsxs(n.Fragment,{children:[n.jsx(a,{title:"Pandas 기초",description:"데이터 처리의 핵심 라이브러리 Pandas 사용법을 배웁니다."}),n.jsx("section",{className:"page-header",children:n.jsxs("div",{className:"container",children:[n.jsx("h1",{children:"Pandas 기초"}),n.jsx("p",{children:"데이터 처리의 핵심 라이브러리 Pandas 사용법을 배웁니다"})]})}),n.jsx("section",{className:"section lesson-content",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"playground-body",children:[n.jsx("h2",{children:"Pandas란?"}),n.jsx("p",{children:"Pandas는 Python에서 데이터 조작과 분석을 위한 핵심 라이브러리입니다. 테이블 형태의 데이터(DataFrame)를 직관적으로 처리할 수 있어, 엑셀과 유사하면서도 훨씬 강력한 기능을 제공합니다."}),n.jsx("h2",{children:"DataFrame 생성과 탐색"}),n.jsx("p",{children:"DataFrame은 행과 열로 구성된 2차원 테이블입니다. 딕셔너리, CSV 파일, 데이터베이스 등에서 생성할 수 있습니다."}),n.jsx(e,{title:"DataFrame 생성과 탐색",initialCode:d}),n.jsx("h2",{children:"인덱싱: loc, iloc, 불리언"}),n.jsx("p",{children:"loc는 라벨(이름) 기반, iloc는 위치(번호) 기반 인덱싱입니다. 불리언 인덱싱으로 조건에 맞는 데이터를 필터링합니다."}),n.jsx(e,{title:"인덱싱: loc / iloc / 불리언",initialCode:r}),n.jsx("h2",{children:"데이터 수정과 추가: apply, map"}),n.jsx("p",{children:"apply()는 함수를 행/열에 적용하고, map()은 값을 매핑합니다. 새로운 파생 변수를 만들 때 핵심적으로 사용됩니다."}),n.jsx(e,{title:"데이터 수정과 추가: apply, map",initialCode:i}),n.jsx("h2",{children:"groupby 집계"}),n.jsx("p",{children:"groupby()는 SQL의 GROUP BY와 동일한 기능으로, 그룹별 통계를 계산합니다. 데이터 분석에서 가장 많이 사용되는 기능 중 하나입니다."}),n.jsx(e,{title:"groupby 집계",initialCode:s}),n.jsx("h2",{children:"정렬과 랭킹"}),n.jsx("p",{children:"sort_values()로 정렬하고, rank()로 순위를 매깁니다. 파레토 분석(누적 비율)도 쉽게 구현할 수 있습니다."}),n.jsx(e,{title:"정렬과 랭킹",initialCode:p}),n.jsx("h2",{children:"데이터 결합: merge와 concat"}),n.jsx("p",{children:"merge()는 공통 키를 기준으로 두 테이블을 결합(JOIN)하고, concat()은 단순히 행 또는 열 방향으로 합칩니다."}),n.jsx(e,{title:"데이터 결합: merge / concat",initialCode:o}),n.jsxs("div",{className:"callout-box",children:[n.jsx("h3",{children:"Pandas 핵심 요약"}),n.jsx("p",{children:"DataFrame은 엑셀의 시트와 유사한 2차원 테이블입니다. read_csv()로 데이터를 읽고, groupby()로 집계하며, loc/iloc로 원하는 데이터를 선택합니다. merge()로 테이블을 결합하면 대부분의 데이터 처리가 가능합니다."})]}),n.jsxs("div",{className:"lesson-nav",children:[n.jsx(t,{to:"/intro/python-basics",className:"lesson-nav-btn prev",children:"← 이전: Python 기초"}),n.jsx(t,{to:"/intro/chatgpt",className:"lesson-nav-btn next",children:"다음: ChatGPT 활용 →"})]})]})})})]})}export{f as default};
