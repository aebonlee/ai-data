import{j as n,L as t}from"./index-DSj272Qi.js";import{S as r}from"./SEOHead-Dvt2fwGA.js";import{C as e}from"./CodeEditor-BUA_pBI1.js";const s=`import pandas as pd
import numpy as np

# 대표값: 평균, 중앙값, 최빈값
data = pd.Series([25, 30, 35, 28, 42, 31, 29, 150, 33, 27])

print("[원본 데이터]")
print(data.values)
print(f"데이터 수: {len(data)}개")

# 평균 (Mean): 모든 값을 더해 개수로 나눈 값
mean_val = data.mean()
print(f"\\n[평균] {mean_val:.1f}")
print(f"  계산: ({' + '.join(map(str, sorted(data)))}) / {len(data)}")

# 중앙값 (Median): 정렬 후 가운데 값
median_val = data.median()
sorted_data = sorted(data)
print(f"\\n[중앙값] {median_val:.1f}")
print(f"  정렬: {sorted_data}")
print(f"  가운데 두 값의 평균: ({sorted_data[4]} + {sorted_data[5]}) / 2")

# 최빈값 (Mode): 가장 많이 나타나는 값
freq_data = pd.Series([3, 5, 5, 7, 5, 3, 7, 5, 9, 3])
mode_val = freq_data.mode()
print(f"\\n[최빈값 예시]")
print(f"  데이터: {freq_data.values}")
print(f"  빈도: ")
for val, cnt in freq_data.value_counts().sort_index().items():
    print(f"    {val}: {'■' * cnt} ({cnt}회)")
print(f"  최빈값: {mode_val.values}")

# 이상치(150)가 대표값에 미치는 영향
print(f"\\n[이상치의 영향]")
print(f"  150 포함 — 평균: {data.mean():.1f}, 중앙값: {data.median():.1f}")
clean = data[data < 100]
print(f"  150 제외 — 평균: {clean.mean():.1f}, 중앙값: {clean.median():.1f}")
print(f"  → 평균은 이상치에 민감, 중앙값은 안정적")`,a=`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 분산과 표준편차 — 데이터가 얼마나 흩어져 있는가
np.random.seed(42)
class_A = np.random.normal(75, 5, 30)    # 평균 75, 표준편차 5 (집중)
class_B = np.random.normal(75, 15, 30)   # 평균 75, 표준편차 15 (분산)

print("[A반] 평균은 같지만 성적이 모여 있음")
print(f"  평균: {class_A.mean():.1f}, 표준편차: {class_A.std():.1f}")
print(f"  최소: {class_A.min():.1f}, 최대: {class_A.max():.1f}")
print(f"  범위: {class_A.max() - class_A.min():.1f}")

print(f"\\n[B반] 평균은 같지만 성적이 흩어져 있음")
print(f"  평균: {class_B.mean():.1f}, 표준편차: {class_B.std():.1f}")
print(f"  최소: {class_B.min():.1f}, 최대: {class_B.max():.1f}")
print(f"  범위: {class_B.max() - class_B.min():.1f}")

# 분산 = 편차의 제곱 평균, 표준편차 = √분산
print(f"\\n[분산과 표준편차 관계]")
print(f"  A반 분산: {class_A.var():.1f} → 표준편차: {np.sqrt(class_A.var()):.1f}")
print(f"  B반 분산: {class_B.var():.1f} → 표준편차: {np.sqrt(class_B.var()):.1f}")

# 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].hist(class_A, bins=15, color='#6366f1', edgecolor='white', alpha=0.7, label='A반 (집중)')
axes[0].hist(class_B, bins=15, color='#ec4899', edgecolor='white', alpha=0.7, label='B반 (분산)')
axes[0].axvline(class_A.mean(), color='#4338ca', linestyle='--', linewidth=2)
axes[0].set_title('성적 분포 비교', fontsize=13, fontweight='bold')
axes[0].set_xlabel('점수')
axes[0].set_ylabel('학생 수')
axes[0].legend()

# 편차 시각화
sample_A = class_A[:10]
axes[1].barh(range(10), sample_A - class_A.mean(), color=['#6366f1' if x > 0 else '#ec4899' for x in sample_A - class_A.mean()])
axes[1].axvline(0, color='black', linewidth=1)
axes[1].set_title('A반 편차 (평균과의 차이)', fontsize=13, fontweight='bold')
axes[1].set_xlabel('편차')
axes[1].set_ylabel('학생')
plt.tight_layout()
plt.show()`,i=`import pandas as pd
import numpy as np

# 백분위수와 사분위수 — 데이터에서 내 위치 찾기
np.random.seed(42)
scores = np.random.normal(70, 12, 100).astype(int)
scores = np.clip(scores, 0, 100)

print("[성적 데이터 100명]")
print(f"  평균: {scores.mean():.1f}, 중앙값: {np.median(scores):.1f}")

# 사분위수 (Quartile)
q1 = np.percentile(scores, 25)
q2 = np.percentile(scores, 50)  # = 중앙값
q3 = np.percentile(scores, 75)
iqr = q3 - q1

print(f"\\n[사분위수]")
print(f"  Q1 (25%): {q1:.0f}점 — 하위 25%")
print(f"  Q2 (50%): {q2:.0f}점 — 중앙값")
print(f"  Q3 (75%): {q3:.0f}점 — 상위 25%")
print(f"  IQR (Q3-Q1): {iqr:.0f}점 — 중간 50% 범위")

# 백분위수 활용
print(f"\\n[백분위수 활용]")
for p in [10, 25, 50, 75, 90]:
    val = np.percentile(scores, p)
    print(f"  상위 {100-p}% (P{p}): {val:.0f}점 이상")

# 내 점수의 백분위수 구하기
my_score = 82
percentile = (scores < my_score).sum() / len(scores) * 100
print(f"\\n[내 점수 분석]")
print(f"  내 점수: {my_score}점")
print(f"  백분위수: {percentile:.0f}% (상위 {100-percentile:.0f}%)")
print(f"  해석: 100명 중 {int(percentile)}명보다 높은 점수")

# 5-number summary
print(f"\\n[5-Number Summary]")
print(f"  최소: {scores.min()}, Q1: {q1:.0f}, 중앙값: {q2:.0f}, Q3: {q3:.0f}, 최대: {scores.max()}")`,p=`import numpy as np
import matplotlib.pyplot as plt

# 정규분포 — 종 모양 곡선
x = np.linspace(-4, 4, 1000)

# 표준 정규분포 (평균=0, 표준편차=1)
y_standard = (1 / np.sqrt(2 * np.pi)) * np.exp(-x**2 / 2)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 다양한 정규분포
params = [(0, 1, '평균=0, 표준편차=1'), (0, 0.5, '평균=0, 표준편차=0.5'), (2, 1, '평균=2, 표준편차=1')]
colors = ['#6366f1', '#ec4899', '#f59e0b']
for (mu, sigma, label), color in zip(params, colors):
    y = (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-(x - mu)**2 / (2 * sigma**2))
    axes[0].plot(x, y, linewidth=2, color=color, label=label)
axes[0].set_title('정규분포 곡선', fontsize=13, fontweight='bold')
axes[0].set_xlabel('값')
axes[0].set_ylabel('확률밀도')
axes[0].legend()

# 68-95-99.7 법칙
axes[1].fill_between(x, y_standard, where=(x >= -3) & (x <= 3), alpha=0.1, color='#6366f1')
axes[1].fill_between(x, y_standard, where=(x >= -2) & (x <= 2), alpha=0.2, color='#6366f1')
axes[1].fill_between(x, y_standard, where=(x >= -1) & (x <= 1), alpha=0.3, color='#6366f1')
axes[1].plot(x, y_standard, linewidth=2, color='#6366f1')
axes[1].set_title('68-95-99.7 법칙', fontsize=13, fontweight='bold')
axes[1].set_xlabel('표준편차')
axes[1].annotate('68.3%', xy=(0, 0.15), ha='center', fontsize=14, fontweight='bold', color='#4338ca')
axes[1].annotate('95.4%', xy=(0, 0.06), ha='center', fontsize=11, color='#6366f1')
axes[1].annotate('99.7%', xy=(0, 0.01), ha='center', fontsize=10, color='#818cf8')
plt.tight_layout()
plt.show()

print("[정규분포 핵심 개념]")
print("- 평균을 중심으로 좌우 대칭인 종 모양 곡선")
print("- 평균 = 중앙값 = 최빈값")
print()
print("[68-95-99.7 법칙]")
print("- 평균 ± 1σ 범위: 전체 데이터의 약 68%")
print("- 평균 ± 2σ 범위: 전체 데이터의 약 95%")
print("- 평균 ± 3σ 범위: 전체 데이터의 약 99.7%")
print()
print("[활용 예시]")
print("- 키, 몸무게, 시험 성적 등 자연 현상의 많은 데이터가 정규분포")
print("- 통계 검정, 머신러닝 알고리즘의 기본 가정")`,l=`import numpy as np
import matplotlib.pyplot as plt

# 상관계수 — 두 변수 간의 관계
np.random.seed(42)
n = 50

# 강한 양의 상관 (공부시간 → 성적)
study = np.random.uniform(1, 10, n)
score = 30 + 6 * study + np.random.normal(0, 5, n)

# 강한 음의 상관 (결석일수 → 성적)
absent = np.random.uniform(0, 15, n)
score2 = 95 - 3 * absent + np.random.normal(0, 5, n)

# 무상관 (신발 사이즈 → 성적)
shoe = np.random.uniform(230, 280, n)
score3 = np.random.normal(70, 10, n)

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

datasets = [
    (study, score, '학습시간 vs 성적'),
    (absent, score2, '결석일수 vs 성적'),
    (shoe, score3, '신발사이즈 vs 성적')
]

for ax, (x, y, title) in zip(axes, datasets):
    r = np.corrcoef(x, y)[0, 1]
    ax.scatter(x, y, c='#6366f1', alpha=0.6, edgecolors='white', s=50)
    z = np.polyfit(x, y, 1)
    p = np.poly1d(z)
    x_line = np.linspace(x.min(), x.max(), 100)
    ax.plot(x_line, p(x_line), '--', color='#ec4899', linewidth=2)
    ax.set_title(f'{title}\\nr = {r:.3f}', fontsize=12, fontweight='bold')

plt.tight_layout()
plt.show()

print("[상관계수 해석 기준]")
print("  r = +1.0  : 완벽한 양의 상관")
print("  r > +0.7  : 강한 양의 상관")
print("  r > +0.3  : 약한 양의 상관")
print("  r ≈  0.0  : 상관 없음")
print("  r < -0.3  : 약한 음의 상관")
print("  r < -0.7  : 강한 음의 상관")
print("  r = -1.0  : 완벽한 음의 상관")
print()
r1 = np.corrcoef(study, score)[0, 1]
r2 = np.corrcoef(absent, score2)[0, 1]
r3 = np.corrcoef(shoe, score3)[0, 1]
print(f"학습시간 vs 성적: r={r1:.3f} (강한 양의 상관)")
print(f"결석일수 vs 성적: r={r2:.3f} (강한 음의 상관)")
print(f"신발사이즈 vs 성적: r={r3:.3f} (무상관)")
print()
print("[주의] 상관관계 ≠ 인과관계")
print("  아이스크림 판매량과 익사 사고는 상관 있지만,")
print("  원인은 '기온 상승'이라는 제3의 변수!")`,o=`import pandas as pd
import numpy as np

# 종합 실습 — 실제 데이터로 통계 요약
np.random.seed(42)
n = 50
df = pd.DataFrame({
    '이름': [f'사원{i+1:02d}' for i in range(n)],
    '부서': np.random.choice(['마케팅', '개발', '영업', '기획'], n),
    '나이': np.random.randint(24, 55, n),
    '연봉': np.random.normal(4500, 1200, n).astype(int) * 10,
    '평가점수': np.round(np.random.uniform(2.5, 5.0, n), 1),
    '근속연수': np.random.randint(1, 20, n)
})
# 이상치 추가
df.loc[0, '연봉'] = 120000
df.loc[1, '연봉'] = 15000

print("[데이터 미리보기]")
print(df.head(10))
print(f"\\n데이터 수: {len(df)}명")

# 기술통계
print("\\n" + "=" * 50)
print("  기술통계 요약")
print("=" * 50)
print(df[['나이', '연봉', '평가점수', '근속연수']].describe().round(1))

# 부서별 통계
print("\\n[부서별 평균]")
dept_stats = df.groupby('부서').agg(
    인원=('이름', 'count'),
    평균연봉=('연봉', 'mean'),
    평균평가=('평가점수', 'mean'),
    평균근속=('근속연수', 'mean')
).round(1)
print(dept_stats)

# 상관관계
print("\\n[변수 간 상관계수]")
corr = df[['나이', '연봉', '평가점수', '근속연수']].corr().round(3)
print(corr)

# 사분위수 & 이상치 탐지
print("\\n[연봉 이상치 탐지 (IQR)]")
q1 = df['연봉'].quantile(0.25)
q3 = df['연봉'].quantile(0.75)
iqr = q3 - q1
lower = q1 - 1.5 * iqr
upper = q3 + 1.5 * iqr
outliers = df[(df['연봉'] < lower) | (df['연봉'] > upper)]
print(f"  Q1: {q1:,.0f}, Q3: {q3:,.0f}, IQR: {iqr:,.0f}")
print(f"  정상 범위: {lower:,.0f} ~ {upper:,.0f}")
print(f"  이상치: {len(outliers)}명")
if len(outliers) > 0:
    print(outliers[['이름', '부서', '연봉']].to_string(index=False))`;function m(){return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"통계 기초 이해",description:"데이터 분석에 필요한 기본 통계 개념을 직관적으로 학습합니다."}),n.jsx("section",{className:"page-header",children:n.jsxs("div",{className:"container",children:[n.jsx("h1",{children:"통계 기초 이해"}),n.jsx("p",{children:"데이터 분석에 필요한 기본 통계 개념을 직관적으로 학습합니다"})]})}),n.jsx("section",{className:"section lesson-content",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"playground-body",children:[n.jsx("h2",{children:"통계, 왜 알아야 할까?"}),n.jsx("p",{children:'통계는 데이터를 요약하고 해석하는 도구입니다. 복잡한 수학 공식보다 "데이터가 무엇을 말하는지" 이해하는 것이 중요합니다. 평균, 분산, 상관계수 같은 기초 통계 개념만 알아도 데이터에서 의미 있는 인사이트를 뽑아낼 수 있습니다.'}),n.jsx("h2",{children:"평균, 중앙값, 최빈값 — 대표값"}),n.jsx("p",{children:"대표값은 데이터 전체를 하나의 숫자로 요약합니다. 평균은 이상치에 민감하고, 중앙값은 안정적입니다. 상황에 따라 적절한 대표값을 선택해야 합니다."}),n.jsx(e,{title:"대표값: 평균, 중앙값, 최빈값",initialCode:s}),n.jsx("h2",{children:"분산, 표준편차 — 데이터의 흩어짐"}),n.jsx("p",{children:"평균이 같아도 데이터의 흩어진 정도가 다를 수 있습니다. 분산과 표준편차는 데이터가 평균으로부터 얼마나 떨어져 있는지를 나타냅니다."}),n.jsx(e,{title:"분산과 표준편차",initialCode:a}),n.jsx("h2",{children:"백분위수, 사분위수 — 위치 파악"}),n.jsx("p",{children:'백분위수는 "전체에서 내가 어디쯤 위치하는지" 알려줍니다. 사분위수(Q1, Q2, Q3)는 데이터를 4등분하여 분포를 요약합니다.'}),n.jsx(e,{title:"백분위수와 사분위수",initialCode:i}),n.jsx("h2",{children:"정규분포 — 종 모양 곡선"}),n.jsx("p",{children:"자연 현상의 많은 데이터는 평균을 중심으로 좌우 대칭인 정규분포를 따릅니다. 68-95-99.7 법칙을 알면 데이터의 분포를 직관적으로 이해할 수 있습니다."}),n.jsx(e,{title:"정규분포와 68-95-99.7 법칙",initialCode:p}),n.jsx("h2",{children:"상관계수 — 변수 간 관계"}),n.jsx("p",{children:"상관계수(r)는 두 변수 간의 선형 관계의 강도와 방향을 -1~+1 사이의 숫자로 나타냅니다. 단, 상관관계가 있다고 인과관계가 있는 것은 아닙니다."}),n.jsx(e,{title:"상관계수와 상관관계",initialCode:l}),n.jsx("h2",{children:"종합 실습 — 실제 데이터로 통계 요약"}),n.jsx("p",{children:"지금까지 배운 통계 개념을 종합하여 실제 데이터를 분석해봅니다. 기술통계, 그룹별 비교, 상관분석, 이상치 탐지를 한 번에 수행합니다."}),n.jsx(e,{title:"종합 실습: 직원 데이터 통계 분석",initialCode:o}),n.jsxs("div",{className:"callout-box",children:[n.jsx("h3",{children:"통계 기초 정리"}),n.jsx("p",{children:"대표값(평균/중앙값)으로 데이터의 중심을 파악하고, 분산/표준편차로 흩어짐을 확인합니다. 백분위수로 위치를 파악하고, 상관계수로 변수 간 관계를 분석합니다. 이 네 가지 개념만 확실히 이해하면 데이터 분석의 기초는 탄탄합니다."})]}),n.jsxs("div",{className:"lesson-nav",children:[n.jsx(t,{to:"/intro/chart-types",className:"lesson-nav-btn prev",children:"← 이전: 그래프의 종류"}),n.jsx(t,{to:"/learn/preprocessing",className:"lesson-nav-btn next",children:"다음: 데이터 전처리 →"})]})]})})})]})}export{m as default};
