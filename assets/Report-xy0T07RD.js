import{j as e,L as s}from"./index-DWEWwXZw.js";import{S as a}from"./SEOHead-B8UjB-pD.js";function l(){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"보고서 자동 생성",description:"AI를 활용하여 분석 보고서를 자동으로 생성합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"보고서 자동 생성"}),e.jsx("p",{children:"AI를 활용하여 분석 보고서를 자동으로 생성하는 방법을 학습합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("h2",{children:"보고서 자동화의 가치"}),e.jsx("p",{children:"반복적인 분석 보고서를 자동화하면 시간을 절약하고, 일관된 품질을 유지하며, 사람의 실수를 줄일 수 있습니다. Python과 ChatGPT를 결합하면 데이터 수집부터 보고서 생성까지 전 과정을 자동화할 수 있습니다."}),e.jsx("h2",{children:"HTML 보고서 생성"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import pandas as pd
import matplotlib.pyplot as plt
import base64
from io import BytesIO

def fig_to_base64(fig):
    """차트를 base64 이미지로 변환"""
    buf = BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight', dpi=100)
    buf.seek(0)
    return base64.b64encode(buf.read()).decode()

# 데이터 분석
df = pd.read_csv('sales_data.csv')
total = df['revenue'].sum()
avg = df['revenue'].mean()

# 차트 생성
fig, ax = plt.subplots(figsize=(8, 4))
df.groupby('category')['revenue'].sum().plot(kind='bar', ax=ax)
ax.set_title('카테고리별 매출')
chart_img = fig_to_base64(fig)

# HTML 보고서
html = f"""
<html>
<body style="font-family: sans-serif; max-width: 800px; margin: auto;">
<h1>매출 분석 보고서</h1>
<p>분석 기간: 2024년 1월 ~ 12월</p>
<h2>핵심 지표</h2>
<ul>
  <li>총 매출: {total:,.0f}원</li>
  <li>평균 주문금액: {avg:,.0f}원</li>
</ul>
<h2>카테고리별 매출</h2>
<img src="data:image/png;base64,{chart_img}" />
</body>
</html>
"""
with open('report.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("report.html 생성 완료!")`})})]}),e.jsx("h2",{children:"PDF 보고서 생성"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# pip install fpdf2
from fpdf import FPDF

class ReportPDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 16)
        self.cell(0, 10, 'Sales Analysis Report', align='C', new_x='LMARGIN', new_y='NEXT')
        self.ln(5)

    def add_summary(self, metrics):
        self.set_font('Helvetica', '', 12)
        for key, value in metrics.items():
            self.cell(0, 8, f'{key}: {value}', new_x='LMARGIN', new_y='NEXT')
        self.ln(5)

    def add_chart(self, image_path):
        self.image(image_path, x=20, w=170)
        self.ln(10)

# 차트 저장
fig.savefig('chart.png', dpi=150, bbox_inches='tight')

# PDF 생성
pdf = ReportPDF()
pdf.add_page()
pdf.add_summary({
    'Total Revenue': f'{total:,.0f}',
    'Average Order': f'{avg:,.0f}',
    'Total Orders': f'{len(df):,}'
})
pdf.add_chart('chart.png')
pdf.output('report.pdf')
print("report.pdf 생성 완료!")`})})]}),e.jsx("h2",{children:"ChatGPT로 분석 요약 자동화"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# ChatGPT API를 활용한 분석 요약
# pip install openai
from openai import OpenAI

client = OpenAI(api_key="your-api-key")

summary_data = f"""
총 매출: {total:,.0f}원
평균 주문금액: {avg:,.0f}원
최고 매출 카테고리: {df.groupby('category')['revenue'].sum().idxmax()}
전월 대비 성장률: 12.5%
"""

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "user",
        "content": f"다음 데이터를 바탕으로 경영진 보고서 요약을 작성해줘:\\n{summary_data}"
    }]
)

ai_summary = response.choices[0].message.content
print(ai_summary)`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"자동화 확장"}),e.jsx("p",{children:"스케줄러(cron, schedule 라이브러리)를 활용하면 매일/매주/매월 자동으로 보고서를 생성하고 이메일로 발송할 수 있습니다. 데이터 파이프라인과 연결하면 완전 자동화된 리포팅 시스템을 구축할 수 있습니다."})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/practice/timeseries",className:"lesson-nav-btn prev",children:"← 이전: 시계열 분석"}),e.jsx(s,{to:"/tips",className:"lesson-nav-btn next",children:"다음: 도구 팁 →"})]})]})})})]})}export{l as default};
