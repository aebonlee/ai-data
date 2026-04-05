import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import CodeEditor from '../../components/CodeEditor'

const step1 = `import numpy as np
import pandas as pd

np.random.seed(42)

n = 200
departments = np.random.choice(['개발', '마케팅', '영업', '인사', '재무'], n, p=[0.3, 0.2, 0.25, 0.1, 0.15])
ages = np.random.randint(25, 55, n)
genders = np.random.choice(['남', '여'], n, p=[0.55, 0.45])

# 부서별 연봉 기본값 설정
base_salary = {'개발': 5500, '마케팅': 4800, '영업': 5000, '인사': 4500, '재무': 5200}
salaries = [base_salary[d] + np.random.normal(0, 800) + (a - 25) * 80 for d, a in zip(departments, ages)]

tenure = np.clip(ages - 24 + np.random.randint(-3, 4, n), 1, 30)
satisfaction = np.clip(np.random.normal(3.5, 0.8, n), 1, 5).round(1)
performance = np.clip(np.random.normal(3.2, 0.9, n), 1, 5).round(1)
overtime = np.random.choice(['낮음', '보통', '높음'], n, p=[0.4, 0.35, 0.25])
turnover = np.random.choice([0, 1], n, p=[0.85, 0.15])

df = pd.DataFrame({
    '부서': departments, '나이': ages, '성별': genders,
    '연봉': np.array(salaries).astype(int),
    '근속연수': tenure, '만족도': satisfaction,
    '성과점수': performance, '초과근무': overtime, '이직여부': turnover
})

print(f"데이터 크기: {df.shape}")
print()
print(df.head(10))
print()
print("부서별 인원:")
print(df['부서'].value_counts())
print()
print("기술통계:")
print(df[['나이', '연봉', '근속연수', '만족도', '성과점수']].describe().round(1))`

const step2 = `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(13, 10))

dept_order = ['개발', '마케팅', '영업', '인사', '재무']
colors = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444']

# 1) 부서별 연봉 박스플롯
data_salary = [df[df['부서'] == d]['연봉'].values for d in dept_order]
bp1 = axes[0,0].boxplot(data_salary, labels=dept_order, patch_artist=True)
for patch, color in zip(bp1['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.6)
axes[0,0].set_title('부서별 연봉 분포')
axes[0,0].set_ylabel('연봉 (만원)')
axes[0,0].grid(axis='y', alpha=0.3)

# 2) 부서별 만족도 박스플롯
data_sat = [df[df['부서'] == d]['만족도'].values for d in dept_order]
bp2 = axes[0,1].boxplot(data_sat, labels=dept_order, patch_artist=True)
for patch, color in zip(bp2['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.6)
axes[0,1].set_title('부서별 만족도 분포')
axes[0,1].set_ylabel('만족도 (1~5)')
axes[0,1].grid(axis='y', alpha=0.3)

# 3) 부서별 성과점수 박스플롯
data_perf = [df[df['부서'] == d]['성과점수'].values for d in dept_order]
bp3 = axes[1,0].boxplot(data_perf, labels=dept_order, patch_artist=True)
for patch, color in zip(bp3['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.6)
axes[1,0].set_title('부서별 성과점수 분포')
axes[1,0].set_ylabel('성과점수 (1~5)')
axes[1,0].grid(axis='y', alpha=0.3)

# 4) 부서별 평균 비교 테이블
dept_summary = df.groupby('부서').agg(
    평균연봉=('연봉', 'mean'),
    평균만족도=('만족도', 'mean'),
    평균성과=('성과점수', 'mean'),
    이직률=('이직여부', 'mean')
).reindex(dept_order).round(2)
dept_summary['이직률'] = (dept_summary['이직률'] * 100).round(1)

x = np.arange(len(dept_order))
w = 0.2
axes[1,1].bar(x - w, dept_summary['평균만족도'], w, label='만족도', color='#6366f1')
axes[1,1].bar(x, dept_summary['평균성과'], w, label='성과', color='#10b981')
axes[1,1].bar(x + w, dept_summary['이직률'] / 20, w, label='이직률/20', color='#ef4444')
axes[1,1].set_xticks(x)
axes[1,1].set_xticklabels(dept_order)
axes[1,1].set_title('부서별 주요 지표 비교')
axes[1,1].legend(fontsize=8)
axes[1,1].grid(axis='y', alpha=0.3)

plt.suptitle('부서별 인사 분석 (박스플롯)', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()

print("부서별 요약:")
print(dept_summary)`

