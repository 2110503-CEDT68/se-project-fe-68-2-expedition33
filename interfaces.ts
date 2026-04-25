// ==========================================
//                  GLOBALS
// ==========================================
export interface PaginationMeta {
    next?: {
        page: number;
        limit: number;
    };
    prev?: {
        page: number;
        limit: number;
    };
}

export interface SimpleResponse<T> {
    success: boolean;
    data: T;
}

// ==========================================
//           USER & AUTHENTICATION
// ==========================================
export interface UserItem {
    id: string;
    name: string;
    email: string;
    tel: string;
    role: "user" | "admin" | "company";
    createdAt: string;

    companyData?: CompanyItem | null;
}

export interface UserResponse {
    success: boolean;
    data: UserItem;
}

export interface UserResponseWithCompanyData extends UserResponse {
    companyData: CompanyItem | null;
}

export type GetMeResponse = UserResponse | UserResponseWithCompanyData;

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

export interface CloudinaryAsset {
    url: string | null;
    public_id: string | null;
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
    managerAccount?: string;
    createdAt?: string;
    logo?: CloudinaryAsset | null;
    photoList?: CloudinaryAsset[];
    bookings: BookingItem[];
    payments: PaymentItem[];
}

export interface CompanyResponse {
    success: boolean;
    count: number;
    pagination: PaginationMeta;
    data: CompanyItem[];
}

export type CompanyDetailResponse = SimpleResponse<CompanyItem>;

export interface CompanyBasePayload {
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    website: string;
    description: string;
}

export interface ManagerPayload {
    managerTel: string;
    password: string;
}

export interface CompanyUploadFields {
    logo?: File | null;
    photoList?: File[];
}

export type CompanyCreatePayload = CompanyBasePayload & ManagerPayload & CompanyUploadFields;
export type CompanyUpdatePayload = Partial<CompanyBasePayload> & CompanyUploadFields;

export interface CreateCompanyResponse extends SimpleResponse<CompanyItem> {
    managerEmail: string;
}

export type UpdateCompanyResponse = SimpleResponse<CompanyItem>;

// ==========================================
//                  BOOKINGS
// ==========================================

export interface BookingUserSummary {
    id?: string;
    name?: string;
    email?: string;
}

export interface BookingPaymentSummary {
    status: string;
    dateList: string[];
}

export interface BookingCompanySummary {
    id?: string;
    name?: string;
    address?: string;
    district?: string;
    province?: string;
    postalcode?: string;
    tel?: string;
    website?: string;
    description?: string;
    logo?: CloudinaryAsset | null;
    photoList?: CloudinaryAsset[];
    payments?: BookingPaymentSummary[];
}

export interface BookingItem {
    id: string;
    bookingDate: string;
    user: BookingUserSummary;
    company: BookingCompanySummary;
    createdAt: string;
}

export interface BookingResponse {
    success: boolean;
    count: number;
    pagination?: PaginationMeta;
    data: BookingItem[];
}

export type BookingDetailResponse = SimpleResponse<BookingItem>;
export type CreateBookingResponse = SimpleResponse<BookingItem>;

// ==========================================
//                  PAYMENTS
// ==========================================

export interface PaymentItem {
    id: string;
    company: CompanyItem;
    totalPrice: number;
    status: "initiated" | "authorized" | "captured" | "cancelled" | "failed";
    dateList: string[];
    events: PaymentEvent[];
    createdAt: string;
    updatedAt: string;
}

export interface PaymentResponse {
    success: boolean;
    count: number;
    pagination?: PaginationMeta;
    data: PaymentItem[];
}

export type PaymentDetailResponse = SimpleResponse<PaymentItem>;
export type CreatePaymentResponse = SimpleResponse<PaymentItem>;

export interface PaymentEvent {
    id: string;
    eventType: "PAYMENT_INITIATED" | "PAYMENT_AUTHORIZED" | "PAYMENT_SUCCESS" | "PAYMENT_CANCELLED" | "PAYMENT_FAILED";
    createdAt: string;
    payload: {
        oldStatus?: string | null;
        newStatus?: string;
        transactionId?: string | null;
        errorMessage?: string | null;
    };
}