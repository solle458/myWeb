import { ProjectData, ProjectResponse } from '../types/projectTypes';
import axios from 'axios';

// APIからプロジェクトデータを取得する関数
export async function getProjects(): Promise<ProjectData[]> {
  try {
    // APIリクエスト
    const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api') + '/projects';
    // console.log("API URL:", url);
    const response = await axios.get(url);
    // console.log("API response:", response);
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
