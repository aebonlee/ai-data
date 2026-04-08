import{j as e,L as n}from"./index-BhztXkXT.js";import{S as t}from"./SEOHead-Cp69vAw1.js";import{C as r}from"./CodeEditor-BVlpIq3V.js";const s=`import pandas as pd
import numpy as np

# 주택 가격 예측 데이터 생성
np.random.seed(42)
n = 300
df = pd.DataFrame({
    '면적': np.random.randint(40, 150, n),
    '방수': np.random.choice([1, 2, 3, 4], n, p=[0.15, 0.35, 0.35, 0.15]),
    '층수': np.random.randint(1, 25, n),
    '역거리': np.random.uniform(0.1, 3.0, n).round(2),
    '건축년도': np.random.randint(1990, 2024, n),
    '지역': np.random.choice(['강남', '강북', '서초', '마포', '송파'], n)
})

# 가격 생성 (면적과 지역에 크게 영향)
region_premium = {'강남': 3000, '서초': 2500, '송파': 2000, '마포': 1800, '강북': 1500}
df['가격'] = (df['면적'] * 50 +
             df['방수'] * 2000 -
             df['역거리'] * 1000 +
             df['지역'].map(region_premium) +
             np.random.normal(0, 2000, n)).astype(int)

print(f"데이터 크기: {df.shape}")
print(f"\\n[처음 10행]")
print(df.head(10))
print(f"\\n[기술통계]")
print(df.describe().round(1))
print(f"\\n[지역별 평균 가격]")
print(df.groupby('지역')['가격'].mean().sort_values(ascending=False).round(0))`,a=`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '면적': np.random.randint(40, 150, n),
    '방수': np.random.choice([1, 2, 3, 4], n, p=[0.15, 0.35, 0.35, 0.15]),
    '층수': np.random.randint(1, 25, n),
    '역거리': np.random.uniform(0.1, 3.0, n).round(2),
    '건축년도': np.random.randint(1990, 2024, n),
    '지역': np.random.choice(['강남', '강북', '서초', '마포', '송파'], n)
})
region_premium = {'강남': 3000, '서초': 2500, '송파': 2000, '마포': 1800, '강북': 1500}
df['가격'] = (df['면적'] * 50 + df['방수'] * 2000 - df['역거리'] * 1000 +
             df['지역'].map(region_premium) + np.random.normal(0, 2000, n)).astype(int)

# 인코딩
le = LabelEncoder()
df['지역_코드'] = le.fit_transform(df['지역'])
print(f"지역 매핑: {dict(zip(le.classes_, le.transform(le.classes_)))}")

# 상관분석
numeric_cols = ['면적', '방수', '층수', '역거리', '건축년도', '지역_코드', '가격']
corr = df[numeric_cols].corr()['가격'].drop('가격').sort_values(ascending=False)
print(f"\\n[가격과의 상관관계]")
print(corr.round(3))

# 시각화
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].scatter(df['면적'], df['가격'], alpha=0.4, color='#6366f1', s=15)
axes[0].set_xlabel('면적')
axes[0].set_ylabel('가격')
axes[0].set_title('면적 vs 가격', fontweight='bold')

df.boxplot(column='가격', by='지역', ax=axes[1])
axes[1].set_title('지역별 가격 분포', fontweight='bold')
plt.sca(axes[1])
plt.xlabel('지역')

axes[2].scatter(df['역거리'], df['가격'], alpha=0.4, color='#ef4444', s=15)
axes[2].set_xlabel('역거리 (km)')
axes[2].set_ylabel('가격')
axes[2].set_title('역거리 vs 가격', fontweight='bold')

plt.suptitle('전처리: 상관분석 시각화', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()`,o=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '면적': np.random.randint(40, 150, n),
    '방수': np.random.choice([1, 2, 3, 4], n, p=[0.15, 0.35, 0.35, 0.15]),
    '층수': np.random.randint(1, 25, n),
    '역거리': np.random.uniform(0.1, 3.0, n).round(2),
    '건축년도': np.random.randint(1990, 2024, n),
    '지역': np.random.choice(['강남', '강북', '서초', '마포', '송파'], n)
})
region_premium = {'강남': 3000, '서초': 2500, '송파': 2000, '마포': 1800, '강북': 1500}
df['가격'] = (df['면적'] * 50 + df['방수'] * 2000 - df['역거리'] * 1000 +
             df['지역'].map(region_premium) + np.random.normal(0, 2000, n)).astype(int)

