export type Specialist = {
  id: number;
  name: string;
};

export type Doctor = {
  id: number;
  name: string;
  email: string;
  specialist: Specialist;
  is_online: boolean;
  work_start_year: number;
  fee: number;
  photo_url: string;
};

export type DoctorsParams = {
  keyword: string;
  page: number;
  limit: number;
  specialistId: string;
  sortBy: '' | 'fee' | 'experience';
  sort: 'asc' | 'desc';
};
