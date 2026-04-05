import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import CodeEditor from '../../components/CodeEditor'

const code1 = `# ChatGPT로 생성한 결측치 처리 함수
import pandas as pd
import numpy as np

def fill_missing_values(df):
    """결측치를 자동으로 처리합니다.
    - 수치형: 중앙값으로 대체
    - 범주형: 최빈값으로 대체
    """
    result = df.copy()
    for col in result.columns:
        if result[col].isnull().sum() == 0:
            continue
        if result[col].dtype in ['int64', 'float64']:
            result[col] = result[col].fillna(result[col].median())
        else:
            result[col] = result[col].fillna(result[col].mode()[0])
    return result

# 테스트 데이터
df = pd.DataFrame({
    '이름': ['김철수', '이영희', None, '정수연', '최진호'],
    '나이': [28, None, 25, 30, None],
    '매출': [1500, 2200, None, 1600, 1900],
    '부서': ['마케팅', '개발', '마케팅', None, '개발']
})

print("[처리 전]")
print(df)
print(f"\\n결측치 수:\\n{df.isnull().sum()}")

df_clean = fill_missing_values(df)
print("\\n[처리 후]")
print(df_clean)
print(f"\\n결측치 수:\\n{df_clean.isnull().sum()}")`

const code2 = `# ChatGPT에게 "EDA 코드를 작성해줘"라고 요청한 결과
import pandas as pd
import numpy as np

# 샘플 데이터 생성
np.random.seed(42)
n = 100
df = pd.DataFrame({
    '나이': np.random.randint(20, 60, n),
    '연봉': np.random.normal(4500, 1000, n).astype(int),
    '경력': np.random.randint(0, 30, n),
    '만족도': np.random.choice(['매우불만', '불만', '보통', '만족', '매우만족'], n),
    '이직여부': np.random.choice(['유지', '이직'], n, p=[0.7, 0.3])
})

# ChatGPT가 생성한 EDA 코드
print("=" * 50)
print("탐색적 데이터 분석 (EDA) 결과")
print("=" * 50)

print(f"\\n데이터 크기: {df.shape}")
print(f"\\n[수치형 기술통계]")
print(df.describe().round(1))

print(f"\\n[범주형 빈도]")
for col in df.select_dtypes(include='object'):
    print(f"\\n{col}:")
    print(df[col].value_counts())

print(f"\\n[이직여부별 평균 비교]")
print(df.groupby('이직여부')[['나이', '연봉', '경력']].mean().round(1))`

const code3 = `# ChatGPT에게 "시각화 코드를 작성해줘"라고 요청한 결과
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
months = ['1월', '2월', '3월', '4월', '5월', '6월']
online = [120, 135, 148, 162, 175, 190]
offline = [200, 185, 170, 160, 155, 145]
mobile = [80, 95, 115, 130, 150, 170]

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 1) 채널별 매출 추이 (라인 차트)
axes[0].plot(months, online, marker='o', label='온라인', color='#6366f1')
axes[0].plot(months, offline, marker='s', label='오프라인', color='#ef4444')
axes[0].plot(months, mobile, marker='^', label='모바일', color='#10b981')
axes[0].set_title('채널별 월 매출 추이', fontsize=13, fontweight='bold')
axes[0].set_ylabel('매출 (억원)')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 2) 6월 채널 비중 (파이 차트)
june = [online[-1], offline[-1], mobile[-1]]
labels = ['온라인', '오프라인', '모바일']
colors = ['#6366f1', '#ef4444', '#10b981']
axes[1].pie(june, labels=labels, autopct='%1.1f%%', colors=colors, startangle=90)
axes[1].set_title('6월 채널별 매출 비중', fontsize=13, fontweight='bold')

# 3) 채널별 성장률 (바 차트)
growth = [(o[-1]-o[0])/o[0]*100 for o in [online, offline, mobile]]
bar_colors = ['#6366f1' if g > 0 else '#ef4444' for g in growth]
axes[2].bar(labels, growth, color=bar_colors)
axes[2].set_title('6개월 성장률', fontsize=13, fontweight='bold')
axes[2].set_ylabel('성장률 (%)')
axes[2].axhline(y=0, color='gray', linestyle='--', alpha=0.5)

plt.tight_layout()
plt.show()

# 인사이트 요약
print("[인사이트]")
print(f"온라인 성장률: {growth[0]:.1f}%")
print(f"오프라인 성장률: {growth[1]:.1f}%")
print(f"모바일 성장률: {growth[2]:.1f}%")
print("→ 모바일 채널이 가장 빠르게 성장하고 있습니다.")`

