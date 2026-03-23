import{j as e,L as s}from"./index-DAlmi_oC.js";import{S as d}from"./SEOHead-C6b6LcCk.js";function l(){return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"매출 데이터 분석",description:"실제 매출 데이터를 활용한 분석 프로젝트를 수행합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"매출 데이터 분석"}),e.jsx("p",{children:"실제 매출 데이터를 활용한 분석 프로젝트를 수행합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("h2",{children:"프로젝트 개요"}),e.jsx("p",{children:"온라인 쇼핑몰의 매출 데이터를 분석하여 매출 트렌드 파악, 핵심 고객 세그먼트 발견, 매출 예측 모델을 구축합니다."}),e.jsx("h2",{children:"1단계: 데이터 로딩 및 탐색"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 데이터 로딩
df = pd.read_csv('online_sales.csv')

# 기본 탐색
print(f"데이터 크기: {df.shape}")
print(f"컬럼: {list(df.columns)}")
print(df.head())
print(df.describe())

# 날짜 변환
df['order_date'] = pd.to_datetime(df['order_date'])
df['year'] = df['order_date'].dt.year
df['month'] = df['order_date'].dt.month
df['weekday'] = df['order_date'].dt.day_name()`})})]}),e.jsx("h2",{children:"2단계: 매출 트렌드 분석"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# 월별 매출 추이
monthly = df.groupby(df['order_date'].dt.to_period('M'))['revenue'].sum()

plt.figure(figsize=(12, 5))
monthly.plot(kind='line', marker='o', color='#6366f1')
plt.title('월별 매출 추이')
plt.ylabel('매출액')
plt.grid(True, alpha=0.3)
plt.show()

# 요일별 매출 패턴
weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
weekday_sales = df.groupby('weekday')['revenue'].mean().reindex(weekday_order)

plt.figure(figsize=(10, 5))
weekday_sales.plot(kind='bar', color='steelblue')
plt.title('요일별 평균 매출')
plt.xticks(rotation=45)
plt.show()`})})]}),e.jsx("h2",{children:"3단계: 카테고리 분석"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# 카테고리별 매출 비중
category_sales = df.groupby('category')['revenue'].sum().sort_values(ascending=False)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
category_sales.plot(kind='bar', ax=axes[0], color='#6366f1')
axes[0].set_title('카테고리별 총 매출')

category_sales.plot(kind='pie', ax=axes[1], autopct='%1.1f%%')
axes[1].set_title('매출 비중')
plt.tight_layout()
plt.show()

# 카테고리별 평균 주문 금액
cat_avg = df.groupby('category').agg(
    평균매출=('revenue', 'mean'),
    주문수=('order_id', 'count'),
    총매출=('revenue', 'sum')
).sort_values('총매출', ascending=False)
print(cat_avg)`})})]}),e.jsx("h2",{children:"4단계: 인사이트 정리"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# 핵심 지표 요약
print("=" * 40)
print("매출 분석 핵심 인사이트")
print("=" * 40)
print(f"총 매출: {df['revenue'].sum():,.0f}원")
print(f"평균 주문 금액: {df['revenue'].mean():,.0f}원")
print(f"최고 매출 카테고리: {category_sales.index[0]}")
print(f"최고 매출 월: {monthly.idxmax()}")
print(f"고객 수: {df['customer_id'].nunique():,}명")`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"실습 과제"}),e.jsx("p",{children:'본인만의 매출 데이터(또는 Kaggle의 공개 데이터셋)를 활용하여 위 분석을 직접 수행해보세요. ChatGPT에게 "매출 데이터 EDA 코드를 작성해줘"라고 요청하면 출발점을 빠르게 만들 수 있습니다.'})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/learn/visualization",className:"lesson-nav-btn prev",children:"← 이전: AI 시각화 기법"}),e.jsx(s,{to:"/practice/customer",className:"lesson-nav-btn next",children:"다음: 고객 데이터 분석 →"})]})]})})})]})}export{l as default};