const step3 = `import seaborn as sns

# 수치형 변수 상관분석
num_cols = ['나이', '연봉', '근속연수', '만족도', '성과점수']
corr = df[num_cols].corr().round(2)

plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap='RdYlBu_r', center=0,
            vmin=-1, vmax=1, square=True, fmt='.2f',
            linewidths=0.5, linecolor='white')
plt.title('인사 데이터 상관관계 히트맵', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("상관계수 매트릭스:")
print(corr)
print()
print("주요 상관관계:")
for i in range(len(num_cols)):
    for j in range(i+1, len(num_cols)):
        r = corr.iloc[i, j]
        if abs(r) >= 0.3:
            print(f"  {num_cols[i]} ↔ {num_cols[j]}: {r:.2f}")`

const step4 = `fig, axes = plt.subplots(2, 2, figsize=(13, 10))

# 1) 나이 vs 연봉 (부서별 색상)
dept_order = ['개발', '마케팅', '영업', '인사', '재무']
colors_map = {'개발': '#6366f1', '마케팅': '#8b5cf6', '영업': '#f59e0b', '인사': '#10b981', '재무': '#ef4444'}
for dept in dept_order:
    sub = df[df['부서'] == dept]
    axes[0,0].scatter(sub['나이'], sub['연봉'], c=colors_map[dept], alpha=0.5, label=dept, s=25)
axes[0,0].set_title('나이 vs 연봉 (부서별)')
axes[0,0].set_xlabel('나이')
axes[0,0].set_ylabel('연봉 (만원)')
axes[0,0].legend(fontsize=8)
axes[0,0].grid(True, alpha=0.3)

# 2) 초과근무별 만족도/성과 비교
ot_order = ['낮음', '보통', '높음']
ot_sat = df.groupby('초과근무')['만족도'].mean().reindex(ot_order)
ot_perf = df.groupby('초과근무')['성과점수'].mean().reindex(ot_order)
x = np.arange(len(ot_order))
axes[0,1].bar(x - 0.15, ot_sat.values, 0.3, label='만족도', color='#6366f1')
axes[0,1].bar(x + 0.15, ot_perf.values, 0.3, label='성과점수', color='#10b981')
axes[0,1].set_xticks(x)
axes[0,1].set_xticklabels(ot_order)
axes[0,1].set_title('초과근무별 만족도/성과')
axes[0,1].legend()
axes[0,1].grid(axis='y', alpha=0.3)

# 3) 이직자 vs 재직자 비교
stay = df[df['이직여부'] == 0]
leave = df[df['이직여부'] == 1]
metrics = ['만족도', '성과점수', '근속연수']
stay_means = [stay[m].mean() for m in metrics]
leave_means = [leave[m].mean() for m in metrics]
x = np.arange(len(metrics))
axes[1,0].bar(x - 0.15, stay_means, 0.3, label=f'재직 ({len(stay)}명)', color='#10b981')
axes[1,0].bar(x + 0.15, leave_means, 0.3, label=f'이직 ({len(leave)}명)', color='#ef4444')
axes[1,0].set_xticks(x)
axes[1,0].set_xticklabels(metrics)
axes[1,0].set_title('이직자 vs 재직자 비교')
axes[1,0].legend()
axes[1,0].grid(axis='y', alpha=0.3)

# 4) 연봉 분포 (성별)
for g, c in [('남', '#6366f1'), ('여', '#f59e0b')]:
    data = df[df['성별'] == g]['연봉']
    axes[1,1].hist(data, bins=15, alpha=0.5, color=c, label=g, edgecolor='white')
axes[1,1].set_title('성별 연봉 분포')
axes[1,1].set_xlabel('연봉 (만원)')
axes[1,1].legend()

plt.suptitle('인사 데이터 다변량 분석', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("=" * 45)
print("인사 데이터 분석 핵심 인사이트")
print("=" * 45)
print(f"전체 직원: {len(df)}명")
print(f"평균 연봉: {df['연봉'].mean():,.0f}만원")
print(f"전체 이직률: {df['이직여부'].mean()*100:.1f}%")
print(f"평균 만족도: {df['만족도'].mean():.2f}/5.0")
print(f"평균 성과점수: {df['성과점수'].mean():.2f}/5.0")
print(f"이직자 평균 만족도: {leave['만족도'].mean():.2f} vs 재직자: {stay['만족도'].mean():.2f}")`

