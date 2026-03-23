import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import CodeEditor from '../../components/CodeEditor'

const rounds = [
  { round: 1, file: '/aice/regression-1.pdf', label: '1회차' },
  { round: 2, file: '/aice/regression-2.pdf', label: '2회차' },
  { round: 3, file: '/aice/regression-3.pdf', label: '3회차' },
]

const step1 = `import numpy as np
import pandas as pd

np.random.seed(42)

# AICE 회귀 연습용 샘플 데이터 생성 (주택 가격 예측)
n = 500
area = np.random.randint(40, 200, n)
rooms = np.random.randint(1, 6, n)
floor = np.random.randint(1, 25, n)
age = np.random.randint(0, 40, n)
distance = np.round(np.random.uniform(0.1, 15, n), 1)
region = np.random.choice(['강남', '서초', '마포', '송파', '용산'], n, p=[0.15, 0.15, 0.25, 0.25, 0.2])

# 가격 = 면적 기반 + 지역 프리미엄 + 노이즈
region_premium = {'강남': 5000, '서초': 4000, '마포': 2000, '송파': 3000, '용산': 3500}
price = (area * 50 + rooms * 1000 - age * 100 - distance * 200
         + np.array([region_premium[r] for r in region])
         + np.random.normal(0, 2000, n)).astype(int)

df = pd.DataFrame({
    'area': area, 'rooms': rooms, 'floor': floor, 'age': age,
    'distance': distance, 'region': region, 'price': np.clip(price, 3000, 50000)
})

print("=" * 50)
print("AICE 회귀 실습 - 데이터 탐색")
print("=" * 50)
print(f"\\n데이터 크기: {df.shape}")
print(f"\\n컬럼 정보:")
print(df.info())
print(f"\\n기술통계:")
print(df.describe())
print(f"\\n결측치:")
print(df.isnull().sum())
print(f"\\n처음 5행:")
print(df.head())`

const step2 = `from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt

# 범주형 변수 인코딩
cat_cols = df.select_dtypes(include='object').columns.tolist()
print(f"범주형 컬럼: {cat_cols}")

df_encoded = df.copy()
le_dict = {}
for col in cat_cols:
    le = LabelEncoder()
    df_encoded[col] = le.fit_transform(df_encoded[col])
    le_dict[col] = le
    print(f"{col}: {dict(zip(le.classes_, le.transform(le.classes_)))}")

# 타겟 변수 분포 확인
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].hist(df['price'], bins=30, color='#6366f1', edgecolor='white')
axes[0].set_title('가격 분포')
axes[0].set_xlabel('가격 (만원)')

# 상관관계 확인
corr_with_target = df_encoded.corr()['price'].drop('price').sort_values()
axes[1].barh(corr_with_target.index, corr_with_target.values, color='#10b981')
axes[1].set_title('변수별 가격 상관계수')
axes[1].set_xlabel('상관계수')
plt.tight_layout()
plt.show()

print(f"\\n인코딩 후 데이터:")
print(df_encoded.head())`

const step3 = `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 특성과 타겟 분리
X = df_encoded.drop('price', axis=1)
y = df_encoded['price']

# 학습/테스트 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"학습 데이터: {X_train.shape}, 테스트 데이터: {X_test.shape}")

# 여러 모델 비교
models = {
    'Linear Regression': LinearRegression(),
    'Decision Tree': DecisionTreeRegressor(random_state=42),
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
}

print("\\n" + "=" * 50)
print("모델별 성능 비교")
print("=" * 50)

best_model = None
best_rmse = float('inf')

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    print(f"\\n{name}:")
    print(f"  RMSE: {rmse:.2f}")
    print(f"  R2 Score: {r2:.4f}")
    if rmse < best_rmse:
        best_rmse = rmse
        best_model = (name, model)

print(f"\\n최고 성능 모델: {best_model[0]} (RMSE: {best_rmse:.2f})")`

