/*
  # News System Schema

  1. New Tables
    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `likes` (integer)
      - `user_id` (uuid, foreign key)
    
    - `news_comments`
      - `id` (uuid, primary key)
      - `news_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  likes integer DEFAULT 0,
  user_id uuid REFERENCES auth.users(id)
);

-- Create news comments table
CREATE TABLE IF NOT EXISTS news_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id uuid REFERENCES news(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_comments ENABLE ROW LEVEL SECURITY;

-- Policies for news table
CREATE POLICY "Anyone can read news"
  ON news
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create news"
  ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own news"
  ON news
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for news comments
CREATE POLICY "Anyone can read comments"
  ON news_comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON news_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON news_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_comments_news_id ON news_comments(news_id);