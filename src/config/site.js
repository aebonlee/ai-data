export const siteConfig = {
  name: 'AI Data',
  title: 'AI 데이터 분석 학습',
  description: 'AI를 활용하여 데이터를 분석하고 인사이트를 도출하는 능력을 키웁니다.',
  url: 'https://ai-data.dreamitbiz.com',
  brand: {
    ai: 'AI',
    prompt: 'Data'
  },
  colorThemes: [
    { key: 'purple', color: '#7C3AED', label: '퍼플' },
    { key: 'blue', color: '#0046C8', label: '블루' },
    { key: 'green', color: '#059669', label: '그린' },
    { key: 'rose', color: '#E11D48', label: '로즈' },
    { key: 'orange', color: '#EA580C', label: '오렌지' }
  ],
  menu: [
    {
      label: '기초',
      children: [
        { label: 'AI 데이터 분석이란?', path: '/intro/what-is-data-analysis' },
        { label: 'Python 기초', path: '/intro/python-basics' },
        { label: 'Pandas 기초', path: '/intro/pandas-intro' },
        { label: 'ChatGPT 활용', path: '/intro/chatgpt' },
        { label: '데이터 유형 이해', path: '/intro/data-types' },
        { label: '그래프의 종류', path: '/intro/chart-types' },
        { label: '통계 기초 이해', path: '/intro/basic-stats' }
      ]
    },
    {
      label: '중급',
      children: [
        { label: '데이터 전처리', path: '/learn/preprocessing' },
        { label: '탐색적 데이터 분석', path: '/learn/eda' },
        { label: '통계 분석', path: '/learn/statistics' },
        { label: '시각화 기법', path: '/learn/visualization' },
        { label: '분류 분석', path: '/learn/classification' },
        { label: '회귀 분석', path: '/learn/regression' }
      ]
    },
    {
      label: '고급',
      children: [
        { label: '매출 데이터 분석', path: '/practice/sales' },
        { label: '고객 데이터 분석', path: '/practice/customer' },
        { label: '설문 데이터 분석', path: '/practice/survey' },
        { label: '시계열 데이터 분석', path: '/practice/timeseries' },
        { label: '보고서 자동 생성', path: '/practice/report' }
      ]
    },
    {
      label: '도구 팁',
      children: [
        { label: '도구 팁 홈', path: '/tips' },
        { label: 'ChatGPT 활용 팁', path: '/tips/chatgpt' },
        { label: 'Python 팁', path: '/tips/python' },
        { label: 'Pandas 팁', path: '/tips/pandas' },
        { label: '시각화 팁', path: '/tips/visualization' },
        { label: '자동화 팁', path: '/tips/automation' }
      ]
    },
    {
      label: '게시판',
      children: [
        { label: '강의안', path: '/lectures' },
        { label: '워크북', path: '/workbooks' },
        { label: '커뮤니티', path: '/community' }
      ]
    },
    {
      label: '도장깨기',
      children: [
        { label: '퀴즈 도전', path: '/quiz' },
        { label: '배지 컬렉션', path: '/badges' }
      ]
    },
    {
      label: '프로젝트',
      children: [
        { label: '프로젝트 목록', path: '/projects' },
        { label: '카페 매출 분석', path: '/projects/cafe-sales' },
        { label: '학생 성적 분석', path: '/projects/student-scores' },
        { label: '설문조사 대시보드', path: '/projects/survey-dashboard' },
        { label: '날씨 패턴 분석', path: '/projects/weather-pattern' },
        { label: '상품 리뷰 분석', path: '/projects/product-review' },
        { label: '인사 데이터 분석', path: '/projects/hr-analytics' }
      ]
    },
    {
      label: 'AICE Associate',
      children: [
        { label: 'AICE 소개', path: '/aice' },
        { label: '분류 실습', path: '/aice/classification' },
        { label: '회귀 실습', path: '/aice/regression' }
      ]
    },
    { label: '실습장', path: '/playground' },
    { label: '참고자료', path: '/references' }
  ],
  footerLinks: [
    { label: 'AI 데이터 분석이란?', path: '/intro/what-is-data-analysis' },
    { label: 'Python 기초', path: '/intro/python-basics' },
    { label: 'Pandas 기초', path: '/intro/pandas-intro' },
    { label: '데이터 전처리', path: '/learn/preprocessing' },
    { label: '통계 분석', path: '/learn/statistics' },
    { label: '분류 분석', path: '/learn/classification' },
    { label: '매출 데이터 분석', path: '/practice/sales' },
    { label: '보고서 자동 생성', path: '/practice/report' },
    { label: '강의안', path: '/lectures' },
    { label: '커뮤니티', path: '/community' }
  ],
  familySites: [
    { label: '패밀리 사이트 선택', url: '' },
    { label: 'DreamIT Biz', url: 'https://dreamitbiz.com' },
    { label: 'AI Prompt', url: 'https://ai-prompt.dreamitbiz.com' },
    { label: 'SW Design', url: 'https://software.dreamitbiz.com' },
    { label: 'KoreaTech', url: 'https://koreatech.dreamitbiz.com' },
    { label: 'DB Study', url: 'https://dbstudy.dreamitbiz.com' }
  ],
  contact: {
    email: 'aebon@dreamitbiz.com',
    phone: '010-3700-0629',
    kakao: 'aebon',
    hours: '평일 09:00 ~ 18:00'
  }
}
