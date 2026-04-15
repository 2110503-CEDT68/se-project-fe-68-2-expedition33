import {
  BookingItem,
  BookingResponse,
  CompanyItem,
  CompanyResponse,
  PaginationMeta,
  UserItem,
  UserResponse,
} from "../../interfaces";

const emptyPagination: PaginationMeta = {};

const companies: CompanyItem[] = [
  {
    id: "company-1",
    name: "NoCortisol Labs",
    address: "99 Rama I Road",
    district: "Pathum Wan",
    province: "Bangkok",
    postalcode: "10330",
    tel: "02-123-4567",
    website: "https://nocortisol.example.com",
    description: "Product engineering studio focused on frontend systems and UX delivery.",
    managerAccount: "manager-1",
    createdAt: "2026-01-05T09:00:00.000Z",
    logo: {
      url: "/images/69c2565b8b200cbee11d2aac.png",
      public_id: "null",
    },
    photoList: [
      {
        url: "/images/69c2565b8b200cbee11d2aac_pic0.png",
        public_id: null,
      },
      {
        url: "/images/69c2565b8b200cbee11d2aac_pic1.png",
        public_id: null,
      },
      {
        url: "/images/69c2565b8b200cbee11d2aac_pic2.png",
        public_id: null,
      },
    ],
  },
  {
    id: "company-2",
    name: "NextGen",
    address: "18 Sukhumvit 21",
    district: "Watthana",
    province: "Bangkok",
    postalcode: "10110",
    tel: "02-234-5678",
    website: "https://NextGen.example.com",
    description: "Consulting team building scalable digital products for enterprise clients.",
    managerAccount: "manager-2",
    createdAt: "2026-01-12T10:30:00.000Z",
    logo: {
      url: "/images/69c17fa4e917a6764a11fb03.png",
      public_id: null,
    },
    photoList: [
      {
        url: "/images/69c17fa4e917a6764a11fb03_pic0.png",
        public_id: null,
      },
      {
        url: "/images/69c17fa4e917a6764a11fb03_pic1.png",
        public_id: null,
      },
      {
        url: "/images/69c17fa4e917a6764a11fb03_pic2.png",
        public_id: null,
      },
    ]
  },
  {
    id: "company-3",
    name: "Skyline",
    address: "55 Huai Khwang Center",
    district: "Huai Khwang",
    province: "Bangkok",
    postalcode: "10310",
    tel: "02-345-6789",
    website: "https://Skyline.example.com",
    description: "Specialized frontend platform company delivering component systems and design tooling.",
    managerAccount: "manager-3",
    createdAt: "2026-02-01T08:15:00.000Z",
    logo: {
      url: "/images/69c17f98e917a6764a11fafd.png",
      public_id: null,
    },
    photoList: [
      {
        url: "/images/69c17f98e917a6764a11fafd_pic0.png",
        public_id: null,
      },
      {
        url: "/images/69c17f98e917a6764a11fafd_pic1.png",
        public_id: null,
      },
      {
        url: "/images/69c17f98e917a6764a11fafd_pic2.png",
        public_id: null,
      },
    ],
  },
];

