import { useState } from 'react'
import SEOHead from '../components/SEOHead'

const templates = [
  { label: '기본 분석', code: `import pandas as pd\nimport matplotlib.pyplot as plt\n\n# 데이터 로딩\ndf = pd.read_csv('data.csv')\nprint(df.head())\nprint(df.describe())\n\n# 시각화\ndf['column'].hist(bins=20)\nplt.title('데이터 분포')\nplt.show()` },
  { label: 'EDA 템플릿', code: `import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('data.csv')\n\n# 기본 정보\nprint(f"Shape: {df.shape}")\nprint(f"결측치:\\n{df.isnull().sum()}")\nprint(f"기술통계:\\n{df.describe()}")\n\n# 상관관계\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')\nplt.title('상관관계 히트맵')\nplt.show()` },
  { label: '시각화 템플릿', code: `import matplotlib.pyplot as plt\nimport seaborn as sns\n\nplt.rcParams['font.family'] = 'Malgun Gothic'\nplt.rcParams['axes.unicode_minus'] = False\n\nfig, axes = plt.subplots(2, 2, figsize=(12, 10))\n\n# 1. 라인 차트\naxes[0,0].plot([1,2,3,4,5], [10,15,13,17,20], 'o-')\naxes[0,0].set_title('추이')\n\n# 2. 바 차트\naxes[0,1].bar(['A','B','C'], [30,25,40])\naxes[0,1].set_title('비교')\n\n# 3. 파이 차트\naxes[1,0].pie([40,30,30], labels=['A','B','C'], autopct='%1.0f%%')\naxes[1,0].set_title('비중')\n\n# 4. 히스토그램\nimport numpy as np\naxes[1,1].hist(np.random.randn(1000), bins=30)\naxes[1,1].set_title('분포')\n\nplt.tight_layout()\nplt.show()` }
]

export default function Playground() {
  const [code, setCode] = useState(templates[0].code)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <SEOHead title="실습장" description="데이터 분석 코드를 작성하고 테스트해보세요." />
      <section className="page-header"><div className="container"><h1>실습장</h1><p>코드 템플릿을 활용하여 데이터 분석을 시작하세요</p></div></section>
      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {templates.map((t, i) => (
                <button key={i} onClick={() => setCode(t.code)} className="community-submit-btn" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>{t.label}</button>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{ width: '100%', minHeight: '400px', fontFamily: 'monospace', fontSize: '0.9rem', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
              <button onClick={handleCopy} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.3rem 0.8rem', borderRadius: '4px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}>
                {copied ? '복사됨!' : '복사'}
              </button>
            </div>
            <div className="callout-box" style={{ marginTop: '1rem' }}>
              <h3>사용 방법</h3>
              <p>1. 위 템플릿을 선택하거나 직접 코드를 작성하세요. 2. "복사" 버튼으로 코드를 복사합니다. 3. Google Colab이나 Jupyter Notebook에 붙여넣어 실행하세요.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
