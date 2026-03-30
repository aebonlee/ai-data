import{j as e,L as t}from"./index-DSj272Qi.js";import{S as n}from"./SEOHead-Dvt2fwGA.js";import{C as s}from"./CodeEditor-BUA_pBI1.js";const a=`import numpy as np
import pandas as pd

np.random.seed(42)

n = 200
age_groups = np.random.choice(['10대', '20대', '30대', '40대', '50대+'], n, p=[0.05, 0.3, 0.3, 0.2, 0.15])
genders = np.random.choice(['남성', '여성'], n, p=[0.48, 0.52])
satisfaction = np.random.choice(['매우불만', '불만', '보통', '만족', '매우만족'], n, p=[0.05, 0.1, 0.3, 0.35, 0.2])
channels = np.random.choice(['온라인', '오프라인', 'SNS', '지인추천'], n, p=[0.35, 0.25, 0.25, 0.15])
revisit = np.random.choice(['예', '아니오'], n, p=[0.7, 0.3])
scores = np.random.randint(1, 11, n)

df = pd.DataFrame({
    '연령대': age_groups, '성별': genders, '만족도': satisfaction,
    '유입경로': channels, '재방문의향': revisit, 'NPS점수': scores
})

print(f"설문 응답 수: {len(df)}")
print()
print(df.head(10))
print()
print("만족도 분포:")
print(df['만족도'].value_counts())
print()
print("연령대별 응답 수:")
print(df['연령대'].value_counts().sort_index())`,i=`# 크로스탭: 연령대 × 만족도
ct = pd.crosstab(df['연령대'], df['만족도'])
ct = ct[['매우불만', '불만', '보통', '만족', '매우만족']]
print("연령대 × 만족도 크로스탭:")
print(ct)
print()

# 크로스탭: 성별 × 유입경로
ct2 = pd.crosstab(df['성별'], df['유입경로'])
print("성별 × 유입경로 크로스탭:")
print(ct2)
print()

# 연령대 × 만족도 비율
ct_pct = pd.crosstab(df['연령대'], df['만족도'], normalize='index').round(3) * 100
ct_pct = ct_pct[['매우불만', '불만', '보통', '만족', '매우만족']]
print("연령대별 만족도 비율(%):")
print(ct_pct.round(1))`,l=`import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1) 만족도 파이 차트
sat_counts = df['만족도'].value_counts().reindex(['매우불만', '불만', '보통', '만족', '매우만족'])
colors_pie = ['#ef4444', '#f97316', '#fbbf24', '#10b981', '#6366f1']
axes[0,0].pie(sat_counts.values, labels=sat_counts.index, autopct='%1.1f%%',
              colors=colors_pie, startangle=90)
axes[0,0].set_title('전체 만족도 분포')

# 2) 유입경로 파이 차트
ch_counts = df['유입경로'].value_counts()
axes[0,1].pie(ch_counts.values, labels=ch_counts.index, autopct='%1.1f%%',
              colors=['#6366f1', '#8b5cf6', '#f59e0b', '#10b981'], startangle=90)
axes[0,1].set_title('유입경로 분포')

# 3) 연령대별 만족도 스택 바
ct = pd.crosstab(df['연령대'], df['만족도'], normalize='index')
ct = ct.reindex(columns=['매우불만', '불만', '보통', '만족', '매우만족'])
ct.plot(kind='bar', stacked=True, ax=axes[1,0], color=colors_pie)
axes[1,0].set_title('연령대별 만족도 비율')
axes[1,0].set_ylabel('비율')
axes[1,0].set_xticklabels(axes[1,0].get_xticklabels(), rotation=45)
axes[1,0].legend(fontsize=8, loc='upper left')

# 4) 성별 NPS 점수 분포
for g, c in [('남성', '#6366f1'), ('여성', '#f59e0b')]:
    data = df[df['성별'] == g]['NPS점수']
    axes[1,1].hist(data, bins=10, alpha=0.6, color=c, label=g, edgecolor='white')
axes[1,1].set_title('성별 NPS 점수 분포')
axes[1,1].set_xlabel('NPS 점수')
axes[1,1].legend()

plt.suptitle('설문조사 시각화', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,r=`fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 1) 연령대별 평균 NPS
nps_by_age = df.groupby('연령대')['NPS점수'].mean().sort_index()
axes[0].barh(nps_by_age.index, nps_by_age.values, color='#6366f1')
axes[0].set_title('연령대별 평균 NPS')
axes[0].set_xlabel('NPS 점수')
for i, v in enumerate(nps_by_age.values):
    axes[0].text(v + 0.1, i, f'{v:.1f}', va='center')