export default function ChatGPT() {
  return (
    <>
      <SEOHead title="ChatGPT 활용" description="ChatGPT를 데이터 분석 보조 도구로 활용하는 방법을 배웁니다." />
      <section className="page-header">
        <div className="container">
          <h1>ChatGPT 활용</h1>
          <p>ChatGPT를 데이터 분석 보조 도구로 활용하는 방법을 배웁니다</p>
        </div>
      </section>
      <section className="section lesson-content">
        <div className="container">
          <div className="playground-body">

            <h2>ChatGPT와 데이터 분석</h2>
            <p>ChatGPT는 데이터 분석의 강력한 보조 도구입니다. 코드 생성, 데이터 해석, 분석 방법론 추천, 결과 설명 등 분석의 전 과정에서 활용할 수 있습니다.</p>

            <h2>프롬프트 작성법: Bad vs Good</h2>
            <p>ChatGPT를 데이터 분석에 효과적으로 활용하려면 명확하고 구체적인 프롬프트를 작성해야 합니다.</p>
            <ul>
              <li><strong>나쁜 예</strong> — "매출 데이터 분석해줘" (모호하고 정보 부족)</li>
              <li><strong>좋은 예</strong> — "CSV 파일에 date, product, quantity, price 컬럼이 있는 매출 데이터가 있어. 월별 총 매출을 라인 차트로, 상위 5개 제품의 매출 비중을 파이 차트로 시각화하는 pandas+matplotlib 코드를 작성해줘."</li>
            </ul>
            <p>좋은 프롬프트의 핵심 요소:</p>
            <ol>
              <li><strong>데이터 구조 설명</strong> — 컬럼명, 데이터 타입, 행 수 등</li>
              <li><strong>원하는 결과 명시</strong> — 차트 종류, 표 형식, 보고서 등</li>
              <li><strong>사용 라이브러리 지정</strong> — pandas, matplotlib, seaborn 등</li>
              <li><strong>추가 조건</strong> — 한글 지원, 색상, 정렬 기준 등</li>
            </ol>

            <h2>코드 생성 활용</h2>
            <p>ChatGPT에게 "결측치를 자동으로 처리하는 함수를 작성해줘"라고 요청한 결과를 실행해봅니다.</p>
            <CodeEditor title="ChatGPT 코드 생성: 결측치 자동 처리" initialCode={code1} />

            <h2>데이터 해석 활용</h2>
            <p>ChatGPT에게 "이 데이터의 EDA를 수행하는 코드를 작성해줘"라고 요청하면, 구조적인 탐색 코드를 생성합니다.</p>
            <CodeEditor title="ChatGPT 코드 생성: EDA 자동화" initialCode={code2} />

            <h2>시각화 코드 생성</h2>
            <p>ChatGPT에게 "채널별 매출 추이를 라인, 파이, 바 차트 3개로 시각화해줘"라고 요청한 결과입니다.</p>
            <CodeEditor title="ChatGPT 코드 생성: 시각화 대시보드" initialCode={code3} />

            <h2>주의사항 및 검증</h2>
            <p>ChatGPT가 생성한 코드는 반드시 검증 후 사용해야 합니다:</p>
            <ul>
              <li><strong>코드 실행 확인</strong> — 생성된 코드를 반드시 실행하여 오류가 없는지 확인</li>
              <li><strong>결과 검증</strong> — 분석 결과가 논리적으로 타당한지 확인</li>
              <li><strong>데이터 맥락 확인</strong> — ChatGPT는 데이터의 업무 맥락을 모르므로, 도메인 지식으로 보완</li>
              <li><strong>반복 개선</strong> — 첫 결과가 완벽하지 않으면 피드백을 주어 개선</li>
              <li><strong>최신 API 확인</strong> — 라이브러리 버전에 따라 문법이 다를 수 있음</li>
            </ul>

            <div className="callout-box">
              <h3>ChatGPT 활용 팁</h3>
              <p>데이터의 구조(컬럼명, 데이터 타입)를 구체적으로 알려주세요. 원하는 출력 형태(차트, 표, 보고서)를 명시하세요. 사용할 라이브러리를 지정하면 더 정확한 코드를 받을 수 있습니다. "왜 이런 결과가 나왔는지 비전문가에게 설명해줘"라고 하면 인사이트 해석도 도와줍니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/intro/pandas-intro" className="lesson-nav-btn prev">&larr; 이전: Pandas 기초</Link>
              <Link to="/intro/data-types" className="lesson-nav-btn next">다음: 데이터 유형 이해 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
