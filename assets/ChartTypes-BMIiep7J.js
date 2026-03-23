import{j as e,L as s}from"./index-CQ--KcOM.js";import{S as l}from"./SEOHead-hblgNu3I.js";import{C as t}from"./CodeEditor-0gwYAvAj.js";const o=`import matplotlib.pyplot as plt
import numpy as np

# 막대 그래프 (Bar Chart) — 범주 비교
categories = ['서울', '부산', '대구', '인천', '광주']
values = [950, 340, 250, 290, 150]
colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# 세로 막대 그래프
axes[0].bar(categories, values, color=colors, edgecolor='white')
axes[0].set_title('도시별 인구 (세로 막대)', fontsize=13, fontweight='bold')
axes[0].set_ylabel('인구 (만명)')
for i, v in enumerate(values):
    axes[0].text(i, v + 15, f'{v}', ha='center', fontweight='bold')

# 가로 막대 그래프
axes[1].barh(categories, values, color=colors, edgecolor='white')
axes[1].set_title('도시별 인구 (가로 막대)', fontsize=13, fontweight='bold')
axes[1].set_xlabel('인구 (만명)')
for i, v in enumerate(values):
    axes[1].text(v + 10, i, f'{v}', va='center', fontweight='bold')

plt.tight_layout()
plt.show()

print("[막대 그래프 특징]")
print("- 범주(카테고리)별 값을 비교할 때 사용")
print("- 세로: 기본 비교, 가로: 항목명이 길 때 유리")
print("- 색상으로 그룹 구분 가능")`,i=`import matplotlib.pyplot as plt
import numpy as np

# 선 그래프 (Line Chart) — 시간에 따른 변화
months = ['1월', '2월', '3월', '4월', '5월', '6월',
          '7월', '8월', '9월', '10월', '11월', '12월']
sales_2023 = [120, 135, 150, 145, 160, 175, 190, 200, 180, 165, 155, 210]
sales_2024 = [130, 145, 165, 170, 180, 195, 210, 220, 200, 185, 175, 240]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 기본 선 그래프
axes[0].plot(months, sales_2023, 'o-', color='#6366f1', label='2023년', linewidth=2)
axes[0].plot(months, sales_2024, 's--', color='#ec4899', label='2024년', linewidth=2)
axes[0].set_title('월별 매출 추이', fontsize=13, fontweight='bold')
axes[0].set_ylabel('매출 (백만원)')
axes[0].legend()
axes[0].tick_params(axis='x', rotation=45)

# 영역 그래프 (Area Chart)
axes[1].fill_between(months, sales_2023, alpha=0.3, color='#6366f1', label='2023년')
axes[1].fill_between(months, sales_2024, alpha=0.3, color='#ec4899', label='2024년')
axes[1].plot(months, sales_2023, '-', color='#6366f1', linewidth=2)
axes[1].plot(months, sales_2024, '-', color='#ec4899', linewidth=2)
axes[1].set_title('매출 추이 (영역 그래프)', fontsize=13, fontweight='bold')
axes[1].set_ylabel('매출 (백만원)')
axes[1].legend()
axes[1].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()

print("[선 그래프 특징]")
print("- 시간에 따른 변화(트렌드)를 보여줄 때 사용")
print("- 여러 시리즈를 비교하기 좋음")
print("- 영역 그래프: 크기감을 강조할 때 활용")`,a=`import matplotlib.pyplot as plt

# 파이 차트 (Pie Chart) — 비율/구성
labels = ['온라인 광고', '오프라인 매장', 'SNS 마케팅', '입소문', '기타']
sizes = [35, 25, 20, 12, 8]
colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#94a3b8']
explode = (0.05, 0, 0, 0, 0)  # 첫 번째 조각 강조

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# 기본 파이 차트
axes[0].pie(sizes, explode=explode, labels=labels, colors=colors,
            autopct='%1.1f%%', startangle=90, textprops={'fontsize': 11})
axes[0].set_title('마케팅 채널별 매출 비율', fontsize=13, fontweight='bold')

# 도넛 차트
wedges, texts, autotexts = axes[1].pie(
    sizes, colors=colors, autopct='%1.1f%%',
    startangle=90, pctdistance=0.8,
    wedgeprops=dict(width=0.4, edgecolor='white'),
    textprops={'fontsize': 11}
)
axes[1].set_title('도넛 차트 스타일', fontsize=13, fontweight='bold')
axes[1].legend(labels, loc='center left', bbox_to_anchor=(1, 0.5))

plt.tight_layout()
plt.show()

print("[파이 차트 특징]")
print("- 전체에서 각 항목이 차지하는 비율을 보여줌")
print("- 항목이 5~6개 이하일 때 효과적")
print("- 도넛 차트: 중앙에 추가 정보 배치 가능")
print("- 주의: 비율 차이가 작으면 비교가 어려움 → 막대 그래프 권장")`,n=`import matplotlib.pyplot as plt
import numpy as np

# 히스토그램 (Histogram) — 분포 확인
np.random.seed(42)
scores_A = np.random.normal(75, 10, 200)  # A반: 평균 75, 표준편차 10
scores_B = np.random.normal(65, 15, 200)  # B반: 평균 65, 표준편차 15

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 기본 히스토그램
axes[0].hist(scores_A, bins=20, color='#6366f1', edgecolor='white', alpha=0.7, label='A반')
axes[0].hist(scores_B, bins=20, color='#ec4899', edgecolor='white', alpha=0.7, label='B반')
axes[0].set_title('학생 성적 분포 비교', fontsize=13, fontweight='bold')
axes[0].set_xlabel('점수')
axes[0].set_ylabel('학생 수')
axes[0].legend()
axes[0].axvline(scores_A.mean(), color='#4338ca', linestyle='--', label=f'A반 평균: {scores_A.mean():.1f}')
axes[0].axvline(scores_B.mean(), color='#be185d', linestyle='--', label=f'B반 평균: {scores_B.mean():.1f}')
axes[0].legend()

# 누적 히스토그램
axes[1].hist(scores_A, bins=20, color='#6366f1', edgecolor='white',
             alpha=0.7, cumulative=True, density=True, label='A반')
axes[1].hist(scores_B, bins=20, color='#ec4899', edgecolor='white',
             alpha=0.7, cumulative=True, density=True, label='B반')
axes[1].set_title('누적 분포', fontsize=13, fontweight='bold')
axes[1].set_xlabel('점수')
axes[1].set_ylabel('누적 비율')
axes[1].legend()

plt.tight_layout()
plt.show()

print("[히스토그램 특징]")
print(f"A반 - 평균: {scores_A.mean():.1f}, 표준편차: {scores_A.std():.1f}")
print(f"B반 - 평균: {scores_B.mean():.1f}, 표준편차: {scores_B.std():.1f}")
print("- 연속형 데이터의 분포(빈도)를 보여줌")
print("- 막대 그래프와 비슷하지만, X축이 연속적인 구간")
print("- bins 수에 따라 해상도가 달라짐")`,r=`import matplotlib.pyplot as plt
import numpy as np

# 산점도 (Scatter Plot) — 상관관계
np.random.seed(42)
n = 80
study_hours = np.random.uniform(1, 10, n)
scores = 30 + 6 * study_hours + np.random.normal(0, 8, n)
scores = np.clip(scores, 0, 100)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 기본 산점도 + 추세선
axes[0].scatter(study_hours, scores, c='#6366f1', alpha=0.6, edgecolors='white', s=60)
z = np.polyfit(study_hours, scores, 1)
p = np.poly1d(z)
x_line = np.linspace(1, 10, 100)
axes[0].plot(x_line, p(x_line), '--', color='#ec4899', linewidth=2, label=f'추세선 (기울기: {z[0]:.1f})')
axes[0].set_title('학습시간 vs 성적', fontsize=13, fontweight='bold')
axes[0].set_xlabel('학습시간 (시간)')
axes[0].set_ylabel('성적 (점)')
axes[0].legend()

# 버블 차트 (크기와 색상으로 추가 변수 표현)
experience = np.random.uniform(1, 5, n)
axes[1].scatter(study_hours, scores, c=experience, s=experience*50,
                cmap='viridis', alpha=0.6, edgecolors='white')
axes[1].set_title('버블 차트 (크기=경력)', fontsize=13, fontweight='bold')
axes[1].set_xlabel('학습시간')
axes[1].set_ylabel('성적')
cbar = plt.colorbar(axes[1].collections[0], ax=axes[1])
cbar.set_label('경력 (년)')

plt.tight_layout()
plt.show()

corr = np.corrcoef(study_hours, scores)[0, 1]
print(f"[산점도 분석]")
print(f"상관계수: {corr:.3f} ({'강한 양의 상관' if corr > 0.7 else '약한 상관'})")
print("- 두 변수 간의 관계(상관관계)를 보여줌")
print("- 추세선으로 방향과 강도 파악")
print("- 버블 차트: 3번째 변수를 크기/색상으로 표현")`,p=`import matplotlib.pyplot as plt
import numpy as np

# 박스플롯 (Box Plot) — 분포 요약/이상치
np.random.seed(42)
dept_sales = {
    '마케팅': np.concatenate([np.random.normal(300, 50, 40), [500, 520, 100]]),
    '개발': np.concatenate([np.random.normal(350, 40, 40), [550, 80]]),
    '영업': np.concatenate([np.random.normal(400, 60, 40), [600, 150]]),
    '기획': np.concatenate([np.random.normal(280, 45, 40), [480, 90]])
}

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 기본 박스플롯
bp = axes[0].boxplot(dept_sales.values(), labels=dept_sales.keys(),
                      patch_artist=True, notch=True)
colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
axes[0].set_title('부서별 매출 분포', fontsize=13, fontweight='bold')
axes[0].set_ylabel('매출 (만원)')

# 바이올린 플롯 (분포 형태를 더 상세하게)
vp = axes[1].violinplot(dept_sales.values(), showmeans=True, showmedians=True)
for i, body in enumerate(vp['bodies']):
    body.set_facecolor(colors[i])
    body.set_alpha(0.7)
axes[1].set_xticks([1, 2, 3, 4])
axes[1].set_xticklabels(dept_sales.keys())
axes[1].set_title('바이올린 플롯 (분포 형태)', fontsize=13, fontweight='bold')
axes[1].set_ylabel('매출 (만원)')

plt.tight_layout()
plt.show()

print("[박스플롯 구성 요소]")
print("- 상자: Q1(25%) ~ Q3(75%) 범위 (IQR)")
print("- 중앙선: 중앙값 (Q2, 50%)")
print("- 수염: 1.5×IQR 이내 최대/최소값")
print("- 점(○): 수염 밖의 이상치")
print()
for dept, data in dept_sales.items():
    q1, med, q3 = np.percentile(data, [25, 50, 75])
    print(f"{dept} — 중앙값: {med:.0f}, Q1: {q1:.0f}, Q3: {q3:.0f}")`,c=`import pandas as pd
import numpy as np

# 그래프 선택 가이드 — 종합 비교
print("=" * 65)
print("         어떤 그래프를 언제 써야 할까?")
print("=" * 65)

guide = pd.DataFrame({
    '그래프': ['막대 그래프', '선 그래프', '파이 차트', '히스토그램', '산점도', '박스플롯'],
    '목적': ['범주 비교', '시간별 변화', '비율/구성', '분포 확인', '상관관계', '분포 요약'],
    '데이터 유형': ['범주형 + 수치형', '시계열 + 수치형', '범주형 + 비율', '연속형 수치', '수치형 2개', '범주형 + 수치형'],
    '예시': ['부서별 매출', '월별 매출 추이', '시장 점유율', '성적 분포', '키 vs 몸무게', '부서별 연봉 분포'],
    '대안': ['수평 막대', '영역 그래프', '도넛/트리맵', '밀도 그래프', '버블 차트', '바이올린 플롯']
})

print(guide.to_string(index=False))

print()
print("=" * 65)
print("  데이터 분석 흐름에 따른 그래프 활용")
print("=" * 65)
print()
print("1단계. 데이터 파악")
print("   → 히스토그램 (분포), 박스플롯 (이상치)")
print()
print("2단계. 비교 분석")
print("   → 막대 그래프 (범주 비교), 선 그래프 (추세)")
print()
print("3단계. 관계 분석")
print("   → 산점도 (상관관계), 히트맵 (다변량)")
print()
print("4단계. 보고서/발표")
print("   → 파이 차트 (비율), 대시보드 (종합)")
print()
print("[TIP] 좋은 그래프의 조건:")
print("  ✓ 전달하려는 메시지가 명확할 것")
print("  ✓ 적절한 제목, 축 레이블, 범례")
print("  ✓ 불필요한 장식 최소화 (데이터 잉크 비율)")
print("  ✓ 색상은 3~5가지 이내로 제한")`;function f(){return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"그래프의 종류",description:"데이터 분석에서 사용하는 주요 그래프 유형을 기초 수준으로 학습합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"그래프의 종류"}),e.jsx("p",{children:"데이터 분석에서 사용하는 주요 그래프 유형과 활용법을 학습합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsx("h2",{children:"왜 그래프가 중요한가?"}),e.jsx("p",{children:"숫자만으로는 데이터의 패턴을 파악하기 어렵습니다. 그래프는 데이터를 시각적으로 표현하여 트렌드, 비교, 분포, 관계를 직관적으로 이해할 수 있게 해줍니다. 목적에 맞는 그래프를 선택하는 것이 효과적인 데이터 분석의 첫걸음입니다."}),e.jsx("h2",{children:"막대 그래프 (Bar Chart)"}),e.jsx("p",{children:"범주(카테고리)별 값을 비교할 때 가장 많이 사용하는 그래프입니다. 세로 막대는 기본 비교에, 가로 막대는 항목명이 길 때 적합합니다."}),e.jsx(t,{title:"막대 그래프 — 범주 비교",initialCode:o}),e.jsx("h2",{children:"선 그래프 (Line Chart)"}),e.jsx("p",{children:"시간에 따른 데이터의 변화(트렌드)를 보여줄 때 사용합니다. 여러 시리즈를 비교하거나, 영역 그래프로 크기감을 강조할 수 있습니다."}),e.jsx(t,{title:"선 그래프 — 시간에 따른 변화",initialCode:i}),e.jsx("h2",{children:"파이 차트 (Pie Chart)"}),e.jsx("p",{children:"전체에서 각 항목이 차지하는 비율을 보여줍니다. 항목이 5~6개 이하일 때 효과적이며, 도넛 차트로 변형할 수 있습니다."}),e.jsx(t,{title:"파이 차트 — 비율/구성",initialCode:a}),e.jsx("h2",{children:"히스토그램 (Histogram)"}),e.jsx("p",{children:"연속형 데이터의 분포(빈도)를 확인할 때 사용합니다. 막대 그래프와 비슷해 보이지만, X축이 연속적인 구간이라는 차이가 있습니다."}),e.jsx(t,{title:"히스토그램 — 분포 확인",initialCode:n}),e.jsx("h2",{children:"산점도 (Scatter Plot)"}),e.jsx("p",{children:"두 변수 간의 관계(상관관계)를 파악할 때 사용합니다. 추세선으로 방향과 강도를 확인하고, 버블 차트로 3번째 변수를 표현할 수 있습니다."}),e.jsx(t,{title:"산점도 — 상관관계",initialCode:r}),e.jsx("h2",{children:"박스플롯 (Box Plot)"}),e.jsx("p",{children:"데이터의 분포를 요약하고 이상치를 한눈에 파악할 때 사용합니다. 중앙값, 사분위수, 이상치를 모두 보여주는 강력한 그래프입니다."}),e.jsx(t,{title:"박스플롯 — 분포 요약/이상치",initialCode:p}),e.jsx("h2",{children:"어떤 그래프를 언제 써야 할까?"}),e.jsx("p",{children:"데이터의 유형과 분석 목적에 따라 적절한 그래프를 선택해야 합니다. 아래 가이드를 참고하세요."}),e.jsx(t,{title:"그래프 선택 가이드 — 종합 비교",initialCode:c}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"그래프 선택 팁"}),e.jsx("p",{children:'그래프는 "데이터를 예쁘게 꾸미는 것"이 아니라 "메시지를 명확하게 전달하는 것"이 목적입니다. 하나의 그래프에 하나의 메시지를 담고, 불필요한 장식은 최소화하세요. 막대 그래프와 선 그래프만 잘 활용해도 대부분의 분석을 효과적으로 전달할 수 있습니다.'})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/intro/data-types",className:"lesson-nav-btn prev",children:"← 이전: 데이터 유형 이해"}),e.jsx(s,{to:"/intro/basic-stats",className:"lesson-nav-btn next",children:"다음: 통계 기초 이해 →"})]})]})})})]})}export{f as default};
