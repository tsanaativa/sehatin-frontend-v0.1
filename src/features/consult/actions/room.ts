'use server';

import { post } from '@/utils/api';

export default async function createRoom(req: any) {
  try {
    await post(`/users/consultations/rooms`, req);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
