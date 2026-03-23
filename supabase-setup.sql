-- ============================================
-- AI Data - Supabase Database Setup
-- 접두사: ad_ (ai-data)
-- ============================================

-- 1. 게시판 (커뮤니티) 테이블
CREATE TABLE IF NOT EXISTS ad_posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT '일반',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name VARCHAR(100),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 댓글 테이블
CREATE TABLE IF NOT EXISTS ad_comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT REFERENCES ad_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 강의안 테이블
CREATE TABLE IF NOT EXISTS ad_lectures (
  id BIGSERIAL PRIMARY KEY,
  week_number INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  file_url TEXT,
  is_published BOOLEAN DEFAULT true,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name VARCHAR(100),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 워크북 테이블
CREATE TABLE IF NOT EXISTS ad_workbooks (
  id BIGSERIAL PRIMARY KEY,
  week_number INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  file_url TEXT,
  is_published BOOLEAN DEFAULT true,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name VARCHAR(100),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================

-- 게시판 RLS
ALTER TABLE ad_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ad_posts_select" ON ad_posts
  FOR SELECT USING (true);

CREATE POLICY "ad_posts_insert" ON ad_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "ad_posts_delete" ON ad_posts
  FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "ad_posts_update" ON ad_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- 댓글 RLS
ALTER TABLE ad_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ad_comments_select" ON ad_comments
  FOR SELECT USING (true);

CREATE POLICY "ad_comments_insert" ON ad_comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "ad_comments_delete" ON ad_comments
  FOR DELETE USING (auth.uid() = author_id);

-- 강의안 RLS
ALTER TABLE ad_lectures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ad_lectures_select" ON ad_lectures
  FOR SELECT USING (true);

CREATE POLICY "ad_lectures_insert" ON ad_lectures
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "ad_lectures_update" ON ad_lectures
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "ad_lectures_delete" ON ad_lectures
  FOR DELETE USING (auth.uid() = author_id);

-- 워크북 RLS
ALTER TABLE ad_workbooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ad_workbooks_select" ON ad_workbooks
  FOR SELECT USING (true);

CREATE POLICY "ad_workbooks_insert" ON ad_workbooks
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "ad_workbooks_update" ON ad_workbooks
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "ad_workbooks_delete" ON ad_workbooks
  FOR DELETE USING (auth.uid() = author_id);

-- ============================================
-- 조회수 증가 함수 (RPC)
-- ============================================

CREATE OR REPLACE FUNCTION ad_increment_lecture_views(lecture_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE ad_lectures SET views = COALESCE(views, 0) + 1 WHERE id = lecture_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION ad_increment_workbook_views(workbook_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE ad_workbooks SET views = COALESCE(views, 0) + 1 WHERE id = workbook_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION ad_increment_post_views(post_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE ad_posts SET views = COALESCE(views, 0) + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- updated_at 자동 갱신 트리거
-- ============================================

CREATE OR REPLACE FUNCTION ad_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ad_posts_updated_at
  BEFORE UPDATE ON ad_posts
  FOR EACH ROW EXECUTE FUNCTION ad_update_timestamp();

CREATE TRIGGER ad_lectures_updated_at
  BEFORE UPDATE ON ad_lectures
  FOR EACH ROW EXECUTE FUNCTION ad_update_timestamp();

CREATE TRIGGER ad_workbooks_updated_at
  BEFORE UPDATE ON ad_workbooks
  FOR EACH ROW EXECUTE FUNCTION ad_update_timestamp();

-- ============================================
-- 인덱스
-- ============================================

CREATE INDEX IF NOT EXISTS idx_ad_posts_created_at ON ad_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ad_posts_category ON ad_posts(category);
CREATE INDEX IF NOT EXISTS idx_ad_comments_post_id ON ad_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_ad_lectures_week ON ad_lectures(week_number);
CREATE INDEX IF NOT EXISTS idx_ad_workbooks_week ON ad_workbooks(week_number);

-- ============================================
-- 인증 설정 메모 (Supabase Dashboard에서 설정)
-- ============================================
-- 1. Authentication > Providers > Google 활성화
--    - Client ID, Client Secret 입력
--    - Redirect URL: https://hcmgdztsgjvzcyxyayaj.supabase.co/auth/v1/callback
--
-- 2. Authentication > Providers > Kakao 활성화
--    - REST API Key, Client Secret 입력
--    - Redirect URL: https://hcmgdztsgjvzcyxyayaj.supabase.co/auth/v1/callback
--
-- 3. Authentication > URL Configuration
--    - Site URL: https://ai-data.dreamitbiz.com (또는 http://localhost:5174)
--    - Redirect URLs에 추가:
--      - https://ai-data.dreamitbiz.com/login
--      - http://localhost:5174/login
