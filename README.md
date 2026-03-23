# AI Data - AI 데이터 분석 학습 플랫폼

Python, Pandas, ChatGPT를 활용한 데이터 분석 학습 사이트입니다. 브라우저에서 직접 Python 코드를 실행하며 학습할 수 있습니다.

**[ai-data.dreamitbiz.com](https://ai-data.dreamitbiz.com)**

## 주요 기능

- **13단계 커리큘럼** (기초 5 + 중급 6 + 고급 5) - 단계별 체계적 학습
- **인터랙티브 CodeEditor** - Pyodide 기반 브라우저 내 Python 실행 (설치 불필요)
- **Matplotlib/Seaborn 차트** - SVG 렌더링, 한글 폰트 자동 지원
- **미니 프로젝트 6개** - 카페 매출, 학생 성적, 설문조사, 날씨, 상품 리뷰, 인사 데이터
- **AICE Associate 실습** - 분류/회귀 기출 PDF + CodeEditor 풀이
- **도장깨기 퀴즈** - 6종 60문항, 배지 시스템 (19개, 4단계 티어)
- **커뮤니티 게시판** - 카테고리별 게시글, 댓글
- **5색 테마 + 다크모드** - Purple, Blue, Green, Rose, Orange

## 커리큘럼

### 기초 (5단계)
| STEP | 제목 | 내용 |
|------|------|------|
| 01 | AI 데이터 분석이란? | CRISP-DM, 활용 사례 |
| 02 | Python 기초 | 변수, 리스트, 함수, NumPy |
| 03 | Pandas 기초 | DataFrame, loc/iloc, groupby, merge |
| 04 | ChatGPT 활용 | 프롬프트 작성법, 코드 생성 |
| 05 | 데이터 유형 이해 | 수치형, 범주형, 스케일링 |

### 중급 (6단계)
| STEP | 제목 | 내용 |
|------|------|------|
| 06 | 데이터 전처리 | 결측치, 이상치, 인코딩, 피처 엔지니어링 |
| 07 | 탐색적 데이터 분석 | 단변량/이변량 분석, 상관분석, 대시보드 |
| 08 | 통계 분석 | t-검정, ANOVA, 카이제곱, 상관분석 |
| 09 | 시각화 기법 | Matplotlib, Seaborn, 종합 대시보드 |
| 10 | 분류 분석 | 로지스틱 회귀, 의사결정나무, 랜덤포레스트 |
| 11 | 회귀 분석 | 선형 회귀, 트리 회귀, RMSE/R2 평가 |

### 고급 (5단계 - 7단계 프로젝트)
| STEP | 제목 | 내용 |
|------|------|------|
| 12 | 매출 데이터 분석 | 트렌드, 카테고리, 고객, 대시보드 |
| 12 | 고객 데이터 분석 | RFM, 코호트, CLV 추정 |
| 12 | 설문 데이터 분석 | 리커트, NPS, 교차분석, 통계검정 |
| 13 | 시계열 데이터 분석 | 이동평균, 분해, 정상성, 예측 |
| 13 | 보고서 자동 생성 | KPI, HTML 보고서, 템플릿, ChatGPT |

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 19, React Router DOM 7 |
| Build | Vite 7 |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| 배포 | GitHub Pages |
| 인증 | Google OAuth, Kakao OAuth (PKCE) |
| 코드 실행 | Pyodide (브라우저 내 Python) |
| 스타일 | CSS Variables, Glassmorphism, Dark Mode |

## 프로젝트 구조

```
ai-data/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── aice/               # AICE 기출 PDF (6개)
├── src/
│   ├── components/          # Navbar, Footer, CodeEditor, SEOHead 등
│   ├── config/              # supabase.js, site.js
│   ├── contexts/            # Auth, Theme, Progress, Badge
│   ├── hooks/               # useCodeCopy, useCodeRunner
│   ├── workers/             # pyodide.worker.js
│   ├── data/                # quizzes.js, badges.js
│   ├── pages/
│   │   ├── intro/           # 기초 5개 페이지
│   │   ├── learn/           # 중급 6개 페이지
│   │   ├── practice/        # 고급 5개 페이지
│   │   ├── projects/        # 미니 프로젝트 6개
│   │   ├── aice/            # AICE 실습 3개
│   │   ├── tips/            # 도구 팁 6개
│   │   ├── quiz/            # 도장깨기
│   │   ├── lectures/        # 강의안
│   │   ├── workbook/        # 워크북
│   │   └── community/       # 커뮤니티
│   ├── services/            # Supabase CRUD
│   ├── styles/              # CSS 파일 (14개)
│   └── App.jsx              # 라우팅 (40+ lazy-loaded routes)
├── DEVLOG.md                # 개발일지
└── package.json
```

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev

# 빌드
npm run build

# 배포 (GitHub Pages)
npm run deploy
```

## 환경변수

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 라이선스

Private Project
