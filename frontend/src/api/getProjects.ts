import { ProjectData, ProjectResponse } from '../types/projectTypes';
import axios from 'axios';

// APIからプロジェクトデータを取得する関数
export async function getProjects(): Promise<ProjectData[]> {
  try {
    // API URLの設定（環境変数から取得するとより良い）
    const apiUrl = 'https://myweb-3jbr.onrender.com/api/';
    
    // APIリクエスト
    const response = await axios.get(`${apiUrl}/projects`);
    
    // レスポンスが正常でない場合はエラーをスロー
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // レスポンスデータをパース
    const result: ProjectResponse = response.data;
    
    // エラーチェック
    if (!result.success) {
      throw new Error(result.error || 'Unknown error');
    }
    
    return result.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
}

// フォールバック用のデモプロジェクトデータ
export const fallbackProjects: ProjectData[] = [
  {
    id: 'project1',
    title: 'ポートフォリオウェブサイト',
    description: ['Next.jsとTailwind CSSを使用した個人ポートフォリオサイト。アニメーションとインタラクティブな要素を取り入れ、レスポンシブデザインを実装。'],
    image: '/images/mobile/dark1.JPG',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    url: 'https://solle.vercel.app/',
    github: 'https://github.com/solle458/myWeb/tree/main'
  }
];
