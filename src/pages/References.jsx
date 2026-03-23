import SEOHead from '../components/SEOHead'

const resources = [
  {
    category: 'Python & Pandas',
    items: [
      { title: 'Python 공식 문서', url: 'https://docs.python.org/ko/3/', desc: 'Python 한국어 공식 문서' },
      { title: 'Pandas 공식 문서', url: 'https://pandas.pydata.org/docs/', desc: 'Pandas API 레퍼런스 및 가이드' },
      { title: 'NumPy 공식 문서', url: 'https://numpy.org/doc/', desc: 'NumPy 수치 연산 라이브러리 문서' },
    ]
  },
  {
    category: '시각화',
    items: [
      { title: 'Matplotlib', url: 'https://matplotlib.org/stable/gallery/', desc: '차트 갤러리 및 예제 코드' },
      { title: 'Seaborn', url: 'https://seaborn.pydata.org/examples/', desc: '통계 시각화 라이브러리 예제' },
      { title: 'Plotly', url: 'https://plotly.com/python/', desc: '인터랙티브 시각화 라이브러리' },
    ]
  },
  {
    category: 'AI / ChatGPT',
    items: [
      { title: 'OpenAI API', url: 'https://platform.openai.com/docs', desc: 'ChatGPT API 공식 문서' },
      { title: 'ChatGPT', url: 'https://chat.openai.com', desc: 'ChatGPT 웹 인터페이스' },
      { title: 'Google Colab', url: 'https://colab.research.google.com', desc: '무료 클라우드 Python 실행 환경' },
    ]
  },
  {
    category: '데이터셋',
    items: [
      { title: 'Kaggle', url: 'https://www.kaggle.com/datasets', desc: '세계 최대 데이터 과학 커뮤니티 & 데이터셋' },
      { title: '공공데이터포털', url: 'https://www.data.go.kr', desc: '대한민국 정부 공공 데이터' },
      { title: 'UCI ML Repository', url: 'https://archive.ics.uci.edu/ml/', desc: '머신러닝 데이터셋 저장소' },
    ]
  },
  {
    category: '학습 자료',
    items: [
      { title: '점프 투 파이썬', url: 'https://wikidocs.net/book/1', desc: '무료 Python 입문서' },
      { title: '데이터 사이언스 스쿨', url: 'https://datascienceschool.net', desc: '무료 데이터 분석 강의' },
      { title: 'W3Schools Python', url: 'https://www.w3schools.com/python/', desc: 'Python 튜토리얼 (영문)' },
    ]
  }
]

export default function References() {
  return (
    <>
      <SEOHead title="참고 자료" description="데이터 분석 학습에 유용한 참고 자료와 링크 모음" />
      <section className="page-header"><div className="container"><h1>참고 자료</h1><p>데이터 분석 학습에 유용한 참고 자료와 링크 모음</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          {resources.map((group, gi) => (
            <div key={gi} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', paddingBottom: '8px', borderBottom: '2px solid var(--primary-blue)', color: 'var(--text-primary)' }}>{group.category}</h2>
              <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {group.items.map((item, ii) => (
                  <a key={ii} href={item.url} target="_blank" rel="noopener noreferrer" className="curriculum-card" style={{ textDecoration: 'none' }}>
                    <h3 className="curriculum-card-title">{item.title}</h3>
                    <p className="curriculum-card-desc">{item.desc}</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: 'auto' }}>바로가기 &rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
