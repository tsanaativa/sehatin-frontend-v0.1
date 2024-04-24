export type Specialist = {
  id: number;
  name: string;
};

export type Doctor = {
  id: number;
  name: string;
  specialist: Specialist;
  is_online: boolean;
  work_start_year: number;
  fee: number;
  photo_url: string;
};
