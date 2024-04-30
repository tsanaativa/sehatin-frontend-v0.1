import { Address } from '@/types/Address';
import { Category } from '@/types/Category';
import { Doctor, Specialist } from '@/types/Doctor';
import { Product } from '@/types/Product';
import { DISPLAYED_SPECIALISTS } from './specialists';
import { DISPLAYED_CATEGORIES } from './categories';
import { User } from '@/types/User';

export const DUMMY_CATEGORIES: Category[] = DISPLAYED_CATEGORIES;

export const DUMMY_PRODUCT: Product = {
  id: 1,
  name: 'Panadol Extra 10 Kaplet 2 box bla',
  selling_unit: 'Box',
  price: 15990,
  generic_name: 'Paracetamol',
  image:
    'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export const DUMMY_DOCTOR: Doctor = {
  id: 1,
  name: 'Dr. Doctro Pintar',
  email: 'doctor.pintar@gmail.com',
  is_online: true,
  specialist: {
    id: 1,
    name: 'Sp. THT',
  },
  work_start_year: 2012,
  fee: 50000,
  photo_url:
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export const DUMMY_ADDRESSES: Address[] = [
  {
    id: 1,
    is_main: false,
    is_active: true,
    address: 'Jl. Blablab No. 3',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Menteng',
    subdistrict: 'Gondangdia',
    postal_code: 12345,
    latitude: 0,
    longitude: 0,
  },
  {
    id: 2,
    is_main: true,
    is_active: false,
    address: 'Jl. Blablab No. 3',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Menteng',
    subdistrict: 'Gondangdia',
    postal_code: 12345,
    latitude: 0,
    longitude: 0,
  },
  {
    id: 3,
    is_main: false,
    is_active: false,
    address: 'Jl. ssss No. 3',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Menteng',
    subdistrict: 'Gondangdia',
    postal_code: 12345,
    latitude: 0,
    longitude: 0,
  },
];

export const DUMMY_USER: User = {
  name: 'Vivin',
  email: 'vivin@gmail.com',
  gender: 'male',
  birth_date: '2001-01-01',
};

export const DUMMY_CHOOSE_PHARMACIES = [
  {
    name: 'Century Plaza Senayan 1',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '10 km',
    shipping: 'Official Instant, Official Same Day',
    status: true,
  },
  {
    name: 'Century Plaza Senayan 2',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '12 km',
    shipping: 'Official Instant, Official Same Day',
    status: false,
  },
  {
    name: 'Century Plaza Senayan 3',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '18 km',
    shipping: 'Official Instant, Official Same Day',
    status: false,
  },
  {
    name: 'Century Plaza Senayan 4',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '22 km',
    shipping: 'Official Instant, Official Same Day',
    status: false,
  },
];

export const DUMMY_SPECIALISTS = {
  '1': 'Sp. Kandungan & Kebidanan',
  '2': 'Sp. Kulit & Kelamin',
  '3': 'Sp. THT',
  '4': 'Sp. Jiwa',
  '5': 'Sp. Penyakit Dalam',
  '6': 'Sp. Anak',
  '7': 'Sp. Mata',
  '8': 'Dokter Gigi',
  '9': 'Dokter Umum',
  '10': 'Psikolog Klinis',
  '11': 'Sp. Saraf',
  '12': 'Sp. Paru',
  '13': 'Sp. Urologi',
  '14': 'Sp. Orthopaedi & Traumatologi',
  '15': 'Sp. Jantung & Pembuluh Darah',
  '16': 'Sp. PD Gastroenterologi - Hepatologi',
  '17': 'Sp. Bedah Umum',
  '18': 'Sp. Gizi Klinik',
  '19': 'Sp. PD Endokrin - Metabolik - Diabetes',
  '20': 'Sp. Andrologi',
  '21': 'Sp. Konservasi Gigi',
  '22': 'Dokter Bedah',
  '23': 'Sp. PD Ginjal - Hipertensi',
  '24': 'Sp. Gigi Anak',
  '25': 'Sp. Bedah Onkologi',
  '26': 'Sp. PD Reumatologi',
  '27': 'Sp. PD Hematologi & Onkologi Medik',
  '28': 'Sp. Bedah Mulut & Maksilofasial',
  '29': 'Sp. Bedah Saraf',
  '30': 'Sp. Rehabilitasi Medik & Kedokteran Fisik',
  '31': 'Sp. Ortodonsia',
  '32': 'Sp. Periodonsia',
  '33': 'Sp. Kedokteran Olahraga',
  '34': 'Psikolog Klinis Anak & Remaja',
  '35': 'Sp. PD Kardiovaskular',
  '36': 'Sp. Bedah Digestif',
  '37': 'Akupuntur',
  '38': 'Sp. Bedah Plastik',
  '39': 'Sp. Bedah Toraks Kardiovaskular',
  '40': 'Sp. Bedah Anak',
  '41': 'Fisioterapis',
  '42': 'Sp. Prostodonsia',
  '43': 'Sp. Bedah Vaskuler & Endovaskuler',
  '44': 'Sp. Penyakit Mulut',
  '45': 'Sp. PD Alergi - Imunologi',
  '46': 'Sp. PD Tropik - Infeksi',
  '47': 'Konselor Laktasi',
  '48': 'Sp. Bedah Spine',
  '49': 'Psikolog Klinis Dewasa',
  '50': 'Sp. Mikrobiologi Klinik',
  '51': 'Psikologi Industri dan Organisasi',
  '52': 'Sp. Bedah Panggul & Lutut',
  '53': 'Dokter Kecantikan',
  '54': 'Sp. Radiologi',
  '55': 'Sp. Anestesiologi',
  '56': 'Sp. Okupasi',
  '57': 'Sp. Onkologi Radiasi',
  '58': 'Sp. Patologi Anatomi',
  '59': 'Sp. Patologi Klinik',
  '60': 'Bidan',
  '61': 'Apoteker',
  '62': 'Dokter Forensik',
  '63': 'Dokter Umum (DU)',
  '64': 'Hipnoterapis',
  '65': 'Sp. Anak (Onkologi)',
  '66': 'Sp. Farmakologi Klinik',
  '67': 'Sp. Intervensi dan Kegawatdaruratan Napas',
  '68': 'Sp. Jiwa (Anak dan Remaja)',
  '69': 'Sp. Kedokteran Nuklir',
  '70': 'Sp. Nutrisi pada Kelainan Metabolisme',
  '71': 'Dokter Gigi Spesialis Radiologi - Subspesialis Radiodiagnosis Imaging',
  '72': 'Insurance',
  '73': 'Sp. Anak (Alergi-Imunologi Anak)',
  '74': 'Ahli Gizi',
  '75': 'Dokter Emergensi Medik',
  '76': 'Dokter Gigi Kosmetik',
  '77': 'Dokter Gigi Sp. Radiologi',
  '78': 'Dokter Hewan',
  '79': 'Haloskin',
  '80': 'Ilmu Biomedik',
  '81': 'Konselor',
  '82': 'Konsultasi Medis',
  '83': 'Lainnya',
  '84': 'Psikolog Non Klinis',
  '85': 'Sp. Anak (Gastroenterologi-Hepatologi)',
  '86': 'Sp. Anak (Nefrologi)',
  '87': 'Sp. Anak (Neonatologi)',
  '88': 'Sp. Anak (Neurologi)',
  '89': 'Sp. Anak (Nutrisi & Penyakit Metabolik)',
  '90': 'Sp. Anak (Penyakit Tropik-Infeksi)',
  '91': 'Sp. Anak (Tumbuh Kembang)',
  '92': 'Sp. Fetomaternal',
  '93': 'Sp. Gizi Klink (Konsultan Endokrin Metabolik)',
  '94': 'Sp. Jantung (Kardiologi Intervensi)',
  '95': 'Sp. Kedokteran Kelautan',
  '96': 'Sp. Kedokteran Keluarga Layanan Primer',
  '97': 'Sp. Kedokteran Penerbangan',
  '98': 'Sp. Kulit & Kelamin (Alergi-Imunologi)',
  '99': 'Sp. PD Geriatri',
  '100': 'Sp. PD Psikosomatik',
  '101': 'Sp. Saraf (Neuro-onkologi)',
  '102': 'Sp. THT (Bronko-Esofagologi)',
  '103':
    'Spesialis Bedah Toraks Kardiak & Vaskular - Konsultan Vaskular EndoVaskular',
  '104': 'Spesialis Kedokteran Olahraga (Ahli Latihan dan Kompetisi)',
  '105': 'Spesialis Orthopedi Olahraga dan Artroskopi',
  '106': 'Spesialis Penyakit Dalam (Pulmonologi)',
  '107': 'Spesialis Saraf Konsultan Nyeri',
};
