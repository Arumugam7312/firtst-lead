export interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  duration: string;
  image?: string;
}

export interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string;
  service_id: number;
  service_name?: string;
  date: string;
  time: string;
  stylist: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'rejected';
  created_at: string;
}
