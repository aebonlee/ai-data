# AI Data - AI 데이터 분석 학습 플랫폼

Python, Pandas, ChatGPT를 활용한 데이터 분석 학습 사이트입니다. 브라우저에서 직접 Python 코드를 실행하며 학습할 수 있습니다.

**[ai-data.dreamitbiz.com](https://ai-data.dreamitbiz.com)**

## 주요 기능

- **15단계 커리큘럼** (기초 7 + 중급 6 + 고급 5) - 단계별 체계적 학습
- **인터랙티브 CodeEditor** - Pyodide 기반 브라우저 내 Python 실행 (설치 불필요)
- **Matplotlib/Seaborn 차트** - SVG 렌더링, 한글 폰트 자동 지원
- **미니 프로젝트 6개** - 카페 매출, 학생 성적, 설문조사, 날씨, 상품 리뷰, 인사 데이터
- **AICE Associate 실습** - 분류/회귀 기출 PDF + CodeEditor 풀이
- **도장깨기 퀴즈** - 6종 60문항, 배지 시스템 (19개, 4단계 티어)
- **커뮤니티 게시판** - 카테고리별 게시글, 댓글
- **5색 테마 + 다크모드** - Purple, Blue, Green, Rose, Orange

## 커리큘럼

### 기초 (7단계)
| STEP | 제목 | 내용 |
|------|------|------|
| 01 | AI 데이터 분석이란? | CRISP-DM, 활용 사례 |
| 02 | Python 기초 | 변수, 리스트, 함수, NumPy |
| 03 | Pandas 기초 | DataFrame, loc/iloc, groupby, merge |
| 04 | ChatGPT 활용 | 프롬프트 작성법, 코드 생성 |
| 05 | 데이터 유형 이해 | 수치형, 범주형, 스케일링 |
| 06 | 그래프의 종류 | 막대, 선, 파이, 히스토그램, 산점도, 박스플롯 |
| 07 | 통계 기초 이해 | 평균, 표준편차, 사분위수, 정규분포, 상관계수 |

### 중급 (6단계)
| STEP | 제목 | 내용 |
|------|------|------|
| 08 | 데이터 전처리 | 결측치, 이상치, 인코딩, 피처 엔지니어링 |
| 09 | 탐색적 데이터 분석 | 단변량/이변량 분석, 상관분석, 대시보드 |
| 10 | 통계 분석 | t-검정, ANOVA, 카이제곱, 상관분석 |
| 11 | 시각화 기법 | Matplotlib, Seaborn, 종합 대시보드 |
| 12 | 분류 분석 | 로지스틱 회귀, 의사결정나무, 랜덤포레스트 |
| 13 | 회귀 분석 | 선형 회귀, 트리 회귀, RMSE/R2 평가 |

### 고급 (5단계 - 7단계 프로젝트)
| STEP | 제목 | 내용 |
|------|------|------|
| 14 | 매출 데이터 분석 | 트렌드, 카테고리, 고객, 대시보드 |
| 14 | 고객 데이터 분석 | RFM, 코호트, CLV 추정 |
| 14 | 설문 데이터 분석 | 리커트, NPS, 교차분석, 통계검정 |
| 15 | 시계열 데이터 분석 | 이동평균, 분해, 정상성, 예측 |
| 15 | 보고서 자동 생성 | KPI, HTML 보고서, 템플릿, ChatGPT |

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
│   │   ├── intro/           # 기초 7개 페이지
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


## License / 라이선스

**저작권 (c) 2025-2026 드림아이티비즈(DreamIT Biz). 모든 권리 보유.**

본 소프트웨어는 저작권법 및 지적재산권법에 의해 보호되는 독점 소프트웨어입니다. 본 프로젝트는 소프트웨어 저작권 등록이 완료되어 법적 보호를 받습니다.

- 본 소프트웨어의 무단 복제, 수정, 배포 또는 사용은 엄격히 금지됩니다.
- 저작권자의 사전 서면 허가 없이 본 소프트웨어의 어떠한 부분도 복제하거나 전송할 수 없습니다.
- 본 소프트웨어는 DreamIT Biz(https://www.dreamitbiz.com) 교육 플랫폼의 일부로 제공됩니다.

라이선스 문의: aebon@dreamitbiz.com

---

**Copyright (c) 2025-2026 DreamIT Biz (Ph.D Aebon Lee). All Rights Reserved.**

This software is proprietary and protected under applicable copyright and intellectual property laws. This project has been registered for software copyright protection.

- Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
- No part of this software may be reproduced or transmitted in any form without prior written permission from the copyright holder.
- This software is provided as part of the DreamIT Biz (https://www.dreamitbiz.com) educational platform.

For licensing inquiries, contact: aebon@dreamitbiz.com

---

**Designed & Developed by Ph.D Aebon Lee**

DreamIT Biz | https://www.dreamitbiz.com