le = LabelEncoder()
df['지역_코드'] = le.fit_transform(df['지역'])

feature_cols = ['면적', '방수', '층수', '역거리', '건축년도', '지역_코드']
X = df[feature_cols]
y = df['가격']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 선형 회귀
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("[선형 회귀]")
print(f"RMSE: {rmse:,.0f}")
print(f"R2 Score: {r2:.4f}")

# 계수 해석
coef_df = pd.DataFrame({
    '피처': feature_cols,
    '계수': model.coef_.round(2)
}).sort_values('계수', key=abs, ascending=False)
print(f"\\n[회귀 계수]")
print(coef_df.to_string(index=False))
print(f"\\n절편: {model.intercept_:.2f}")
print("\\n해석: 면적 1단위 증가 시 가격이 약 {:.0f} 증가".format(coef_df[coef_df['피처']=='면적']['계수'].values[0]))`,i=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error, r2_score

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '면적': np.random.randint(40, 150, n),
    '방수': np.random.choice([1, 2, 3, 4], n, p=[0.15, 0.35, 0.35, 0.15]),
    '층수': np.random.randint(1, 25, n),
    '역거리': np.random.uniform(0.1, 3.0, n).round(2),
    '건축년도': np.random.randint(1990, 2024, n),
    '지역': np.random.choice(['강남', '강북', '서초', '마포', '송파'], n)
})
region_premium = {'강남': 3000, '서초': 2500, '송파': 2000, '마포': 1800, '강북': 1500}
df['가격'] = (df['면적'] * 50 + df['방수'] * 2000 - df['역거리'] * 1000 +
             df['지역'].map(region_premium) + np.random.normal(0, 2000, n)).astype(int)

le = LabelEncoder()
df['지역_코드'] = le.fit_transform(df['지역'])

feature_cols = ['면적', '방수', '층수', '역거리', '건축년도', '지역_코드']
X = df[feature_cols]
y = df['가격']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 의사결정나무 회귀
model = DecisionTreeRegressor(max_depth=5, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("[의사결정나무 회귀]")
print(f"RMSE: {rmse:,.0f}")
print(f"R2 Score: {r2:.4f}")
print(f"트리 깊이: {model.get_depth()}")

# 피처 중요도
importance = pd.DataFrame({
    '피처': feature_cols,
    '중요도': model.feature_importances_.round(4)
}).sort_values('중요도', ascending=False)
print(f"\\n[피처 중요도]")
print(importance.to_string(index=False))`,d=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '면적': np.random.randint(40, 150, n),
    '방수': np.random.choice([1, 2, 3, 4], n, p=[0.15, 0.35, 0.35, 0.15]),
    '층수': np.random.randint(1, 25, n),
    '역거리': np.random.uniform(0.1, 3.0, n).round(2),
    '건축년도': np.random.randint(1990, 2024, n),
    '지역': np.random.choice(['강남', '강북', '서초', '마포', '송파'], n)
})
region_premium = {'강남': 3000, '서초': 2500, '송파': 2000, '마포': 1800, '강북': 1500}
df['가격'] = (df['면적'] * 50 + df['방수'] * 2000 - df['역거리'] * 1000 +
             df['지역'].map(region_premium) + np.random.normal(0, 2000, n)).astype(int)

le = LabelEncoder()
df['지역_코드'] = le.fit_transform(df['지역'])

