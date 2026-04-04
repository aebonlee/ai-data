import{j as n,L as r}from"./index-iCwWYDlc.js";import{S as t}from"./SEOHead-DrU2xOWE.js";import{C as e}from"./CodeEditor-Dmpnsl59.js";const a=`import pandas as pd
import numpy as np

# 직원 이직 예측 데이터 생성
np.random.seed(42)
n = 300
df = pd.DataFrame({
    '나이': np.random.randint(22, 60, n),
    '경력': np.random.randint(0, 30, n),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '야근시간': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1])
})

# 이직 여부 (만족도 낮고 야근 많으면 이직 확률 높음)
prob = 1 / (1 + np.exp(-(- 2 + 0.05*df['야근시간'] - 0.5*df['만족도'] + 0.01*df['나이'])))
df['이직'] = (np.random.random(n) < prob).astype(int)

print(f"데이터 크기: {df.shape}")
print(f"\\n[처음 10행]")
print(df.head(10))
print(f"\\n[이직 비율]")
print(df['이직'].value_counts())
print(f"이직률: {df['이직'].mean()*100:.1f}%")
print(f"\\n[기술통계]")
print(df.describe().round(1))`,i=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '나이': np.random.randint(22, 60, n),
    '경력': np.random.randint(0, 30, n),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '야근시간': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1])
})
prob = 1 / (1 + np.exp(-(- 2 + 0.05*df['야근시간'] - 0.5*df['만족도'] + 0.01*df['나이'])))
df['이직'] = (np.random.random(n) < prob).astype(int)

# LabelEncoder로 범주형 인코딩
le_dept = LabelEncoder()
le_rank = LabelEncoder()
df['부서_코드'] = le_dept.fit_transform(df['부서'])
df['직급_코드'] = le_rank.fit_transform(df['직급'])

# 피처와 타겟 분리
feature_cols = ['나이', '경력', '연봉', '만족도', '야근시간', '부서_코드', '직급_코드']
X = df[feature_cols]
y = df['이직']

# 학습/테스트 분리 (80:20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print(f"전체 데이터: {len(df)}")
print(f"학습 데이터: {len(X_train)}")
print(f"테스트 데이터: {len(X_test)}")
print(f"\\n학습 이직 비율: {y_train.mean()*100:.1f}%")
print(f"테스트 이직 비율: {y_test.mean()*100:.1f}%")
print(f"\\n피처: {feature_cols}")`,s=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '나이': np.random.randint(22, 60, n),
    '경력': np.random.randint(0, 30, n),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '야근시간': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1])
})
prob = 1 / (1 + np.exp(-(- 2 + 0.05*df['야근시간'] - 0.5*df['만족도'] + 0.01*df['나이'])))
df['이직'] = (np.random.random(n) < prob).astype(int)

le_dept = LabelEncoder()
le_rank = LabelEncoder()
df['부서_코드'] = le_dept.fit_transform(df['부서'])
df['직급_코드'] = le_rank.fit_transform(df['직급'])

feature_cols = ['나이', '경력', '연봉', '만족도', '야근시간', '부서_코드', '직급_코드']
X = df[feature_cols]
y = df['이직']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 로지스틱 회귀
model_lr = LogisticRegression(random_state=42, max_iter=1000)
model_lr.fit(X_train, y_train)

y_pred = model_lr.predict(X_test)
acc = accuracy_score(y_test, y_pred)

print("[로지스틱 회귀]")
print(f"정확도: {acc*100:.1f}%")

# 계수 해석
coef_df = pd.DataFrame({
    '피처': feature_cols,
    '계수': model_lr.coef_[0].round(4)
}).sort_values('계수', key=abs, ascending=False)
print(f"\\n[계수 (영향력)]")
print(coef_df.to_string(index=False))
print("\\n양수: 이직 확률 증가, 음수: 이직 확률 감소")`,o=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '나이': np.random.randint(22, 60, n),
    '경력': np.random.randint(0, 30, n),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '야근시간': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1])
})
prob = 1 / (1 + np.exp(-(- 2 + 0.05*df['야근시간'] - 0.5*df['만족도'] + 0.01*df['나이'])))
df['이직'] = (np.random.random(n) < prob).astype(int)

le_dept = LabelEncoder()
le_rank = LabelEncoder()
df['부서_코드'] = le_dept.fit_transform(df['부서'])
df['직급_코드'] = le_rank.fit_transform(df['직급'])

