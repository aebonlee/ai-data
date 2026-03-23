import{j as e,L as s}from"./index-B8uGYw0u.js";import{S as a}from"./SEOHead-DybdTxSk.js";function r(){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"데이터 전처리",description:"결측치 처리, 이상치 탐지, 데이터 변환 기법을 학습합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"데이터 전처리"}),e.jsx("p",{children:"결측치 처리, 이상치 탐지, 데이터 변환 기법을 학습합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("h2",{children:"전처리의 중요성"}),e.jsx("p",{children:'실무 데이터는 결측치, 이상치, 불일치 등 다양한 문제를 포함합니다. "Garbage In, Garbage Out" — 데이터 품질이 분석 결과의 품질을 결정합니다.'}),e.jsx("h2",{children:"결측치 처리"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import pandas as pd
import numpy as np

df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수', None, '정수연'],
    '나이': [28, None, 25, 30, None],
    '매출': [1500, 2200, None, 1600, 1900]
})

# 결측치 확인
print(df.isnull().sum())
print(f"전체 결측 비율: {df.isnull().mean().mean():.1%}")

# 삭제 방식
df_dropped = df.dropna()           # 결측치가 있는 행 삭제
df_dropped_col = df.dropna(axis=1) # 결측치가 있는 열 삭제

# 대체 방식
df['나이'].fillna(df['나이'].median(), inplace=True)  # 중앙값
df['매출'].fillna(df['매출'].mean(), inplace=True)    # 평균값
df['이름'].fillna('미상', inplace=True)               # 고정값

print(df)`})})]}),e.jsx("h2",{children:"이상치 탐지"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import numpy as np

data = pd.Series([10, 12, 11, 13, 12, 100, 11, 14, 10, 13])

# IQR 방식
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

outliers = data[(data < lower) | (data > upper)]
print(f"이상치: {outliers.values}")

# Z-Score 방식
z_scores = (data - data.mean()) / data.std()
outliers_z = data[abs(z_scores) > 2]
print(f"Z-Score 이상치: {outliers_z.values}")

# 이상치 제거
clean_data = data[(data >= lower) & (data <= upper)]
print(f"정제 후: {clean_data.values}")`})})]}),e.jsx("h2",{children:"데이터 인코딩"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# 레이블 인코딩 - 순서가 있는 범주형
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['등급_코드'] = le.fit_transform(df['등급'])

# 원-핫 인코딩 - 순서가 없는 범주형
df_encoded = pd.get_dummies(df, columns=['부서'])
print(df_encoded)`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"전처리 체크리스트"}),e.jsx("p",{children:"1) 결측치 비율 확인 → 2) 이상치 탐지 및 처리 → 3) 데이터 타입 변환 → 4) 범주형 인코딩 → 5) 수치형 스케일링. 이 순서를 따르면 체계적인 전처리가 가능합니다."})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/intro/data-types",className:"lesson-nav-btn prev",children:"← 이전: 데이터 유형 이해"}),e.jsx(s,{to:"/learn/eda",className:"lesson-nav-btn next",children:"다음: 탐색적 데이터 분석 →"})]})]})})})]})}export{r as default};
