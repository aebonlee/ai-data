export const quizzes = {
  'pandas-basics': {
    title: 'Pandas 기초',
    description: 'Pandas의 기본 자료구조와 데이터 조작 방법을 테스트합니다.',
    icon: 'fa-solid fa-table',
    color: '#7C3AED',
    timeLimit: 300,
    passingScore: 70,
    questions: [
      {
        question: 'Pandas에서 CSV 파일을 읽어오는 함수는?',
        options: ['pd.load_csv()', 'pd.read_csv()', 'pd.open_csv()', 'pd.import_csv()'],
        correct: 1,
        explanation: 'pd.read_csv()는 CSV 파일을 DataFrame으로 읽어오는 함수입니다.'
      },
      {
        question: 'DataFrame의 처음 5행을 확인하는 메서드는?',
        options: ['df.first()', 'df.top()', 'df.head()', 'df.preview()'],
        correct: 2,
        explanation: 'df.head()는 기본적으로 처음 5개 행을 반환합니다. head(n)으로 n개를 지정할 수 있습니다.'
      },
      {
        question: 'DataFrame의 행과 열 수를 확인하는 속성은?',
        options: ['df.size', 'df.shape', 'df.dimensions', 'df.count()'],
        correct: 1,
        explanation: 'df.shape는 (행 수, 열 수) 튜플을 반환합니다.'
      },
      {
        question: '다음 코드의 출력은?\ndf = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\nprint(len(df.columns))',
        code: 'df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\nprint(len(df.columns))',
        options: ['2', '3', '6', 'Error'],
        correct: 0,
        explanation: 'df.columns는 열 이름 목록("A", "B")을 반환하고, len()으로 개수를 세면 2입니다.'
      },
      {
        question: 'DataFrame에서 특정 열을 선택하는 올바른 방법은?',
        options: ['df.get("column")', 'df["column"]', 'df.select("column")', 'df->column'],
        correct: 1,
        explanation: 'df["column"] 또는 df.column으로 특정 열을 선택할 수 있습니다.'
      },
      {
        question: 'DataFrame의 결측치(NaN) 개수를 확인하는 방법은?',
        options: ['df.null_count()', 'df.isna().sum()', 'df.missing()', 'df.count_na()'],
        correct: 1,
        explanation: 'df.isna().sum()은 각 열별 결측치 개수를 반환합니다. isnull()도 동일합니다.'
      },
      {
        question: 'DataFrame의 기술통계량을 보여주는 메서드는?',
        options: ['df.stats()', 'df.summary()', 'df.describe()', 'df.info()'],
        correct: 2,
        explanation: 'df.describe()는 count, mean, std, min, max 등 기술통계량을 반환합니다.'
      },
      {
        question: '조건에 맞는 행을 필터링하는 올바른 방법은?',
        options: ['df.filter(df.age > 20)', 'df.where(age > 20)', 'df[df["age"] > 20]', 'df.select(age > 20)'],
        correct: 2,
        explanation: 'df[조건]으로 불리언 인덱싱을 사용하여 행을 필터링합니다.'
      },
      {
        question: 'Series와 DataFrame의 차이점은?',
        options: [
          'Series는 1차원, DataFrame은 2차원',
          'Series는 숫자만, DataFrame은 문자만',
          'Series는 인덱스 없음, DataFrame은 인덱스 있음',
          '차이가 없다'
        ],
        correct: 0,
        explanation: 'Series는 1차원 데이터, DataFrame은 2차원(행×열) 테이블 형태의 데이터입니다.'
      },
      {
        question: 'DataFrame을 CSV로 저장하는 메서드는?',
        options: ['df.save_csv()', 'df.write_csv()', 'df.to_csv()', 'df.export_csv()'],
        correct: 2,
        explanation: 'df.to_csv("파일명.csv")로 DataFrame을 CSV 파일로 저장합니다.'
      }
    ]
  },

  'data-preprocessing': {
    title: '데이터 전처리',
    description: '결측치 처리, 데이터 변환, 인코딩 등 전처리 기법을 테스트합니다.',
    icon: 'fa-solid fa-broom',
    color: '#0046C8',
    timeLimit: 300,
    passingScore: 70,
    questions: [
      {
        question: '결측치를 특정 값으로 채우는 Pandas 메서드는?',
        options: ['df.replace_na()', 'df.fillna()', 'df.fill()', 'df.impute()'],
        correct: 1,
        explanation: 'df.fillna(값)은 NaN을 지정한 값으로 대체합니다.'
      },
      {
        question: '결측치가 있는 행을 제거하는 메서드는?',
        options: ['df.remove_na()', 'df.dropna()', 'df.delete_na()', 'df.clean_na()'],
        correct: 1,
        explanation: 'df.dropna()는 결측치가 있는 행(기본)을 제거합니다. axis=1이면 열을 제거합니다.'
      },
      {
        question: '중복된 행을 제거하는 메서드는?',
        options: ['df.unique()', 'df.distinct()', 'df.drop_duplicates()', 'df.remove_duplicates()'],
        correct: 2,
        explanation: 'df.drop_duplicates()는 중복된 행을 제거합니다. subset으로 특정 열 기준을 지정할 수 있습니다.'
      },
      {
        question: '문자열을 카테고리 숫자로 변환하는 기법은?',
        options: ['Normalization', 'Standardization', 'Label Encoding', 'Feature Scaling'],
        correct: 2,
        explanation: 'Label Encoding은 범주형 문자열을 숫자(0, 1, 2...)로 변환합니다.'
      },
      {
        question: 'One-Hot Encoding의 특징으로 올바른 것은?',
        options: [
          '범주마다 하나의 열을 생성한다',
          '순서를 부여한다',
          '결측치를 채운다',
          '데이터를 정규화한다'
        ],
        correct: 0,
        explanation: 'One-Hot Encoding은 각 범주를 별도의 이진(0/1) 열로 변환합니다.'
      },
      {
        question: '데이터 타입을 변환하는 메서드는?',
        options: ['df.convert()', 'df.astype()', 'df.cast()', 'df.to_type()'],
        correct: 1,
        explanation: 'df["col"].astype(int)로 데이터 타입을 변환합니다.'
      },
      {
        question: 'Min-Max Scaling의 결과 범위는?',
        options: ['-1 ~ 1', '0 ~ 1', '0 ~ 100', '-∞ ~ ∞'],
        correct: 1,
        explanation: 'Min-Max Scaling은 최솟값을 0, 최댓값을 1로 변환하여 0~1 범위로 맞춥니다.'
      },
      {
        question: '이상치(Outlier)를 탐지하는 대표적인 방법은?',
        options: ['K-Means', 'IQR (사분위 범위)', 'PCA', 'Gradient Descent'],
        correct: 1,
        explanation: 'IQR 방법은 Q1-1.5*IQR ~ Q3+1.5*IQR 범위를 벗어나는 값을 이상치로 판단합니다.'
      },
      {
        question: '문자열 열에서 공백을 제거하는 방법은?',
        options: ['df["col"].trim()', 'df["col"].str.strip()', 'df["col"].clean()', 'df["col"].remove_space()'],
        correct: 1,
        explanation: 'df["col"].str.strip()은 문자열 양쪽의 공백을 제거합니다.'
      },
      {
        question: '날짜 문자열을 datetime으로 변환하는 함수는?',
        options: ['pd.to_datetime()', 'pd.parse_date()', 'pd.date()', 'pd.convert_date()'],
        correct: 0,
        explanation: 'pd.to_datetime()은 문자열을 datetime 타입으로 변환합니다.'
      }
    ]
  },

  'eda': {
    title: '탐색적 데이터 분석 (EDA)',
    description: '데이터 탐색, 분포 확인, 상관관계 분석 등 EDA 기법을 테스트합니다.',
    icon: 'fa-solid fa-magnifying-glass-chart',
    color: '#059669',
    timeLimit: 300,
    passingScore: 70,
    questions: [
      {
        question: 'EDA의 주요 목적이 아닌 것은?',
        options: [
          '데이터의 패턴과 특성 파악',
          '가설 수립 및 검증 방향 설정',
          '모델 배포 및 운영',
          '이상치 및 결측치 발견'
        ],
        correct: 2,
        explanation: 'EDA는 데이터를 탐색하고 이해하는 단계로, 모델 배포는 EDA 이후 단계입니다.'
      },
      {
        question: '두 변수 간의 관계를 시각적으로 확인하는 차트는?',
        options: ['파이 차트', '히스토그램', '산점도(Scatter Plot)', '트리맵'],
        correct: 2,
        explanation: '산점도는 두 연속형 변수 간의 관계를 점으로 표현하여 상관관계를 파악합니다.'
      },
      {
        question: '상관계수(r)의 값 범위는?',
        options: ['0 ~ 1', '-1 ~ 0', '-1 ~ 1', '-∞ ~ ∞'],
        correct: 2,
        explanation: '피어슨 상관계수는 -1(완전 음의 상관)에서 1(완전 양의 상관)까지의 값을 가집니다.'
      },
      {
        question: 'df.value_counts()는 무엇을 반환하는가?',
        options: ['각 열의 데이터 타입', '각 값의 빈도수', '기술통계량', '결측치 개수'],
        correct: 1,
        explanation: 'value_counts()는 각 고유값의 출현 빈도를 내림차순으로 반환합니다.'
      },
      {
        question: '박스플롯(Box Plot)에서 확인할 수 없는 것은?',
        options: ['중앙값', '사분위수', '이상치', '평균값'],
        correct: 3,
        explanation: '박스플롯은 중앙값, Q1, Q3, 이상치를 보여주지만 평균값은 별도 표시하지 않으면 보이지 않습니다.'
      },
      {
        question: '히트맵(Heatmap)의 주요 용도는?',
        options: ['시계열 추이', '상관관계 행렬 시각화', '빈도 분포', '지리 데이터'],
        correct: 1,
        explanation: '히트맵은 변수 간 상관관계를 색상 강도로 표현하는 데 자주 사용됩니다.'
      },
      {
        question: 'df.groupby("category").mean()의 의미는?',
        options: [
          'category별 평균을 계산',
          'category 열을 삭제',
          'category별 정렬',
          'category의 고유값 확인'
        ],
        correct: 0,
        explanation: 'groupby()로 그룹화한 후 mean()으로 그룹별 평균을 계산합니다.'
      },
      {
        question: '히스토그램이 보여주는 것은?',
        options: ['범주별 비교', '시간에 따른 변화', '데이터의 분포', '변수 간 상관관계'],
        correct: 2,
        explanation: '히스토그램은 연속형 데이터의 분포(빈도)를 구간별로 보여줍니다.'
      },
      {
        question: '다음 중 범주형 데이터의 분포를 보기에 적합한 차트는?',
        options: ['히스토그램', '라인 차트', '바 차트', '산점도'],
        correct: 2,
        explanation: '바 차트는 범주별 값(빈도, 합계 등)을 비교하기에 적합합니다.'
      },
      {
        question: 'df.corr()는 무엇을 계산하는가?',
        options: ['공분산 행렬', '상관관계 행렬', '분산 분석', '카이제곱 검정'],
        correct: 1,
        explanation: 'df.corr()는 수치형 열 간의 피어슨 상관계수 행렬을 반환합니다.'
      }
    ]
  },

  'statistics': {
    title: '통계 기초',
    description: '기술통계, 확률분포, 가설검정 등 통계 기본 개념을 테스트합니다.',
    icon: 'fa-solid fa-chart-line',
    color: '#E11D48',
    timeLimit: 360,
    passingScore: 70,
    questions: [
      {
        question: '평균, 중앙값, 최빈값 중 이상치에 가장 민감한 것은?',
        options: ['중앙값', '최빈값', '평균', '모두 동일'],
        correct: 2,
        explanation: '평균은 극단값(이상치)에 의해 크게 왜곡될 수 있어 가장 민감합니다.'
      },
      {
        question: '표준편차가 클수록 데이터가 어떤가?',
        options: ['평균에 집중', '고르게 퍼짐', '좌우 비대칭', '결측치가 많음'],
        correct: 1,
        explanation: '표준편차는 데이터의 산포도를 나타내며, 클수록 데이터가 평균으로부터 넓게 퍼져있습니다.'
      },
      {
        question: '정규분포에서 평균 ± 1표준편차에 포함되는 데이터 비율은 약?',
        options: ['50%', '68%', '95%', '99%'],
        correct: 1,
        explanation: '정규분포에서 ±1σ는 약 68%, ±2σ는 약 95%, ±3σ는 약 99.7%를 포함합니다.'
      },
      {
        question: 'p-value가 0.03이고 유의수준이 0.05일 때 결론은?',
        options: [
          '귀무가설 채택',
          '귀무가설 기각 (통계적으로 유의)',
          '판단 불가',
          '데이터 부족'
        ],
        correct: 1,
        explanation: 'p-value(0.03) < 유의수준(0.05)이므로 귀무가설을 기각하고, 결과가 통계적으로 유의합니다.'
      },
      {
        question: '다음 중 기술통계(Descriptive Statistics)에 해당하지 않는 것은?',
        options: ['평균', '표준편차', '가설검정', '사분위수'],
        correct: 2,
        explanation: '가설검정은 추론통계(Inferential Statistics)에 해당합니다.'
      },
      {
        question: '왜도(Skewness)가 양수이면 분포의 형태는?',
        options: ['좌측으로 치우침 (꼬리가 왼쪽)', '오른쪽으로 꼬리가 긴 형태', '대칭 분포', '균등 분포'],
        correct: 1,
        explanation: '양의 왜도는 오른쪽으로 긴 꼬리를 가진 분포를 의미합니다.'
      },
      {
        question: 'A/B 테스트에서 사용하는 통계 검정은?',
        options: ['상관분석', '회귀분석', 't-test (또는 카이제곱 검정)', 'PCA'],
        correct: 2,
        explanation: 'A/B 테스트는 두 그룹 간 차이를 비교하므로 t-test나 카이제곱 검정을 사용합니다.'
      },
      {
        question: '상관관계가 있다는 것은 인과관계가 있다는 뜻인가?',
        options: ['항상 그렇다', '아니다', '양의 상관이면 그렇다', 'r > 0.7이면 그렇다'],
        correct: 1,
        explanation: '상관관계(Correlation)는 인과관계(Causation)를 의미하지 않습니다.'
      },
      {
        question: '중앙값(Median)의 특징으로 올바른 것은?',
        options: [
          '모든 데이터의 합 ÷ 개수',
          '가장 자주 나타나는 값',
          '데이터를 정렬했을 때 중앙에 위치하는 값',
          '최댓값과 최솟값의 평균'
        ],
        correct: 2,
        explanation: '중앙값은 데이터를 크기순으로 정렬했을 때 정중앙에 위치하는 값입니다.'
      },
      {
        question: '분산(Variance)과 표준편차의 관계는?',
        options: [
          '분산 = 표준편차 × 2',
          '표준편차 = 분산의 제곱근',
          '분산 = 표준편차 + 평균',
          '관계없다'
        ],
        correct: 1,
        explanation: '표준편차는 분산의 제곱근입니다. σ = √(Variance)'
      }
    ]
  },

  'visualization': {
    title: '데이터 시각화',
    description: 'Matplotlib, Seaborn 등을 활용한 데이터 시각화 기법을 테스트합니다.',
    icon: 'fa-solid fa-chart-pie',
    color: '#EA580C',
    timeLimit: 300,
    passingScore: 70,
    questions: [
      {
        question: 'Matplotlib에서 그래프 크기를 설정하는 방법은?',
        options: [
          'plt.size(10, 6)',
          'plt.figure(figsize=(10, 6))',
          'plt.set_size(10, 6)',
          'plt.resize(10, 6)'
        ],
        correct: 1,
        explanation: 'plt.figure(figsize=(너비, 높이))로 인치 단위의 그래프 크기를 설정합니다.'
      },
      {
        question: '범주형 데이터의 비율을 보여주기에 가장 적합한 차트는?',
        options: ['라인 차트', '산점도', '파이 차트', '박스플롯'],
        correct: 2,
        explanation: '파이 차트는 전체 대비 각 범주의 비율을 시각적으로 보여줍니다.'
      },
      {
        question: 'Seaborn의 heatmap에서 annot=True의 역할은?',
        options: ['색상 변경', '셀에 숫자 값 표시', '축 레이블 추가', '그리드 표시'],
        correct: 1,
        explanation: 'annot=True는 히트맵의 각 셀에 실제 수치를 텍스트로 표시합니다.'
      },
      {
        question: '시계열 데이터를 표현하기에 가장 적합한 차트는?',
        options: ['바 차트', '라인 차트', '파이 차트', '도넛 차트'],
        correct: 1,
        explanation: '라인 차트는 시간에 따른 값의 변화(추이)를 보여주기에 가장 적합합니다.'
      },
      {
        question: 'plt.subplot(2, 3, 4)에서 4의 의미는?',
        options: ['4번째 행', '4번째 열', '2×3 배열에서 4번째 위치', '4개의 서브플롯'],
        correct: 2,
        explanation: '2행 3열 격자에서 4번째 위치(2행 1열)에 서브플롯을 배치합니다.'
      },
      {
        question: 'Seaborn에서 박스플롯을 그리는 함수는?',
        options: ['sns.box()', 'sns.boxplot()', 'sns.box_plot()', 'sns.boxChart()'],
        correct: 1,
        explanation: 'sns.boxplot(x=, y=, data=)으로 박스플롯을 그립니다.'
      },
      {
        question: '한글 깨짐 문제를 해결하는 코드는?',
        options: [
          'plt.rcParams["font.family"] = "Malgun Gothic"',
          'plt.set_font("korean")',
          'plt.korean(True)',
          'import korean_font'
        ],
        correct: 0,
        explanation: 'rcParams로 한글 폰트(맑은 고딕 등)를 직접 지정하여 해결합니다.'
      },
      {
        question: '여러 변수의 분포를 한 번에 비교하기 좋은 Seaborn 함수는?',
        options: ['sns.pairplot()', 'sns.multiplot()', 'sns.compare()', 'sns.gridplot()'],
        correct: 0,
        explanation: 'sns.pairplot()은 변수 쌍의 산점도와 각 변수의 분포를 한 번에 보여줍니다.'
      },
      {
        question: 'plt.tight_layout()의 역할은?',
        options: [
          '그래프 크기 줄이기',
          '서브플롯 간 간격 자동 조절',
          '축 범위 조절',
          '범례 위치 조절'
        ],
        correct: 1,
        explanation: 'tight_layout()은 서브플롯 간 겹침을 방지하고 간격을 자동 조절합니다.'
      },
      {
        question: '데이터 분석 보고서에서 차트 제목이 중요한 이유는?',
        options: [
          '코드 실행에 필요해서',
          '차트의 메시지를 명확히 전달하기 위해',
          '파일 크기를 줄이기 위해',
          '성능 향상을 위해'
        ],
        correct: 1,
        explanation: '차트 제목은 독자에게 데이터의 핵심 메시지를 명확하게 전달하는 역할을 합니다.'
      }
    ]
  },

  'python-data': {
    title: 'Python 데이터 분석',
    description: 'Python의 데이터 분석 관련 문법과 라이브러리 활용법을 테스트합니다.',
    icon: 'fa-solid fa-python',
    color: '#3B82F6',
    timeLimit: 300,
    passingScore: 70,
    questions: [
      {
        question: '리스트 컴프리헨션 [x**2 for x in range(5)]의 결과는?',
        code: '[x**2 for x in range(5)]',
        options: ['[1, 4, 9, 16, 25]', '[0, 1, 4, 9, 16]', '[0, 2, 4, 6, 8]', '[1, 2, 3, 4, 5]'],
        correct: 1,
        explanation: 'range(5)는 0~4이고, 각 x를 제곱하면 [0, 1, 4, 9, 16]입니다.'
      },
      {
        question: 'Python에서 딕셔너리의 모든 키를 가져오는 메서드는?',
        options: ['dict.items()', 'dict.keys()', 'dict.values()', 'dict.all()'],
        correct: 1,
        explanation: 'dict.keys()는 딕셔너리의 모든 키를 반환합니다.'
      },
      {
        question: 'NumPy 배열의 평균을 구하는 방법은?',
        options: ['np.avg(arr)', 'np.mean(arr)', 'np.average_all(arr)', 'arr.sum() / len(arr)만 가능'],
        correct: 1,
        explanation: 'np.mean(arr) 또는 arr.mean()으로 배열의 평균을 구합니다.'
      },
      {
        question: 'lambda x: x * 2 는 무엇인가?',
        options: ['클래스 정의', '익명 함수', '반복문', '조건문'],
        correct: 1,
        explanation: 'lambda는 이름 없는 한 줄짜리 익명 함수를 정의합니다.'
      },
      {
        question: 'try-except 구문의 목적은?',
        options: ['반복 실행', '조건 분기', '예외(에러) 처리', '함수 정의'],
        correct: 2,
        explanation: 'try-except는 코드 실행 중 발생하는 예외를 포착하고 처리합니다.'
      },
      {
        question: 'f-string에서 소수점 2자리로 표시하는 방법은?',
        code: 'val = 3.14159\nprint(f"값: {val:???}")',
        options: ['f"{val:2d}"', 'f"{val:.2f}"', 'f"{val:2}"', 'f"{val:.2}"'],
        correct: 1,
        explanation: ':.2f는 소수점 이하 2자리까지 고정소수점 형식으로 표시합니다.'
      },
      {
        question: 'enumerate()의 역할은?',
        options: [
          '리스트 정렬',
          '인덱스와 값을 동시에 반환',
          '리스트 필터링',
          '리스트 병합'
        ],
        correct: 1,
        explanation: 'enumerate()는 반복 시 (인덱스, 값) 튜플을 반환합니다.'
      },
      {
        question: 'pip install pandas 명령어의 역할은?',
        options: [
          'Pandas를 삭제',
          'Pandas를 업데이트만',
          'Pandas 패키지를 설치',
          'Pandas를 import'
        ],
        correct: 2,
        explanation: 'pip install은 PyPI에서 패키지를 다운로드하여 설치합니다.'
      },
      {
        question: 'with open("file.csv") as f: 구문의 장점은?',
        options: [
          '파일을 더 빠르게 읽는다',
          '파일을 자동으로 닫아준다',
          '파일을 암호화한다',
          'CSV만 읽을 수 있다'
        ],
        correct: 1,
        explanation: 'with 문은 블록 종료 시 파일을 자동으로 닫아주어 리소스 누수를 방지합니다.'
      },
      {
        question: 'type([1, 2, 3])의 결과는?',
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'set'>", "<class 'array'>"],
        correct: 1,
        explanation: '[1, 2, 3]은 리스트이므로 type()은 <class \'list\'>를 반환합니다.'
      }
    ]
  }
}