feature_cols = ['면적', '방수', '층수', '역거리', '건축년도', '지역_코드']
X = df[feature_cols]
y = df['가격']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3개 모델 비교
models = {
    '선형 회귀': LinearRegression(),
    '의사결정나무': DecisionTreeRegressor(max_depth=5, random_state=42),
    '랜덤포레스트': RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42)
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    results[name] = {
        'RMSE': np.sqrt(mean_squared_error(y_test, y_pred)),
        'R2': r2_score(y_test, y_pred)
    }

print("[모델 비교]")
result_df = pd.DataFrame(results).T
result_df['RMSE'] = result_df['RMSE'].round(0)
result_df['R2'] = result_df['R2'].round(4)
print(result_df)

# 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# R2 비교
r2_values = [r['R2'] for r in results.values()]
colors = ['#6366f1', '#8b5cf6', '#10b981']
axes[0].bar(results.keys(), r2_values, color=colors)
axes[0].set_ylabel('R2 Score')
axes[0].set_title('R2 Score 비교 (높을수록 좋음)', fontweight='bold')
axes[0].set_ylim(0, 1)

# 실제 vs 예측 (최고 모델)
best_model = models['랜덤포레스트']
y_pred_best = best_model.predict(X_test)
axes[1].scatter(y_test, y_pred_best, alpha=0.5, color='#6366f1', s=20)
axes[1].plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()],
             'r--', linewidth=2, label='완벽한 예측')
axes[1].set_xlabel('실제 가격')
axes[1].set_ylabel('예측 가격')
axes[1].set_title('랜덤포레스트: 실제 vs 예측', fontweight='bold')
axes[1].legend()