const step4 = `# 최종 모델 상세 분석
final_model = best_model[1]
y_pred = final_model.predict(X_test)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# 실제 vs 예측 산점도
axes[0].scatter(y_test, y_pred, alpha=0.5, color='#6366f1', s=20)
min_val = min(y_test.min(), y_pred.min())
max_val = max(y_test.max(), y_pred.max())
axes[0].plot([min_val, max_val], [min_val, max_val], 'r--', linewidth=2)
axes[0].set_xlabel('실제 가격')
axes[0].set_ylabel('예측 가격')
axes[0].set_title('실제 vs 예측 가격')
axes[0].grid(True, alpha=0.3)

# 특성 중요도
if hasattr(final_model, 'feature_importances_'):
    importance = pd.Series(final_model.feature_importances_, index=X.columns).sort_values(ascending=True)
    importance.plot(kind='barh', ax=axes[1], color='#10b981')
    axes[1].set_title('특성 중요도')
    axes[1].set_xlabel('중요도')

plt.suptitle(f'최종 모델: {best_model[0]}', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# 잔차 분석
residuals = y_test - y_pred
print("=" * 50)
print(f"최종 모델: {best_model[0]}")
print("=" * 50)
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.2f}")
print(f"R2 Score: {r2_score(y_test, y_pred):.4f}")
print(f"평균 잔차: {residuals.mean():.2f}")
print(f"잔차 표준편차: {residuals.std():.2f}")

# 예측 결과 저장
result = pd.DataFrame({'pred': y_pred.round(0).astype(int)})
print(f"\\n예측 결과 (처음 10개):")
print(result.head(10))
print(f"\\n* 실제 시험에서는 result.to_csv('result.csv', index=False)로 제출합니다.")`

export default function AICERegression() {
  const [activeRound, setActiveRound] = useState(0)

  return (
    <>
      <SEOHead title="AICE 회귀 실습" description="AICE Associate 회귀(Regression) 문제를 풀어봅니다." />
      <section className="page-header">
        <div className="container">
          <h1>AICE 회귀 실습</h1>
          <p>Regression 기출 문제를 보면서 직접 코드를 작성해보세요</p>
        </div>
      </section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>기출문제 PDF</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {rounds.map((r, i) => (
                <button key={r.round} onClick={() => setActiveRound(i)}
                  style={{
                    padding: '0.5rem 1.2rem', borderRadius: '0.5rem', border: '2px solid',
                    borderColor: activeRound === i ? '#10b981' : 'var(--color-border)',
                    background: activeRound === i ? '#10b981' : 'transparent',
                    color: activeRound === i ? '#fff' : 'var(--color-text)',
                    cursor: 'pointer', fontWeight: activeRound === i ? 'bold' : 'normal',
                    transition: 'all 0.2s'
                  }}>
                  {r.label}
                </button>
              ))}
            </div>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '2rem' }}>
              <iframe
                src={rounds[activeRound].file}
                title={rounds[activeRound].label}
                style={{ width: '100%', height: '600px', border: 'none' }}
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              PDF가 보이지 않으면{' '}
              <a href={rounds[activeRound].file} target="_blank" rel="noopener noreferrer">
                새 탭에서 열기
              </a>
            </p>

            <h2 style={{ marginTop: '2rem' }}>회귀 실습 코드</h2>
            <div className="callout-box">
              <h3>실습 안내</h3>
              <p>아래 코드는 AICE 회귀 시험의 전형적인 풀이 과정입니다. PDF 문제를 참고하면서 각 단계를 실행해보세요.
              실제 시험에서는 주어진 CSV 데이터를 사용하지만, 여기서는 주택 가격 예측 샘플로 실습합니다.</p>
            </div>

            <h3>1단계: 데이터 로딩 및 탐색</h3>
            <CodeEditor title="1단계: 데이터 탐색 (shape, info, describe)" initialCode={step1} />

            <h3>2단계: 데이터 전처리</h3>
            <CodeEditor title="2단계: 전처리 및 시각화" initialCode={step2} />

            <h3>3단계: 모델 학습 및 평가</h3>
            <CodeEditor title="3단계: 모델 학습 (Linear, Tree, Forest)" initialCode={step3} />

            <h3>4단계: 최종 제출</h3>
            <CodeEditor title="4단계: 최종 분석 및 제출" initialCode={step4} />

            <div className="callout-box">
              <h3>핵심 체크리스트</h3>
              <ul>
                <li>데이터 shape, info(), describe() 확인</li>
                <li>결측치 처리: fillna() 또는 dropna()</li>
                <li>범주형 인코딩: LabelEncoder 또는 get_dummies()</li>
                <li>train_test_split으로 데이터 분할</li>
                <li>여러 모델 비교 후 최적 모델 선택</li>
                <li>RMSE, R2 Score로 평가</li>
                <li>실제 vs 예측 산점도로 모델 검증</li>
                <li>result.to_csv()로 제출 파일 생성</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/aice/classification" className="lesson-nav-btn prev">&larr; 분류 실습</Link>
              <Link to="/aice" className="lesson-nav-btn next">AICE 홈 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
