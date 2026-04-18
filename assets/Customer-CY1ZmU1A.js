import{j as e,L as s}from"./index-Cdny89u7.js";import{S as n}from"./SEOHead-BXuTlAiM.js";import{C as t}from"./CodeEditor-Czw2WAP5.js";const r=`import numpy as np
import pandas as pd

np.random.seed(42)
n = 5000

# 고객 거래 데이터 생성
customer_ids = np.random.randint(1001, 2001, n)
dates = pd.date_range('2023-01-01', periods=365, freq='D')
order_dates = np.random.choice(dates, n)
amounts = np.random.lognormal(mean=10, sigma=1, size=n).round(0) * 100

df = pd.DataFrame({
    '고객ID': customer_ids,
    '주문일': order_dates,
    '주문금액': amounts,
    '카테고리': np.random.choice(['전자제품', '의류', '식품', '생활용품', '도서'], n, p=[0.2, 0.25, 0.2, 0.2, 0.15]),
    '채널': np.random.choice(['웹', '앱', '오프라인'], n, p=[0.4, 0.35, 0.25])
})
df['주문ID'] = range(1, n+1)
df = df.sort_values('주문일').reset_index(drop=True)

print(f"데이터 크기: {df.shape}")
print(f"기간: {df['주문일'].min().date()} ~ {df['주문일'].max().date()}")
print(f"고객 수: {df['고객ID'].nunique()}명")
print(f"\\n[처음 10행]")
print(df.head(10))
print(f"\\n[기술통계]")
print(df.describe().round(0))`,o=`import pandas as pd
import numpy as np

# RFM 계산
now = df['주문일'].max() + pd.Timedelta(days=1)

rfm = df.groupby('고객ID').agg(
    Recency=('주문일', lambda x: (now - x.max()).days),
    Frequency=('주문ID', 'nunique'),
    Monetary=('주문금액', 'sum')
).reset_index()

print("[RFM 기술통계]")
print(rfm[['Recency', 'Frequency', 'Monetary']].describe().round(1))

# RFM 점수 부여 (1~5)
rfm['R_score'] = pd.qcut(rfm['Recency'], 5, labels=[5, 4, 3, 2, 1]).astype(int)
rfm['F_score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5]).astype(int)
rfm['M_score'] = pd.qcut(rfm['Monetary'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5]).astype(int)

rfm['RFM_total'] = rfm['R_score'] + rfm['F_score'] + rfm['M_score']

print(f"\\n[RFM 점수 상위 10명]")
print(rfm.sort_values('RFM_total', ascending=False).head(10)[['고객ID', 'Recency', 'Frequency', 'Monetary', 'R_score', 'F_score', 'M_score', 'RFM_total']])`,a=`# 고객 세그먼트 분류
def classify_customer(row):
    r, f, m = row['R_score'], row['F_score'], row['M_score']
    if r >= 4 and f >= 4 and m >= 4:
        return 'VIP'
    elif r >= 4 and f >= 3:
        return '충성고객'
    elif r >= 3 and f <= 2:
        return '신규/잠재'
    elif r <= 2 and f >= 3:
        return '이탈위험'
    elif r <= 2 and f <= 2:
        return '이탈고객'
    else:
        return '일반고객'

rfm['세그먼트'] = rfm.apply(classify_customer, axis=1)

# 세그먼트별 통계
seg_stats = rfm.groupby('세그먼트').agg(
    고객수=('고객ID', 'count'),
    평균Recency=('Recency', 'mean'),
    평균Frequency=('Frequency', 'mean'),
    평균Monetary=('Monetary', 'mean'),
    총매출=('Monetary', 'sum')
).round(1)

seg_stats['매출비중(%)'] = (seg_stats['총매출'] / seg_stats['총매출'].sum() * 100).round(1)
seg_stats['고객비중(%)'] = (seg_stats['고객수'] / seg_stats['고객수'].sum() * 100).round(1)

print("[세그먼트별 상세 통계]")
print(seg_stats)
print(f"\\n전체 고객 수: {len(rfm)}명")`,i=`import matplotlib.pyplot as plt
import numpy as np

# 세그먼트 시각화
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1) 세그먼트별 고객 수
seg_counts = rfm['세그먼트'].value_counts()
colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b']
axes[0,0].bar(seg_counts.index, seg_counts.values, color=colors[:len(seg_counts)])
axes[0,0].set_title('세그먼트별 고객 수', fontweight='bold')
axes[0,0].tick_params(axis='x', rotation=45)

# 2) 세그먼트별 매출 비중
seg_revenue = rfm.groupby('세그먼트')['Monetary'].sum()
axes[0,1].pie(seg_revenue.values, labels=seg_revenue.index, autopct='%1.1f%%', colors=colors[:len(seg_revenue)])
axes[0,1].set_title('세그먼트별 매출 비중', fontweight='bold')

# 3) RFM 점수 분포
for col, color in [('R_score', '#6366f1'), ('F_score', '#10b981'), ('M_score', '#f59e0b')]:
    axes[1,0].hist(rfm[col], bins=5, alpha=0.5, label=col, color=color)
axes[1,0].set_title('RFM 점수 분포', fontweight='bold')
axes[1,0].legend()

# 4) Recency vs Monetary (세그먼트별)
for seg in rfm['세그먼트'].unique():
    mask = rfm['세그먼트'] == seg
    axes[1,1].scatter(rfm[mask]['Recency'], rfm[mask]['Monetary'], alpha=0.4, label=seg, s=15)
axes[1,1].set_title('Recency vs Monetary', fontweight='bold')
axes[1,1].set_xlabel('Recency (일)')
axes[1,1].set_ylabel('Monetary (원)')
axes[1,1].legend(fontsize=8)

plt.suptitle('고객 세그먼트 분석', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,l=`import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# 코호트 분석
df['주문월'] = df['주문일'].dt.to_period('M')
df['첫구매월'] = df.groupby('고객ID')['주문일'].transform('min').dt.to_period('M')
df['코호트인덱스'] = (df['주문월'] - df['첫구매월']).apply(lambda x: x.n if hasattr(x, 'n') else 0)

