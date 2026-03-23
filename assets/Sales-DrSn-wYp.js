import{j as e,L as t}from"./index-p8N1kvnq.js";import{S as a}from"./SEOHead-CNpWiLys.js";import{C as s}from"./CodeEditor-CM0ArTsA.js";const i=`import numpy as np
import pandas as pd

np.random.seed(42)

# 매출 데이터 생성 (6개월, 일별 30~80건)
dates = pd.date_range('2024-01-01', periods=180, freq='D')
categories = ['전자제품', '의류', '식품', '가구', '도서']
channels = ['온라인', '오프라인', '모바일']
regions = ['서울', '경기', '부산', '대구', '인천']

rows = []
for date in dates:
    n_orders = np.random.randint(30, 80)
    for _ in range(n_orders):
        cat = np.random.choice(categories, p=[0.25, 0.2, 0.2, 0.15, 0.2])
        channel = np.random.choice(channels, p=[0.4, 0.25, 0.35])
        region = np.random.choice(regions, p=[0.3, 0.25, 0.2, 0.15, 0.1])
        price = np.random.randint(5000, 200000)
        qty = np.random.randint(1, 5)
        rows.append({
            '날짜': date, '카테고리': cat, '채널': channel,
            '지역': region, '단가': price, '수량': qty,
            '매출': price * qty
        })

df = pd.DataFrame(rows)
df['고객ID'] = np.random.randint(1000, 5000, len(df))
print(f"데이터 크기: {df.shape}")
print(f"기간: {df['날짜'].min().date()} ~ {df['날짜'].max().date()}")
print(f"\\n[처음 10행]")
print(df.head(10))
print(f"\\n[기술통계]")
print(df.describe().round(0))`,l=`# 결측치/이상치 확인 및 파생변수 생성
print("[결측치 확인]")
print(df.isnull().sum())

# 이상치 확인 (IQR)
Q1 = df['매출'].quantile(0.25)
Q3 = df['매출'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['매출'] < Q1 - 1.5*IQR) | (df['매출'] > Q3 + 1.5*IQR)]
print(f"\\n매출 이상치: {len(outliers)}건 ({len(outliers)/len(df)*100:.1f}%)")

# 파생변수
df['연'] = df['날짜'].dt.year
df['월'] = df['날짜'].dt.month
df['요일'] = df['날짜'].dt.day_name()
df['주말'] = df['날짜'].dt.dayofweek >= 5

print(f"\\n[파생변수 추가 후]")
print(df[['날짜', '월', '요일', '주말', '카테고리', '매출']].head())`,n=`import matplotlib.pyplot as plt

# 월별 매출 추이
monthly = df.groupby('월')['매출'].sum()

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 월별 총매출
axes[0].plot(monthly.index, monthly.values, marker='o', color='#6366f1', linewidth=2)
axes[0].fill_between(monthly.index, monthly.values, alpha=0.1, color='#6366f1')
axes[0].set_title('월별 총 매출 추이', fontsize=13, fontweight='bold')
axes[0].set_xlabel('월')
axes[0].set_ylabel('매출 (원)')
axes[0].grid(True, alpha=0.3)

# 일별 매출 + 이동평균
daily = df.groupby('날짜')['매출'].sum()
axes[1].plot(daily.index, daily.values, alpha=0.3, color='#6366f1', label='일별')
ma = daily.rolling(7).mean()
axes[1].plot(ma.index, ma.values, color='#ef4444', linewidth=2, label='7일 이동평균')
axes[1].set_title('일별 매출 추이', fontsize=13, fontweight='bold')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`,o=`import matplotlib.pyplot as plt

# 카테고리 분석
cat_sales = df.groupby('카테고리').agg(
    총매출=('매출', 'sum'),
    주문수=('매출', 'count'),
    평균매출=('매출', 'mean')
).sort_values('총매출', ascending=False)

print("[카테고리별 분석]")
print(cat_sales.round(0))

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']
cat_sales['총매출'].plot(kind='bar', ax=axes[0], color=colors)
axes[0].set_title('카테고리별 총 매출', fontweight='bold')
axes[0].tick_params(axis='x', rotation=45)

cat_sales['총매출'].plot(kind='pie', ax=axes[1], autopct='%1.1f%%', colors=colors)
axes[1].set_title('매출 비중', fontweight='bold')
axes[1].set_ylabel('')

# 월별 x 카테고리 히트맵
pivot = df.pivot_table(values='매출', index='카테고리', columns='월', aggfunc='sum')
import seaborn as sns
sns.heatmap(pivot, annot=True, fmt=',.0f', cmap='YlOrRd', ax=axes[2])
axes[2].set_title('카테고리 x 월별 매출', fontweight='bold')

plt.tight_layout()
plt.show()`,d=`import matplotlib.pyplot as plt

# 고객 분석
customer = df.groupby('고객ID').agg(
    구매횟수=('매출', 'count'),
    총매출=('매출', 'sum'),
    평균매출=('매출', 'mean'),
    첫구매=('날짜', 'min'),
    최근구매=('날짜', 'max')
)
customer['구매기간'] = (customer['최근구매'] - customer['첫구매']).dt.days

print(f"[고객 분석]")
print(f"전체 고객 수: {len(customer):,}명")
print(f"1인당 평균 구매횟수: {customer['구매횟수'].mean():.1f}회")
print(f"1인당 평균 총매출: {customer['총매출'].mean():,.0f}원")
print(f"\\n[상위 10 고객]")
print(customer.sort_values('총매출', ascending=False).head(10)[['구매횟수', '총매출', '평균매출']])

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].hist(customer['구매횟수'], bins=20, color='#6366f1', edgecolor='white')
axes[0].set_title('고객별 구매 횟수 분포', fontweight='bold')
axes[0].set_xlabel('구매 횟수')

axes[1].hist(customer['총매출'], bins=20, color='#10b981', edgecolor='white')
axes[1].set_title('고객별 총 매출 분포', fontweight='bold')
axes[1].set_xlabel('총 매출 (원)')

plt.tight_layout()
plt.show()`,r=`import matplotlib.pyplot as plt

# 요일별 패턴 분석
weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
weekday_kr = ['월', '화', '수', '목', '금', '토', '일']

wd = df.groupby('요일').agg(
    총매출=('매출', 'sum'),
    평균매출=('매출', 'mean'),
    주문수=('매출', 'count')
).reindex(weekday_order)
wd.index = weekday_kr

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

colors_wd = ['#6366f1']*5 + ['#ef4444']*2
axes[0].bar(wd.index, wd['총매출'], color=colors_wd)
axes[0].set_title('요일별 총 매출', fontweight='bold')
axes[0].set_ylabel('매출 (원)')

# 채널별 매출
ch = df.groupby('채널')['매출'].sum().sort_values(ascending=False)
axes[1].bar(ch.index, ch.values, color=['#6366f1', '#10b981', '#f59e0b'])
axes[1].set_title('채널별 총 매출', fontweight='bold')
axes[1].set_ylabel('매출 (원)')

plt.tight_layout()
plt.show()

# 주말/평일 비교
print("[주말 vs 평일]")
weekend = df.groupby('주말')['매출'].agg(['sum', 'mean', 'count'])
weekend.index = ['평일', '주말']
print(weekend.round(0))`,p=`import matplotlib.pyplot as plt

# 종합 대시보드
fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# 1) 월별 매출 추이
monthly = df.groupby('월')['매출'].sum()
axes[0,0].plot(monthly.index, monthly.values, marker='o', color='#6366f1', linewidth=2)
axes[0,0].set_title('월별 매출 추이')
axes[0,0].grid(True, alpha=0.3)

# 2) 카테고리별 매출
cat = df.groupby('카테고리')['매출'].sum().sort_values()
axes[0,1].barh(cat.index, cat.values, color='#8b5cf6')
axes[0,1].set_title('카테고리별 매출')

# 3) 채널 비중
ch = df.groupby('채널')['매출'].sum()
axes[0,2].pie(ch.values, labels=ch.index, autopct='%1.1f%%',
              colors=['#6366f1', '#10b981', '#f59e0b'])
axes[0,2].set_title('채널별 매출 비중')

# 4) 지역별 매출
reg = df.groupby('지역')['매출'].sum().sort_values(ascending=False)
axes[1,0].bar(reg.index, reg.values, color=['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'])
axes[1,0].set_title('지역별 매출')
axes[1,0].tick_params(axis='x', rotation=45)

# 5) 요일별 매출
weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
wd = df.groupby('요일')['매출'].sum().reindex(weekday_order)
wd.index = ['월', '화', '수', '목', '금', '토', '일']
axes[1,1].bar(wd.index, wd.values, color=['#6366f1']*5 + ['#ef4444']*2)
axes[1,1].set_title('요일별 매출')

# 6) KPI
axes[1,2].axis('off')
daily = df.groupby('날짜')['매출'].sum()
kpi = f"""총 매출: {df['매출'].sum():,.0f}원
일평균: {daily.mean():,.0f}원
고객 수: {df['고객ID'].nunique():,}명
주문 수: {len(df):,}건
평균 단가: {df['매출'].mean():,.0f}원
최고 매출일: {daily.idxmax().strftime('%Y-%m-%d')}"""
axes[1,2].text(0.1, 0.5, kpi, fontsize=12, verticalalignment='center',
               fontfamily='monospace', bbox=dict(boxstyle='round', facecolor='#f0f0f0'))
axes[1,2].set_title('핵심 KPI')

plt.suptitle('매출 분석 종합 대시보드', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()`;function h(){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"매출 데이터 분석",description:"실제 매출 데이터를 활용한 종합 분석 프로젝트를 수행합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"매출 데이터 분석"}),e.jsx("p",{children:"실제 매출 데이터를 활용한 종합 분석 프로젝트를 수행합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsx("p",{children:"6개월간의 온라인 쇼핑몰 매출 데이터를 생성하고, 매출 트렌드, 카테고리 분석, 고객 분석, 요일 패턴, 종합 대시보드를 만듭니다."})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsx("p",{children:"가상의 온라인 쇼핑몰 6개월(180일) 매출 데이터입니다:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"날짜"})," — 주문 날짜 (2024-01-01 ~ 2024-06-28)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"카테고리"})," — 전자제품, 의류, 식품, 가구, 도서"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"채널"})," — 온라인, 오프라인, 모바일"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"지역"})," — 서울, 경기, 부산, 대구, 인천"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"단가/수량/매출"})," — 매출 = 단가 x 수량"]})]}),e.jsx("h2",{children:"1단계: 데이터 생성"}),e.jsx("p",{children:"numpy로 랜덤 데이터를 생성하고 기본 구조를 확인합니다."}),e.jsx(s,{title:"1단계: 데이터 생성",initialCode:i}),e.jsx("h2",{children:"2단계: 전처리"}),e.jsx("p",{children:"결측치/이상치를 확인하고 날짜 파생변수를 생성합니다."}),e.jsx(s,{title:"2단계: 전처리",initialCode:l}),e.jsx("h2",{children:"3단계: 매출 트렌드"}),e.jsx("p",{children:"월별/일별 매출 추이와 이동평균으로 트렌드를 파악합니다."}),e.jsx(s,{title:"3단계: 매출 트렌드",initialCode:n}),e.jsx("h2",{children:"4단계: 카테고리 분석"}),e.jsx("p",{children:"카테고리별 매출 비중과 월별 변화를 분석합니다."}),e.jsx(s,{title:"4단계: 카테고리 분석",initialCode:o}),e.jsx("h2",{children:"5단계: 고객 분석"}),e.jsx("p",{children:"고객별 구매 패턴과 상위 고객을 분석합니다."}),e.jsx(s,{title:"5단계: 고객 분석",initialCode:d}),e.jsx("h2",{children:"6단계: 요일 패턴"}),e.jsx("p",{children:"요일별/채널별 매출 패턴을 파악합니다."}),e.jsx(s,{title:"6단계: 요일 패턴",initialCode:r}),e.jsx("h2",{children:"7단계: 종합 대시보드"}),e.jsx("p",{children:"모든 분석 결과를 하나의 대시보드로 구성합니다."}),e.jsx(s,{title:"7단계: 종합 대시보드",initialCode:p}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(t,{to:"/learn/regression",className:"lesson-nav-btn prev",children:"← 이전: 회귀 분석"}),e.jsx(t,{to:"/practice/customer",className:"lesson-nav-btn next",children:"다음: 고객 데이터 분석 →"})]})]})})})]})}export{h as default};
