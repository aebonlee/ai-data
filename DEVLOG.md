# AI 데이터 분석 학습 사이트 - 개발일지

## 프로젝트 개요
- **프로젝트명**: AI Data (AI 데이터 분석 학습 플랫폼)
- **목적**: Python, Pandas, ChatGPT를 활용한 중급 데이터 분석 학습 사이트
- **대상**: 데이터 분석가 지망생, 기획자, 학생/연구자
- **도메인**: ai-data.dreamitbiz.com

## 기술 스택
| 분류 | 기술 |
|------|------|
| Frontend | React 19.2.0, React Router DOM 7.13.0 |
| Build | Vite 7.3.1 |
| Backend/Auth | Supabase (PostgreSQL, Auth, Storage) |
| 배포 | GitHub Pages (gh-pages) |
| 스타일 | CSS Variables, Glassmorphism, Dark Mode |
| 인증 | Google OAuth, Kakao OAuth (PKCE) |

## 데이터베이스
- Supabase 테이블 접두사: `ad_`
- 테이블: `ad_posts`, `ad_comments`, `ad_lectures`, `ad_workbooks`, `ad_user_progress`, `ad_quiz_scores`
- RLS(Row Level Security) 적용
- RPC 함수: `ad_increment_lecture_views`, `ad_increment_workbook_views`, `ad_increment_post_views`

## v1.0.0 (2026-03-24) - 초기 릴리스

### 프로젝트 구조
```
ai-data/
├── public/
│   ├── favicon.svg          # 바 차트 아이콘 (보라+노란 그라데이션)
│   └── og-image.png         # OG 미리보기 이미지 (1200x630)
├── scripts/
│   └── generate-og-image.mjs # sharp 기반 OG 이미지 생성 스크립트
├── src/
│   ├── components/          # 공통 컴포넌트
│   │   ├── Navbar.jsx       # 글래스모피즘 네비게이션 바
│   │   ├── Footer.jsx       # 푸터 (패밀리 사이트, 연락처)
│   │   ├── PublicLayout.jsx # 레이아웃 래퍼 (Navbar + Outlet + Footer)
│   │   ├── ProtectedRoute.jsx # 인증 가드
│   │   ├── SEOHead.jsx      # 동적 메타 태그 관리
│   │   ├── CodeEditor.jsx   # Pyodide 기반 코드 에디터
│   │   └── QuizComponent.jsx # 퀴즈 컴포넌트
│   ├── config/
│   │   ├── supabase.js      # Supabase 클라이언트 (PKCE)
│   │   └── site.js          # 사이트 설정 (메뉴, 테마, 브랜딩)
│   ├── contexts/
│   │   ├── AuthContext.jsx   # 인증 컨텍스트 (Google/Kakao OAuth)
│   │   ├── ThemeContext.jsx  # 테마 컨텍스트 (5색 + 다크모드)
│   │   ├── ProgressContext.jsx # 진행/점수 추적
│   │   └── BadgeContext.jsx  # 배지 추적
│   ├── hooks/
│   │   ├── useCodeCopy.js   # 코드 블록 복사 버튼 훅
│   │   └── useCodeRunner.js # Pyodide Python 실행 훅
│   ├── workers/
│   │   └── pyodide.worker.js # Pyodide Web Worker
│   ├── data/
│   │   ├── quizzes.js       # 6종 퀴즈 데이터 (60문항)
│   │   └── badges.js        # 19개 배지 데이터
│   ├── pages/
│   │   ├── Home.jsx         # 랜딩 페이지 (커리큘럼, 특징, 대상)
│   │   ├── Login.jsx        # 로그인 (Google/Kakao OAuth)
│   │   ├── Register.jsx     # 회원가입
│   │   ├── Profile.jsx      # 프로필
│   │   ├── NotFound.jsx     # 404 페이지
│   │   ├── Playground.jsx   # 코드 실습장 (Pyodide 기반 실행)
│   │   ├── BadgeCollection.jsx # 배지 컬렉션
│   │   ├── Favorites.jsx    # 즐겨찾기 (localStorage)
│   │   ├── References.jsx   # 참고 자료 링크 모음
│   │   ├── intro/           # 입문 (5개 페이지)
│   │   │   ├── WhatIsDataAnalysis.jsx
│   │   │   ├── PythonBasics.jsx
│   │   │   ├── PandasIntro.jsx
│   │   │   ├── ChatGPT.jsx
│   │   │   └── DataTypes.jsx
│   │   ├── learn/           # 학습 (4개 페이지)
│   │   │   ├── Preprocessing.jsx
│   │   │   ├── EDA.jsx
│   │   │   ├── Statistics.jsx
│   │   │   └── Visualization.jsx
│   │   ├── practice/        # 실습 (5개 페이지)
│   │   │   ├── Sales.jsx
│   │   │   ├── Customer.jsx
│   │   │   ├── Survey.jsx
│   │   │   ├── TimeSeries.jsx
│   │   │   └── Report.jsx
│   │   ├── tips/            # 도구 팁 (6개 페이지)
│   │   │   ├── TipsHome.jsx
│   │   │   ├── TipsChatGPT.jsx
│   │   │   ├── TipsPython.jsx
│   │   │   ├── TipsPandas.jsx
│   │   │   ├── TipsVisualization.jsx
│   │   │   └── TipsAutomation.jsx
│   │   ├── lectures/        # 강의안 관리
│   │   │   ├── LecturesHome.jsx
│   │   │   └── LectureWrite.jsx
│   │   ├── workbook/        # 워크북 관리
│   │   │   └── WorkbookHome.jsx
│   │   ├── quiz/             # 도장깨기
│   │   │   ├── QuizHome.jsx
│   │   │   └── QuizDetail.jsx
│   │   └── community/       # 커뮤니티 게시판
│   │       ├── CommunityList.jsx
│   │       ├── CommunityWrite.jsx
│   │       └── CommunityView.jsx
│   ├── services/
│   │   ├── communityService.js  # ad_posts, ad_comments CRUD
│   │   ├── lectureService.js    # ad_lectures CRUD
│   │   └── workbookService.js   # ad_workbooks CRUD
│   ├── styles/              # CSS 파일 (14개)
│   ├── App.jsx              # 라우팅 (40+ lazy-loaded routes)
│   ├── main.jsx             # 엔트리 포인트
│   └── index.css            # CSS 임포트
├── supabase-setup.sql       # DB 스키마 + RLS + RPC
├── .env                     # Supabase 환경변수
└── package.json
```

