import { Address } from '@/types/Address';
import { Category } from '@/types/Product';
import { Doctor } from '@/types/Doctor';
import { Product } from '@/types/Product';
import { DISPLAYED_CATEGORIES } from './categories';
import { User } from '@/types/User';
import { Chat } from '@/types/Chat';

export const DUMMY_CATEGORIES: Category[] = DISPLAYED_CATEGORIES;

export const DUMMY_PRODUCT: Product = {
  id: 1,
  name: 'Panadol Extra 10 Kaplet 2 box bla',
  selling_unit: 'Box',
  price: '15990',
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
  profile_picture:
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

export const DUMMY_CART = [
  {
    products: [
      {
        id: 1,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing',
        slug: 'panadol-obat-pusingg-1',
        price: 15990,
        stock: 3,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
      {
        id: 2,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing Pusing Pusing Pusing',
        slug: 'panadol-obat-pusingg-2',
        price: 15990,
        stock: 5,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
      {
        id: 3,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing',
        slug: 'panadol-obat-pusingg-3',
        price: 15990,
        stock: 5,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
      {
        id: 4,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing',
        slug: 'panadol-obat-pusingg-4',
        price: 15990,
        stock: 5,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
    ],
    name: 'K-24 Mampang Prapatan',
    id: 1,
  },
  {
    products: [
      {
        id: 11,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing',
        slug: 'panadol-obat-pusingg-11',
        price: 15990,
        stock: 3,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
      {
        id: 12,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing',
        slug: 'panadol-obat-pusingg-12',
        price: 15990,
        stock: 5,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
    ],
    name: 'Century Mampang Prapatan',
    id: 2,
  },
  {
    products: [
      {
        id: 13,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing',
        slug: 'panadol-obat-pusingg-13',
        price: 15990,
        stock: 3,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
      {
        id: 14,
        picture:
          'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Panadol Obat Pusing',
        slug: 'panadol-obat-pusingg-14',
        price: 15990,
        stock: 5,
        inCart: 2,
        label: 'per BOTOL',
        is_available: true,
      },
    ],
    name: 'Century Mampang Prapatan',
    id: 3,
  },
];

export const USER_TABLE_DATA = [
  {
    id: 1,
    name: 'Riyyan',
    email: 'riyyan@gmail.com',
    birth_date: '2001-01-01',
    gender: 'Male',
    status: true,
  },
  {
    id: 2,
    name: 'Vivin',
    email: 'vivin@gmail.com',
    birth_date: '2001-01-01',
    gender: 'Female',
    status: false,
  },
];

export const DOCTOR_TABLE_DATA = [
  {
    id: 1,
    name: 'Zen',
    email: 'zen@gmail.com',
    specialist: 'Anak',
    consultation_fee: 'Rp150.000',
    year_of_experience: '10 years',
    status: false,
  },
  {
    id: 2,
    name: 'Fajar',
    email: 'fajar@gmail.com',
    specialist: 'Anak',
    consultation_fee: 'Rp150.000',
    year_of_experience: '10 years',
    status: true,
  },
];

export const MEDICINE_TABLE_DATA = [
  {
    id: 1,
    name: 'Panadol',
    generic_name: 'Paracetamol',
    category: 'Obat Sakit Kepala',
    classification: 'Obat Keras',
    selling_unit: 'Box',
    active_status: false,
  },
  {
    id: 2,
    name: 'Panadol',
    generic_name: 'Paracetamol',
    category: 'Obat Sakit Kepala',
    classification: 'Obat Keras',
    selling_unit: 'Strip',
    active_status: true,
  },
];

export const DUMMY_CATEGORY_FORM = {
  1: 'Vitamin C',
  2: 'Obat Sakit Kepala',
  3: 'Suplemen Daya Tahan',
  4: 'Obat Demam',
  5: 'Obat Batuk',
  6: 'Obat Sakit Tenggorokan',
  7: 'Vitamin Anak',
  8: 'Vitamin Ibu Hamil',
};

export const PHARMACY_TABLE_DATA = [
  {
    id: 1,
    name: 'Egi',
    address: 'Jl. Hutan No.1 Kuningan, Kunigan, Kunigan, Kuningan',
    pharmacist: 'Apotek Sebelah 7978364284 081231812212',
    operational: 'Mon to Fri, 10:00 - 20:00',
    available_shipping_methods: 'Official Next Day, JNE Next Day',
  },
  {
    id: 2,
    name: 'Vivin',
    address: 'Jl. Hutan No.1 Kuningan, Kunigan, Kunigan, Kuningan',
    pharmacist: 'Apotek Sebelah 7978364284 081231812212',
    operational: 'Mon to Fri, 10:00 - 20:00',
    available_shipping_methods: 'Official Next Day, JNE Next Day',
  },
];

export const PHARMACY_PRODUCT_TABLE_DATA = [
  {
    id: 1,
    name: 'Panadol',
    category: 'Obat Sakit Kepala',
    selling_unit: 'Box',
    price: 'Rp100.000',
    stock: '200',
  },
  {
    id: 2,
    name: 'Panadol',
    category: 'Obat Sakit Kepala',
    selling_unit: 'Box',
    price: 'Rp75.000',
    stock: '150',
  },
];

export const STOCK_MUTATION_TABLE_DATA = [
  {
    id: 1,
    product_name: 'Panadol',
    sender: 'Pharmacy B',
    reciever: 'Pharmacy A',
    quantity: '30',
    status: null,
  },
  {
    id: 2,
    product_name: 'Panadol',
    sender: 'Pharmacy A',
    reciever: 'Pharmacy B',
    quantity: '30',
    status: true,
  },
  {
    id: 3,
    product_name: 'Panadol',
    sender: 'Pharmacy C',
    reciever: 'Pharmacy A',
    quantity: '30',
    status: false,
  },
];
