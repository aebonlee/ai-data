import{j as e,L as s}from"./index-iCwWYDlc.js";import{S as a}from"./SEOHead-DrU2xOWE.js";import{C as t}from"./CodeEditor-Dmpnsl59.js";const i=`import numpy as np
import pandas as pd

np.random.seed(42)

n = 300
products = np.random.choice(['노트북', '스마트폰', '태블릿', '이어폰', '스마트워치'], n,
                             p=[0.2, 0.25, 0.15, 0.25, 0.15])
ratings = np.random.choice([1, 2, 3, 4, 5], n, p=[0.05, 0.1, 0.2, 0.35, 0.3])
dates = pd.date_range('2024-01-01', periods=n, freq='D')[:n]

# 리뷰 텍스트 생성
positive = ['좋아요', '만족합니다', '추천합니다', '훌륭해요', '가성비 최고', '품질이 좋습니다',
            '빠른 배송', '디자인이 예뻐요', '성능이 좋아요', '사용하기 편해요']
negative = ['별로에요', '아쉬워요', '느려요', '불편해요', '비싸요', '기대 이하', '고장났어요']
neutral = ['보통이에요', '그냥 그래요', '무난합니다', '평범해요']

def gen_review(rating):
    if rating >= 4:
        words = np.random.choice(positive, np.random.randint(2, 5), replace=True)
    elif rating <= 2:
        words = np.random.choice(negative, np.random.randint(2, 4), replace=True)
    else:
        words = np.random.choice(neutral, np.random.randint(1, 3), replace=True)
    return ' '.join(words)

reviews = [gen_review(r) for r in ratings]

df = pd.DataFrame({
    '날짜': np.random.choice(dates, n),
    '상품': products,
    '평점': ratings,
    '리뷰': reviews
})
df['날짜'] = pd.to_datetime(df['날짜'])
df = df.sort_values('날짜').reset_index(drop=True)
df['리뷰길이'] = df['리뷰'].str.len()

print(f"데이터 크기: {df.shape}")
print()
print(df.head(10))
print()
print("상품별 리뷰 수:")
print(df['상품'].value_counts())
print()
print("평점 분포:")
print(df['평점'].value_counts().sort_index())`,r=`import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(12, 9))

# 1) 상품별 평균 평점
avg_rating = df.groupby('상품')['평점'].mean().sort_values(ascending=False)
colors = ['#10b981' if v >= 4 else '#f59e0b' if v >= 3 else '#ef4444' for v in avg_rating.values]
axes[0,0].barh(avg_rating.index, avg_rating.values, color=colors)
axes[0,0].set_title('상품별 평균 평점')
axes[0,0].set_xlabel('평균 평점')
axes[0,0].set_xlim(0, 5)
for i, v in enumerate(avg_rating.values):
    axes[0,0].text(v + 0.05, i, f'{v:.2f}', va='center')

# 2) 평점 분포 바 차트
rating_dist = df['평점'].value_counts().sort_index()
bar_colors = ['#ef4444', '#f97316', '#fbbf24', '#10b981', '#6366f1']
axes[0,1].bar(rating_dist.index, rating_dist.values, color=bar_colors)
axes[0,1].set_title('전체 평점 분포')
axes[0,1].set_xlabel('평점')
axes[0,1].set_ylabel('리뷰 수')

# 3) 상품별 평점 분포 (스택)
ct = pd.crosstab(df['상품'], df['평점'], normalize='index') * 100
ct.plot(kind='barh', stacked=True, ax=axes[1,0], color=bar_colors)
axes[1,0].set_title('상품별 평점 비율(%)')
axes[1,0].set_xlabel('%')
axes[1,0].legend(title='평점', fontsize=8)

# 4) 월별 평균 평점 추이
df['월'] = df['날짜'].dt.to_period('M')
monthly_rating = df.groupby('월')['평점'].mean()
axes[1,1].plot(range(len(monthly_rating)), monthly_rating.values, marker='o', color='#6366f1', linewidth=2)
axes[1,1].set_xticks(range(len(monthly_rating)))
axes[1,1].set_xticklabels([str(p) for p in monthly_rating.index], rotation=45, fontsize=8)
axes[1,1].set_title('월별 평균 평점 추이')
axes[1,1].set_ylabel('평균 평점')
axes[1,1].grid(True, alpha=0.3)

plt.suptitle('상품 리뷰 평점 분석', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()`,n=`# 텍스트 기초 분석: 단어 빈도
from collections import Counter

all_words = ' '.join(df['리뷰']).split()
word_counts = Counter(all_words)
top20 = word_counts.most_common(20)

print("상위 20개 단어:")
for word, count in top20:
    print(f"  {word}: {count}회")

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 단어 빈도 바 차트
words, counts = zip(*top20)
axes[0].barh(range(len(words)), counts, color='#6366f1')
axes[0].set_yticks(range(len(words)))
axes[0].set_yticklabels(words)
axes[0].invert_yaxis()
axes[0].set_title('상위 20개 단어 빈도')
axes[0].set_xlabel('빈도')

# 평점별 리뷰 길이
rating_groups = df.groupby('평점')['리뷰길이']
data = [rating_groups.get_group(r).values for r in sorted(df['평점'].unique())]
bp = axes[1].boxplot(data, labels=sorted(df['평점'].unique()), patch_artist=True)
box_colors = ['#ef4444', '#f97316', '#fbbf24', '#10b981', '#6366f1']
for patch, color in zip(bp['boxes'], box_colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.6)
axes[1].set_title('평점별 리뷰 길이 분포')
axes[1].set_xlabel('평점')
axes[1].set_ylabel('리뷰 길이 (글자 수)')

plt.tight_layout()
plt.show()`,l=`fig, axes = plt.subplots(2, 2, figsize=(13, 10))

# 1) 상품별 리뷰 수 + 평균 평점 콤보
products_list = df['상품'].unique()
review_counts = df.groupby('상품').size()
avg_ratings = df.groupby('상품')['평점'].mean()

ax1 = axes[0,0]
ax1b = ax1.twinx()
x = range(len(products_list))
ax1.bar(x, review_counts[products_list], color='#6366f1', alpha=0.6, label='리뷰 수')
ax1b.plot(x, avg_ratings[products_list], 'o-', color='#ef4444', linewidth=2, label='평균 평점')
ax1.set_xticks(x)
ax1.set_xticklabels(products_list, rotation=45)
ax1.set_ylabel('리뷰 수')
ax1b.set_ylabel('평균 평점')
ax1b.set_ylim(0, 5)
ax1.legend(loc='upper left', fontsize=8)
ax1b.legend(loc='upper right', fontsize=8)
ax1.set_title('상품별 리뷰 수 & 평균 평점')

# 2) 긍정/부정 비율
df['감성'] = df['평점'].apply(lambda x: '긍정' if x >= 4 else ('부정' if x <= 2 else '중립'))
sent_by_prod = pd.crosstab(df['상품'], df['감성'], normalize='index') * 100
sent_by_prod[['긍정', '중립', '부정']].plot(kind='bar', stacked=True, ax=axes[0,1],
    color=['#10b981', '#fbbf24', '#ef4444'])
axes[0,1].set_title('상품별 감성 비율(%)')
axes[0,1].set_ylabel('%')
axes[0,1].set_xticklabels(axes[0,1].get_xticklabels(), rotation=45)
axes[0,1].legend(fontsize=8)

# 3) 리뷰 길이 히스토그램 (감성별)
for sent, c in [('긍정', '#10b981'), ('중립', '#fbbf24'), ('부정', '#ef4444')]:
    data = df[df['감성'] == sent]['리뷰길이']
    axes[1,0].hist(data, bins=15, alpha=0.5, color=c, label=sent, edgecolor='white')
axes[1,0].set_title('감성별 리뷰 길이 분포')
axes[1,0].set_xlabel('리뷰 길이 (글자)')
axes[1,0].legend()

# 4) 일별 리뷰 수 추이
daily_reviews = df.groupby(df['날짜'].dt.to_period('W')).size()
axes[1,1].plot(range(len(daily_reviews)), daily_reviews.values, color='#6366f1', linewidth=1.5)
axes[1,1].fill_between(range(len(daily_reviews)), daily_reviews.values, alpha=0.2, color='#6366f1')
axes[1,1].set_title('주간 리뷰 수 추이')
axes[1,1].set_ylabel('리뷰 수')
axes[1,1].set_xlabel('주차')
axes[1,1].grid(True, alpha=0.3)

plt.suptitle('상품 리뷰 종합 분석', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("=" * 45)
print("상품 리뷰 분석 핵심 인사이트")
print("=" * 45)
print(f"총 리뷰 수: {len(df)}건")
print(f"전체 평균 평점: {df['평점'].mean():.2f}")
print(f"긍정 비율: {(df['감성']=='긍정').mean()*100:.1f}%")
print(f"최고 평점 상품: {avg_ratings.idxmax()} ({avg_ratings.max():.2f})")
print(f"최다 리뷰 상품: {review_counts.idxmax()} ({review_counts.max()}건)")`;function p(){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"상품 리뷰 분석",description:"상품 리뷰 텍스트를 기초 분석하고 다중 시각화합니다."}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"상품 리뷰 분석"}),e.jsx("p",{children:"텍스트 기초분석과 다중 시각화로 상품 리뷰를 분석합니다"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"playground-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"프로젝트 목표"}),e.jsxs("p",{children:["5개 상품의 300건 리뷰를 생성하고, 평점 분석, 텍스트 빈도 분석, 감성별 비교를 수행합니다.",e.jsx("strong",{children:" 난이도: 중급"})," | 핵심 스킬: 텍스트 기초분석, 다중 시각화"]})]}),e.jsx("h2",{children:"데이터 설명"}),e.jsx("p",{children:"노트북, 스마트폰, 태블릿, 이어폰, 스마트워치 5개 상품의 리뷰 300건입니다. 평점에 따라 긍정/부정 키워드로 리뷰 텍스트가 생성됩니다."}),e.jsx("h2",{children:"1단계: 데이터 생성 및 탐색"}),e.jsx("p",{children:"평점 기반 리뷰 텍스트를 생성하고 기본 분포를 확인합니다."}),e.jsx(t,{title:"1단계: 데이터 생성 및 탐색",initialCode:i}),e.jsx("h2",{children:"2단계: 평점 분석"}),e.jsx("p",{children:"상품별 평점 비교, 전체 분포, 월별 추이를 시각화합니다."}),e.jsx(t,{title:"2단계: 평점 분석",initialCode:r}),e.jsx("h2",{children:"3단계: 텍스트 기초분석"}),e.jsx("p",{children:"단어 빈도를 집계하고, 평점별 리뷰 길이 차이를 박스플롯으로 비교합니다."}),e.jsx(t,{title:"3단계: 텍스트 기초분석",initialCode:n}),e.jsx("h2",{children:"4단계: 다중 시각화"}),e.jsx("p",{children:"리뷰 수/평점 콤보, 감성 분석, 리뷰 길이 분포, 주간 추이를 종합 대시보드로 구성합니다."}),e.jsx(t,{title:"4단계: 종합 대시보드",initialCode:l}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"실습 과제"}),e.jsxs("ul",{children:[e.jsx("li",{children:"특정 상품(예: 스마트폰)의 리뷰만 필터링하여 단어 빈도를 분석해보세요."}),e.jsx("li",{children:"평점 1~2점 리뷰에서 자주 등장하는 단어와 4~5점 리뷰의 단어를 비교해보세요."}),e.jsx("li",{children:"리뷰 길이와 평점의 상관관계를 산점도와 상관계수로 분석해보세요."})]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/projects/weather-pattern",className:"lesson-nav-btn prev",children:"← 이전: 날씨 패턴 분석"}),e.jsx(s,{to:"/projects/hr-analytics",className:"lesson-nav-btn next",children:"다음: 인사 데이터 분석 →"})]})]})})})]})}export{p as default};
