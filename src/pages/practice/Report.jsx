import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function Report() {
  return (
    <>
      <SEOHead title="보고서 자동 생성" description="AI를 활용하여 분석 보고서를 자동으로 생성합니다." />
      <section className="page-header"><div className="container"><h1>보고서 자동 생성</h1><p>AI를 활용하여 분석 보고서를 자동으로 생성하는 방법을 학습합니다</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>보고서 자동화의 가치</h2>
            <p>반복적인 분석 보고서를 자동화하면 시간을 절약하고, 일관된 품질을 유지하며, 사람의 실수를 줄일 수 있습니다. Python과 ChatGPT를 결합하면 데이터 수집부터 보고서 생성까지 전 과정을 자동화할 수 있습니다.</p>

            <h2>HTML 보고서 생성</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import pandas as pd
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
print("report.html 생성 완료!")`}</code></pre>
            </div>

            <h2>PDF 보고서 생성</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# pip install fpdf2
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
print("report.pdf 생성 완료!")`}</code></pre>
            </div>

            <h2>ChatGPT로 분석 요약 자동화</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# ChatGPT API를 활용한 분석 요약
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
print(ai_summary)`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>자동화 확장</h3>
              <p>스케줄러(cron, schedule 라이브러리)를 활용하면 매일/매주/매월 자동으로 보고서를 생성하고 이메일로 발송할 수 있습니다. 데이터 파이프라인과 연결하면 완전 자동화된 리포팅 시스템을 구축할 수 있습니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/practice/timeseries" className="lesson-nav-btn prev">&larr; 이전: 시계열 분석</Link>
              <Link to="/tips" className="lesson-nav-btn next">다음: 도구 팁 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