export default function HRAnalytics() {
  return (
    <>
      <SEOHead title="인사 데이터 분석" description="다변량 인사 데이터를 박스플롯과 히트맵으로 분석합니다." />
      <section className="page-header">
        <div className="container">
          <h1>인사 데이터 분석</h1>
          <p>다변량 분석, 박스플롯, 히트맵으로 인사 데이터를 분석합니다</p>
        </div>
      </section>
      <section className="section lesson-content">
        <div className="container">
          <div className="playground-body">

            <div className="callout-box">
              <h3>프로젝트 목표</h3>
              <p>200명 직원의 인사 데이터를 생성하고, 부서별 비교, 상관 히트맵, 이직 예측 인사이트를 도출합니다.
              <strong> 난이도: 고급</strong> | 핵심 스킬: 다변량 분석, 박스플롯, 히트맵</p>
            </div>

            <h2>데이터 설명</h2>
            <p>5개 부서 200명 직원의 인사 데이터입니다. 연봉은 부서 기본급 + 나이 보정 + 랜덤 노이즈로 생성됩니다.</p>
            <ul>
              <li><strong>부서</strong> — 개발, 마케팅, 영업, 인사, 재무</li>
              <li><strong>나이 / 성별 / 근속연수</strong> — 기본 인적 정보</li>
              <li><strong>연봉</strong> — 부서별 기본급 + 나이 보정 (만원)</li>
              <li><strong>만족도 / 성과점수</strong> — 1~5점 척도</li>
              <li><strong>초과근무</strong> — 낮음, 보통, 높음</li>
              <li><strong>이직여부</strong> — 0(재직), 1(이직), 이직률 약 15%</li>
            </ul>

            <h2>1단계: 데이터 생성 및 탐색</h2>
            <p>부서별 연봉 차이가 반영된 인사 데이터를 생성하고 기술통계를 확인합니다.</p>
            <CodeEditor title="1단계: 데이터 생성 및 탐색" initialCode={step1} />

            <h2>2단계: 부서별 분석 (박스플롯)</h2>
            <p>부서별 연봉, 만족도, 성과점수의 분포를 박스플롯으로 비교합니다.</p>
            <CodeEditor title="2단계: 부서별 분석 (박스플롯)" initialCode={step2} />

            <h2>3단계: 상관관계 히트맵</h2>
            <p>수치형 변수 간 상관계수를 계산하고 seaborn 히트맵으로 시각화합니다.</p>
            <CodeEditor title="3단계: 상관관계 히트맵" initialCode={step3} />

            <h2>4단계: 다변량 분석</h2>
            <p>나이-연봉 관계, 초과근무 영향, 이직자 특성, 성별 비교를 종합 분석합니다.</p>
            <CodeEditor title="4단계: 다변량 종합 분석" initialCode={step4} />

            <div className="callout-box">
              <h3>실습 과제</h3>
              <ul>
                <li>성별에 따른 부서별 연봉 차이를 분석해보세요 (groupby 2개 변수).</li>
                <li>만족도가 2.5 이하인 직원의 특성(부서, 초과근무, 이직여부)을 분석해보세요.</li>
                <li>근속연수와 만족도의 산점도를 그리고, 이직여부에 따라 색상을 다르게 표시해보세요.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/projects/product-review" className="lesson-nav-btn prev">&larr; 이전: 상품 리뷰 분석</Link>
              <Link to="/projects" className="lesson-nav-btn next">프로젝트 목록 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
