export const badges = [
  // === Bronze Tier ===
  {
    id: 'first-quiz',
    title: '첫 도전',
    description: '첫 번째 퀴즈를 완료하세요',
    icon: 'fa-solid fa-flag',
    tier: 'bronze',
    condition: { type: 'quiz_any_completed', count: 1 }
  },
  {
    id: 'first-run',
    title: '코드 첫 실행',
    description: '코드를 처음으로 실행하세요',
    icon: 'fa-solid fa-play',
    tier: 'bronze',
    condition: { type: 'code_runs', count: 1 }
  },
  {
    id: 'pandas-starter',
    title: 'Pandas 입문자',
    description: 'Pandas 기초 퀴즈를 통과하세요',
    icon: 'fa-solid fa-table',
    tier: 'bronze',
    condition: { type: 'quiz_passed', quizId: 'pandas-basics', minScore: 70 }
  },
  {
    id: 'code-lover',
    title: '코드 애호가',
    description: '코드를 10번 이상 실행하세요',
    icon: 'fa-solid fa-heart',
    tier: 'bronze',
    condition: { type: 'code_runs', count: 10 }
  },
  {
    id: 'streak-start',
    title: '학습 시작',
    description: '3일 연속 학습하세요',
    icon: 'fa-solid fa-fire',
    tier: 'bronze',
    condition: { type: 'streak', days: 3 }
  },

  // === Silver Tier ===
  {
    id: 'preprocessor',
    title: '전처리 마스터',
    description: '데이터 전처리 퀴즈를 통과하세요',
    icon: 'fa-solid fa-broom',
    tier: 'silver',
    condition: { type: 'quiz_passed', quizId: 'data-preprocessing', minScore: 70 }
  },
  {
    id: 'eda-explorer',
    title: 'EDA 탐험가',
    description: 'EDA 퀴즈를 통과하세요',
    icon: 'fa-solid fa-magnifying-glass-chart',
    tier: 'silver',
    condition: { type: 'quiz_passed', quizId: 'eda', minScore: 70 }
  },
  {
    id: 'stat-brain',
    title: '통계 두뇌',
    description: '통계 기초 퀴즈를 통과하세요',
    icon: 'fa-solid fa-brain',
    tier: 'silver',
    condition: { type: 'quiz_passed', quizId: 'statistics', minScore: 70 }
  },
  {
    id: 'viz-artist',
    title: '시각화 아티스트',
    description: '시각화 퀴즈를 통과하세요',
    icon: 'fa-solid fa-palette',
    tier: 'silver',
    condition: { type: 'quiz_passed', quizId: 'visualization', minScore: 70 }
  },
  {
    id: 'python-coder',
    title: 'Python 코더',
    description: 'Python 데이터 분석 퀴즈를 통과하세요',
    icon: 'fa-brands fa-python',
    tier: 'silver',
    condition: { type: 'quiz_passed', quizId: 'python-data', minScore: 70 }
  },
  {
    id: 'code-addict',
    title: '코드 중독자',
    description: '코드를 50번 이상 실행하세요',
    icon: 'fa-solid fa-bolt',
    tier: 'silver',
    condition: { type: 'code_runs', count: 50 }
  },
  {
    id: 'streak-week',
    title: '1주 연속 학습',
    description: '7일 연속 학습하세요',
    icon: 'fa-solid fa-calendar-check',
    tier: 'silver',
    condition: { type: 'streak', days: 7 }
  },

  // === Gold Tier ===
  {
    id: 'pandas-perfect',
    title: 'Pandas 완벽',
    description: 'Pandas 기초 퀴즈 만점을 달성하세요',
    icon: 'fa-solid fa-star',
    tier: 'gold',
    condition: { type: 'quiz_perfect', quizId: 'pandas-basics' }
  },
  {
    id: 'stats-perfect',
    title: '통계 마스터',
    description: '통계 기초 퀴즈 만점을 달성하세요',
    icon: 'fa-solid fa-crown',
    tier: 'gold',
    condition: { type: 'quiz_perfect', quizId: 'statistics' }
  },
  {
    id: 'all-passed',
    title: '전과목 통과',
    description: '모든 퀴즈를 70점 이상으로 통과하세요',
    icon: 'fa-solid fa-trophy',
    tier: 'gold',
    condition: { type: 'all_quizzes_passed' }
  },
  {
    id: 'code-master',
    title: '코드 마스터',
    description: '코드를 100번 이상 실행하세요',
    icon: 'fa-solid fa-laptop-code',
    tier: 'gold',
    condition: { type: 'code_runs', count: 100 }
  },
  {
    id: 'streak-month',
    title: '한 달 연속 학습',
    description: '30일 연속 학습하세요',
    icon: 'fa-solid fa-medal',
    tier: 'gold',
    condition: { type: 'streak', days: 30 }
  },

  // === Platinum Tier ===
  {
    id: 'all-perfect',
    title: '올 퍼펙트',
    description: '모든 퀴즈에서 만점을 달성하세요',
    icon: 'fa-solid fa-gem',
    tier: 'platinum',
    condition: { type: 'all_quizzes_perfect' }
  },
  {
    id: 'data-scientist',
    title: '데이터 사이언티스트',
    description: '모든 배지를 획득하세요 (이 배지 제외)',
    icon: 'fa-solid fa-user-astronaut',
    tier: 'platinum',
    condition: { type: 'all_badges_earned' }
  }
]
