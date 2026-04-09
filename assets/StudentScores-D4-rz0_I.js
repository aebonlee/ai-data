import{j as e,L as t}from"./index-DVkGATEV.js";import{S as a}from"./SEOHead-hgyAsVNe.js";import{C as s}from"./CodeEditor-BpWuvscs.js";const n=`import numpy as np
import pandas as pd

np.random.seed(42)

# 학생 성적 데이터 생성 (50명, 5과목)
n = 50
df = pd.DataFrame({
    '학번': [f'S{str(i+1).zfill(3)}' for i in range(n)],
    '국어': np.random.normal(72, 12, n).clip(30, 100).astype(int),
    '영어': np.random.normal(68, 15, n).clip(30, 100).astype(int),
    '수학': np.random.normal(65, 18, n).clip(20, 100).astype(int),
    '과학': np.random.normal(70, 14, n).clip(25, 100).astype(int),
    '사회': np.random.normal(75, 10, n).clip(35, 100).astype(int),
})
df['총점'] = df[['국어', '영어', '수학', '과학', '사회']].sum(axis=1)
df['평균'] = df[['국어', '영어', '수학', '과학', '사회']].mean(axis=1).round(1)

print(f"데이터 크기: {df.shape}")
print()
print(df.head(10))
print()
print("기술통계:")
print(df[['국어', '영어', '수학', '과학', '사회']].describe().round(1))`,i=`import matplotlib.pyplot as plt

subjects = ['국어', '영어', '수학', '과학', '사회']

fig, axes = plt.subplots(2, 3, figsize=(14, 8))
colors = ['#6366f1', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b']

for i, subj in enumerate(subjects):
    ax = axes[i // 3][i % 3]
    ax.hist(df[subj], bins=10, color=colors[i], edgecolor='white', alpha=0.8)
    ax.axvline(df[subj].mean(), color='red', linestyle='--', label=f'평균: {df[subj].mean():.1f}')
    ax.set_title(f'{subj} 점수 분포')
    ax.set_xlabel('점수')
    ax.set_ylabel('학생 수')
    ax.legend(fontsize=9)

# 총점 분포
axes[1][2].hist(df['평균'], bins=10, color='#374151', edgecolor='white', alpha=0.8)
axes[1][2].axvline(df['평균'].mean(), color='red', linestyle='--', label=f'평균: {df["평균"].mean():.1f}')
axes[1][2].set_title('전과목 평균 분포')
axes[1][2].set_xlabel('평균 점수')
axes[1][2].legend(fontsize=9)

plt.suptitle('과목별 성적 분포 (히스토그램)', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,l=`import seaborn as sns

# 과목 간 상관계수 계산
subjects = ['국어', '영어', '수학', '과학', '사회']
corr = df[subjects].corr().round(2)
print("과목 간 상관계수:")
print(corr)

# 히트맵 시각화
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap='RdYlBu_r', center=0,
            vmin=-1, vmax=1, square=True, fmt='.2f',
            linewidths=0.5, linecolor='white')
