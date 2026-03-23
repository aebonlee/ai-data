import{j as e,L as l}from"./index-CQ--KcOM.js";import{S as a}from"./SEOHead-hblgNu3I.js";import{C as t}from"./CodeEditor-0gwYAvAj.js";const s=`import numpy as np
import pandas as pd

np.random.seed(42)

# 시계열 데이터 생성 (2년 일별 매출)
dates = pd.date_range('2022-01-01', periods=730, freq='D')
trend = np.linspace(100, 200, 730)
seasonal = 30 * np.sin(np.arange(730) * 2 * np.pi / 365)
weekly = 10 * np.sin(np.arange(730) * 2 * np.pi / 7)
noise = np.random.normal(0, 8, 730)

sales = trend + seasonal + weekly + noise
sales = np.maximum(sales, 10)

df = pd.DataFrame({
    '날짜': dates,
    '매출': sales.round(1)
})
df = df.set_index('날짜')

print(f"데이터 크기: {df.shape}")
print(f"기간: {df.index.min().date()} ~ {df.index.max().date()}")
print(f"\\n[기술통계]")
print(df.describe().round(1))
print(f"\\n[처음 10행]")
print(df.head(10))`,n=`import matplotlib.pyplot as plt

# 시계열 시각화
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 전체 추이
axes[0,0].plot(df.index, df['매출'], alpha=0.5, color='#6366f1', linewidth=0.8)
axes[0,0].plot(df['매출'].rolling(30).mean(), color='#ef4444', linewidth=2, label='30일 이동평균')
axes[0,0].set_title('일별 매출 추이 (2년)', fontweight='bold')
axes[0,0].legend()
axes[0,0].grid(True, alpha=0.3)

# 월별 집계
monthly = df.resample('ME').mean()
axes[0,1].bar(range(len(monthly)), monthly['매출'], color='#8b5cf6', alpha=0.7)
axes[0,1].set_title('월별 평균 매출', fontweight='bold')
axes[0,1].set_xlabel('월 (0=2022-01)')

# 요일별 패턴
daily_pattern = df.groupby(df.index.dayofweek)['매출'].mean()
days_kr = ['월', '화', '수', '목', '금', '토', '일']
axes[1,0].bar(days_kr, daily_pattern.values, color='#10b981')
axes[1,0].set_title('요일별 평균 매출', fontweight='bold')

# 연도별 월 패턴
for year in [2022, 2023]:
    yearly = df[df.index.year == year].resample('ME').mean()
    axes[1,1].plot(yearly.index.month, yearly['매출'], marker='o', label=str(year))
axes[1,1].set_title('연도별 월 패턴', fontweight='bold')
axes[1,1].set_xlabel('월')
axes[1,1].legend()
axes[1,1].grid(True, alpha=0.3)

plt.suptitle('시계열 데이터 시각화', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,i=`import matplotlib.pyplot as plt

# 이동평균 분석
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 다양한 이동평균
for window, color, label in [(7, '#6366f1', '7일'), (30, '#ef4444', '30일'), (90, '#10b981', '90일')]:
    ma = df['매출'].rolling(window).mean()
    axes[0].plot(ma, label=f'{label} MA', color=color, linewidth=1.5)
