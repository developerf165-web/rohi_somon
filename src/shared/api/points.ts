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
        image: PointsImg,
        lat: '38.5750',
        lng: '68.7900',
        comment: 'Главный офис',
        images: [PointsImg, PointsImg, PointsImg]
      },
      {
        id: 2,
        title: 'Точка №2',
        address: 'пр. Рудаки 45',
        lat: '38.5550',
        lng: '68.7850',
        comment: 'Центральный филиал',
        images: [PointsImg, PointsImg]
      },
      {
        id: 3,
        title: 'Точка №3',
        address: 'ул. Айни 12',
        image: PointsImg,
        lat: '38.5600',
        lng: '68.8000',
        comment: 'Магазин у дороги',
        images: [PointsImg, PointsImg, PointsImg, PointsImg]
      },
      {
        id: 4,
        title: 'Точка №4',
        address: 'ул. Борбад 88',
        lat: '38.5400',
        lng: '68.7700',
        comment: 'Складское помещение',
        images: []
      },
      {
        id: 5,
        title: 'Точка №5',
        address: 'ул. Дехоти 21',
        image: PointsImg,
        lat: '38.5300',
        lng: '68.7600',
        comment: 'Пункт выдачи',
        images: [PointsImg]
      }
    ];
  },

  async createPoint(dto: any): Promise<Point> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Math.random().toString(36).slice(2, 9),
      title: dto.title,
      address: dto.address,
      lat: dto.lat,
      lng: dto.lng,
      comment: dto.comment,
      images: dto.images || [],
    };
  },

  async updatePoint(id: number | string, dto: Partial<Point>): Promise<Point> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id,
      ...dto,
    } as Point;
  }
};