### 커리큘럼 (11단계)
| STEP | 제목 | 경로 |
|------|------|------|
| 01 | AI 데이터 분석이란? | /intro/what-is-data-analysis |
| 02 | Python 기초 | /intro/python-basics |
| 03 | Pandas 입문 | /intro/pandas-intro |
| 04 | ChatGPT 활용 | /intro/chatgpt |
| 05 | 데이터 유형 이해 | /intro/data-types |
| 06 | 데이터 전처리 | /learn/preprocessing |
| 07 | 탐색적 데이터 분석 | /learn/eda |
| 08 | 통계 기초 | /learn/statistics |
| 09 | AI 시각화 기법 | /learn/visualization |
| 10 | 매출 데이터 분석 | /practice/sales |
| 11 | 보고서 자동 생성 | /practice/report |

### 주요 기능
- **11단계 커리큘럼**: 입문 → 학습 → 실습 단계별 구성
- **실습 코드 블록**: 각 페이지에 Python 코드 예제 포함, 복사 버튼 지원
- **코드 실습장**: 템플릿 기반 코드 편집기 (Google Colab 연동용)
- **5가지 색상 테마**: Purple, Blue, Green, Rose, Orange
- **다크 모드**: 시스템 설정 감지 + 수동 전환
- **커뮤니티 게시판**: 카테고리별 게시글, 댓글 CRUD
- **강의안/워크북**: 주차별 강의 자료 및 실습 파일 관리
- **즐겨찾기**: 자주 사용하는 학습 페이지 로컬 저장
- **참고 자료**: Python, Pandas, 시각화, AI, 데이터셋 링크 모음
- **OG 메타 태그**: 카카오/페이스북 공유 미리보기 이미지
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- **SEO**: 동적 title/description, OG 태그 업데이트

### 디자인 템플릿
- D:\ai-prompt (AI 프롬프트 엔지니어링 사이트) 기반으로 제작
- 글래스모피즘 네비게이션 바, 그라데이션 히어로, 카드 기반 레이아웃
- CSS 변수 시스템으로 테마 일괄 변경 가능

### 배포 설정
- GitHub Pages: `gh-pages -d dist`
- SPA 폴백: 빌드 시 index.html → 404.html 자동 복사
- 커스텀 도메인: ai-data.dreamitbiz.com

## v1.1.0 (2026-03-24) - 소스 실행창 & 도장깨기

### 추가 기능
- **소스 실행창 (Pyodide)**: 브라우저에서 Python 코드 직접 실행
  - Pyodide v0.27.0 Web Worker 기반
  - Pandas, NumPy, Matplotlib, Seaborn, SciPy 등 데이터 분석 패키지 지원
  - 코드 에디터: 라인 번호, Tab 들여쓰기, Ctrl+Enter 실행
  - Matplotlib 차트 SVG 렌더링
  - input() 입력값 처리
  - 4종 코드 템플릿 (기본 분석, EDA, 시각화, 통계)