# 코호트 테이블
cohort = df.groupby(['첫구매월', '코호트인덱스'])['고객ID'].nunique().reset_index()
cohort.columns = ['코호트', '월차', '고객수']
cohort_pivot = cohort.pivot(index='코호트', columns='월차', values='고객수')

# 유지율 계산
cohort_sizes = cohort_pivot.iloc[:, 0]
retention = cohort_pivot.divide(cohort_sizes, axis=0) * 100

print("[코호트별 유지율 (%)]")
print(retention.round(1).head(6))

# 시각화
fig, ax = plt.subplots(figsize=(14, 6))
mask = ~retention.isnull()
im = ax.imshow(retention.values[:6, :8], cmap='YlOrRd', aspect='auto')

ax.set_yticks(range(6))
ax.set_yticklabels([str(p) for p in retention.index[:6]])
ax.set_xticks(range(min(8, retention.shape[1])))
ax.set_xticklabels([f'{i}개월' for i in range(min(8, retention.shape[1]))])
ax.set_title('코호트 유지율 히트맵', fontweight='bold', fontsize=14)
ax.set_xlabel('가입 후 경과 월')
ax.set_ylabel('가입 코호트')

for i in range(min(6, retention.shape[0])):
    for j in range(min(8, retention.shape[1])):
        val = retention.values[i, j]
        if not np.isnan(val):
            ax.text(j, i, f'{val:.0f}%', ha='center', va='center', fontsize=8)

plt.colorbar(im, ax=ax, label='유지율 (%)')
plt.tight_layout()
plt.show()`,c=`import numpy as np
import pandas as pd

# CLV (Customer Lifetime Value) 추정
customer_stats = df.groupby('고객ID').agg(
    총매출=('주문금액', 'sum'),
    주문횟수=('주문ID', 'nunique'),
    첫구매=('주문일', 'min'),
    최근구매=('주문일', 'max'),
    평균주문금액=('주문금액', 'mean')
).reset_index()

customer_stats['활동기간'] = (customer_stats['최근구매'] - customer_stats['첫구매']).dt.days
customer_stats['월평균구매'] = np.where(
    customer_stats['활동기간'] > 0,
    customer_stats['주문횟수'] / (customer_stats['활동기간'] / 30),
    customer_stats['주문횟수']
)

# 간단 CLV = 평균주문금액 x 월평균구매빈도 x 예상활동기간(12개월)
customer_stats['CLV_12m'] = (customer_stats['평균주문금액'] * customer_stats['월평균구매'] * 12).round(0)

print("[CLV 상위 20명]")
print(customer_stats.sort_values('CLV_12m', ascending=False).head(20)[['고객ID', '총매출', '주문횟수', '평균주문금액', '월평균구매', 'CLV_12m']])

print(f"\\n[CLV 통계]")
print(f"평균 CLV: {customer_stats['CLV_12m'].mean():,.0f}원")
print(f"중앙값 CLV: {customer_stats['CLV_12m'].median():,.0f}원")
print(f"상위 10% CLV: {customer_stats['CLV_12m'].quantile(0.9):,.0f}원")
print(f"하위 10% CLV: {customer_stats['CLV_12m'].quantile(0.1):,.0f}원")`,d=`import matplotlib.pyplot as plt
import numpy as np