feature_cols = ['나이', '경력', '연봉', '만족도', '야근시간', '부서_코드', '직급_코드']
X = df[feature_cols]
y = df['이직']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 의사결정나무
model_dt = DecisionTreeClassifier(max_depth=4, random_state=42)
model_dt.fit(X_train, y_train)

y_pred = model_dt.predict(X_test)
acc = accuracy_score(y_test, y_pred)

print("[의사결정나무]")
print(f"정확도: {acc*100:.1f}%")
print(f"트리 깊이: {model_dt.get_depth()}")
print(f"리프 노드 수: {model_dt.get_n_leaves()}")

# 피처 중요도
importance = pd.DataFrame({
    '피처': feature_cols,
    '중요도': model_dt.feature_importances_.round(4)
}).sort_values('중요도', ascending=False)
print(f"\\n[피처 중요도]")
print(importance.to_string(index=False))`,d=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '나이': np.random.randint(22, 60, n),
    '경력': np.random.randint(0, 30, n),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '야근시간': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1])
})
prob = 1 / (1 + np.exp(-(- 2 + 0.05*df['야근시간'] - 0.5*df['만족도'] + 0.01*df['나이'])))
df['이직'] = (np.random.random(n) < prob).astype(int)

le_dept = LabelEncoder()
le_rank = LabelEncoder()
df['부서_코드'] = le_dept.fit_transform(df['부서'])
df['직급_코드'] = le_rank.fit_transform(df['직급'])

feature_cols = ['나이', '경력', '연봉', '만족도', '야근시간', '부서_코드', '직급_코드']
X = df[feature_cols]
y = df['이직']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 3개 모델 비교
models = {
    '로지스틱 회귀': LogisticRegression(random_state=42, max_iter=1000),
    '의사결정나무': DecisionTreeClassifier(max_depth=4, random_state=42),
    '랜덤포레스트': RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    train_acc = accuracy_score(y_train, model.predict(X_train))
    test_acc = accuracy_score(y_test, model.predict(X_test))
    results[name] = {'학습': train_acc, '테스트': test_acc}

print("[모델 비교]")
result_df = pd.DataFrame(results).T
result_df = result_df.round(3) * 100
result_df.columns = ['학습 정확도(%)', '테스트 정확도(%)']
print(result_df)

# 시각화
fig, ax = plt.subplots(figsize=(10, 5))
x = np.arange(len(models))
width = 0.35
ax.bar(x - width/2, [r['학습']*100 for r in results.values()], width, label='학습', color='#6366f1')
ax.bar(x + width/2, [r['테스트']*100 for r in results.values()], width, label='테스트', color='#ef4444')
ax.set_xticks(x)
ax.set_xticklabels(models.keys())
ax.set_ylabel('정확도 (%)')
ax.set_title('모델 성능 비교', fontweight='bold')
ax.legend()
ax.set_ylim(50, 100)
ax.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.show()`,p=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt

np.random.seed(42)
n = 300
df = pd.DataFrame({
    '나이': np.random.randint(22, 60, n),
    '경력': np.random.randint(0, 30, n),
    '연봉': np.random.normal(4500, 1200, n).astype(int),
    '만족도': np.random.uniform(1, 5, n).round(1),
    '야근시간': np.random.randint(0, 30, n),
    '부서': np.random.choice(['마케팅', '개발', '기획', '영업', '인사'], n),
    '직급': np.random.choice(['사원', '대리', '과장', '차장'], n, p=[0.4, 0.3, 0.2, 0.1])
})
prob = 1 / (1 + np.exp(-(- 2 + 0.05*df['야근시간'] - 0.5*df['만족도'] + 0.01*df['나이'])))
df['이직'] = (np.random.random(n) < prob).astype(int)

le_dept = LabelEncoder()
le_rank = LabelEncoder()
df['부서_코드'] = le_dept.fit_transform(df['부서'])
df['직급_코드'] = le_rank.fit_transform(df['직급'])

feature_cols = ['나이', '경력', '연봉', '만족도', '야근시간', '부서_코드', '직급_코드']
X = df[feature_cols]
y = df['이직']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 랜덤포레스트
model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print("[혼동 행렬 (Confusion Matrix)]")
print(f"           예측:유지  예측:이직")
print(f"실제:유지    {cm[0,0]:>5}    {cm[0,1]:>5}")
print(f"실제:이직    {cm[1,0]:>5}    {cm[1,1]:>5}")

# Classification Report
print(f"\\n[분류 성능 보고서]")
print(classification_report(y_test, y_pred, target_names=['유지', '이직']))