- **도장깨기 (퀴즈 시스템)**: 6종 퀴즈, 60문항
  - Pandas 기초 (10문항)
  - 데이터 전처리 (10문항)
  - 탐색적 데이터 분석 (10문항)
  - 통계 기초 (10문항)
  - 데이터 시각화 (10문항)
  - Python 데이터 분석 (10문항)
  - 타이머, 문제 셔플, 정답 해설
  - 점수 기록 및 최고 점수 추적

- **배지 시스템**: 19개 배지 (4단계 티어)
  - Bronze (5개): 첫 도전, 코드 첫 실행, Pandas 입문자, 코드 애호가, 학습 시작
  - Silver (7개): 전처리/EDA/통계/시각화/Python 마스터, 코드 중독자, 1주 연속
  - Gold (5개): Pandas 완벽, 통계 마스터, 전과목 통과, 코드 마스터, 한 달 연속
  - Platinum (2개): 올 퍼펙트, 데이터 사이언티스트
  - 배지 획득 시 팝업 알림
  - localStorage + Supabase 동기화

### 추가 파일
```
src/
├── workers/
│   └── pyodide.worker.js      # Pyodide Web Worker
├── hooks/
│   └── useCodeRunner.js        # Python 코드 실행 훅
├── components/
│   ├── CodeEditor.jsx          # Python 코드 에디터
│   └── QuizComponent.jsx       # 퀴즈 컴포넌트
├── contexts/
│   ├── ProgressContext.jsx      # 진행/점수 추적 컨텍스트
│   └── BadgeContext.jsx         # 배지 추적 컨텍스트
├── data/
│   ├── quizzes.js              # 6종 퀴즈 데이터 (60문항)
│   └── badges.js               # 19개 배지 데이터
├── pages/
│   ├── quiz/
│   │   ├── QuizHome.jsx        # 퀴즈 목록 페이지
│   │   └── QuizDetail.jsx      # 개별 퀴즈 페이지
│   └── BadgeCollection.jsx     # 배지 컬렉션 페이지
└── styles/
    ├── editor.css              # 코드 에디터 스타일
    ├── quiz.css                # 퀴즈 스타일
    └── badge.css               # 배지 스타일
```

### 변경 사항
- `App.jsx`: ProgressProvider, BadgeProvider 추가, 퀴즈/배지 라우트 추가
- `site.js`: 도장깨기 메뉴 추가 (퀴즈 도전, 배지 컬렉션)
- `index.css`: editor.css, quiz.css, badge.css import 추가
- `Playground.jsx`: CodeEditor 컴포넌트로 교체 (Pyodide 기반 실행)
- `supabase-setup.sql`: `ad_user_progress`, `ad_quiz_scores` 테이블 추가

### DB 추가 테이블

- `ad_user_progress`: 코드 실행 횟수, 연속 학습, 배지, 퀴즈 데이터
- `ad_quiz_scores`: 퀴즈별 최고 점수 기록

## v1.1.1 (2026-03-24) - 연락처 수정

### 변경 사항

- 푸터 연락처 정보 수정 (`site.js`)
  - 이메일: aebon@dreamitbiz.com
  - 전화: 010-3700-0629
  - 카카오톡: aebon
  - 운영시간: 평일 09:00 ~ 18:00

## v1.1.2 (2026-03-24) - 실습장 UI/UX 개선

### 변경 사항

- Matplotlib 한글 폰트 자동 적용 (`pyodide.worker.js`)
  - CDN에서 NanumGothic 폰트 다운로드 후 Matplotlib에 등록
  - `rcParams`로 한글 폰트 전역 설정, `axes.unicode_minus` 비활성화
  - 차트 라벨/제목의 한글 깨짐 문제 해결

- 코드 에디터 레이아웃 개선 (`CodeEditor.jsx`, `editor.css`)
  - 실행 버튼을 상단 툴바에서 코드 에디터 아래로 이동
  - 상단 툴바는 복사/초기화/상태 표시만 유지
  - 출력 결과 `white-space: pre`로 변경하여 DataFrame 정렬 유지
  - 출력 영역 가로 스크롤 지원

## v1.1.3 (2026-03-24) - 한글 폰트 다운로드 버그 수정

### 변경 사항

- Matplotlib 한글 폰트 다운로드 방식 변경 (`pyodide.worker.js`)
  - 기존 `open_url`이 문자열을 반환하여 `write_bytes()` 호출 시 `TypeError` 발생
  - `pyodide.http.pyfetch` + `await resp.bytes()`로 변경하여 바이너리 데이터 정상 처리
  - 폰트 파일 경로 캐싱으로 중복 다운로드 방지

## v1.2.0 (2026-03-24) - 실습장 & 참고자료 대폭 개선

### 변경 사항