# 종합 대시보드
fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# 1) 세그먼트 분포
seg_counts = rfm['세그먼트'].value_counts()
axes[0,0].barh(seg_counts.index, seg_counts.values, color='#6366f1')
axes[0,0].set_title('세그먼트별 고객 수')

# 2) 월별 매출 추이
monthly_rev = df.groupby(df['주문일'].dt.to_period('M'))['주문금액'].sum()
axes[0,1].plot(range(len(monthly_rev)), monthly_rev.values, marker='o', color='#ef4444')
axes[0,1].set_title('월별 매출 추이')
axes[0,1].set_xticks(range(0, len(monthly_rev), 2))
axes[0,1].set_xticklabels([str(p) for p in monthly_rev.index[::2]], rotation=45, fontsize=8)

# 3) RFM 총점 분포
axes[0,2].hist(rfm['RFM_total'], bins=12, color='#10b981', edgecolor='white')
axes[0,2].set_title('RFM 총점 분포')
axes[0,2].set_xlabel('RFM 총점')

# 4) 채널별 매출
ch = df.groupby('채널')['주문금액'].sum()
axes[1,0].pie(ch.values, labels=ch.index, autopct='%1.1f%%', colors=['#6366f1', '#10b981', '#f59e0b'])
axes[1,0].set_title('채널별 매출 비중')

# 5) 카테고리별 매출
cat = df.groupby('카테고리')['주문금액'].sum().sort_values()
axes[1,1].barh(cat.index, cat.values, color='#8b5cf6')
axes[1,1].set_title('카테고리별 매출')

# 6) 핵심 KPI
axes[1,2].axis('off')
vip_count = (rfm['세그먼트'] == 'VIP').sum()
churn_count = (rfm['세그먼트'] == '이탈고객').sum()
kpi = f"""총 고객 수: {len(rfm):,}명
VIP 고객: {vip_count}명 ({vip_count/len(rfm)*100:.1f}%)
이탈 고객: {churn_count}명 ({churn_count/len(rfm)*100:.1f}%)
총 매출: {df['주문금액'].sum():,.0f}원
객단가: {df['주문금액'].mean():,.0f}원
1인당 평균 주문: {df.groupby('고객ID')['주문ID'].nunique().mean():.1f}회"""
axes[1,2].text(0.05, 0.5, kpi, fontsize=11, verticalalignment='center',
               fontfamily='monospace', bbox=dict(boxstyle='round', facecolor='#f0f0f0'))
axes[1,2].set_title('핵심 KPI')

plt.suptitle('고객 분석 종합 대시보드', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()`;function u(){return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"고객 데이터 분석",description:"RFM 분석, 코호트 분석, CLV 추정으로 고객 데이터를 분석합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"고객 데이터 분석"}),e.jsx("p",{children:"RFM 분석, 코호트 분석, CLV 추정으로 고객 데이터를 분석합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsx("p",{children:"고객 거래 데이터를 생성하고, RFM 분석, 세그먼트 분류, 코호트 분석, CLV 추정, 종합 대시보드를 구성합니다."})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"고객ID"})," — 1001~2000번 고객"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"주문일"})," — 2023년 1년간 거래 내역"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"주문금액"})," — 로그정규분포 기반 금액"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"카테고리"})," — 전자제품, 의류, 식품, 생활용품, 도서"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"채널"})," — 웹, 앱, 오프라인"]})]}),e.jsx("h2",{children:"1단계: 데이터 생성"}),e.jsx(t,{title:"1단계: 데이터 생성",initialCode:r}),e.jsx("h2",{children:"2단계: RFM 계산"}),e.jsx(t,{title:"2단계: RFM 계산",initialCode:o}),e.jsx("h2",{children:"3단계: 세그먼트 분류"}),e.jsx(t,{title:"3단계: 세그먼트 분류",initialCode:a}),e.jsx("h2",{children:"4단계: 세그먼트 시각화"}),e.jsx(t,{title:"4단계: 세그먼트 시각화",initialCode:i}),e.jsx("h2",{children:"5단계: 코호트 분석"}),e.jsx(t,{title:"5단계: 코호트 분석",initialCode:l}),e.jsx("h2",{children:"6단계: CLV 추정"}),e.jsx(t,{title:"6단계: CLV 추정",initialCode:c}),e.jsx("h2",{children:"7단계: 종합 대시보드"}),e.jsx(t,{title:"7단계: 종합 대시보드",initialCode:d}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/practice/sales",className:"lesson-nav-btn prev",children:"← 이전: 매출 데이터 분석"}),e.jsx(s,{to:"/practice/survey",className:"lesson-nav-btn next",children:"다음: 설문 데이터 분석 →"})]})]})})})]})}export{u as default};
