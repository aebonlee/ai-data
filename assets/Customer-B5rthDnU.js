import{j as e,L as s}from"./index-CTmMw0pD.js";import{S as r}from"./SEOHead-DpCKq1X5.js";function a(){return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"고객 데이터 분석",description:"고객 세그먼테이션과 행동 분석을 학습합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"고객 데이터 분석"}),e.jsx("p",{children:"고객 세그먼테이션과 행동 분석을 실습합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("h2",{children:"프로젝트 개요"}),e.jsx("p",{children:"RFM 분석(Recency, Frequency, Monetary)을 활용하여 고객을 세그먼트로 분류하고, 각 세그먼트에 적합한 마케팅 전략을 제안합니다."}),e.jsx("h2",{children:"RFM 분석"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import pandas as pd
import numpy as np
from datetime import datetime

df = pd.read_csv('customer_transactions.csv')
df['date'] = pd.to_datetime(df['date'])

# RFM 계산
now = df['date'].max() + pd.Timedelta(days=1)
rfm = df.groupby('customer_id').agg(
    Recency=('date', lambda x: (now - x.max()).days),
    Frequency=('order_id', 'nunique'),
    Monetary=('amount', 'sum')
).reset_index()

# 점수 부여 (1~5)
rfm['R_score'] = pd.qcut(rfm['Recency'], 5, labels=[5,4,3,2,1])
rfm['F_score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['M_score'] = pd.qcut(rfm['Monetary'], 5, labels=[1,2,3,4,5])

rfm['RFM_score'] = rfm['R_score'].astype(str) + rfm['F_score'].astype(str) + rfm['M_score'].astype(str)
print(rfm.head(10))`})})]}),e.jsx("h2",{children:"고객 세그먼트 분류"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`def classify_customer(row):
    r, f, m = int(row['R_score']), int(row['F_score']), int(row['M_score'])
    if r >= 4 and f >= 4 and m >= 4:
        return 'VIP 고객'
    elif r >= 4 and f >= 3:
        return '충성 고객'
    elif r >= 3 and f <= 2:
        return '신규/잠재 고객'
    elif r <= 2 and f >= 3:
        return '이탈 위험 고객'
    elif r <= 2 and f <= 2:
        return '이탈 고객'
    else:
        return '일반 고객'

rfm['segment'] = rfm.apply(classify_customer, axis=1)

# 세그먼트별 통계
segment_stats = rfm.groupby('segment').agg(
    고객수=('customer_id', 'count'),
    평균매출=('Monetary', 'mean'),
    평균구매횟수=('Frequency', 'mean')
).round(0)
print(segment_stats)`})})]}),e.jsx("h2",{children:"시각화"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 세그먼트별 고객 수
seg_counts = rfm['segment'].value_counts()
seg_counts.plot(kind='bar', ax=axes[0], color='#6366f1')
axes[0].set_title('세그먼트별 고객 수')

# 세그먼트별 매출 비중
seg_revenue = rfm.groupby('segment')['Monetary'].sum()
seg_revenue.plot(kind='pie', ax=axes[1], autopct='%1.1f%%')
axes[1].set_title('세그먼트별 매출 비중')

plt.tight_layout()
plt.show()`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"마케팅 전략 제안"}),e.jsx("p",{children:"VIP 고객 → 프리미엄 혜택, 전용 이벤트 / 충성 고객 → 리워드 프로그램, 업셀링 / 이탈 위험 → 재참여 캠페인, 할인 쿠폰 / 신규 고객 → 환영 혜택, 온보딩 가이드"})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/practice/sales",className:"lesson-nav-btn prev",children:"← 이전: 매출 데이터 분석"}),e.jsx(s,{to:"/practice/survey",className:"lesson-nav-btn next",children:"다음: 설문 데이터 분석 →"})]})]})})})]})}export{a as default};