plt.tight_layout()
plt.show()`,l=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import matplotlib.pyplot as plt

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '면적': np.random.randint(40, 150, n),
    '방수': np.random.choice([1, 2, 3, 4], n, p=[0.15, 0.35, 0.35, 0.15]),
    '층수': np.random.randint(1, 25, n),
    '역거리': np.random.uniform(0.1, 3.0, n).round(2),
    '건축년도': np.random.randint(1990, 2024, n),
    '지역': np.random.choice(['강남', '강북', '서초', '마포', '송파'], n)
})
region_premium = {'강남': 3000, '서초': 2500, '송파': 2000, '마포': 1800, '강북': 1500}
df['가격'] = (df['면적'] * 50 + df['방수'] * 2000 - df['역거리'] * 1000 +
             df['지역'].map(region_premium) + np.random.normal(0, 2000, n)).astype(int)

le = LabelEncoder()
df['지역_코드'] = le.fit_transform(df['지역'])

feature_cols = ['면적', '방수', '층수', '역거리', '건축년도', '지역_코드']
X = df[feature_cols]
y = df['가격']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# 평가 지표
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("[평가 지표]")
print(f"RMSE: {rmse:,.0f} (평균 오차 크기)")
print(f"MAE: {mae:,.0f} (평균 절대 오차)")
print(f"R2: {r2:.4f} (설명력 {r2*100:.1f}%)")

# 잔차 분석 + Feature Importance
residuals = y_test - y_pred

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 잔차 분포
axes[0].hist(residuals, bins=20, color='#6366f1', edgecolor='white')
axes[0].axvline(0, color='red', linestyle='--')
axes[0].set_title('잔차 분포', fontweight='bold')
axes[0].set_xlabel('잔차 (실제 - 예측)')

# 잔차 vs 예측값
axes[1].scatter(y_pred, residuals, alpha=0.5, color='#ef4444', s=20)
axes[1].axhline(0, color='black', linestyle='--')
axes[1].set_xlabel('예측값')
axes[1].set_ylabel('잔차')
axes[1].set_title('잔차 vs 예측값', fontweight='bold')

# Feature Importance
importance = pd.Series(model.feature_importances_, index=feature_cols).sort_values(ascending=True)
importance.plot(kind='barh', ax=axes[2], color='#10b981')
axes[2].set_title('피처 중요도', fontweight='bold')

plt.tight_layout()
plt.show()

print("\\n[인사이트]")
top = importance.sort_values(ascending=False)
for feat, imp in top.items():
    print(f"  {feat}: {imp:.3f}")
print(f"\\n→ '{top.index[0]}'이(가) 가격 예측에 가장 큰 영향을 미칩니다.")`;function c(){return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"회귀 분석",description:"회귀 알고리즘으로 연속값을 예측하는 머신러닝을 학습합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"회귀 분석"}),e.jsx("p",{children:"회귀 알고리즘으로 연속값을 예측하는 머신러닝을 학습합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsx("h2",{children:"회귀란?"}),e.jsx("p",{children:'회귀(Regression)는 연속적인 숫자 값을 예측하는 지도학습 기법입니다. 분류가 "어떤 범주?"를 예측한다면, 회귀는 "얼마?"를 예측합니다.'}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"주택 가격 예측"})," — 면적, 위치, 층수 등으로 가격 예측"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"매출 예측"})," — 광고비, 시즌, 프로모션으로 매출 예측"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"수요 예측"})," — 과거 데이터로 미래 수요 예측"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"연봉 예측"})," — 경력, 학력, 직무로 연봉 예측"]})]}),e.jsx("h2",{children:"데이터 생성: 주택 가격 예측"}),e.jsx("p",{children:"300건의 주택 데이터를 생성합니다. 면적, 방수, 층수, 역거리, 건축년도, 지역 정보로 가격을 예측합니다."}),e.jsx(r,{title:"1단계: 데이터 생성 및 탐색",initialCode:s}),e.jsx("h2",{children:"전처리: 인코딩, 상관분석"}),e.jsx("p",{children:"범주형 변수(지역)를 인코딩하고, 타겟(가격)과의 상관관계를 분석하여 중요한 피처를 파악합니다."}),e.jsx(r,{title:"2단계: 전처리 및 상관분석",initialCode:a}),e.jsx("h2",{children:"선형 회귀: 계수 해석"}),e.jsx("p",{children:"선형 회귀는 가장 기본적인 회귀 모델입니다. 각 피처의 계수를 통해 가격에 미치는 영향을 정량적으로 해석할 수 있습니다."}),e.jsx(r,{title:"3단계: 선형 회귀",initialCode:o}),e.jsx("h2",{children:"의사결정나무 회귀"}),e.jsx("p",{children:"의사결정나무는 비선형 관계도 잡아낼 수 있습니다. 피처 중요도를 통해 어떤 변수가 예측에 중요한지 파악합니다."}),e.jsx(r,{title:"4단계: 의사결정나무 회귀",initialCode:i}),e.jsx("h2",{children:"랜덤포레스트 회귀 + 모델 비교"}),e.jsx("p",{children:"3가지 회귀 모델의 RMSE와 R2를 비교하고, 최적 모델의 예측 결과를 시각화합니다."}),e.jsx(r,{title:"5단계: 랜덤포레스트 + 모델 비교",initialCode:d}),e.jsx("h2",{children:"평가: RMSE/R2, 잔차 분석, Feature Importance"}),e.jsx("p",{children:"RMSE(오차 크기), R2(설명력), 잔차 분석으로 모델의 품질을 종합적으로 평가합니다."}),e.jsx(r,{title:"6단계: 종합 평가",initialCode:l}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"회귀 평가 지표"}),e.jsx("p",{children:"RMSE: 낮을수록 좋음 (예측 오차의 크기) / MAE: 낮을수록 좋음 (평균 절대 오차) / R2: 1에 가까울수록 좋음 (모델의 설명력). 잔차가 정규분포를 따르고 예측값과 무관하면 좋은 모델입니다."})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(n,{to:"/learn/classification",className:"lesson-nav-btn prev",children:"← 이전: 분류 분석"}),e.jsx(n,{to:"/practice/sales",className:"lesson-nav-btn next",children:"다음: 매출 데이터 분석 →"})]})]})})})]})}export{c as default};
