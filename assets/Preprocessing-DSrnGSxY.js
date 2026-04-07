import{j as e,L as a}from"./index-DclAOFg-.js";import{S as i}from"./SEOHead-vgFclwEK.js";import{C as n}from"./CodeEditor-GxfyPcIl.js";const d=`import pandas as pd
import numpy as np

# 결측치 탐지와 시각화
np.random.seed(42)
df = pd.DataFrame({
    '이름': ['김철수', '이영희', None, '정수연', '최진호', '한지민', None, '윤서준'],
    '나이': [28, None, 25, 30, None, 27, 33, None],
    '부서': ['마케팅', '개발', '마케팅', None, '개발', '기획', '개발', '마케팅'],
    '매출': [1500, 2200, None, 1600, 1900, None, 2100, 1800],
    '평가': [4.2, None, 3.8, 4.5, None, None, 4.1, 3.9]
})

print("[원본 데이터]")
print(df)

# 결측치 현황
print("\\n[결측치 현황]")
missing = df.isnull().sum()
missing_pct = (df.isnull().mean() * 100).round(1)
missing_info = pd.DataFrame({'결측수': missing, '비율(%)': missing_pct})
print(missing_info)
print(f"\\n전체 결측 비율: {df.isnull().mean().mean()*100:.1f}%")
print(f"완전한 행 수: {df.dropna().shape[0]} / {df.shape[0]}")`,t=`import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    '이름': ['김철수', '이영희', None, '정수연', '최진호', '한지민', None, '윤서준'],
    '나이': [28, None, 25, 30, None, 27, 33, None],
    '매출': [1500, 2200, None, 1600, 1900, None, 2100, 1800],
    '평가': [4.2, None, 3.8, 4.5, None, None, 4.1, 3.9]
})

# 방법 1: 삭제
print("[방법 1: 삭제]")
df_drop_row = df.dropna()
print(f"행 삭제: {df.shape[0]}행 → {df_drop_row.shape[0]}행")

df_drop_col = df.dropna(axis=1)
print(f"열 삭제: {df.shape[1]}열 → {df_drop_col.shape[1]}열")

# 방법 2: 대체
print("\\n[방법 2: 대체]")
df_filled = df.copy()
df_filled['나이'] = df_filled['나이'].fillna(df_filled['나이'].median())
df_filled['매출'] = df_filled['매출'].fillna(df_filled['매출'].mean())
df_filled['평가'] = df_filled['평가'].fillna(df_filled['평가'].mean())
df_filled['이름'] = df_filled['이름'].fillna('미상')

print("대체 후:")
print(df_filled)

# 방법 비교
print("\\n[방법 비교]")
print(f"삭제 방식 - 데이터 손실 큼, 편향 가능성")
print(f"평균 대체 - 분산 감소, 상관관계 왜곡 가능")
print(f"중앙값 대체 - 이상치에 강건, 분포 왜곡 적음")`,r=`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 이상치 탐지: IQR vs Z-Score
np.random.seed(42)
data = pd.Series(np.concatenate([
    np.random.normal(50, 10, 95),
    np.array([120, 150, -20, 200, 5])  # 이상치 추가
]))

print(f"데이터 수: {len(data)}")
print(f"평균: {data.mean():.1f}, 중앙값: {data.median():.1f}")

# IQR 방식
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

outliers_iqr = data[(data < lower) | (data > upper)]
print(f"\\n[IQR 방식]")
print(f"Q1: {Q1:.1f}, Q3: {Q3:.1f}, IQR: {IQR:.1f}")
print(f"정상 범위: {lower:.1f} ~ {upper:.1f}")
print(f"이상치: {len(outliers_iqr)}개 → {sorted(outliers_iqr.values)}")

# Z-Score 방식
z_scores = (data - data.mean()) / data.std()
outliers_z = data[abs(z_scores) > 2]
print(f"\\n[Z-Score 방식 (|z| > 2)]")
print(f"이상치: {len(outliers_z)}개 → {sorted(outliers_z.values)}")

# 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].boxplot(data, vert=True)
axes[0].set_title('박스플롯 (이상치 확인)', fontsize=13, fontweight='bold')
axes[0].axhline(y=upper, color='r', linestyle='--', alpha=0.5, label=f'상한: {upper:.1f}')
axes[0].axhline(y=lower, color='r', linestyle='--', alpha=0.5, label=f'하한: {lower:.1f}')
axes[0].legend()

axes[1].hist(data, bins=20, color='#6366f1', edgecolor='white', alpha=0.7)
axes[1].axvline(x=lower, color='r', linestyle='--', label='IQR 경계')
axes[1].axvline(x=upper, color='r', linestyle='--')
axes[1].set_title('히스토그램 (분포 확인)', fontsize=13, fontweight='bold')
axes[1].legend()
plt.tight_layout()
plt.show()`,s=`import pandas as pd
import numpy as np

# 이상치 처리 전략
np.random.seed(42)
data = pd.Series(np.concatenate([
    np.random.normal(50, 10, 95),
    np.array([120, 150, -20, 200, 5])
]))

Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# 방법 1: 제거
clean1 = data[(data >= lower) & (data <= upper)]
print(f"[제거] {len(data)} → {len(clean1)}개")

# 방법 2: 윈저라이즈 (경계값으로 대체)
clean2 = data.clip(lower=lower, upper=upper)
print(f"[윈저라이즈] 범위: {clean2.min():.1f} ~ {clean2.max():.1f}")

# 방법 3: 로그 변환 (양수 데이터)
positive_data = data[data > 0]
clean3 = np.log1p(positive_data)  # log(1+x)
print(f"[로그변환] 원본 범위: {positive_data.min():.1f}~{positive_data.max():.1f}")
print(f"[로그변환] 변환 범위: {clean3.min():.2f}~{clean3.max():.2f}")

# 비교
print("\\n[처리 방법 비교]")
print(f"{'방법':<12} {'평균':>8} {'중앙값':>8} {'표준편차':>8}")
print("-" * 40)
print(f"{'원본':<12} {data.mean():>8.1f} {data.median():>8.1f} {data.std():>8.1f}")
print(f"{'제거':<12} {clean1.mean():>8.1f} {clean1.median():>8.1f} {clean1.std():>8.1f}")
print(f"{'윈저라이즈':<12} {clean2.mean():>8.1f} {clean2.median():>8.1f} {clean2.std():>8.1f}")`,l=`import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

# 인코딩: LabelEncoder vs get_dummies
df = pd.DataFrame({
    '이름': ['김철수', '이영희', '박민수', '정수연', '최진호'],
    '부서': ['마케팅', '개발', '마케팅', '기획', '개발'],
    '등급': ['B', 'A', 'C', 'A', 'A'],
    '지역': ['서울', '부산', '서울', '대구', '부산']
})

print("[원본 데이터]")
print(df)

# LabelEncoder - 순서가 있는 범주형에 적합
print("\\n[LabelEncoder - 등급]")
le = LabelEncoder()
df['등급_코드'] = le.fit_transform(df['등급'])
print(f"매핑: {dict(zip(le.classes_, le.transform(le.classes_)))}")
print(df[['등급', '등급_코드']])

# get_dummies (원-핫 인코딩) - 순서가 없는 범주형에 적합
print("\\n[원-핫 인코딩 - 부서, 지역]")
df_encoded = pd.get_dummies(df[['부서', '지역']], prefix=['부서', '지역'])
print(df_encoded)

print("\\n[인코딩 선택 가이드]")
print("LabelEncoder: 순서가 있는 범주 (등급, 학력)")
print("get_dummies: 순서가 없는 범주 (부서, 지역, 색상)")`,p=`import pandas as pd
import numpy as np

# 피처 엔지니어링 기초
np.random.seed(42)
df = pd.DataFrame({
    '주문일': pd.date_range('2024-01-01', periods=10, freq='3D'),
    '매출': np.random.randint(10000, 100000, 10),
    '수량': np.random.randint(1, 20, 10),
    '할인율': np.random.uniform(0, 0.3, 10).round(2)
})

print("[원본 데이터]")
print(df)

# 파생 변수 생성
df['단가'] = (df['매출'] / df['수량']).round(0)
df['실매출'] = (df['매출'] * (1 - df['할인율'])).round(0)
df['요일'] = df['주문일'].dt.day_name()
df['주말'] = df['주문일'].dt.dayofweek >= 5

print("\\n[파생 변수 추가]")
print(df)

# 구간화 (Binning)
df['매출등급'] = pd.cut(df['매출'], bins=[0, 30000, 60000, 100000],
                       labels=['하', '중', '상'])
print("\\n[구간화 - 매출등급]")
print(df[['매출', '매출등급']].sort_values('매출'))

print("\\n[피처 엔지니어링 체크리스트]")
print("1. 날짜 → 연/월/일/요일/주말 추출")
print("2. 가격 데이터 → 단가, 할인액, 실매출 계산")
print("3. 연속형 → 구간화(binning)로 범주형 변환")
print("4. 텍스트 길이, 단어 수 등 파생 변수")`;function m(){return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"데이터 전처리",description:"결측치 처리, 이상치 탐지, 인코딩, 피처 엔지니어링을 학습합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"데이터 전처리"}),e.jsx("p",{children:"결측치 처리, 이상치 탐지, 데이터 변환 기법을 학습합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsx("h2",{children:"전처리의 중요성"}),e.jsx("p",{children:'실무 데이터는 결측치, 이상치, 불일치 등 다양한 문제를 포함합니다. "Garbage In, Garbage Out" — 데이터 품질이 분석 결과의 품질을 결정합니다. 전처리는 전체 분석 시간의 60~80%를 차지할 만큼 중요한 단계입니다.'}),e.jsx("h2",{children:"결측치 탐지와 시각화"}),e.jsx("p",{children:"결측치(Missing Value)는 데이터에 값이 없는 경우입니다. isnull()과 notnull()로 탐지하고, 비율을 확인합니다."}),e.jsx(n,{title:"결측치 탐지와 현황 파악",initialCode:d}),e.jsx("h2",{children:"결측치 처리 전략: 삭제 vs 대체"}),e.jsx("p",{children:"결측치가 적으면 삭제, 많으면 대체가 일반적입니다. 데이터의 특성과 결측 패턴에 따라 최적의 방법을 선택합니다."}),e.jsx(n,{title:"결측치 처리: 삭제 vs 대체 비교",initialCode:t}),e.jsx("h2",{children:"이상치 탐지: IQR, Z-Score"}),e.jsx("p",{children:"이상치(Outlier)는 데이터의 일반적인 패턴에서 크게 벗어난 값입니다. IQR 방식과 Z-Score 방식으로 탐지합니다."}),e.jsx(n,{title:"이상치 탐지: IQR vs Z-Score",initialCode:r}),e.jsx("h2",{children:"이상치 처리: 제거, 윈저라이즈, 로그변환"}),e.jsx("p",{children:"이상치를 발견했다면 제거, 경계값 대체(윈저라이즈), 변환(로그) 중 적절한 방법을 선택합니다."}),e.jsx(n,{title:"이상치 처리 전략 비교",initialCode:s}),e.jsx("h2",{children:"인코딩: LabelEncoder vs get_dummies"}),e.jsx("p",{children:"머신러닝 모델은 숫자만 처리할 수 있으므로, 범주형 데이터를 숫자로 변환해야 합니다."}),e.jsx(n,{title:"범주형 인코딩 방법",initialCode:l}),e.jsx("h2",{children:"피처 엔지니어링 기초"}),e.jsx("p",{children:"기존 변수에서 새로운 의미 있는 변수를 만드는 과정입니다. 좋은 피처가 모델 성능을 결정합니다."}),e.jsx(n,{title:"피처 엔지니어링 기초",initialCode:p}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"전처리 체크리스트"}),e.jsx("p",{children:"1) 결측치 비율 확인 → 2) 이상치 탐지 및 처리 → 3) 데이터 타입 변환 → 4) 범주형 인코딩 → 5) 스케일링 → 6) 피처 엔지니어링. 이 순서를 따르면 체계적인 전처리가 가능합니다."})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(a,{to:"/intro/basic-stats",className:"lesson-nav-btn prev",children:"← 이전: 통계 기초 이해"}),e.jsx(a,{to:"/learn/eda",className:"lesson-nav-btn next",children:"다음: 탐색적 데이터 분석 →"})]})]})})})]})}export{m as default};
