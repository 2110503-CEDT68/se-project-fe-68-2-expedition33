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
}

export interface CompanyResponse {
    success: boolean;
    count: number;
    pagination: PaginationMeta;
    data: CompanyItem[];
}

export interface CompanyDetailResponse {
    success: boolean;
    data: CompanyItem;
}

export type CompanyDetailApiResponse = CompanyItem | CompanyDetailResponse;

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

export interface CompanyCreatePayload extends CompanyBasePayload {
    managerTel: string;
    password: string;
}

export type CompanyUpdatePayload = Partial<CompanyBasePayload>;

export interface CompanyUploadFields {
    logo?: File | null;
    photoList?: File[];
}

export type CompanyCreateFormState = CompanyCreatePayload & CompanyUploadFields;
export type CompanyUpdateFormState = CompanyUpdatePayload & CompanyUploadFields;

// Backward-compatible alias for existing form-only usages.
export type CompanyPayload = CompanyBasePayload;

export interface CreateCompanyResponse {
    success: boolean;
    data: CompanyItem;
    managerEmail: string;
}

export interface UpdateCompanyResponse {
    success: boolean;
    data: CompanyItem;
}

// ==========================================
//                  BOOKINGS
// ==========================================

export interface BookingUserSummary {
    id?: string;
    name?: string;
    email?: string;
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