plt.title('과목 간 상관관계 히트맵', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()`,r=`fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1) 과목별 평균 점수 비교
subjects = ['국어', '영어', '수학', '과학', '사회']
means = [df[s].mean() for s in subjects]
colors = ['#6366f1', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b']
axes[0,0].bar(subjects, means, color=colors)
axes[0,0].set_title('과목별 평균 점수')
axes[0,0].set_ylim(50, 85)
axes[0,0].grid(axis='y', alpha=0.3)
for i, v in enumerate(means):
    axes[0,0].text(i, v + 0.5, f'{v:.1f}', ha='center', fontsize=9)

# 2) 국어 vs 수학 산점도
axes[0,1].scatter(df['국어'], df['수학'], c='#6366f1', alpha=0.6, edgecolors='white')
axes[0,1].set_xlabel('국어')
axes[0,1].set_ylabel('수학')
axes[0,1].set_title('국어 vs 수학 산점도')
axes[0,1].grid(True, alpha=0.3)

# 3) 상위/하위 10명 비교
df_sorted = df.sort_values('평균', ascending=False)
top10 = df_sorted.head(10)
bot10 = df_sorted.tail(10)
x = np.arange(len(subjects))
w = 0.35
axes[1,0].bar(x - w/2, top10[subjects].mean(), w, label='상위 10명', color='#10b981')
axes[1,0].bar(x + w/2, bot10[subjects].mean(), w, label='하위 10명', color='#ef4444')
axes[1,0].set_xticks(x)
axes[1,0].set_xticklabels(subjects)
axes[1,0].set_title('상위 vs 하위 10명 과목별 평균')
axes[1,0].legend()
axes[1,0].grid(axis='y', alpha=0.3)

# 4) 등급 분포 (A/B/C/D/F)
def grade(avg):
    if avg >= 90: return 'A'
    elif avg >= 80: return 'B'
    elif avg >= 70: return 'C'
    elif avg >= 60: return 'D'
    else: return 'F'

df['등급'] = df['평균'].apply(grade)
grade_counts = df['등급'].value_counts().reindex(['A', 'B', 'C', 'D', 'F'], fill_value=0)
grade_colors = ['#10b981', '#6366f1', '#f59e0b', '#f97316', '#ef4444']
axes[1,1].bar(grade_counts.index, grade_counts.values, color=grade_colors)
axes[1,1].set_title('등급별 학생 수')
axes[1,1].set_ylabel('학생 수')
for i, v in enumerate(grade_counts.values):
    axes[1,1].text(i, v + 0.3, str(v), ha='center', fontweight='bold')

plt.suptitle('학생 성적 종합 분석', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n" + "=" * 45)
print("학생 성적 분석 핵심 인사이트")
print("=" * 45)
print(f"전체 평균: {df['평균'].mean():.1f}점")
print(f"최고 평균: {df['평균'].max():.1f}점 ({df.loc[df['평균'].idxmax(), '학번']})")
print(f"가장 어려운 과목: {subjects[np.argmin(means)]} (평균 {min(means):.1f})")
print(f"가장 쉬운 과목: {subjects[np.argmax(means)]} (평균 {max(means):.1f})")`;function x(){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"학생 성적 분석",description:"기술통계와 히스토그램으로 학생 성적 데이터를 분석합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"학생 성적 분석"}),e.jsx("p",{children:"기술통계, 히스토그램, 상관분석으로 학생 성적을 분석합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsxs("p",{children:["50명 학생의 5과목 성적 데이터를 생성하고, 분포 확인, 상관분석, 종합 리포트를 만들어봅니다.",e.jsx("strong",{children:" 난이도: 초급"})," | 핵심 스킬: 기술통계, 히스토그램, 상관분석"]})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsx("p",{children:"50명 학생의 국어, 영어, 수학, 과학, 사회 성적입니다. 각 과목은 정규분포를 따르며, 총점과 평균을 계산합니다."}),e.jsx("h2",{children:"1단계: 데이터 생성 및 기술통계"}),e.jsx("p",{children:"정규분포로 성적 데이터를 생성하고, describe()로 기술통계량을 확인합니다."}),e.jsx(s,{title:"1단계: 데이터 생성 및 기술통계",initialCode:n}),e.jsx("h2",{children:"2단계: 성적 분포 시각화"}),e.jsx("p",{children:"과목별 히스토그램으로 점수 분포를 확인하고 평균선을 표시합니다."}),e.jsx(s,{title:"2단계: 성적 분포 (히스토그램)",initialCode:i}),e.jsx("h2",{children:"3단계: 과목 간 상관분석"}),e.jsx("p",{children:"상관계수를 계산하고 seaborn 히트맵으로 과목 간 관계를 시각화합니다."}),e.jsx(s,{title:"3단계: 과목 간 상관분석",initialCode:l}),e.jsx("h2",{children:"4단계: 종합 분석"}),e.jsx("p",{children:"과목별 평균, 산점도, 상위/하위 비교, 등급 분포를 하나의 대시보드로 구성합니다."}),e.jsx(s,{title:"4단계: 종합 분석 대시보드",initialCode:r}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"실습 과제"}),e.jsxs("ul",{children:[e.jsx("li",{children:"과목별 표준편차를 비교하는 바 차트를 그려보세요."}),e.jsx("li",{children:"영어와 과학의 산점도를 그리고 상관관계를 해석해보세요."}),e.jsx("li",{children:"성별 컬럼을 추가하고, 성별에 따른 과목별 평균 차이를 분석해보세요."})]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(t,{to:"/projects/cafe-sales",className:"lesson-nav-btn prev",children:"← 이전: 카페 매출 분석"}),e.jsx(t,{to:"/projects/survey-dashboard",className:"lesson-nav-btn next",children:"다음: 설문조사 대시보드 →"})]})]})})})]})}export{x as default};
