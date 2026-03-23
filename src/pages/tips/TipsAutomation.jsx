import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'

export default function TipsAutomation() {
  return (
    <>
      <SEOHead title="자동화 팁" description="반복 작업을 자동화하여 생산성을 높이는 방법" />
      <section className="page-header"><div className="container"><h1>자동화 팁</h1><p>반복 작업을 자동화하여 생산성을 높이는 방법</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <h2>1. 파일 처리 자동화</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import os
import glob
import pandas as pd

# 여러 CSV 파일 한 번에 읽기
files = glob.glob('data/*.csv')
dfs = [pd.read_csv(f) for f in files]
combined = pd.concat(dfs, ignore_index=True)
print(f"{len(files)}개 파일, {len(combined)}행 병합 완료")

# 엑셀 시트별 처리
excel = pd.ExcelFile('report.xlsx')
for sheet in excel.sheet_names:
    df = pd.read_excel(excel, sheet_name=sheet)
    df.to_csv(f'output/{sheet}.csv', index=False)
    print(f"{sheet} → CSV 변환 완료")`}</code></pre>
            </div>

            <h2>2. 정기 리포트 자동화</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import schedule
import time
from datetime import datetime

def generate_daily_report():
    """일일 보고서 생성"""
    today = datetime.now().strftime('%Y-%m-%d')
    df = pd.read_csv('daily_data.csv')

    report = {
        '날짜': today,
        '총 매출': df['revenue'].sum(),
        '주문 수': len(df),
        '평균 단가': df['revenue'].mean()
    }

    # 보고서 저장
    pd.DataFrame([report]).to_csv(
        f'reports/daily_{today}.csv', index=False
    )
    print(f"[{today}] 보고서 생성 완료")

# 매일 오전 9시 실행
schedule.every().day.at("09:00").do(generate_daily_report)

while True:
    schedule.run_pending()
    time.sleep(60)`}</code></pre>
            </div>

            <h2>3. 이메일 발송 자동화</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

def send_report_email(to_email, report_path, summary):
    msg = MIMEMultipart()
    msg['Subject'] = f'일일 매출 보고서 - {datetime.now().strftime("%Y-%m-%d")}'
    msg['From'] = 'analyst@company.com'
    msg['To'] = to_email

    # 본문
    body = f"""안녕하세요,\\n\\n일일 매출 보고서입니다.\\n\\n{summary}"""
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    # 첨부파일
    with open(report_path, 'rb') as f:
        attach = MIMEApplication(f.read(), _subtype='csv')
        attach.add_header('Content-Disposition', 'attachment',
                         filename=os.path.basename(report_path))
        msg.attach(attach)

    # 발송 (Gmail 예시)
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login('your_email', 'app_password')
        server.send_message(msg)
    print("이메일 발송 완료!")`}</code></pre>
            </div>

            <h2>4. Google Sheets 연동</h2>
            <div className="code-block">
              <div className="code-header">Python</div>
              <pre><code>{`# pip install gspread google-auth
import gspread
from google.oauth2.service_account import Credentials

scopes = ['https://www.googleapis.com/auth/spreadsheets']
creds = Credentials.from_service_account_file('key.json', scopes=scopes)
gc = gspread.authorize(creds)

# 스프레드시트 읽기
sheet = gc.open('매출데이터').sheet1
data = sheet.get_all_records()
df = pd.DataFrame(data)

# 분석 결과 쓰기
result_sheet = gc.open('매출데이터').worksheet('분석결과')
result_sheet.update('A1', [df.columns.tolist()] + df.values.tolist())`}</code></pre>
            </div>

            <div className="callout-box">
              <h3>자동화 우선순위</h3>
              <p>주 3회 이상 반복하는 작업부터 자동화하세요. 처음에는 간단한 스크립트부터 시작하고, 점차 스케줄러와 알림을 추가합니다. ChatGPT에게 "이 작업을 자동화하는 Python 코드 작성해줘"라고 요청하면 빠르게 시작할 수 있습니다.</p>
            </div>

            <div className="lesson-nav">
              <Link to="/tips/visualization" className="lesson-nav-btn prev">&larr; 이전: 시각화 팁</Link>
              <Link to="/tips" className="lesson-nav-btn next">도구 팁 목록 &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
