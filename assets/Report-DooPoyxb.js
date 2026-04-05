import{j as t,L as a}from"./index-Bq9FOfU1.js";import{S as e}from"./SEOHead-CMnhz0oT.js";import{C as s}from"./CodeEditor-B1RuYyyB.js";const r=`import numpy as np
import pandas as pd

np.random.seed(42)

# 분석용 매출 데이터 준비
dates = pd.date_range('2024-01-01', periods=180, freq='D')
categories = ['전자제품', '의류', '식품', '가구', '도서']

rows = []
for date in dates:
    for cat in categories:
        base = {'전자제품': 500, '의류': 300, '식품': 400, '가구': 200, '도서': 150}[cat]
        seasonal = 50 * np.sin((date.month - 1) * np.pi / 6)
        sales = max(int(base + seasonal + np.random.normal(0, 80)), 50)
        rows.append({'날짜': date, '카테고리': cat, '매출': sales * 1000, '주문수': np.random.randint(5, 30)})

df = pd.DataFrame(rows)
df['월'] = df['날짜'].dt.month
df['요일'] = df['날짜'].dt.day_name()

print(f"데이터 크기: {df.shape}")
print(f"\\n[처음 10행]")
print(df.head(10))
print(f"\\n총 매출: {df['매출'].sum():,.0f}원")`,l=`# KPI 계산
import pandas as pd
import numpy as np

total_sales = df['매출'].sum()
total_orders = df['주문수'].sum()
avg_order_value = total_sales / total_orders
daily_avg = df.groupby('날짜')['매출'].sum().mean()

# 월별 성장률
monthly = df.groupby('월')['매출'].sum()
mom_growth = monthly.pct_change() * 100

# 카테고리별 점유율
cat_share = (df.groupby('카테고리')['매출'].sum() / total_sales * 100).round(1)

print("=" * 50)
print("핵심 KPI 요약")
print("=" * 50)
print(f"총 매출: {total_sales:,.0f}원")
print(f"총 주문 수: {total_orders:,}건")
print(f"평균 주문 단가: {avg_order_value:,.0f}원")
print(f"일평균 매출: {daily_avg:,.0f}원")

print(f"\\n[월별 성장률]")
for m, g in mom_growth.dropna().items():
    arrow = '↑' if g > 0 else '↓'
    print(f"  {m}월: {arrow} {g:+.1f}%")

print(f"\\n[카테고리 점유율]")
for cat, share in cat_share.sort_values(ascending=False).items():
    print(f"  {cat}: {share}%")`,o=`import matplotlib.pyplot as plt

# 보고서용 차트 생성
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1) 월별 매출 추이
monthly = df.groupby('월')['매출'].sum()
axes[0,0].plot(monthly.index, monthly.values, marker='o', color='#6366f1', linewidth=2)
axes[0,0].fill_between(monthly.index, monthly.values, alpha=0.1, color='#6366f1')
axes[0,0].set_title('월별 매출 추이', fontsize=13, fontweight='bold')
axes[0,0].set_xlabel('월')
axes[0,0].set_ylabel('매출 (원)')
axes[0,0].grid(True, alpha=0.3)

# 2) 카테고리별 매출
cat_sales = df.groupby('카테고리')['매출'].sum().sort_values(ascending=False)
colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']
axes[0,1].bar(cat_sales.index, cat_sales.values, color=colors)
axes[0,1].set_title('카테고리별 매출', fontsize=13, fontweight='bold')
axes[0,1].tick_params(axis='x', rotation=45)

# 3) 매출 비중 파이
axes[1,0].pie(cat_sales.values, labels=cat_sales.index, autopct='%1.1f%%',
              colors=colors, startangle=90)
axes[1,0].set_title('카테고리 매출 비중', fontsize=13, fontweight='bold')

# 4) 일별 추이 + 이동평균
daily = df.groupby('날짜')['매출'].sum()
axes[1,1].plot(daily.index, daily.values, alpha=0.3, color='#6366f1')
axes[1,1].plot(daily.rolling(7).mean(), color='#ef4444', linewidth=2, label='7일 MA')
axes[1,1].set_title('일별 매출 + 이동평균', fontsize=13, fontweight='bold')
axes[1,1].legend()

plt.suptitle('매출 분석 리포트', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()`,i=`# HTML 보고서 생성
import pandas as pd

total_sales = df['매출'].sum()
total_orders = df['주문수'].sum()
daily_avg = df.groupby('날짜')['매출'].sum().mean()
cat_sales = df.groupby('카테고리')['매출'].sum().sort_values(ascending=False)

# HTML 테이블 생성
cat_table = cat_sales.reset_index()
cat_table.columns = ['카테고리', '매출']
cat_table['비중(%)'] = (cat_table['매출'] / total_sales * 100).round(1)
cat_table['매출'] = cat_table['매출'].apply(lambda x: f"{x:,.0f}원")

html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>매출 분석 보고서</title>
    <style>
        body {{ font-family: 'Malgun Gothic', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }}
        h1 {{ color: #6366f1; border-bottom: 3px solid #6366f1; padding-bottom: 10px; }}
        h2 {{ color: #374151; margin-top: 30px; }}
        .kpi-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }}
        .kpi-card {{ background: #f3f4f6; padding: 20px; border-radius: 10px; text-align: center; }}
        .kpi-value {{ font-size: 24px; font-weight: bold; color: #6366f1; }}
        .kpi-label {{ font-size: 14px; color: #6b7280; }}
        table {{ width: 100%; border-collapse: collapse; margin: 15px 0; }}
        th {{ background: #6366f1; color: white; padding: 10px; }}
        td {{ padding: 10px; border-bottom: 1px solid #e5e7eb; }}
        tr:hover {{ background: #f9fafb; }}
    </style>
</head>
<body>
    <h1>매출 분석 보고서</h1>
    <p>분석 기간: 2024-01-01 ~ 2024-06-28</p>

    <h2>핵심 KPI</h2>
    <div class="kpi-grid">
        <div class="kpi-card">
            <div class="kpi-value">{total_sales:,.0f}원</div>
            <div class="kpi-label">총 매출</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-value">{total_orders:,}건</div>
            <div class="kpi-label">총 주문 수</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-value">{daily_avg:,.0f}원</div>
            <div class="kpi-label">일평균 매출</div>
        </div>
    </div>

    <h2>카테고리별 매출</h2>
    {cat_table.to_html(index=False)}
</body>
</html>"""

print("[HTML 보고서 미리보기]")
print(html[:500])
print("...")
print(f"\\n총 {len(html)}자 HTML 생성 완료")`,n=`# 보고서 템플릿 시스템
import pandas as pd

def generate_report(df, title="분석 보고서", period=""):
    """데이터프레임에서 자동 보고서 생성"""
    total = df['매출'].sum()
    daily_avg = df.groupby('날짜')['매출'].sum().mean()
    cat_top = df.groupby('카테고리')['매출'].sum().idxmax()

    monthly = df.groupby('월')['매출'].sum()
    best_month = monthly.idxmax()
    worst_month = monthly.idxmin()

    report = f"""
{'='*50}
{title}
{'='*50}
분석 기간: {period or f"{df['날짜'].min().date()} ~ {df['날짜'].max().date()}"}

[Executive Summary]
- 총 매출 {total:,.0f}원을 달성했습니다.
- 일평균 매출은 {daily_avg:,.0f}원입니다.
- 최고 매출 카테고리는 '{cat_top}'입니다.
- {best_month}월이 최고 매출({monthly[best_month]:,.0f}원),
  {worst_month}월이 최저 매출({monthly[worst_month]:,.0f}원)입니다.

[카테고리별 성과]"""

    cat_sales = df.groupby('카테고리')['매출'].sum().sort_values(ascending=False)
    for cat, sales in cat_sales.items():
        share = sales / total * 100
        report += f"\\n  - {cat}: {sales:,.0f}원 ({share:.1f}%)"

    report += f"""

[권장 액션]
1. '{cat_top}' 카테고리의 성장 동력을 분석하세요.
2. {worst_month}월 매출 하락 원인을 파악하세요.
3. 일평균 매출 {daily_avg:,.0f}원을 기준으로 목표를 설정하세요.
"""
    return report

# 보고서 생성
print(generate_report(df, "2024 상반기 매출 분석 보고서"))`,d=`# ChatGPT 연동 프롬프트 생성
import pandas as pd

def create_chatgpt_prompt(df, question_type="summary"):
    """ChatGPT에 전달할 분석 프롬프트 생성"""
    total = df['매출'].sum()
    cat_sales = df.groupby('카테고리')['매출'].sum().sort_values(ascending=False)
    monthly = df.groupby('월')['매출'].sum()

    data_summary = f"""
[데이터 요약]
- 기간: {df['날짜'].min().date()} ~ {df['날짜'].max().date()}
- 총 매출: {total:,.0f}원
- 카테고리별 매출: {dict(cat_sales.round(0))}
- 월별 매출: {dict(monthly.round(0))}
"""

    prompts = {
        "summary": f"""다음 매출 데이터를 분석하여 경영진에게 보고할 핵심 인사이트 3가지를 도출해주세요.
{data_summary}
형식: 1) 핵심 발견 2) 원인 분석 3) 권장 액션""",

        "forecast": f"""다음 데이터를 기반으로 향후 3개월 매출 예측과 근거를 제시해주세요.
{data_summary}""",

        "strategy": f"""다음 매출 데이터를 기반으로 카테고리별 마케팅 전략을 제안해주세요.
{data_summary}
각 카테고리별로 1) 현황 2) 전략 3) 기대효과를 포함해주세요."""
    }

    return prompts.get(question_type, prompts["summary"])

# 프롬프트 생성
for qtype in ["summary", "forecast", "strategy"]:
    print(f"\\n{'='*50}")
    print(f"[{qtype.upper()} 프롬프트]")
    print(f"{'='*50}")
    print(create_chatgpt_prompt(df, qtype))`,p=`# 자동화 파이프라인
import pandas as pd
import numpy as np

def full_analysis_pipeline(df):
    """전체 분석 파이프라인"""
    results = {}

    # 1. 데이터 검증
    print("[1/5] 데이터 검증...")
    results['rows'] = len(df)
    results['missing'] = df.isnull().sum().sum()
    results['period'] = f"{df['날짜'].min().date()} ~ {df['날짜'].max().date()}"

    # 2. KPI 계산
    print("[2/5] KPI 계산...")
    results['total_sales'] = df['매출'].sum()
    results['total_orders'] = df['주문수'].sum()
    results['avg_order'] = results['total_sales'] / results['total_orders']
    results['daily_avg'] = df.groupby('날짜')['매출'].sum().mean()

    # 3. 카테고리 분석
    print("[3/5] 카테고리 분석...")
    cat = df.groupby('카테고리').agg(
        매출=('매출', 'sum'),
        주문수=('주문수', 'sum'),
        평균단가=('매출', 'mean')
    ).sort_values('매출', ascending=False)
    cat['점유율'] = (cat['매출'] / cat['매출'].sum() * 100).round(1)
    results['category'] = cat

    # 4. 월별 트렌드
    print("[4/5] 월별 트렌드...")
    monthly = df.groupby('월')['매출'].sum()
    results['best_month'] = monthly.idxmax()
    results['worst_month'] = monthly.idxmin()
    results['growth'] = ((monthly.iloc[-1] - monthly.iloc[0]) / monthly.iloc[0] * 100)

    # 5. 보고서 생성
    print("[5/5] 보고서 생성...")
    report = f"""
{'='*55}
  자동 생성 분석 보고서
{'='*55}
기간: {results['period']}
데이터: {results['rows']:,}행 (결측: {results['missing']}건)

[핵심 KPI]
  총 매출: {results['total_sales']:,.0f}원
  총 주문: {results['total_orders']:,}건
  평균 단가: {results['avg_order']:,.0f}원
  일평균 매출: {results['daily_avg']:,.0f}원

[카테고리별 성과]
{cat.to_string()}

[트렌드]
  최고 매출월: {results['best_month']}월
  최저 매출월: {results['worst_month']}월
  기간 성장률: {results['growth']:+.1f}%

[자동 인사이트]"""

    # 자동 인사이트 생성
    top_cat = cat.index[0]
    report += f"\\n  1. '{top_cat}' 카테고리가 점유율 {cat.loc[top_cat, '점유율']}%로 1위"

    if results['growth'] > 0:
        report += f"\\n  2. 매출이 {results['growth']:.1f}% 성장 추세"
    else:
        report += f"\\n  2. 매출이 {abs(results['growth']):.1f}% 하락 → 개선 필요"

    report += f"\\n  3. 일평균 {results['daily_avg']:,.0f}원을 KPI 기준선으로 설정 권장"

    print("\\n✓ 파이프라인 완료!")
    return report

# 실행
report = full_analysis_pipeline(df)
print(report)`;function u(){return t.jsxs(t.Fragment,{children:[t.jsx(e,{title:"보고서 자동 생성",description:"AI를 활용하여 분석 보고서를 자동으로 생성합니다."}),t.jsx("section",{className:"page-header",children:t.jsxs("div",{className:"container",children:[t.jsx("h1",{children:"보고서 자동 생성"}),t.jsx("p",{children:"AI를 활용하여 분석 보고서를 자동으로 생성합니다"})]})}),t.jsx("section",{className:"section lesson-content",children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"playground-body",children:[t.jsxs("div",{className:"callout-box",children:[t.jsx("h3",{children:"프로젝트 목표"}),t.jsx("p",{children:"데이터에서 KPI를 계산하고, 차트를 생성하고, HTML 보고서를 만들고, 템플릿 시스템과 ChatGPT 연동, 자동화 파이프라인까지 구축합니다."})]}),t.jsx("h2",{children:"데이터 설명"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"날짜"})," — 2024-01-01 ~ 2024-06-28 (180일)"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"카테고리"})," — 전자제품, 의류, 식품, 가구, 도서"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"매출/주문수"})," — 일별 카테고리별 매출과 주문 수"]})]}),t.jsx("h2",{children:"1단계: 데이터 준비"}),t.jsx(s,{title:"1단계: 데이터 준비",initialCode:r}),t.jsx("h2",{children:"2단계: KPI 계산"}),t.jsx(s,{title:"2단계: KPI 계산",initialCode:l}),t.jsx("h2",{children:"3단계: 차트 생성"}),t.jsx(s,{title:"3단계: 차트 생성",initialCode:o}),t.jsx("h2",{children:"4단계: HTML 보고서"}),t.jsx("p",{children:"분석 결과를 HTML 형식의 보고서로 구성합니다."}),t.jsx(s,{title:"4단계: HTML 보고서",initialCode:i}),t.jsx("h2",{children:"5단계: 템플릿 시스템"}),t.jsx("p",{children:"재사용 가능한 보고서 생성 함수를 만듭니다."}),t.jsx(s,{title:"5단계: 템플릿 시스템",initialCode:n}),t.jsx("h2",{children:"6단계: ChatGPT 연동"}),t.jsx("p",{children:"데이터 요약을 ChatGPT 프롬프트로 변환하여 인사이트를 자동 생성합니다."}),t.jsx(s,{title:"6단계: ChatGPT 연동 프롬프트",initialCode:d}),t.jsx("h2",{children:"7단계: 자동화 파이프라인"}),t.jsx("p",{children:"전체 분석 과정을 하나의 파이프라인으로 자동화합니다."}),t.jsx(s,{title:"7단계: 자동화 파이프라인",initialCode:p}),t.jsxs("div",{className:"lesson-nav",children:[t.jsx(a,{to:"/practice/timeseries",className:"lesson-nav-btn prev",children:"← 이전: 시계열 데이터 분석"}),t.jsx(a,{to:"/tips",className:"lesson-nav-btn next",children:"다음: 도구 팁 →"})]})]})})})]})}export{u as default};
