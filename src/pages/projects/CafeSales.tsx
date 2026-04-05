import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import CodeEditor from '../../components/CodeEditor'

const step1 = `import numpy as np
import pandas as pd

np.random.seed(42)

# 카페 매출 데이터 생성 (3개월, 일별 20~60건)
dates = pd.date_range('2024-01-01', periods=90, freq='D')
menus = ['아메리카노', '카페라떼', '카푸치노', '녹차라떼', '바닐라라떼', '케이크', '머핀', '쿠키']
prices = {'아메리카노': 4500, '카페라떼': 5000, '카푸치노': 5000,
          '녹차라떼': 5500, '바닐라라떼': 5500, '케이크': 6000, '머핀': 3500, '쿠키': 2500}

rows = []
for date in dates:
    n_orders = np.random.randint(20, 60)
    for _ in range(n_orders):
        menu = np.random.choice(menus, p=[0.25, 0.2, 0.1, 0.1, 0.1, 0.1, 0.08, 0.07])
        qty = np.random.randint(1, 4)
        rows.append({'날짜': date, '메뉴': menu, '수량': qty,
                     '단가': prices[menu], '매출': prices[menu] * qty})

df = pd.DataFrame(rows)
print(f"데이터 크기: {df.shape}")
print(f"컬럼: {list(df.columns)}")
print()
print(df.head(10))
print()
print(df.describe())`

const step2 = `import matplotlib.pyplot as plt

# 메뉴별 매출 집계
menu_sales = df.groupby('메뉴')['매출'].agg(['sum', 'count', 'mean'])
menu_sales.columns = ['총매출', '주문수', '평균매출']
menu_sales = menu_sales.sort_values('총매출', ascending=False)
print("메뉴별 매출 분석:")
print(menu_sales)

# 메뉴별 총 매출 바 차트
plt.figure(figsize=(10, 5))
colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed', '#f59e0b', '#10b981', '#ef4444']
plt.bar(menu_sales.index, menu_sales['총매출'], color=colors[:len(menu_sales)])
plt.title('메뉴별 총 매출', fontsize=14, fontweight='bold')
plt.ylabel('매출 (원)')
plt.xticks(rotation=45)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.show()`

const step3 = `# 일별 매출 합계
daily = df.groupby('날짜')['매출'].sum()

plt.figure(figsize=(12, 5))
plt.plot(daily.index, daily.values, alpha=0.4, color='#6366f1', label='일별 매출')

# 7일 이동평균
ma7 = daily.rolling(7).mean()
plt.plot(ma7.index, ma7.values, color='#ef4444', linewidth=2, label='7일 이동평균')

plt.title('일별 매출 추이 (3개월)', fontsize=14, fontweight='bold')
plt.xlabel('날짜')
plt.ylabel('매출 (원)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`

const step4 = `fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1) 요일별 평균 매출
df['요일'] = df['날짜'].dt.dayofweek
weekday_kr = ['월', '화', '수', '목', '금', '토', '일']
wd = df.groupby('요일')['매출'].mean()
axes[0,0].bar(weekday_kr, wd.values, color='#8b5cf6')
axes[0,0].set_title('요일별 평균 매출')
axes[0,0].grid(axis='y', alpha=0.3)

# 2) 음료 vs 베이커리 파이 차트
drink = ['아메리카노', '카페라떼', '카푸치노', '녹차라떼', '바닐라라떼']
df['카테고리'] = df['메뉴'].apply(lambda x: '음료' if x in drink else '베이커리')
cat = df.groupby('카테고리')['매출'].sum()
axes[0,1].pie(cat.values, labels=cat.index, autopct='%1.1f%%',
              colors=['#6366f1', '#f59e0b'], startangle=90)
axes[0,1].set_title('카테고리별 매출 비중')

# 3) 수량 분포 히스토그램
axes[1,0].hist(df['수량'], bins=[0.5, 1.5, 2.5, 3.5], color='#10b981',
               edgecolor='white', rwidth=0.8)
axes[1,0].set_title('주문 수량 분포')
axes[1,0].set_xlabel('수량')
axes[1,0].set_ylabel('건수')

# 4) 월별 매출 추이
df['월'] = df['날짜'].dt.month
monthly = df.groupby('월')['매출'].sum()
axes[1,1].plot(monthly.index, monthly.values, marker='o', color='#ef4444', linewidth=2)
axes[1,1].set_title('월별 총 매출')
axes[1,1].set_xlabel('월')
axes[1,1].grid(True, alpha=0.3)

plt.suptitle('카페 매출 종합 대시보드', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

# 핵심 인사이트
print("=" * 45)
print("카페 매출 분석 핵심 인사이트")
print("=" * 45)
daily = df.groupby('날짜')['매출'].sum()
print(f"총 매출: {df['매출'].sum():,.0f}원")
print(f"일평균 매출: {daily.mean():,.0f}원")
print(f"가장 인기 메뉴: {menu_sales.index[0]}")
print(f"최고 매출일: {daily.idxmax().strftime('%Y-%m-%d')} ({daily.max():,.0f}원)")`

