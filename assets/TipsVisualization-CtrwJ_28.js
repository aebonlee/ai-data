import{j as e,L as s}from"./index-gcHXxZUQ.js";import{S as a}from"./SEOHead-bamOYJVC.js";function d(){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"시각화 팁",description:"효과적이고 아름다운 데이터 시각화를 위한 팁"}),e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"시각화 팁"}),e.jsx("p",{children:"효과적이고 아름다운 데이터 시각화를 위한 팁"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsx("h2",{children:"1. 색상 팔레트 활용"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`import matplotlib.pyplot as plt
import seaborn as sns

# 세련된 색상 팔레트
colors = {
    'modern': ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
    'warm': ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#a855f7'],
    'cool': ['#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6'],
}

# seaborn 스타일 설정
sns.set_style('whitegrid')
sns.set_palette(colors['modern'])

# 커스텀 스타일
plt.rcParams.update({
    'figure.facecolor': 'white',
    'axes.facecolor': '#f8fafc',
    'axes.grid': True,
    'grid.alpha': 0.3,
    'font.family': 'Malgun Gothic'
})`})})]}),e.jsx("h2",{children:"2. 주석과 강조"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(months, sales, 'o-', color='#6366f1', linewidth=2)

# 최고점 강조
max_idx = sales.index(max(sales))
ax.annotate(f'최고: {max(sales):,}',
    xy=(max_idx, max(sales)),
    xytext=(max_idx+0.5, max(sales)+500),
    arrowprops=dict(arrowstyle='->', color='red'),
    fontsize=12, color='red', fontweight='bold')

# 목표선
ax.axhline(y=200, color='red', linestyle='--', alpha=0.5, label='목표')

# 영역 색칠
ax.fill_between(range(len(sales)), sales, alpha=0.1, color='#6366f1')
ax.legend()
plt.show()`})})]}),e.jsx("h2",{children:"3. 대시보드 레이아웃"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`fig = plt.figure(figsize=(16, 10))
fig.suptitle('매출 분석 대시보드', fontsize=18, fontweight='bold', y=0.98)

# GridSpec으로 유연한 레이아웃
gs = fig.add_gridspec(2, 3, hspace=0.3, wspace=0.3)

ax1 = fig.add_subplot(gs[0, :2])   # 상단 2/3
ax2 = fig.add_subplot(gs[0, 2])    # 상단 1/3
ax3 = fig.add_subplot(gs[1, 0])    # 하단 왼쪽
ax4 = fig.add_subplot(gs[1, 1])    # 하단 중앙
ax5 = fig.add_subplot(gs[1, 2])    # 하단 오른쪽

# 각 서브플롯에 차트 그리기
ax1.set_title('매출 추이')
ax2.set_title('카테고리 비중')
ax3.set_title('지역별 매출')
ax4.set_title('일별 패턴')
ax5.set_title('상관관계')

plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
plt.show()`})})]}),e.jsx("h2",{children:"4. 차트 저장"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Python"}),e.jsx("pre",{children:e.jsx("code",{children:`# 고해상도 저장
plt.savefig('chart.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')

# 투명 배경 (PPT용)
plt.savefig('chart.png', dpi=300, transparent=True)

# SVG (확대해도 깨지지 않음)
plt.savefig('chart.svg', format='svg', bbox_inches='tight')`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"시각화 원칙"}),e.jsx("p",{children:"데이터-잉크 비율을 높이세요 (불필요한 장식 제거). 색상은 3~5개 이내로 제한하세요. 제목과 축 레이블은 반드시 포함하세요. 타겟 독자에 맞는 복잡도를 선택하세요."})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/tips/pandas",className:"lesson-nav-btn prev",children:"← 이전: Pandas 팁"}),e.jsx(s,{to:"/tips/automation",className:"lesson-nav-btn next",children:"다음: 자동화 팁 →"})]})]})})})]})}export{d as default};
