import type { Point } from '@/entities/Point/model/types';
import PointsImg from '@/assets/точки.png';

export const pointsApi = {
  /**
   * Fetch all points
   * Currently simulated with mock data
   */
  async fetchPoints(): Promise<Point[]> {
    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return [
      {
        id: 1,
        title: 'Точка №1',
        address: 'Исмоили Сомони 1176',
        image: PointsImg
      },
      {
        id: 2,
        title: 'Точка №2',
        address: 'пр. Рудаки 45',
      },
      {
        id: 3,
        title: 'Точка №3',
        address: 'ул. Айни 12',
        image: PointsImg
      },
      {
        id: 4,
        title: 'Точка №4',
        address: 'ул. Борбад 88',
      },
      {
        id: 5,
        title: 'Точка №5',
        address: 'ул. Дехоти 21',
        image: PointsImg
      }
    ];
  },

  async createPoint(dto: any): Promise<Point> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Math.random().toString(36).slice(2, 9),
      title: dto.title,
      address: dto.address,
    };
  }
};
