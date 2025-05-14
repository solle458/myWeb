import { ProjectData, ProjectResponse } from '../types/projectTypes';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://myweb-3jbr.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// APIからプロジェクトデータを取得する関数
export const getProjects = async () => {
  try {
    const response = await apiClient.get('/api/projects');
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching projects:', error);

    // エラーがAxiosError型であるかを確認
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // サーバーからのレスポンスがある場合
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // リクエストは送信されたがレスポンスがない場合
        console.error('No response received:', error.request);
      }
    } else {
      // その他のエラー
      console.error('Error config:', (error as Error).message);
    }
    throw error;
  }
};

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