# 2) 유입경로별 재방문 의향
ct_re = pd.crosstab(df['유입경로'], df['재방문의향'], normalize='index') * 100
ct_re[['예', '아니오']].plot(kind='bar', ax=axes[1], color=['#10b981', '#ef4444'])
axes[1].set_title('유입경로별 재방문 의향(%)')
axes[1].set_ylabel('%')
axes[1].set_xticklabels(axes[1].get_xticklabels(), rotation=45)
axes[1].legend()

# 3) 만족도별 평균 NPS
sat_order = ['매우불만', '불만', '보통', '만족', '매우만족']
nps_by_sat = df.groupby('만족도')['NPS점수'].mean().reindex(sat_order)
colors_bar = ['#ef4444', '#f97316', '#fbbf24', '#10b981', '#6366f1']
axes[2].bar(nps_by_sat.index, nps_by_sat.values, color=colors_bar)
axes[2].set_title('만족도별 평균 NPS')
axes[2].set_xticklabels(axes[2].get_xticklabels(), rotation=45)

plt.suptitle('설문조사 종합 대시보드', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()

# 핵심 인사이트
print("=" * 45)
print("설문조사 분석 핵심 인사이트")
print("=" * 45)
print(f"총 응답자: {len(df)}명")
print(f"전체 만족 비율: {(df['만족도'].isin(['만족','매우만족'])).mean()*100:.1f}%")
print(f"재방문 의향률: {(df['재방문의향']=='예').mean()*100:.1f}%")
print(f"평균 NPS 점수: {df['NPS점수'].mean():.1f}/10")
print(f"최고 NPS 연령대: {nps_by_age.idxmax()} ({nps_by_age.max():.1f}점)")`;function p(){return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"설문조사 대시보드",description:"크로스탭과 범주형 데이터로 설문조사 대시보드를 구성합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"설문조사 대시보드"}),e.jsx("p",{children:"크로스탭, 범주형 데이터, 파이 차트로 설문 결과를 분석합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsxs("p",{children:["200명의 설문 응답 데이터를 생성하고, 크로스탭 분석과 다양한 파이/바 차트로 대시보드를 구성합니다.",e.jsx("strong",{children:" 난이도: 중급"})," | 핵심 스킬: 크로스탭, 범주형 데이터, 파이 차트"]})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsx("p",{children:"200명의 설문 응답 데이터입니다. 연령대, 성별, 만족도, 유입경로, 재방문 의향, NPS 점수를 포함합니다."}),e.jsx("h2",{children:"1단계: 데이터 생성 및 탐색"}),e.jsx("p",{children:"범주형 데이터를 생성하고 각 항목의 분포를 확인합니다."}),e.jsx(s,{title:"1단계: 데이터 생성 및 탐색",initialCode:a}),e.jsx("h2",{children:"2단계: 크로스탭 분석"}),e.jsx("p",{children:"두 변수 간의 교차 빈도표를 만들어 관계를 파악합니다."}),e.jsx(s,{title:"2단계: 크로스탭 분석",initialCode:i}),e.jsx("h2",{children:"3단계: 범주형 시각화"}),e.jsx("p",{children:"파이 차트, 스택 바 차트, 히스토그램으로 범주형 데이터를 시각화합니다."}),e.jsx(s,{title:"3단계: 범주형 시각화",initialCode:l}),e.jsx("h2",{children:"4단계: 종합 대시보드"}),e.jsx("p",{children:"연령대별 NPS, 유입경로별 재방문율, 만족도별 NPS를 종합 대시보드로 구성합니다."}),e.jsx(s,{title:"4단계: 종합 대시보드",initialCode:r}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"실습 과제"}),e.jsxs("ul",{children:[e.jsx("li",{children:"성별과 만족도의 크로스탭을 만들고 해석해보세요."}),e.jsx("li",{children:"재방문 의향이 '예'인 그룹과 '아니오'인 그룹의 NPS 점수 분포를 비교해보세요."}),e.jsx("li",{children:"연령대별 유입경로 비율을 스택 바 차트로 시각화해보세요."})]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(t,{to:"/projects/student-scores",className:"lesson-nav-btn prev",children:"← 이전: 학생 성적 분석"}),e.jsx(t,{to:"/projects/weather-pattern",className:"lesson-nav-btn next",children:"다음: 날씨 패턴 분석 →"})]})]})})})]})}export{p as default};
