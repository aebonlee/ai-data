import{j as e,L as s}from"./index-DmRG6s6h.js";import{S as d}from"./SEOHead-CJfs5uU7.js";function c(){return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Pandas 팁",description:"Pandas 고급 기능과 성능 최적화 테크닉"}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"Pandas 팁"}),e.jsx("p",{children:"Pandas 고급 기능과 성능 최적화 테크닉"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("h2",{children:"1. 메서드 체이닝"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import pandas as pd

# 메서드 체이닝으로 깔끔하게
result = (
    df
    .query('매출 > 1000')
    .groupby('카테고리')['매출']
    .agg(['mean', 'sum', 'count'])
    .sort_values('sum', ascending=False)
    .head(10)
)

# assign으로 새 컬럼 추가하며 체이닝
result = (
    df
    .assign(매출등급=lambda x: pd.cut(x['매출'], bins=[0, 1000, 5000, float('inf')], labels=['하', '중', '상']))
    .groupby('매출등급')
    .size()
)`})})]}),e.jsx("h2",{children:"2. apply vs 벡터 연산"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# 느린 방법: apply
df['할인가'] = df['가격'].apply(lambda x: x * 0.9)

# 빠른 방법: 벡터 연산
df['할인가'] = df['가격'] * 0.9

# 조건부 값 설정
# 느린 방법
df['등급'] = df['매출'].apply(lambda x: 'A' if x >= 5000 else 'B')

# 빠른 방법: np.where
import numpy as np
df['등급'] = np.where(df['매출'] >= 5000, 'A', 'B')

# 여러 조건: np.select
conditions = [df['매출'] >= 5000, df['매출'] >= 2000]
choices = ['A', 'B']
df['등급'] = np.select(conditions, choices, default='C')`})})]}),e.jsx("h2",{children:"3. 유용한 함수들"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# value_counts - 빈도 분석의 핵심
df['카테고리'].value_counts()                    # 빈도수
df['카테고리'].value_counts(normalize=True)       # 비율
df['카테고리'].value_counts().head(5)             # 상위 5

# crosstab - 교차표
pd.crosstab(df['지역'], df['카테고리'], margins=True)

# pivot_table - 엑셀 피벗테이블
pd.pivot_table(df, values='매출', index='지역',
               columns='카테고리', aggfunc='mean')

# cut / qcut - 구간 나누기
df['매출구간'] = pd.cut(df['매출'], bins=5)         # 균등 구간
df['매출분위'] = pd.qcut(df['매출'], q=4, labels=['Q1','Q2','Q3','Q4'])  # 분위수`})})]}),e.jsx("h2",{children:"4. 메모리 최적화"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# 데이터 타입 최적화
print(df.memory_usage(deep=True))

# 범주형으로 변환 (문자열 → category)
for col in df.select_dtypes(include='object'):
    if df[col].nunique() / len(df) < 0.5:
        df[col] = df[col].astype('category')

# 정수 타입 다운캐스트
df['수량'] = pd.to_numeric(df['수량'], downcast='integer')

print(f"최적화 후: {df.memory_usage(deep=True).sum() / 1024:.0f} KB")`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"Pandas 성능 팁"}),e.jsx("p",{children:"가능하면 apply 대신 벡터 연산을 사용하세요. 대용량 데이터는 category 타입으로 변환하면 메모리를 절약합니다. query()와 eval()은 복잡한 조건에서 더 읽기 쉽습니다."})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/tips/python",className:"lesson-nav-btn prev",children:"← 이전: Python 팁"}),e.jsx(s,{to:"/tips/visualization",className:"lesson-nav-btn next",children:"다음: 시각화 팁 →"})]})]})})})]})}export{c as default};