const usersByToken: Record<string, UserItem> = {
  "mock-admin-token": {
    id: "user-admin-1",
    name: "Narongdech Admin",
    email: "narongdech@example.com",
    tel: "0811111111",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  "mock-user-token": {
    id: "user-1",
    name: "Somchai User",
    email: "somchai@example.com",
    tel: "0822222222",
    role: "user",
    createdAt: "2026-01-02T00:00:00.000Z",
  },
  "mock-company-token": {
    id: "user-company-1",
    name: "Manager One",
    email: "manager1@example.com",
    tel: "0833333333",
    role: "company",
    createdAt: "2026-01-03T00:00:00.000Z",
  },
};

const defaultMockToken = "mock-user-token";

const bookings: BookingItem[] = [
  {
    id: "booking-1",
    bookingDate: "2022-05-10",
    user: {
      id: usersByToken["mock-user-token"].id,
      name: usersByToken["mock-user-token"].name,
      email: usersByToken["mock-user-token"].email,
    },
    company: {
      id: companies[0].id,
      name: companies[0].name,
      address: companies[0].address,
      district: companies[0].district,
      province: companies[0].province,
      postalcode: companies[0].postalcode,
      tel: companies[0].tel,
      website: companies[0].website,
      description: companies[0].description,
      logo: companies[0].logo ?? null,
      photoList: companies[0].photoList ?? [],
    },
    createdAt: "2026-03-01T08:00:00.000Z",
  },
  {
    id: "booking-2",
    bookingDate: "2022-05-11",
    user: {
      id: usersByToken["mock-admin-token"].id,
      name: usersByToken["mock-admin-token"].name,
      email: usersByToken["mock-admin-token"].email,
    },
    company: {
      id: companies[1].id,
      name: companies[1].name,
      address: companies[1].address,
      district: companies[1].district,
      province: companies[1].province,
      postalcode: companies[1].postalcode,
      tel: companies[1].tel,
      website: companies[1].website,
      description: companies[1].description,
      logo: companies[1].logo ?? null,
      photoList: companies[1].photoList ?? [],
    },
    createdAt: "2026-03-02T09:30:00.000Z",
  },
];

function cloneCompany(company: CompanyItem): CompanyItem {
  return {
    ...company,
    logo: company.logo ? { ...company.logo } : company.logo ?? null,
    photoList: company.photoList?.map((photo) => ({ ...photo })),
  };
}

function cloneBooking(booking: BookingItem): BookingItem {
  return {
    ...booking,
    user: { ...booking.user },
    company: {
      ...booking.company,
      logo: booking.company.logo ? { ...booking.company.logo } : booking.company.logo ?? null,
      photoList: booking.company.photoList?.map((photo) => ({ ...photo })),
    },
  };
}

function cloneUser(user: UserItem): UserItem {
  return { ...user };
}

function resolveUserFromToken(token: string): UserItem {
  const normalizedToken = token.trim();
  if (normalizedToken && usersByToken[normalizedToken]) {
    return cloneUser(usersByToken[normalizedToken]);
  }
  return cloneUser(usersByToken[defaultMockToken]);
}

function getCompaniesResponse(): CompanyResponse {
  const data = companies.map(cloneCompany);
  return {
    success: true,
    count: data.length,
    pagination: emptyPagination,
    data,
  };
}

function getCompanyById(id: string): CompanyItem {
  const company = companies.find((item) => item.id === id);
  if (!company) {
    throw new Error("Failed to fetch company");
  }
  return cloneCompany(company);
}

function getBookingsResponse(): BookingResponse {
  const data = bookings.map(cloneBooking);
  return {
    success: true,
    count: data.length,
    pagination: emptyPagination,
    data,
  };
}

function getUserProfileResponse(token: string): UserResponse {
  return {
    success: true,
    data: resolveUserFromToken(token),
  };
}

function createBookingInStore(
  companyId: string,
  token: string,
  bookingDate: string
): { success: boolean; data: BookingItem } {
  const company = companies.find((item) => item.id === companyId);
  if (!company) {
    throw new Error("Failed to create booking");
  }

  const user = resolveUserFromToken(token);
  const nextBooking: BookingItem = {
    id: `booking-${bookings.length + 1}`,
    bookingDate,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    company: {
      id: company.id,
      name: company.name,
      address: company.address,
      district: company.district,
      province: company.province,
      postalcode: company.postalcode,
      tel: company.tel,
      website: company.website,
      description: company.description,
      logo: company.logo ?? null,
      photoList: company.photoList ?? [],
    },
    createdAt: new Date().toISOString(),
  };

  bookings.push(nextBooking);

  return {
    success: true,
    data: cloneBooking(nextBooking),
  };
}

function getBooking(id: string): BookingItem {
  const booking = bookings.find((item) => item.id === id);
  if (!booking) {
    throw new Error("Failed to fetch booking");
  }
  return cloneBooking(booking);
}

export {
  bookings,
  companies,
  createBookingInStore,
  getBooking,
  getBookingsResponse,
  getCompaniesResponse,
  getCompanyById,
  getUserProfileResponse,
  resolveUserFromToken,
  usersByToken,
};