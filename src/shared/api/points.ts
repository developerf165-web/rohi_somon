import type { Point } from '@/entities/Point/model/types';
import PointsImg from '@/assets/точки.png';

// In-memory storage to persist changes during a session
let MOCK_POINTS: Point[] = [
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
    image: PointsImg,
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

export const pointsApi = {
  /**
   * Fetch all points
   * Currently simulated with mock data
   */
  async fetchPoints(): Promise<Point[]> {
    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...MOCK_POINTS];
  },

  async createPoint(dto: any): Promise<Point> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPoint = {
      id: Math.random().toString(36).slice(2, 9),
      title: dto.title,
      address: dto.address,
      lat: dto.lat,
      lng: dto.lng,
      comment: dto.comment,
      images: dto.images || [],
      // For list view fallback
      image: dto.images && dto.images.length > 0 ? dto.images[0] : undefined
    };
    MOCK_POINTS.push(newPoint);
    return newPoint;
  },

  async updatePoint(id: number | string, dto: Partial<Point>): Promise<Point> {
    console.log(`[pointsApi] Updating point ${id}:`, dto);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = MOCK_POINTS.findIndex(p => p.id == id);
    if (index !== -1) {
      const point = MOCK_POINTS[index];
      if (point) {
        // Deep clone DTO to break any Proxy links from the form
        const cleanDto = JSON.parse(JSON.stringify(dto));
        
        // If images are provided in the update, sync the thumbnail correctly
        const updatedImages = cleanDto.images !== undefined ? cleanDto.images : point.images;
        const updatedImage = cleanDto.images !== undefined 
          ? (cleanDto.images.length > 0 ? cleanDto.images[0] : null) 
          : point.image;

        MOCK_POINTS[index] = { 
          ...point, 
          ...cleanDto,
          images: updatedImages,
          image: updatedImage
        } as Point;
        
        console.log(`[pointsApi] Point ${id} updated in mock DB:`, MOCK_POINTS[index]);
        return { ...MOCK_POINTS[index] } as Point;
      }
    }
    return { id, ...dto } as Point;
  }
};