# Feature Importance 시각화
importance = pd.Series(model.feature_importances_, index=feature_cols).sort_values(ascending=True)
plt.figure(figsize=(10, 5))
importance.plot(kind='barh', color='#6366f1')
plt.title('피처 중요도 (Feature Importance)', fontsize=14, fontweight='bold')
plt.xlabel('중요도')
plt.tight_layout()
plt.show()

print("[인사이트]")
top3 = importance.sort_values(ascending=False).head(3)
for feat, imp in top3.items():
    print(f"  {feat}: {imp:.3f}")`;function _(){return n.jsxs(n.Fragment,{children:[n.jsx(t,{title:"분류 분석",description:"분류 알고리즘으로 범주를 예측하는 머신러닝을 학습합니다."}),n.jsx("section",{className:"page-header",children:n.jsxs("div",{className:"container",children:[n.jsx("h1",{children:"분류 분석"}),n.jsx("p",{children:"분류 알고리즘으로 범주를 예측하는 머신러닝을 학습합니다"})]})}),n.jsx("section",{className:"section lesson-content",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"playground-body",children:[n.jsx("h2",{children:"분류란?"}),n.jsx("p",{children:"분류(Classification)는 데이터를 미리 정의된 범주(클래스)로 나누는 지도학습 기법입니다. 이진 분류(합격/불합격)와 다중 분류(A/B/C 등급)가 있습니다."}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("strong",{children:"이진 분류"})," — 이직 예측(유지/이직), 스팸 탐지(정상/스팸), 질병 진단(양성/음성)"]}),n.jsxs("li",{children:[n.jsx("strong",{children:"다중 분류"})," — 고객 등급(VIP/일반/신규), 제품 카테고리 분류, 감성 분석(긍정/중립/부정)"]})]}),n.jsx("h2",{children:"데이터 생성: 직원 이직 예측"}),n.jsx("p",{children:"300명의 직원 데이터를 생성합니다. 나이, 경력, 연봉, 만족도, 야근시간 등의 피처로 이직 여부를 예측합니다."}),n.jsx(e,{title:"1단계: 데이터 생성 및 탐색",initialCode:a}),n.jsx("h2",{children:"전처리: LabelEncoder, train_test_split"}),n.jsx("p",{children:"범주형 변수를 숫자로 인코딩하고, 데이터를 학습용(80%)과 테스트용(20%)으로 분리합니다."}),n.jsx(e,{title:"2단계: 전처리 및 데이터 분리",initialCode:i}),n.jsx("h2",{children:"로지스틱 회귀"}),n.jsx("p",{children:"로지스틱 회귀는 가장 기본적인 분류 알고리즘입니다. 각 피처의 계수를 통해 어떤 요인이 이직에 영향을 미치는지 해석할 수 있습니다."}),n.jsx(e,{title:"3단계: 로지스틱 회귀",initialCode:s}),n.jsx("h2",{children:"의사결정나무"}),n.jsx("p",{children:"의사결정나무는 데이터를 조건에 따라 분기하여 분류합니다. 직관적이고 해석이 쉬운 것이 장점입니다."}),n.jsx(e,{title:"4단계: 의사결정나무",initialCode:o}),n.jsx("h2",{children:"랜덤포레스트 + 모델 비교"}),n.jsx("p",{children:"랜덤포레스트는 여러 의사결정나무를 앙상블하여 성능을 높입니다. 3가지 모델의 성능을 비교합니다."}),n.jsx(e,{title:"5단계: 랜덤포레스트 + 모델 비교",initialCode:d}),n.jsx("h2",{children:"평가: confusion matrix, classification_report"}),n.jsx("p",{children:"혼동 행렬로 예측 결과를 상세히 분석하고, precision, recall, f1-score로 모델 성능을 평가합니다."}),n.jsx(e,{title:"6단계: 모델 평가 + Feature Importance",initialCode:p}),n.jsxs("div",{className:"callout-box",children:[n.jsx("h3",{children:"분류 모델 선택 가이드"}),n.jsx("p",{children:"해석력이 중요하면 → 로지스틱 회귀 / 비선형 관계가 있으면 → 의사결정나무 / 최고 성능이 필요하면 → 랜덤포레스트. 실무에서는 여러 모델을 비교한 후 최적 모델을 선택합니다."})]}),n.jsxs("div",{className:"lesson-nav",children:[n.jsx(r,{to:"/learn/visualization",className:"lesson-nav-btn prev",children:"← 이전: 시각화 기법"}),n.jsx(r,{to:"/learn/regression",className:"lesson-nav-btn next",children:"다음: 회귀 분석 →"})]})]})})})]})}export{_ as default};
