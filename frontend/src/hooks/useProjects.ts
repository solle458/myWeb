import { useState, useEffect } from 'react';
import { ProjectData } from '../types/projectTypes';
import { getProjects, fallbackProjects } from '../api/getProjects';

// プロジェクトデータを取得するカスタムフック
export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 既にデータがロードされている場合は再取得しない
    if (isLoaded) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // APIからプロジェクトデータを取得
        const data = await getProjects();
        setProjects(data);
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError('プロジェクトデータの取得に失敗しました。');
        
        // エラー時はフォールバックデータを使用
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isLoaded]);

  // 再フェッチ関数
  const refetch = () => {
    setIsLoaded(false);
  };

  return { projects, loading, error, refetch };
};
