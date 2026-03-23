import{r as l,j as e,L as o}from"./index-p8N1kvnq.js";import{S as c}from"./SEOHead-CNpWiLys.js";import{C as n}from"./CodeEditor-CM0ArTsA.js";const i=[{round:1,file:"/aice/classification-1.pdf",label:"1회차"},{round:2,file:"/aice/classification-2.pdf",label:"2회차"},{round:3,file:"/aice/classification-3.pdf",label:"3회차"}],d=`import numpy as np
import pandas as pd

np.random.seed(42)

# AICE 분류 연습용 샘플 데이터 생성
n = 500
df = pd.DataFrame({
    'age': np.random.randint(20, 65, n),
    'income': np.random.normal(50000, 15000, n).astype(int),
    'education': np.random.choice(['고졸', '대졸', '석사', '박사'], n, p=[0.3, 0.4, 0.2, 0.1]),
    'experience': np.random.randint(0, 30, n),
    'department': np.random.choice(['영업', '개발', '마케팅', '인사', '재무'], n),
    'satisfaction': np.round(np.random.uniform(1, 5, n), 1),
    'overtime': np.random.choice(['Yes', 'No'], n, p=[0.3, 0.7]),
})
# 타겟: 이직 여부 (income 낮고 satisfaction 낮으면 이직 확률 높음)
prob = 1 / (1 + np.exp(-(- 2 + 0.5*(df['satisfaction'] < 2.5) + 0.3*(df['income'] < 40000) + 0.4*(df['overtime']=='Yes'))))
df['target'] = (np.random.random(n) < prob).astype(int)

print("=" * 50)
print("AICE 분류 실습 - 데이터 탐색")
print("=" * 50)
print(f"\\n데이터 크기: {df.shape}")
print(f"\\n컬럼 정보:")
print(df.info())
print(f"\\n기술통계:")
print(df.describe())
print(f"\\n결측치:")
print(df.isnull().sum())
print(f"\\n타겟 분포:")
print(df['target'].value_counts())
print(f"\\n처음 5행:")
print(df.head())`,p=`from sklearn.preprocessing import LabelEncoder

# 범주형 변수 확인
cat_cols = df.select_dtypes(include='object').columns.tolist()
print(f"범주형 컬럼: {cat_cols}")
print()

# LabelEncoder로 인코딩
le_dict = {}
df_encoded = df.copy()
for col in cat_cols:
    le = LabelEncoder()
    df_encoded[col] = le.fit_transform(df_encoded[col])
    le_dict[col] = le
    print(f"{col}: {dict(zip(le.classes_, le.transform(le.classes_)))}")

print(f"\\n인코딩 후 데이터:")
print(df_encoded.head())
print(f"\\n결측치 확인:")
print(df_encoded.isnull().sum())`,f=`from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, classification_report

# 특성과 타겟 분리
X = df_encoded.drop('target', axis=1)
y = df_encoded['target']

# 학습/테스트 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"학습 데이터: {X_train.shape}, 테스트 데이터: {X_test.shape}")

# 여러 모델 비교
models = {
    'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
}

print("\\n" + "=" * 50)
print("모델별 성능 비교")
print("=" * 50)

best_model = None
best_score = 0

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    print(f"\\n{name}:")
    print(f"  Accuracy: {acc:.4f}")
    print(f"  F1 Score: {f1:.4f}")
    if acc > best_score:
        best_score = acc
        best_model = (name, model)

print(f"\\n최고 성능 모델: {best_model[0]} (Accuracy: {best_score:.4f})")`,m=`import matplotlib.pyplot as plt

# 최종 모델로 상세 리포트
final_model = best_model[1]
y_pred = final_model.predict(X_test)

print("=" * 50)
print(f"최종 모델: {best_model[0]}")
print("=" * 50)
print(f"\\n분류 리포트:")
print(classification_report(y_test, y_pred, target_names=['재직(0)', '이직(1)']))

# 특성 중요도 (Random Forest / Decision Tree)
if hasattr(final_model, 'feature_importances_'):
    importance = pd.Series(final_model.feature_importances_, index=X.columns).sort_values(ascending=True)

    plt.figure(figsize=(8, 5))
    importance.plot(kind='barh', color='#6366f1')
    plt.title('특성 중요도 (Feature Importance)', fontsize=14, fontweight='bold')
    plt.xlabel('중요도')
    plt.tight_layout()
    plt.show()

# 예측 결과 저장 (시험에서 제출용)
result = pd.DataFrame({'pred': y_pred})
print(f"\\n예측 결과 (처음 10개):")
print(result.head(10))
print(f"\\n예측 분포:")
print(result['pred'].value_counts())
print(f"\\n* 실제 시험에서는 result.to_csv('result.csv', index=False)로 제출합니다.")`;function u(){const[r,a]=l.useState(0);return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"AICE 분류 실습",description:"AICE Associate 분류(Classification) 문제를 풀어봅니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"AICE 분류 실습"}),e.jsx("p",{children:"Classification 기출 문제를 보면서 직접 코드를 작성해보세요"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsx("h2",{children:"기출문제 PDF"}),e.jsx("div",{style:{display:"flex",gap:"0.5rem",marginBottom:"1rem",flexWrap:"wrap"},children:i.map((s,t)=>e.jsx("button",{onClick:()=>a(t),style:{padding:"0.5rem 1.2rem",borderRadius:"0.5rem",border:"2px solid",borderColor:r===t?"#6366f1":"var(--color-border)",background:r===t?"#6366f1":"transparent",color:r===t?"#fff":"var(--color-text)",cursor:"pointer",fontWeight:r===t?"bold":"normal",transition:"all 0.2s"},children:s.label},s.round))}),e.jsx("div",{style:{border:"1px solid var(--color-border)",borderRadius:"0.5rem",overflow:"hidden",marginBottom:"2rem"},children:e.jsx("iframe",{src:i[r].file,title:i[r].label,style:{width:"100%",height:"600px",border:"none"}})}),e.jsxs("p",{style:{textAlign:"center",fontSize:"0.9rem",color:"var(--color-text-secondary)"},children:["PDF가 보이지 않으면"," ",e.jsx("a",{href:i[r].file,target:"_blank",rel:"noopener noreferrer",children:"새 탭에서 열기"})]}),e.jsx("h2",{style:{marginTop:"2rem"},children:"분류 실습 코드"}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"실습 안내"}),e.jsx("p",{children:"아래 코드는 AICE 분류 시험의 전형적인 풀이 과정입니다. PDF 문제를 참고하면서 각 단계를 실행해보세요. 실제 시험에서는 주어진 CSV 데이터를 사용하지만, 여기서는 연습용 샘플 데이터로 실습합니다."})]}),e.jsx("h3",{children:"1단계: 데이터 로딩 및 탐색"}),e.jsx(n,{title:"1단계: 데이터 탐색 (shape, info, describe)",initialCode:d}),e.jsx("h3",{children:"2단계: 데이터 전처리"}),e.jsx(n,{title:"2단계: 전처리 (LabelEncoder, 결측치)",initialCode:p}),e.jsx("h3",{children:"3단계: 모델 학습 및 평가"}),e.jsx(n,{title:"3단계: 모델 학습 (Logistic, Tree, Forest)",initialCode:f}),e.jsx("h3",{children:"4단계: 최종 제출"}),e.jsx(n,{title:"4단계: 최종 리포트 및 제출",initialCode:m}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"핵심 체크리스트"}),e.jsxs("ul",{children:[e.jsx("li",{children:"데이터 shape, info(), describe() 확인"}),e.jsx("li",{children:"결측치 처리: fillna() 또는 dropna()"}),e.jsx("li",{children:"범주형 인코딩: LabelEncoder 또는 get_dummies()"}),e.jsx("li",{children:"train_test_split으로 데이터 분할"}),e.jsx("li",{children:"여러 모델 비교 후 최적 모델 선택"}),e.jsx("li",{children:"accuracy_score, f1_score로 평가"}),e.jsx("li",{children:"result.to_csv()로 제출 파일 생성"})]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(o,{to:"/aice",className:"lesson-nav-btn prev",children:"← AICE 홈"}),e.jsx(o,{to:"/aice/regression",className:"lesson-nav-btn next",children:"회귀 실습 →"})]})]})})})]})}export{u as default};
