import{j as e,L as a}from"./index-DSj272Qi.js";import{S as l}from"./SEOHead-Dvt2fwGA.js";import{C as s}from"./CodeEditor-BUA_pBI1.js";const t=`import numpy as np
import pandas as pd

np.random.seed(42)

# 1년간 일별 기상 데이터 생성
dates = pd.date_range('2024-01-01', periods=365, freq='D')
n = len(dates)

# 계절별 기온 (사인 곡선 + 노이즈)
day_of_year = np.arange(n)
base_temp = 12 + 15 * np.sin(2 * np.pi * (day_of_year - 80) / 365)
temp = base_temp + np.random.normal(0, 3, n)

# 습도, 풍속, 강수량
humidity = (65 + 15 * np.sin(2 * np.pi * (day_of_year - 170) / 365) + np.random.normal(0, 8, n)).clip(20, 100)
wind = np.abs(np.random.normal(3.5, 2, n)).round(1)
rain = np.where(np.random.random(n) < 0.3, np.random.exponential(8, n).round(1), 0)

df = pd.DataFrame({
    '날짜': dates, '기온': temp.round(1), '습도': humidity.round(1),
    '풍속': wind, '강수량': rain
})
df['월'] = df['날짜'].dt.month
df['계절'] = df['월'].map({12:'겨울',1:'겨울',2:'겨울',3:'봄',4:'봄',5:'봄',
                          6:'여름',7:'여름',8:'여름',9:'가을',10:'가을',11:'가을'})

print(f"데이터 크기: {df.shape}")
print()
print(df.head(10))
print()
print(df.describe().round(1))`,r=`import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, figsize=(14, 8))

# 기온 + 이동평균
axes[0].plot(df['날짜'], df['기온'], alpha=0.3, color='#6366f1', label='일별 기온')
ma7 = df['기온'].rolling(7).mean()
ma30 = df['기온'].rolling(30).mean()
axes[0].plot(df['날짜'], ma7, color='#f59e0b', linewidth=1.5, label='7일 이동평균')
axes[0].plot(df['날짜'], ma30, color='#ef4444', linewidth=2, label='30일 이동평균')
axes[0].set_title('기온 추이 및 이동평균', fontsize=13, fontweight='bold')
axes[0].set_ylabel('기온 (°C)')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 강수량 + 이동평균
axes[1].bar(df['날짜'], df['강수량'], alpha=0.4, color='#6366f1', width=1, label='일별 강수량')
rain_ma = df['강수량'].rolling(14).mean()
axes[1].plot(df['날짜'], rain_ma, color='#ef4444', linewidth=2, label='14일 이동평균')
axes[1].set_title('강수량 추이', fontsize=13, fontweight='bold')
axes[1].set_ylabel('강수량 (mm)')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 월별 평균 기온
monthly_temp = df.groupby('월')['기온'].mean()
print("월별 평균 기온:")
for m, t in monthly_temp.items():
    print(f"  {m:2d}월: {t:5.1f}°C")`,n=`# 이상치 탐지: IQR 방법
def detect_outliers_iqr(series, name):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    outliers = series[(series < lower) | (series > upper)]
    print(f"{name} 이상치: {len(outliers)}건 (하한: {lower:.1f}, 상한: {upper:.1f})")
    return lower, upper, outliers

print("=== IQR 기반 이상치 탐지 ===")
t_lo, t_hi, t_out = detect_outliers_iqr(df['기온'], '기온')
w_lo, w_hi, w_out = detect_outliers_iqr(df['풍속'], '풍속')
r_lo, r_hi, r_out = detect_outliers_iqr(df['강수량'], '강수량')

# 기온 이상치 시각화
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

axes[0].plot(df['날짜'], df['기온'], alpha=0.4, color='#6366f1')
axes[0].axhline(t_hi, color='#ef4444', linestyle='--', label=f'상한 ({t_hi:.1f})')
axes[0].axhline(t_lo, color='#ef4444', linestyle='--', label=f'하한 ({t_lo:.1f})')
if len(t_out) > 0:
    axes[0].scatter(df.loc[t_out.index, '날짜'], t_out.values, color='#ef4444', s=30, zorder=5, label='이상치')
axes[0].set_title('기온 이상치 탐지')
axes[0].set_ylabel('기온 (°C)')
axes[0].legend(fontsize=9)
axes[0].grid(True, alpha=0.3)

# 풍속 박스플롯 (계절별)
season_order = ['봄', '여름', '가을', '겨울']
data_by_season = [df[df['계절'] == s]['풍속'].values for s in season_order]
bp = axes[1].boxplot(data_by_season, labels=season_order, patch_artist=True)
colors = ['#10b981', '#ef4444', '#f59e0b', '#6366f1']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.6)
axes[1].set_title('계절별 풍속 분포 (박스플롯)')
axes[1].set_ylabel('풍속 (m/s)')
axes[1].grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()`,i=`fig, axes = plt.subplots(2, 2, figsize=(13, 10))

# 1) 계절별 기온 분포
season_order = ['봄', '여름', '가을', '겨울']
colors_s = ['#10b981', '#ef4444', '#f59e0b', '#6366f1']
for s, c in zip(season_order, colors_s):
    data = df[df['계절'] == s]['기온']
    axes[0,0].hist(data, bins=15, alpha=0.5, color=c, label=s, edgecolor='white')
axes[0,0].set_title('계절별 기온 분포')
axes[0,0].set_xlabel('기온 (°C)')
axes[0,0].legend()

# 2) 월별 강수 일수 & 총 강수량
rainy_days = df[df['강수량'] > 0].groupby('월').size()
monthly_rain = df.groupby('월')['강수량'].sum()
ax2 = axes[0,1]
ax2b = ax2.twinx()
ax2.bar(rainy_days.index, rainy_days.values, color='#6366f1', alpha=0.6, label='강수 일수')
ax2b.plot(monthly_rain.index, monthly_rain.values, 'o-', color='#ef4444', label='총 강수량')
ax2.set_title('월별 강수 현황')
ax2.set_xlabel('월')
ax2.set_ylabel('강수 일수')
ax2b.set_ylabel('총 강수량 (mm)')
ax2.legend(loc='upper left', fontsize=8)
ax2b.legend(loc='upper right', fontsize=8)

# 3) 기온 vs 습도 산점도
scatter = axes[1,0].scatter(df['기온'], df['습도'], c=df['강수량'],
                            cmap='YlOrRd', alpha=0.5, s=15)
plt.colorbar(scatter, ax=axes[1,0], label='강수량(mm)')
axes[1,0].set_title('기온 vs 습도 (색상=강수량)')
axes[1,0].set_xlabel('기온 (°C)')
axes[1,0].set_ylabel('습도 (%)')

# 4) 계절별 평균 요약 레이더 대안: 그룹 바
seasonal = df.groupby('계절')[['기온', '습도', '풍속']].mean().reindex(season_order)
x = np.arange(len(season_order))
w = 0.25
axes[1,1].bar(x - w, seasonal['기온'], w, label='기온(°C)', color='#ef4444')
axes[1,1].bar(x, seasonal['습도'] / 10, w, label='습도(%)/10', color='#6366f1')
axes[1,1].bar(x + w, seasonal['풍속'], w, label='풍속(m/s)', color='#10b981')
axes[1,1].set_xticks(x)
axes[1,1].set_xticklabels(season_order)
axes[1,1].set_title('계절별 기상 요소 비교')
axes[1,1].legend(fontsize=8)
axes[1,1].grid(axis='y', alpha=0.3)

plt.suptitle('날씨 패턴 종합 분석', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("=" * 45)
print("날씨 패턴 분석 핵심 인사이트")
print("=" * 45)
print(f"연 평균 기온: {df['기온'].mean():.1f}°C")
print(f"최고 기온: {df['기온'].max():.1f}°C / 최저 기온: {df['기온'].min():.1f}°C")
print(f"총 강수 일수: {(df['강수량'] > 0).sum()}일 ({(df['강수량'] > 0).mean()*100:.1f}%)")
print(f"연 총 강수량: {df['강수량'].sum():.1f}mm")`;function x(){return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"날씨 패턴 분석",description:"시계열 기상 데이터에 이동평균을 적용하고 이상치를 탐지합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"날씨 패턴 분석"}),e.jsx("p",{children:"시계열, 이동평균, 이상치 탐지로 기상 패턴을 분석합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsxs("p",{children:["1년간의 기상 데이터를 생성하고, 이동평균으로 트렌드를 파악하며 IQR 방법으로 이상치를 탐지합니다.",e.jsx("strong",{children:" 난이도: 중급"})," | 핵심 스킬: 시계열, 이동평균, 이상치 탐지"]})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsx("p",{children:"2024년 1년간의 일별 기상 데이터입니다. 기온은 계절 변동(사인 곡선)을 반영하고, 강수는 확률적으로 발생합니다."}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"기온"})," — 계절별 사인 곡선 + 노이즈 (°C)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"습도"})," — 계절 변동 반영 (20~100%)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"풍속"})," — 정규분포 (m/s)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"강수량"})," — 30% 확률, 지수분포 (mm)"]})]}),e.jsx("h2",{children:"1단계: 데이터 생성 및 탐색"}),e.jsx("p",{children:"사인 곡선으로 계절 변동을 반영한 1년 기상 데이터를 생성합니다."}),e.jsx(s,{title:"1단계: 데이터 생성 및 탐색",initialCode:t}),e.jsx("h2",{children:"2단계: 이동평균 분석"}),e.jsx("p",{children:"7일/30일 이동평균으로 기온 트렌드를, 14일 이동평균으로 강수 트렌드를 파악합니다."}),e.jsx(s,{title:"2단계: 이동평균 분석",initialCode:r}),e.jsx("h2",{children:"3단계: 이상치 탐지"}),e.jsx("p",{children:"IQR 방법으로 기온/풍속/강수의 이상치를 탐지하고 시각화합니다."}),e.jsx(s,{title:"3단계: 이상치 탐지 (IQR)",initialCode:n}),e.jsx("h2",{children:"4단계: 종합 분석"}),e.jsx("p",{children:"계절별 기온 분포, 월별 강수, 기온-습도 관계, 계절별 기상 비교를 대시보드로 구성합니다."}),e.jsx(s,{title:"4단계: 종합 대시보드",initialCode:i}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"실습 과제"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Z-score 방법으로 이상치를 탐지하고 IQR 결과와 비교해보세요."}),e.jsx("li",{children:"기온의 주간(7일) 패턴을 분석하고 요일별 평균 기온을 구해보세요."}),e.jsx("li",{children:"풍속과 강수량의 관계를 산점도로 시각화하고 해석해보세요."})]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(a,{to:"/projects/survey-dashboard",className:"lesson-nav-btn prev",children:"← 이전: 설문조사 대시보드"}),e.jsx(a,{to:"/projects/product-review",className:"lesson-nav-btn next",children:"다음: 상품 리뷰 분석 →"})]})]})})})]})}export{x as default};
