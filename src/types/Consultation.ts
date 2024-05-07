import { Doctor } from './Doctor';
import { Product } from './Product';
import { Gender, User } from './User';

export type Consultation = {
  id: number;
  user: User;
  doctor: Doctor;
  patient_gender?: Gender;
  patient_name?: string;
  patient_birth_date?: string;
  certificate_url?: string;
  prescription_url?: string;
  prescription_items: PrescriptionItems[];
  ended_at?: string;
};

export type PrescriptionItems = {
  id: number;
  product: Product;
  quantity: number;
};
