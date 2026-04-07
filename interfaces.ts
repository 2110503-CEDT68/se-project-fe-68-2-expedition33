// ==========================================
//           USER & AUTHENTICATION
// ==========================================
export interface UserItem {
    id: string;
    name: string;
    email: string;
    tel: string;
    role: "user" | "admin";
    createdAt: string;
}

export interface UserResponse {
    success: boolean;
    data: UserItem;
}

export interface RegisterPayload {
    name: string;
    email: string;
    tel: string;
    password: string;
    role: "user" | "admin";
}

export interface AuthResponse {
    success: boolean;
    token: string;
}

// ==========================================
//           COMPANIES / PRODUCTS
// ==========================================
export interface CompanyItem {
    id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    website: string;
    description: string;
}

export interface CompanyResponse {
    success: boolean;
    count: number;
    pagination: Object;
    data: CompanyItem[];
}

export interface CompanyPayload {
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  website: string;
  description: string;
}

// ==========================================
//                  BOOKINGS
// ==========================================

export interface BookingItem {
    id: string;
    bookingDate: string;
    user: UserItem;
    company: CompanyItem;
    createdAt: string;
}

export interface BookingResponse {
    success: boolean;
    count: number;
    data: BookingItem[];
}