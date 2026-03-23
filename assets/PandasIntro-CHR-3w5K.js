import{j as s,L as e}from"./index-B8uGYw0u.js";import{S as a}from"./SEOHead-DybdTxSk.js";function r(){return s.jsxs(s.Fragment,{children:[s.jsx(a,{title:"Pandas 입문",description:"데이터 처리의 핵심 라이브러리 Pandas 사용법을 배웁니다."}),s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"Pandas 입문"}),s.jsx("p",{children:"데이터 처리의 핵심 라이브러리 Pandas 사용법을 배웁니다"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsx("h2",{children:"Pandas란?"}),s.jsx("p",{children:"Pandas는 Python에서 데이터 조작과 분석을 위한 핵심 라이브러리입니다. 테이블 형태의 데이터(DataFrame)를 직관적으로 처리할 수 있어, 엑셀과 유사하면서도 훨씬 강력한 기능을 제공합니다."}),s.jsx("h2",{children:"DataFrame 생성"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Python"}),s.jsx("pre",{children:s.jsx("code",{children:`import pandas as pd

# 딕셔너리로 DataFrame 생성
data = {
    '이름': ['김철수', '이영희', '박민수', '정수연'],
    '나이': [28, 32, 25, 30],
    '부서': ['마케팅', '개발', '마케팅', '기획'],
    '매출': [1500, 2200, 1800, 1600]
}
df = pd.DataFrame(data)
print(df)

# CSV 파일에서 읽기
# df = pd.read_csv('data.csv')

# 기본 정보 확인
print(df.shape)      # (4, 4) - 행, 열
print(df.dtypes)     # 각 열의 데이터 타입
print(df.describe()) # 기술 통계`})})]}),s.jsx("h2",{children:"데이터 선택과 필터링"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Python"}),s.jsx("pre",{children:s.jsx("code",{children:`# 열 선택
names = df['이름']              # Series 반환
subset = df[['이름', '매출']]   # DataFrame 반환

# 조건 필터링
marketing = df[df['부서'] == '마케팅']
high_sales = df[df['매출'] >= 1700]
young_marketing = df[(df['나이'] < 30) & (df['부서'] == '마케팅')]

# loc: 라벨 기반 인덱싱
print(df.loc[0, '이름'])        # '김철수'
print(df.loc[0:2, ['이름', '매출']])

# iloc: 위치 기반 인덱싱
print(df.iloc[0, 0])           # '김철수'
print(df.iloc[:3, :2])`})})]}),s.jsx("h2",{children:"데이터 집계와 그룹화"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Python"}),s.jsx("pre",{children:s.jsx("code",{children:`# 부서별 매출 평균
dept_avg = df.groupby('부서')['매출'].mean()
print(dept_avg)

# 여러 집계 함수 동시 적용
dept_stats = df.groupby('부서')['매출'].agg(['mean', 'sum', 'count'])
print(dept_stats)

# 정렬
df_sorted = df.sort_values('매출', ascending=False)
print(df_sorted)

# 새로운 열 추가
df['매출_등급'] = df['매출'].apply(
    lambda x: '상' if x >= 2000 else ('중' if x >= 1600 else '하')
)
print(df)`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"Pandas 핵심 요약"}),s.jsx("p",{children:"DataFrame은 엑셀의 시트와 유사한 2차원 테이블입니다. read_csv()로 데이터를 읽고, groupby()로 집계하며, loc/iloc로 원하는 데이터를 선택합니다. 이 세 가지만 익히면 대부분의 데이터 처리가 가능합니다."})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/intro/python-basics",className:"lesson-nav-btn prev",children:"← 이전: Python 기초"}),s.jsx(e,{to:"/intro/chatgpt",className:"lesson-nav-btn next",children:"다음: ChatGPT 활용 →"})]})]})})})]})}export{r as default};
