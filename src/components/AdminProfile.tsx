"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { UserItem } from "../../interfaces";
import createCompany from "@/libs/createCompany";
import { CompanyPayload } from "../../interfaces";

interface Props {
  user: UserItem;
}

const initialForm: CompanyPayload = {
  name: "",
  address: "",
  district: "",
  province: "",
  postalcode: "",
  tel: "",
  website: "",
  description: "",
};

export default function AdminProfile({ user }: Props) {
  const { data: session } = useSession();
  const [form, setForm] = useState<CompanyPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<string>("");
  const [success, setSuccess] = useState("");

  // Refs for moving user focus automatically
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const provinceRef = useRef<HTMLInputElement>(null);
  const postalcodeRef = useRef<HTMLInputElement>(null);

  const refMap: Record<string, React.RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    description: descriptionRef,
    website: websiteRef,
    tel: telRef,
    address: addressRef,
    district: districtRef,
    province: provinceRef,
    postalcode: postalcodeRef,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors the moment they start typing to fix it
    if (error) {
      setError("");
      setErrorField("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    // 1. Name Validation
    if (form.name.trim().length === 0) {
      setError("Please add a company name.");
      setErrorField("name");
      nameRef.current?.focus();
      return;
    }
    if (form.name.trim().length > 50) {
      setError("Company name cannot be more than 50 characters.");
      setErrorField("name");
      nameRef.current?.focus();
      return;
    }

    // 2. Description Validation
    if (form.description.trim().length === 0) {
      setError("Please add a description.");
      setErrorField("description");
      descriptionRef.current?.focus();
      return;
    }

    // 3. Website Validation
    const websiteRegex = /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if (!websiteRegex.test(form.website)) {
      setError("Please add a valid website URL.");
      setErrorField("website");
      websiteRef.current?.focus();
      return;
    }

    // 4. Telephone Validation
    const telRegex = /^0\d{8,9}$/;
    if (!telRegex.test(form.tel.replace(/[-\s]/g, ""))) {
      setError("Please add a valid telephone number.");
      setErrorField("tel");
      telRef.current?.focus();
      return;
    }

    // 5. Address Validation
    if (form.address.trim().length === 0) {
      setError("Please add an address.");
      setErrorField("address");
      addressRef.current?.focus();
      return;
    }

    // 6. District Validation
    if (form.district.trim().length === 0) {
      setError("Please add a district.");
      setErrorField("district");
      districtRef.current?.focus();
      return;
    }

    // 7. Province Validation
    if (form.province.trim().length === 0) {
      setError("Please add a province.");
      setErrorField("province");
      provinceRef.current?.focus();
      return;
    }

    // 8. Postal Code Validation (must be exactly 5 digits)
    const postalcodeRegex = /^\d{5}$/;
    if (!postalcodeRegex.test(form.postalcode)) {
      setError("Postal code must be exactly 5 digits.");
      setErrorField("postalcode");
      postalcodeRef.current?.focus();
      return;
    }

    setLoading(true);
    setError("");
    setErrorField("");
    setSuccess("");

    try {
      await createCompany(session.user.token, form);
      setSuccess("Company created successfully!");
      setForm(initialForm);
    } catch (err: any) {
      const errorMessage = err?.message ?? "Failed to create company";
      setError(errorMessage);
      // Focus name field on generic backend errors
      if (errorMessage.toLowerCase().includes("name")) {
        setErrorField("name");
        nameRef.current?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const fields: { label: string; name: keyof CompanyPayload; type: string; placeholder: string }[] = [
    { label: "Name", name: "name", type: "text", placeholder: "e.g. ABC Company" },
    { label: "Description", name: "description", type: "text", placeholder: "e.g. Leading tech company in Thailand" },
    { label: "Website", name: "website", type: "text", placeholder: "e.g. https://abc.com" },
    { label: "Telephone number", name: "tel", type: "tel", placeholder: "e.g. 02-123-4567" },
    { label: "Address", name: "address", type: "text", placeholder: "e.g. 123 Sukhumvit Rd." },
    { label: "District", name: "district", type: "text", placeholder: "e.g. Khlong Toei" },
    { label: "Province", name: "province", type: "text", placeholder: "e.g. Bangkok" },
    { label: "Postal Code", name: "postalcode", type: "text", placeholder: "e.g. 10110" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">

      {/* ── Left: Admin Profile ── */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase mb-10 drop-shadow-sm">
          Admin Profile
        </h1>

        <div className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-[80px_20px_1fr] md:grid-cols-[100px_30px_1fr] gap-y-6 md:gap-y-8 items-center text-lg md:text-xl font-bold">

            <span className="text-primary tracking-widest text-right">Role</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide capitalize">{user.role}</span>

            <span className="text-primary tracking-widest text-right">Name</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide">{user.name}</span>

            <span className="text-primary tracking-widest text-right">Email</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide break-all">{user.email}</span>

            <span className="text-primary tracking-widest text-right">Tel</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide">{user.tel}</span>

          </div>
        </div>

        {/* Illustration */}
        <div className="mt-auto relative w-62.5 md:w-100 h-62.5 md:h-87.5 opacity-90 pointer-events-none">
          <Image
            src="/images/people-stance.svg"
            alt="Admin illustration"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* ── Right: Create Company ── */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase mb-10 drop-shadow-sm">
          Create Company
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm flex flex-col gap-5"
        >
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-foreground font-bold text-sm md:text-base tracking-widest">
                {field.label}
              </label>
              <input
                ref={refMap[field.name] as React.RefObject<HTMLInputElement>}
                type={field.type}
                name={field.name}
                required
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
                  errorField === field.name
                    ? "border-red-500 focus:ring-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                    : "border-primary focus:ring-primary"
                }`}
              />
            </div>
          ))}

          {/* Upload Logo — UI only for now */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <span className="text-foreground font-bold text-sm md:text-base tracking-widest">
              Upload Logo
            </span>
            <div className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center text-primary cursor-pointer hover:bg-primary-light transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold tracking-widest uppercase text-sm py-3 rounded-lg transition-colors mt-2"
          >
            {loading ? "Creating..." : "CREATE"}
          </button>

        </form>
      </div>

    </div>
  );
}