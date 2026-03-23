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
- 테이블: `ad_posts`, `ad_comments`, `ad_lectures`, `ad_workbooks`
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
│   │   └── SEOHead.jsx      # 동적 메타 태그 관리
│   ├── config/
│   │   ├── supabase.js      # Supabase 클라이언트 (PKCE)
│   │   └── site.js          # 사이트 설정 (메뉴, 테마, 브랜딩)
│   ├── contexts/
│   │   ├── AuthContext.jsx   # 인증 컨텍스트 (Google/Kakao OAuth)
│   │   └── ThemeContext.jsx  # 테마 컨텍스트 (5색 + 다크모드)
│   ├── hooks/
│   │   └── useCodeCopy.js   # 코드 블록 복사 버튼 훅
│   ├── pages/
│   │   ├── Home.jsx         # 랜딩 페이지 (커리큘럼, 특징, 대상)
│   │   ├── Login.jsx        # 로그인 (Google/Kakao OAuth)
│   │   ├── Register.jsx     # 회원가입
│   │   ├── Profile.jsx      # 프로필
│   │   ├── NotFound.jsx     # 404 페이지
│   │   ├── Playground.jsx   # 코드 실습장 (템플릿 제공)
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
│   │   └── community/       # 커뮤니티 게시판
│   │       ├── CommunityList.jsx
│   │       ├── CommunityWrite.jsx
│   │       └── CommunityView.jsx
│   ├── services/
│   │   ├── communityService.js  # ad_posts, ad_comments CRUD
│   │   ├── lectureService.js    # ad_lectures CRUD
│   │   └── workbookService.js   # ad_workbooks CRUD
│   ├── styles/              # CSS 파일 (11개)
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