axes[0].plot(df['매출'], alpha=0.2, color='gray')
axes[0].set_title('이동평균 비교', fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 지수이동평균 (EMA)
for span, color, label in [(7, '#6366f1', '7일 EMA'), (30, '#ef4444', '30일 EMA')]:
    ema = df['매출'].ewm(span=span).mean()
    axes[1].plot(ema, label=label, color=color, linewidth=1.5)
axes[1].plot(df['매출'], alpha=0.2, color='gray')
axes[1].set_title('지수이동평균 (EMA)', fontweight='bold')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 이동평균 교차 신호
ma_short = df['매출'].rolling(7).mean()
ma_long = df['매출'].rolling(30).mean()
crossover = ((ma_short > ma_long) & (ma_short.shift(1) <= ma_long.shift(1)))
print(f"골든크로스 (상승 신호) 횟수: {crossover.sum()}")`,o=`import matplotlib.pyplot as plt
import numpy as np

# 시계열 분해 (수동 구현)
# 1. 추세 (30일 이동평균)
trend = df['매출'].rolling(30, center=True).mean()

# 2. 계절성 (추세 제거 후 월별 평균)
detrended = df['매출'] - trend
seasonal_monthly = detrended.groupby(detrended.index.month).mean()
seasonal = detrended.index.month.map(lambda m: seasonal_monthly.get(m, 0))
seasonal = pd.Series(seasonal.values, index=df.index)

# 3. 잔차
residual = df['매출'] - trend - seasonal

fig, axes = plt.subplots(4, 1, figsize=(14, 12), sharex=True)

axes[0].plot(df['매출'], color='#6366f1', alpha=0.7)
axes[0].set_title('원본 데이터', fontweight='bold')

axes[1].plot(trend, color='#ef4444', linewidth=2)
axes[1].set_title('추세 (Trend)', fontweight='bold')

axes[2].plot(seasonal, color='#10b981', alpha=0.7)
axes[2].set_title('계절성 (Seasonal)', fontweight='bold')

axes[3].plot(residual, color='#f59e0b', alpha=0.5)
axes[3].axhline(y=0, color='gray', linestyle='--')
axes[3].set_title('잔차 (Residual)', fontweight='bold')

plt.suptitle('시계열 분해', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,r=`import numpy as np
import pandas as pd

# 정상성 검정 (ADF 검정 수동 구현)
# 간단한 정상성 확인: 이동평균과 이동표준편차의 안정성

window = 90
rolling_mean = df['매출'].rolling(window).mean()
rolling_std = df['매출'].rolling(window).std()

print("[정상성 확인]")
print(f"전체 평균: {df['매출'].mean():.1f}")
print(f"전반기 평균: {df['매출'][:365].mean():.1f}")
print(f"후반기 평균: {df['매출'][365:].mean():.1f}")
print(f"→ 평균이 {'변화함 (비정상)' if abs(df['매출'][:365].mean() - df['매출'][365:].mean()) > 10 else '안정적 (정상)'}")

# 차분으로 정상화
df_diff = df['매출'].diff().dropna()
print(f"\\n[1차 차분 후]")
print(f"평균: {df_diff.mean():.3f}")
print(f"표준편차: {df_diff.std():.3f}")

# 전반/후반 비교
print(f"전반기 차분 평균: {df_diff[:364].mean():.3f}")
print(f"후반기 차분 평균: {df_diff[364:].mean():.3f}")
print("→ 차분 후 평균이 0에 가까우므로 정상화됨")`,d=`import numpy as np
import matplotlib.pyplot as plt

# 간단한 추세 예측
from sklearn.linear_model import LinearRegression

# 숫자 인덱스 생성
X = np.arange(len(df)).reshape(-1, 1)
y = df['매출'].values

# 학습 (처음 80%)
split = int(len(df) * 0.8)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

model = LinearRegression()
model.fit(X_train, y_train)

# 예측
y_pred_train = model.predict(X_train)
y_pred_test = model.predict(X_test)

# 미래 90일 예측
X_future = np.arange(len(df), len(df)+90).reshape(-1, 1)
y_future = model.predict(X_future)

plt.figure(figsize=(14, 6))
plt.plot(df.index[:split], y_train, alpha=0.4, color='#6366f1', label='학습 데이터')
plt.plot(df.index[split:], y_test, alpha=0.4, color='#10b981', label='테스트 데이터')
plt.plot(df.index[:split], y_pred_train, color='#ef4444', linewidth=2, label='학습 추세')
plt.plot(df.index[split:], y_pred_test, color='#ef4444', linewidth=2, linestyle='--', label='테스트 추세')

future_dates = pd.date_range(df.index[-1] + pd.Timedelta(days=1), periods=90)
plt.plot(future_dates, y_future, color='#f59e0b', linewidth=2, linestyle=':', label='미래 예측')

plt.title('선형 추세 예측', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

from sklearn.metrics import mean_squared_error, r2_score
rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
r2 = r2_score(y_test, y_pred_test)
print(f"테스트 RMSE: {rmse:.1f}")
print(f"테스트 R2: {r2:.4f}")
print(f"90일 후 예측 매출: {y_future[-1]:.1f}")`,p=`import matplotlib.pyplot as plt
import numpy as np

# 종합 대시보드
fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# 1) 전체 추이 + 이동평균
axes[0,0].plot(df['매출'], alpha=0.3, color='#6366f1')
axes[0,0].plot(df['매출'].rolling(30).mean(), color='#ef4444', linewidth=2)
axes[0,0].set_title('매출 추이 + 30일 MA')

# 2) 월별 박스플롯
monthly_data = [df[df.index.month==m]['매출'].values for m in range(1, 13)]
axes[0,1].boxplot(monthly_data, labels=range(1, 13))
axes[0,1].set_title('월별 매출 분포')
axes[0,1].set_xlabel('월')

# 3) YoY 비교
for year in df.index.year.unique():
    yearly = df[df.index.year==year].resample('ME').mean()
    axes[0,2].plot(yearly.index.month, yearly['매출'], marker='o', label=str(year))
axes[0,2].set_title('연도별 월 비교')
axes[0,2].legend()

# 4) 요일별 패턴
daily = df.groupby(df.index.dayofweek)['매출'].mean()
axes[1,0].bar(['월','화','수','목','금','토','일'], daily.values,
              color=['#6366f1']*5+['#ef4444']*2)
axes[1,0].set_title('요일별 평균 매출')

# 5) 변동성 추이
rolling_std = df['매출'].rolling(30).std()
axes[1,1].plot(rolling_std, color='#f59e0b')
axes[1,1].set_title('30일 변동성 추이')

# 6) KPI
axes[1,2].axis('off')
daily_sales = df.resample('D').mean()
kpi = f"""전체 평균: {df['매출'].mean():.1f}
최근 30일 평균: {df['매출'][-30:].mean():.1f}
최고 매출일: {df['매출'].idxmax().date()}
최저 매출일: {df['매출'].idxmin().date()}
MoM 성장률: {((df['매출'][-30:].mean() / df['매출'][-60:-30].mean() - 1) * 100):.1f}%
YoY 성장률: {((df['매출'][-365:].mean() / df['매출'][:365].mean() - 1) * 100):.1f}%"""
axes[1,2].text(0.05, 0.5, kpi, fontsize=11, verticalalignment='center',
               fontfamily='monospace', bbox=dict(boxstyle='round', facecolor='#f0f0f0'))
axes[1,2].set_title('핵심 KPI')

plt.suptitle('시계열 분석 종합 대시보드', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()`;function h(){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"시계열 데이터 분석",description:"이동평균, 시계열 분해, 추세 예측으로 시계열 데이터를 분석합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"시계열 데이터 분석"}),e.jsx("p",{children:"이동평균, 시계열 분해, 추세 예측으로 시계열 데이터를 분석합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsx("p",{children:"2년간의 일별 매출 데이터를 생성하고, 시각화, 이동평균, 시계열 분해, 정상성 검정, 추세 예측, 종합 대시보드를 구성합니다."})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"기간"})," — 2022-01-01 ~ 2023-12-31 (730일)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"매출"})," — 추세 + 계절성 + 주간패턴 + 노이즈로 구성"]})]}),e.jsx("h2",{children:"1단계: 데이터 생성"}),e.jsx(t,{title:"1단계: 데이터 생성",initialCode:s}),e.jsx("h2",{children:"2단계: 시각화"}),e.jsx(t,{title:"2단계: 시각화",initialCode:n}),e.jsx("h2",{children:"3단계: 이동평균"}),e.jsx(t,{title:"3단계: 이동평균",initialCode:i}),e.jsx("h2",{children:"4단계: 시계열 분해"}),e.jsx(t,{title:"4단계: 시계열 분해",initialCode:o}),e.jsx("h2",{children:"5단계: 정상성 검정"}),e.jsx(t,{title:"5단계: 정상성 검정",initialCode:r}),e.jsx("h2",{children:"6단계: 추세 예측"}),e.jsx(t,{title:"6단계: 추세 예측",initialCode:d}),e.jsx("h2",{children:"7단계: 종합 대시보드"}),e.jsx(t,{title:"7단계: 종합 대시보드",initialCode:p}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(l,{to:"/practice/survey",className:"lesson-nav-btn prev",children:"← 이전: 설문 데이터 분석"}),e.jsx(l,{to:"/practice/report",className:"lesson-nav-btn next",children:"다음: 보고서 자동 생성 →"})]})]})})})]})}export{h as default};
