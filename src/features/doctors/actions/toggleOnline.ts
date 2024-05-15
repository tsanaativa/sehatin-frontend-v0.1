'use server';

import { getSession } from '@/services/session';
import { post } from '@/utils/api';

export default async function toggleOnline() {
  try {
    const session = await getSession();
    await post(
      `/doctors/toggle-is-online`,
      {},
      {
        Authorization: `Bearer ${session.access_token}`,
      }
    );

    if (session.user) {
      session.user.is_online = !session.user.is_online;
    }

    await session.save();
  } catch (error) {
    throw error;
  }
}