export default function CafeSales() {
  return (
    <>
      <SEOHead title="카페 매출 분석" description="Pandas groupby와 시계열 분석으로 카페 매출 데이터를 분석합니다." />
      <section className="page-header">
        <div className="container">
          <h1>카페 매출 분석</h1>
          <p>Pandas groupby와 시계열 분석으로 카페 매출 데이터를 분석합니다</p>
        </div>
      </section>
      <section className="section lesson-content">
        <div className="container">
          <div className="playground-body">

            <div className="callout-box">
              <h3>프로젝트 목표</h3>
              <p>3개월간의 카페 매출 데이터를 생성하고, 메뉴별 매출 비교, 일별 매출 추이, 종합 대시보드를 만들어봅니다.
              <strong> 난이도: 초급</strong> | 핵심 스킬: Pandas groupby, 시계열, 바/라인 차트</p>
            </div>

            <h2>데이터 설명</h2>
            <p>가상의 카페 3개월(90일) 매출 데이터입니다. 매일 20~60건의 주문이 발생하며,
            8종의 메뉴(음료 5종, 베이커리 3종)와 수량, 단가, 매출 정보를 포함합니다.</p>
            <ul>
              <li><strong>날짜</strong> — 주문 날짜 (2024-01-01 ~ 2024-03-30)</li>
              <li><strong>메뉴</strong> — 아메리카노, 카페라떼, 카푸치노, 녹차라떼, 바닐라라떼, 케이크, 머핀, 쿠키</li>
              <li><strong>수량</strong> — 1~3개</li>
              <li><strong>단가 / 매출</strong> — 메뉴별 고정 단가, 매출 = 단가 x 수량</li>
            </ul>

            <h2>1단계: 데이터 생성 및 탐색</h2>
            <p>numpy로 랜덤 데이터를 생성하고 Pandas DataFrame으로 변환한 뒤, 기본 구조와 기술통계를 확인합니다.</p>
            <CodeEditor title="1단계: 데이터 생성 및 탐색" initialCode={step1} />

            <h2>2단계: 메뉴별 매출 분석</h2>
            <p>groupby로 메뉴별 총매출, 주문수, 평균매출을 집계하고 바 차트로 시각화합니다.</p>
            <CodeEditor title="2단계: 메뉴별 매출 분석 (groupby)" initialCode={step2} />

            <h2>3단계: 시계열 매출 추이</h2>
            <p>일별 매출 합계의 라인 차트에 7일 이동평균을 겹쳐 트렌드를 파악합니다.</p>
            <CodeEditor title="3단계: 시계열 매출 추이" initialCode={step3} />

            <h2>4단계: 종합 대시보드</h2>
            <p>요일별 매출, 카테고리 비중, 수량 분포, 월별 추이를 하나의 대시보드로 구성합니다.</p>
            <CodeEditor title="4단계: 종합 대시보드" initialCode={step4} />

            <div className="callout-box">
              <h3>실습 과제</h3>
              <ul>
                <li>메뉴별 주문 수량의 평균을 구하고 막대 차트로 시각화해보세요.</li>
                <li>주말과 평일의 매출 차이를 비교하는 코드를 작성해보세요.</li>
                <li>상위 3개 메뉴의 일별 매출 추이를 하나의 라인 차트에 그려보세요.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/projects" className="lesson-nav-btn prev">&larr; 프로젝트 목록</Link>
              <Link to="/projects/student-scores" className="lesson-nav-btn next">다음: 학생 성적 분석 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