- 출력 줄바꿈 및 차트 렌더링 수정 (`pyodide.worker.js`, `useCodeRunner.js`)
  - Pyodide stdout 콜백에 `\n` 추가하여 출력 결과 줄바꿈 정상화
  - matplotlib `plt.show()`를 `js.postMessage`로 SVG 직접 전송 방식으로 변경
  - 기존 `__SVG_START__/__SVG_END__` 마커 방식 제거 (여러 줄에 나뉘어 매칭 실패 문제)
  - 미사용 `_MockShow` 클래스 제거

- 한글 폰트 다운로드 안정화 (`pyodide.worker.js`)
  - Python `pyfetch` → JavaScript native `fetch` + `py.FS.writeFile`로 변경
  - 기존 jsdelivr CDN URL이 404 → Google Fonts 정적 URL(`fonts.gstatic.com`)로 교체
  - `except ImportError` → `except Exception`으로 에러 핸들링 강화

- 실습장 레이아웃 확대 (`Playground.jsx`, `editor.css`)
  - 본문 영역 `lesson-body`(800px) → `playground-body`(1100px)로 확대
  - 코드 에디터 `max-height` 500px → 900px으로 확대 (긴 코드 스크롤 제거)

- 실습장 템플릿 개선 (`Playground.jsx`)
  - 시각화 템플릿: 차트 제목 한글화 (카테고리별 매출, 매출 비율)
  - 통계 분석 템플릿: 히스토그램(점수 분포 비교) + 산점도(상관관계) 그래프 추가

- 참고 자료 페이지 개선 (`References.jsx`)
  - `lesson-body`(800px) 제거하여 컨테이너 전체 폭 사용
  - 카드 배열 `auto-fill` → 3열 고정 그리드로 변경

## v1.3.0 (2026-03-24) - 미니 프로젝트 & AICE Associate

### 추가 기능

- **미니 프로젝트 메뉴**: 6개 실전 프로젝트로 hands-on 실습
  - 카페 매출 분석 (초급) — Pandas groupby, 시계열, 바/라인 차트
  - 학생 성적 분석 (초급) — 기술통계, 히스토그램, 상관분석
  - 설문조사 대시보드 (중급) — 크로스탭, 범주형 데이터, 파이 차트
  - 날씨 패턴 분석 (중급) — 시계열, 이동평균, 이상치 탐지
  - 상품 리뷰 분석 (중급) — 텍스트 기초분석, 다중 시각화
  - 인사 데이터 분석 (고급) — 다변량 분석, 박스플롯, 히트맵
  - 각 프로젝트 4단계 CodeEditor (Pyodide) 기반 인터랙티브 실습
  - numpy.random.seed(42)로 인라인 데이터 생성 (외부 CSV 불필요)
  - 공유 Pyodide worker로 단계별 변수 연계

- **AICE Associate 실습**: AI 자격증(AICE) 시험 대비
  - 분류(Classification) 실습 — 3개 회차 기출 PDF + CodeEditor 풀이
  - 회귀(Regression) 실습 — 3개 회차 기출 PDF + CodeEditor 풀이
  - PDF 뷰어(iframe) + 회차 탭 전환
  - scikit-learn 기반 ML 파이프라인 템플릿 (전처리 → 모델학습 → 평가)
  - 6개 PDF 파일 static 서빙 (`public/aice/`)

### 추가 파일
```
src/pages/projects/
├── ProjectsHome.jsx          # 프로젝트 목록 카드 그리드
├── CafeSales.jsx             # 카페 매출 분석 (4단계 CodeEditor)
├── StudentScores.jsx         # 학생 성적 분석 (4단계 CodeEditor)
├── SurveyDashboard.jsx       # 설문조사 대시보드 (4단계 CodeEditor)
├── WeatherPattern.jsx        # 날씨 패턴 분석 (4단계 CodeEditor)
├── ProductReview.jsx         # 상품 리뷰 분석 (4단계 CodeEditor)
└── HRAnalytics.jsx           # 인사 데이터 분석 (4단계 CodeEditor)

src/pages/aice/
├── AICEHome.jsx              # AICE 소개 + PDF 다운로드 목록
├── AICEClassification.jsx    # 분류 실습 (PDF뷰어 + CodeEditor)
└── AICERegression.jsx        # 회귀 실습 (PDF뷰어 + CodeEditor)

public/aice/
├── classification-1.pdf      # 분류 1회차 기출
├── classification-2.pdf      # 분류 2회차 기출
├── classification-3.pdf      # 분류 3회차 기출
├── regression-1.pdf          # 회귀 1회차 기출
├── regression-2.pdf          # 회귀 2회차 기출
└── regression-3.pdf          # 회귀 3회차 기출
```

### 변경 사항
- `site.js`: 즐겨찾기 메뉴 제거, 프로젝트 드롭다운 추가 (실습 뒤), AICE Associate 드롭다운 추가
- `App.jsx`: Favorites import/route 제거, 프로젝트 7개 + AICE 3개 lazy import & route 추가
