import { defineStore } from 'pinia';
import { pointsApi } from '@/shared/api/points';
import type { Point, PointState } from './types';

export const usePointStore = defineStore('point', {
  state: (): PointState => ({
    points: [],
    isLoading: false,
    error: null,
    createForm: {
      title: '',
      address: '',
      lat: '',
      lng: '',
      comment: '',
      images: [],
    }
  }),

  actions: {
    async fetchPoints() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await pointsApi.fetchPoints();
        this.points = data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch points';
      } finally {
        this.isLoading = false;
      }
    },

    async createPoint(pointData: any) {
      this.isLoading = true;
      try {
        const newPoint = await pointsApi.createPoint(pointData);
        this.points.push(newPoint);
        return true;
      } catch (err: any) {
        this.error = err.message || 'Failed to create point';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updatePointById(id: number | string, pointData: Partial<Point>) {
      this.isLoading = true;
      try {
        const updatedPoint = await pointsApi.updatePoint(id, pointData);
        const index = this.points.findIndex(p => p.id == id);
        if (index !== -1) {
          this.points[index] = { ...this.points[index], ...updatedPoint };
        }
        return true;
      } catch (err: any) {
        this.error = err.message || 'Failed to update point';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    resetForm() {
      this.createForm = {
        title: '',
        address: '',
        lat: '',
        lng: '',
        comment: '',
        images: [],
      };
    },

    addPoint(point: Point) {
      this.points.push(point);
    },

    removePoint(id: number | string) {
      this.points = this.points.filter(p => p.id !== id);
    },

    updatePoint(updatedPoint: Point) {
      const index = this.points.findIndex(p => p.id === updatedPoint.id);
      if (index !== -1) {
        this.points[index] = updatedPoint;
      }
    },

    // Standardized aliases for useEntityForm compatibility
    async createItem(payload: any) {
      return this.createPoint(payload);
    },
    async updateItem(id: string | number, payload: any) {
      return this.updatePointById(id, payload);
    },
    async fetchItems() {
      return this.fetchPoints();
    }
  },
});
