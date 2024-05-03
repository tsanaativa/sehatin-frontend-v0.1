'use server';

import api from '@/utils/api';

export default async function createRoom(req: any) {
  try {
    await api.post(`/ws/create-room`, req);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
