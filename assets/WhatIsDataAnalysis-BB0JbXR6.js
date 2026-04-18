import{j as s,L as n}from"./index-C6F8ynWu.js";import{S as e}from"./SEOHead-BderUc8v.js";import{C as i}from"./CodeEditor-BFsjqTDd.js";const r=`# 데이터 분석 기본 파이프라인 (CRISP-DM)
import pandas as pd
import numpy as np

# 1. 비즈니스 이해 & 데이터 수집
print("=" * 50)
print("CRISP-DM 데이터 분석 프로세스 시연")
print("=" * 50)

# 샘플 매출 데이터 생성
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=12, freq='ME')
data = {
    '월': dates.strftime('%Y-%m'),
    '매출': np.random.randint(800, 2000, 12) * 10000,
    '고객수': np.random.randint(100, 500, 12),
    '광고비': np.random.randint(50, 200, 12) * 10000
}
df = pd.DataFrame(data)

# 2. 데이터 이해
print("\\n[데이터 구조]")
print(f"크기: {df.shape[0]}행 x {df.shape[1]}열")
print(f"컬럼: {list(df.columns)}")
print()
print(df.head())

# 3. 데이터 준비 & 분석
print("\\n[기술통계]")
print(df.describe())

# 4. 인사이트 도출
print("\\n[핵심 인사이트]")
print(f"총 매출: {df['매출'].sum():,.0f}원")
print(f"최고 매출 월: {df.loc[df['매출'].idxmax(), '월']}")
print(f"평균 고객수: {df['고객수'].mean():.0f}명")
print(f"광고비 대비 매출 효율: {df['매출'].sum() / df['광고비'].sum():.1f}배")`,t=`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 마케팅 분석 사례: 고객 세그먼트별 매출 분석
np.random.seed(42)
n = 200
customers = pd.DataFrame({
    '고객ID': range(1, n+1),
    '연령대': np.random.choice(['20대', '30대', '40대', '50대'], n, p=[0.25, 0.35, 0.25, 0.15]),
    '구매횟수': np.random.poisson(5, n) + 1,
    '총구매액': np.random.exponential(50000, n).astype(int) + 10000,
    '채널': np.random.choice(['온라인', '오프라인', '모바일'], n, p=[0.4, 0.25, 0.35])
})

# 연령대별 분석
print("[연령대별 분석]")
age_analysis = customers.groupby('연령대').agg(
    고객수=('고객ID', 'count'),
    평균구매횟수=('구매횟수', 'mean'),
    평균구매액=('총구매액', 'mean'),
    총매출=('총구매액', 'sum')
).round(0)
print(age_analysis)

# 채널별 분석
print("\\n[채널별 분석]")
channel = customers.groupby('채널').agg(
    고객수=('고객ID', 'count'),
    평균구매액=('총구매액', 'mean')
).round(0)
print(channel)

# 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

age_analysis['총매출'].plot(kind='bar', ax=axes[0], color=['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'])
axes[0].set_title('연령대별 총 매출', fontsize=13, fontweight='bold')
axes[0].set_ylabel('매출 (원)')
axes[0].tick_params(axis='x', rotation=0)

channel['평균구매액'].plot(kind='bar', ax=axes[1], color=['#10b981', '#f59e0b', '#ef4444'])
axes[1].set_title('채널별 평균 구매액', fontsize=13, fontweight='bold')
axes[1].set_ylabel('평균 구매액 (원)')
axes[1].tick_params(axis='x', rotation=0)

plt.tight_layout()
plt.show()`;function o(){return s.jsxs(s.Fragment,{children:[s.jsx(e,{title:"AI 데이터 분석이란?",description:"AI를 활용한 데이터 분석의 개념, CRISP-DM 프로세스, 활용 분야를 알아봅니다."}),s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"AI 데이터 분석이란?"}),s.jsx("p",{children:"AI를 활용한 데이터 분석의 개념과 활용 분야를 학습합니다"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"playground-body",children:[s.jsx("h2",{children:"데이터 분석의 정의"}),s.jsx("p",{children:"데이터 분석(Data Analysis)이란 원시 데이터를 수집, 정리, 변환하여 유의미한 정보와 인사이트를 도출하는 과정입니다. AI 기술의 발전으로 분석의 범위와 정확도가 비약적으로 향상되고 있습니다."}),s.jsx("p",{children:"전통적 분석이 사람의 경험과 직관에 의존했다면, AI 데이터 분석은 대규모 데이터에서 자동으로 패턴을 찾고 예측 모델을 구축합니다. 이를 통해 더 빠르고 정확한 의사결정이 가능해집니다."}),s.jsx("h2",{children:"AI의 역할"}),s.jsx("p",{children:"AI는 데이터 분석의 모든 단계에서 핵심적인 역할을 수행합니다:"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"데이터 수집 자동화"})," — 웹 스크래핑, API 연동, 센서 데이터 수집"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"전처리 자동화"})," — 결측치 탐지, 이상치 판별, 데이터 정제"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"패턴 인식"})," — 군집화, 분류, 연관규칙 발견"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"예측 모델링"})," — 미래 트렌드 예측, 수요 예측"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"시각화 추천"})," — 데이터에 최적화된 차트 유형 자동 선택"]})]}),s.jsx("h2",{children:"CRISP-DM 프로세스"}),s.jsx("p",{children:"CRISP-DM(Cross Industry Standard Process for Data Mining)은 데이터 분석의 국제 표준 프로세스입니다. 6단계로 구성되며, 반복적으로 수행됩니다:"}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"비즈니스 이해"})," — 분석 목표와 요구사항 정의"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"데이터 이해"})," — 데이터 수집, 탐색, 품질 확인"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"데이터 준비"})," — 전처리, 변환, 피처 엔지니어링"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"모델링"})," — 분석 기법 선택, 모델 구축"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"평가"})," — 모델 성능 검증, 비즈니스 목표 달성 여부 확인"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"배포"})," — 분석 결과 적용, 보고서 작성"]})]}),s.jsx(i,{title:"CRISP-DM 프로세스 시연: 기초 분석 파이프라인",initialCode:r}),s.jsx("h2",{children:"활용 분야별 사례"}),s.jsx("p",{children:"AI 데이터 분석은 거의 모든 산업에서 활용되고 있습니다:"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"마케팅"})," — 고객 세그먼테이션, A/B 테스트, 캠페인 효과 측정, CLV(고객 생애 가치) 예측"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"금융"})," — 신용 리스크 평가, 사기 탐지, 포트폴리오 최적화, 알고리즘 트레이딩"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"의료/헬스케어"})," — 환자 진단 보조, 의료 영상 분석, 신약 개발, 감염병 확산 예측"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"HR/인사"})," — 이직 예측, 채용 최적화, 직원 만족도 분석, 성과 예측"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"제조"})," — 품질 관리, 설비 고장 예측, 공정 최적화, 재고 관리"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"유통/리테일"})," — 수요 예측, 가격 최적화, 추천 시스템, 재고 관리"]})]}),s.jsx(i,{title:"활용 사례: 마케팅 고객 세그먼트 분석",initialCode:t}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"이 과정에서 배우게 될 것"}),s.jsx("p",{children:"이 커리큘럼에서는 Python과 AI 도구를 활용하여 데이터 분석의 전 과정을 실습합니다. 기초(Python, Pandas)부터 중급(전처리, EDA, 통계, 시각화, 머신러닝), 고급(실전 프로젝트)까지 13단계로 체계적으로 학습합니다."})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(n,{to:"/",className:"lesson-nav-btn prev",children:"← 홈"}),s.jsx(n,{to:"/intro/python-basics",className:"lesson-nav-btn next",children:"다음: Python 기초 →"})]})]})})})]})}export{o as default};
