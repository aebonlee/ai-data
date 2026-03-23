import{j as e,L as s}from"./index-Dc5dSdrk.js";import{S as l}from"./SEOHead-DpVR1hPQ.js";function i(){return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"시계열 분석",description:"시간에 따른 데이터 패턴을 분석하고 예측하는 방법을 학습합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"시계열 분석"}),e.jsx("p",{children:"시간에 따른 데이터 패턴을 분석하고 예측하는 방법을 학습합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("h2",{children:"시계열 데이터란?"}),e.jsx("p",{children:"시계열(Time Series) 데이터는 시간 순서에 따라 측정된 데이터입니다. 주가, 매출, 온도, 트래픽 등이 대표적입니다. 추세(Trend), 계절성(Seasonality), 잔차(Residual)를 분해하여 분석합니다."}),e.jsx("h2",{children:"시계열 데이터 처리"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import pandas as pd
import matplotlib.pyplot as plt

# 시계열 데이터 생성
df = pd.read_csv('monthly_sales.csv', parse_dates=['date'], index_col='date')
print(df.head())

# 리샘플링
weekly = df['sales'].resample('W').sum()
monthly = df['sales'].resample('M').mean()

# 이동평균
df['MA_7'] = df['sales'].rolling(window=7).mean()
df['MA_30'] = df['sales'].rolling(window=30).mean()

plt.figure(figsize=(14, 5))
plt.plot(df.index, df['sales'], alpha=0.5, label='원본')
plt.plot(df.index, df['MA_7'], label='7일 이동평균')
plt.plot(df.index, df['MA_30'], label='30일 이동평균', linewidth=2)
plt.title('매출 추이와 이동평균')
plt.legend()
plt.show()`})})]}),e.jsx("h2",{children:"시계열 분해"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`from statsmodels.tsa.seasonal import seasonal_decompose

# 시계열 분해
result = seasonal_decompose(monthly, model='additive', period=12)

fig, axes = plt.subplots(4, 1, figsize=(12, 10))
result.observed.plot(ax=axes[0], title='원본')
result.trend.plot(ax=axes[1], title='추세')
result.seasonal.plot(ax=axes[2], title='계절성')
result.resid.plot(ax=axes[3], title='잔차')
plt.tight_layout()
plt.show()`})})]}),e.jsx("h2",{children:"간단한 예측"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`from sklearn.linear_model import LinearRegression
import numpy as np

# 선형 추세 기반 예측
df['day_num'] = (df.index - df.index[0]).days
X = df['day_num'].values.reshape(-1, 1)
y = df['sales'].values

model = LinearRegression()
model.fit(X, y)

# 향후 30일 예측
future_days = np.arange(X[-1][0] + 1, X[-1][0] + 31).reshape(-1, 1)
predictions = model.predict(future_days)

print(f"추세 기울기: {model.coef_[0]:.2f}")
print(f"30일 후 예측 매출: {predictions[-1]:,.0f}")`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"시계열 분석 핵심 포인트"}),e.jsx("p",{children:"시계열 데이터는 반드시 시간 순서를 유지해야 합니다. 이동평균으로 노이즈를 제거하고 추세를 파악하세요. 계절성이 있다면 분해 후 분석하는 것이 효과적입니다."})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/practice/survey",className:"lesson-nav-btn prev",children:"← 이전: 설문 데이터 분석"}),e.jsx(s,{to:"/practice/report",className:"lesson-nav-btn next",children:"다음: 보고서 자동 생성 →"})]})]})})})]})}export{i as default};
