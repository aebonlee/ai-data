import{j as n,L as e}from"./index-D6EroU8q.js";import{S as a}from"./SEOHead-BUKLdxM-.js";import{C as s}from"./CodeEditor-BF9uO6bK.js";const t=`import pandas as pd
import numpy as np

# 기술통계: 중심경향, 산포, 형태
np.random.seed(42)
scores = np.random.normal(75, 12, 200).round(1)

print("[기술통계 - 시험 점수 (200명)]")
print(f"평균 (Mean): {np.mean(scores):.1f}")
print(f"중앙값 (Median): {np.median(scores):.1f}")
from scipy import stats as sp_stats
print(f"최빈값 (Mode): {sp_stats.mode(scores, keepdims=True).mode[0]:.1f}")

print(f"\\n[산포도]")
print(f"분산 (Variance): {np.var(scores, ddof=1):.1f}")
print(f"표준편차 (Std): {np.std(scores, ddof=1):.1f}")
print(f"범위 (Range): {scores.max() - scores.min():.1f}")
Q1, Q3 = np.percentile(scores, [25, 75])
print(f"IQR: {Q3 - Q1:.1f}")

print(f"\\n[형태]")
from scipy.stats import skew, kurtosis
print(f"왜도 (Skewness): {skew(scores):.3f}")
print(f"  → {'오른쪽 꼬리' if skew(scores) > 0 else '왼쪽 꼬리' if skew(scores) < 0 else '대칭'}")
print(f"첨도 (Kurtosis): {kurtosis(scores):.3f}")
print(f"  → {'뾰족' if kurtosis(scores) > 0 else '평평' if kurtosis(scores) < 0 else '정규분포'}")`,r=`import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# 확률분포 시각화
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 정규분포
x = np.linspace(-4, 4, 100)
for mu, sigma, label in [(0, 1, 'N(0,1)'), (0, 2, 'N(0,2)'), (1, 1, 'N(1,1)')]:
    axes[0].plot(x, stats.norm.pdf(x, mu, sigma), label=label, linewidth=2)
axes[0].set_title('정규분포', fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 이항분포
n_trials, p = 20, 0.5
x_binom = np.arange(0, n_trials+1)
axes[1].bar(x_binom, stats.binom.pmf(x_binom, n_trials, p),
            color='#6366f1', alpha=0.7, label=f'n={n_trials}, p={p}')
axes[1].bar(x_binom, stats.binom.pmf(x_binom, n_trials, 0.3),
            color='#ef4444', alpha=0.5, label=f'n={n_trials}, p=0.3')
axes[1].set_title('이항분포', fontweight='bold')
axes[1].legend()

# 포아송분포
x_pois = np.arange(0, 20)
for lam, color in [(2, '#6366f1'), (5, '#10b981'), (10, '#f59e0b')]:
    axes[2].bar(x_pois, stats.poisson.pmf(x_pois, lam),
                alpha=0.5, label=f'λ={lam}', color=color)
axes[2].set_title('포아송분포', fontweight='bold')
axes[2].legend()

plt.suptitle('주요 확률분포', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("[확률분포 요약]")
print("정규분포: 연속형, 평균과 표준편차로 결정, 자연현상/측정값")
print("이항분포: 이산형, n번 시행 중 성공 횟수, 합격/불합격")
print("포아송분포: 이산형, 단위시간당 사건 발생 횟수, 고객방문/콜수")`,i=`import numpy as np
from scipy import stats

# 신뢰구간
np.random.seed(42)
sample = np.random.normal(170, 8, 50)  # 키 데이터 (50명)

mean = sample.mean()
se = stats.sem(sample)  # 표준오차
ci_95 = stats.t.interval(0.95, df=len(sample)-1, loc=mean, scale=se)
ci_99 = stats.t.interval(0.99, df=len(sample)-1, loc=mean, scale=se)

print("[신뢰구간 - 키 데이터 (50명)]")
print(f"표본 평균: {mean:.2f}cm")
print(f"표준오차: {se:.2f}cm")
print(f"95% 신뢰구간: ({ci_95[0]:.2f}, {ci_95[1]:.2f})")
print(f"99% 신뢰구간: ({ci_99[0]:.2f}, {ci_99[1]:.2f})")
print(f"\\n해석: 모평균이 ({ci_95[0]:.1f}, {ci_95[1]:.1f})에 있을 확률이 95%")`,p=`import numpy as np
from scipy import stats

# t-검정: 두 그룹 비교
np.random.seed(42)
group_a = np.random.normal(75, 10, 40)  # A반 성적
group_b = np.random.normal(80, 12, 40)  # B반 성적

print("[독립표본 t-검정]")
print(f"A반 평균: {group_a.mean():.1f}, B반 평균: {group_b.mean():.1f}")

t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"t-통계량: {t_stat:.3f}")
print(f"p-value: {p_value:.4f}")
print(f"결론: {'유의한 차이 있음' if p_value < 0.05 else '유의한 차이 없음'} (α=0.05)")

# 대응표본 t-검정 (동일 집단의 전후 비교)
print("\\n[대응표본 t-검정 - 교육 전후]")
before = np.random.normal(70, 8, 30)
after = before + np.random.normal(5, 3, 30)  # 평균 5점 향상

t_stat2, p_value2 = stats.ttest_rel(before, after)
print(f"교육 전 평균: {before.mean():.1f}, 교육 후 평균: {after.mean():.1f}")
print(f"t-통계량: {t_stat2:.3f}")
print(f"p-value: {p_value2:.6f}")
print(f"결론: {'유의한 향상' if p_value2 < 0.05 else '유의한 변화 없음'} (α=0.05)")`,o=`import numpy as np
from scipy import stats

# ANOVA (분산분석): 3개 이상 그룹 비교
np.random.seed(42)
marketing = np.random.normal(72, 10, 35)
dev = np.random.normal(78, 12, 35)
planning = np.random.normal(75, 11, 35)
sales = np.random.normal(70, 9, 35)

print("[일원분산분석 (One-way ANOVA)]")
print(f"마케팅 평균: {marketing.mean():.1f}")
print(f"개발 평균: {dev.mean():.1f}")
print(f"기획 평균: {planning.mean():.1f}")
print(f"영업 평균: {sales.mean():.1f}")

f_stat, p_value = stats.f_oneway(marketing, dev, planning, sales)
print(f"\\nF-통계량: {f_stat:.3f}")
print(f"p-value: {p_value:.4f}")
print(f"결론: {'그룹 간 유의한 차이 있음' if p_value < 0.05 else '그룹 간 유의한 차이 없음'} (α=0.05)")

print("\\n[해석]")
print("ANOVA는 3개 이상 그룹의 평균 차이를 검정합니다.")
print("p < 0.05이면 최소 하나의 그룹이 다른 그룹과 다릅니다.")
print("어떤 그룹이 다른지는 사후검정(Tukey HSD)으로 확인합니다.")`,l=`import numpy as np
import pandas as pd
from scipy import stats

# 카이제곱 검정: 범주형 변수 간 독립성 검정
np.random.seed(42)
n = 200
df = pd.DataFrame({
    '성별': np.random.choice(['남', '여'], n),
    '선호채널': np.random.choice(['온라인', '오프라인', '모바일'], n, p=[0.4, 0.25, 0.35])
})

# 교차표
cross = pd.crosstab(df['성별'], df['선호채널'])
print("[교차표]")
print(cross)

# 카이제곱 검정
chi2, p_value, dof, expected = stats.chi2_contingency(cross)
print(f"\\n[카이제곱 검정]")
print(f"카이제곱 통계량: {chi2:.3f}")
print(f"p-value: {p_value:.4f}")
print(f"자유도: {dof}")
print(f"결론: {'성별과 선호채널은 연관됨' if p_value < 0.05 else '성별과 선호채널은 독립적'} (α=0.05)")

print(f"\\n[기대빈도]")
print(pd.DataFrame(expected, index=cross.index, columns=cross.columns).round(1))`,m=`import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

# 상관분석: Pearson vs Spearman
np.random.seed(42)
n = 100
x = np.random.uniform(10, 100, n)
y_linear = 2 * x + np.random.normal(0, 15, n)       # 선형 관계
y_nonlinear = x ** 1.5 + np.random.normal(0, 50, n)  # 비선형 관계

# Pearson (선형 상관)
r_pearson, p_pearson = stats.pearsonr(x, y_linear)
print("[Pearson 상관 (선형 데이터)]")
print(f"r = {r_pearson:.3f}, p = {p_pearson:.6f}")

# Spearman (순위 상관)
r_spearman, p_spearman = stats.spearmanr(x, y_nonlinear)
r_pearson2, p_pearson2 = stats.pearsonr(x, y_nonlinear)
print(f"\\n[비선형 데이터]")
print(f"Pearson r = {r_pearson2:.3f}")
print(f"Spearman r = {r_spearman:.3f}")
print("→ 비선형 관계에서는 Spearman이 더 적합")

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].scatter(x, y_linear, alpha=0.5, color='#6366f1', s=20)
axes[0].set_title(f'선형 관계 (Pearson r={r_pearson:.2f})', fontweight='bold')
axes[0].set_xlabel('X')
axes[0].set_ylabel('Y')

axes[1].scatter(x, y_nonlinear, alpha=0.5, color='#ef4444', s=20)
axes[1].set_title(f'비선형 관계 (Spearman r={r_spearman:.2f})', fontweight='bold')
axes[1].set_xlabel('X')
axes[1].set_ylabel('Y')

plt.tight_layout()
plt.show()

print("\\n[상관계수 해석]")
print("|r| > 0.7: 강한 상관")
print("0.4 < |r| < 0.7: 중간 상관")
print("0.2 < |r| < 0.4: 약한 상관")
print("|r| < 0.2: 거의 무상관")`;function x(){return n.jsxs(n.Fragment,{children:[n.jsx(a,{title:"통계 분석",description:"데이터 분석에 필요한 통계 개념과 검정을 학습합니다."}),n.jsx("section",{className:"page-header",children:n.jsxs("div",{className:"container",children:[n.jsx("h1",{children:"통계 분석"}),n.jsx("p",{children:"데이터 분석에 필요한 통계 개념과 검정을 학습합니다"})]})}),n.jsx("section",{className:"section lesson-content",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"playground-body",children:[n.jsx("h2",{children:"기술통계: 중심, 산포, 형태"}),n.jsx("p",{children:"데이터의 특성을 숫자로 요약합니다. 중심경향(평균, 중앙값), 산포도(분산, 표준편차), 형태(왜도, 첨도)를 파악합니다."}),n.jsx(s,{title:"기술통계: 중심경향, 산포도, 형태",initialCode:t}),n.jsx("h2",{children:"확률분포: 정규, 이항, 포아송"}),n.jsx("p",{children:"확률분포는 데이터의 패턴을 수학적으로 모델링합니다. 정규분포는 가장 기본이 되는 연속형 분포입니다."}),n.jsx(s,{title:"주요 확률분포",initialCode:r}),n.jsx("h2",{children:"신뢰구간"}),n.jsx("p",{children:"표본에서 모집단의 모수를 추정할 때, 추정값의 불확실성을 구간으로 표현합니다."}),n.jsx(s,{title:"신뢰구간 추정",initialCode:i}),n.jsx("h2",{children:"t-검정"}),n.jsx("p",{children:"두 그룹의 평균이 통계적으로 유의하게 다른지 검정합니다. 독립표본(서로 다른 그룹)과 대응표본(동일 그룹의 전후)이 있습니다."}),n.jsx(s,{title:"t-검정: 두 그룹 평균 비교",initialCode:p}),n.jsx("h2",{children:"ANOVA (분산분석)"}),n.jsx("p",{children:"3개 이상 그룹의 평균 차이를 검정합니다. t-검정의 확장 버전으로, 여러 그룹을 한 번에 비교합니다."}),n.jsx(s,{title:"ANOVA: 3개 이상 그룹 비교",initialCode:o}),n.jsx("h2",{children:"카이제곱 검정"}),n.jsx("p",{children:'범주형 변수 간의 독립성을 검정합니다. "성별에 따라 선호 채널이 다른가?"와 같은 질문에 답합니다.'}),n.jsx(s,{title:"카이제곱 검정: 독립성 검정",initialCode:l}),n.jsx("h2",{children:"상관분석: Pearson vs Spearman"}),n.jsx("p",{children:"두 연속형 변수 간의 관계 강도를 측정합니다. Pearson은 선형 관계, Spearman은 순위(비선형) 관계를 측정합니다."}),n.jsx(s,{title:"상관분석: Pearson vs Spearman",initialCode:m}),n.jsxs("div",{className:"callout-box",children:[n.jsx("h3",{children:"통계 검정 선택 가이드"}),n.jsx("p",{children:"수치형 2그룹 비교 → t-검정 / 수치형 3그룹+ 비교 → ANOVA / 범주형 독립성 → 카이제곱 / 수치형 관계 → 상관분석. p-value < 0.05이면 통계적으로 유의합니다."})]}),n.jsxs("div",{className:"lesson-nav",children:[n.jsx(e,{to:"/learn/eda",className:"lesson-nav-btn prev",children:"← 이전: 탐색적 데이터 분석"}),n.jsx(e,{to:"/learn/visualization",className:"lesson-nav-btn next",children:"다음: 시각화 기법 →"})]})]})})})]})}export{x as default};
