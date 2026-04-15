"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { UserItem , CompanyCreatePayload } from "../../interfaces";
import createCompany from "@/libs/createCompany";

type CompanyTextFieldName =
  | "name"
  | "description"
  | "website"
  | "tel"
  | "address"
  | "district"
  | "province"
  | "postalcode"
  | "managerTel"
  | "password"
  | "confirmPassword";

interface AdminCreateCompanyForm extends CompanyCreatePayload {
  confirmPassword: string;
}

const initialForm: AdminCreateCompanyForm = {
  name: "",
  address: "",
  district: "",
  province: "",
  postalcode: "",
  tel: "",
  website: "",
  description: "",
  managerTel: "",
  password: "",
  confirmPassword: "",
};

export default function AdminProfile({ user }: Readonly<{ user: UserItem }>) {
  const { data: session } = useSession();
  const [form, setForm] = useState<AdminCreateCompanyForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<string>("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);  
  const [createdName, setCreatedName] = useState("");
  const [createdManagerEmail, setCreatedManagerEmail] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoListInputRef = useRef<HTMLInputElement>(null);


  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const provinceRef = useRef<HTMLInputElement>(null);
  const postalcodeRef = useRef<HTMLInputElement>(null);
  const managerTelRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const refMap: Record<CompanyTextFieldName, React.RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    description: descriptionRef,
    website: websiteRef,
    tel: telRef,
    address: addressRef,
    district: districtRef,
    province: provinceRef,
    postalcode: postalcodeRef,
    managerTel: managerTelRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
  };

  const validateForm = (): boolean => {
    const telRegex = /^0\d{8,9}$/;
    const websiteRegex = /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
    const postalcodeRegex = /^\d{5}$/;

    const validations = [
      {
        condition: form.name.trim().length === 0,
        message: "Please add a company name.",
        field: "name",
        ref: nameRef,
      },
      {
        condition: form.name.trim().length > 50,
        message: "Company name cannot be more than 50 characters.",
        field: "name",
        ref: nameRef,
      },
      {
        condition: form.description.trim().length === 0,
        message: "Please add a description.",
        field: "description",
        ref: descriptionRef,
      },
      {
        condition: !websiteRegex.test(form.website),
        message: "Please add a valid website URL.",
        field: "website",
        ref: websiteRef,
      },
      {
        condition: !telRegex.test(form.tel.replaceAll(/[-\s]/g, "")),
        message: "Please add a valid telephone number.",
        field: "tel",
        ref: telRef,
      },
      {
        condition: form.address.trim().length === 0,
        message: "Please add an address.",
        field: "address",
        ref: addressRef,
      },
      {
        condition: form.district.trim().length === 0,
        message: "Please add a district.",
        field: "district",
        ref: districtRef,
      },
      {
        condition: form.province.trim().length === 0,
        message: "Please add a province.",
        field: "province",
        ref: provinceRef,
      },
      {
        condition: !postalcodeRegex.test(form.postalcode),
        message: "Postal code must be exactly 5 digits.",
        field: "postalcode",
        ref: postalcodeRef,
      },
      {
        condition: !form.managerTel || !telRegex.test(form.managerTel.replaceAll(/[-\s]/g, "")),
        message: "Please add a valid manager telephone number.",
        field: "managerTel",
        ref: managerTelRef,
      },
      {
        condition: !form.password || form.password.trim().length === 0,
        message: "Please add a manager password.",
        field: "password",
        ref: passwordRef,
      },
      {
        condition: form.password !== form.confirmPassword,
        message: "Passwords do not match.",
        field: "confirmPassword",
        ref: confirmPasswordRef,
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        setError(validation.message);
        setErrorField(validation.field);
        validation.ref.current?.focus();
        return false;
      }
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) {
      setError("");
      setErrorField("");
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setErrorField("");
    setSuccess("");
    setCreatedName(form.name);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("website", form.website);
      formData.append("tel", form.tel);
      formData.append("address", form.address);
      formData.append("district", form.district);
      formData.append("province", form.province);
      formData.append("postalcode", form.postalcode);
      formData.append("managerTel", form.managerTel);
      formData.append("password", form.password);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      for (const photo of photoFiles) {
        formData.append("photoList", photo);
      }

      const createdCompany = await createCompany(session.user.token, formData);
      setForm(initialForm);
      setLogoFile(null);
      setPhotoFiles([]);
      if (logoInputRef.current) logoInputRef.current.value = "";
      if (photoListInputRef.current) photoListInputRef.current.value = "";

      setCreatedName(createdCompany.data.name);
      setCreatedManagerEmail(createdCompany.managerEmail ?? "");
      setSuccess(`Company ${createdCompany.data.name} created successfully.`);
      setShowModal(true);
    } catch (err: any) {
      const errorMessage = err?.message ?? "Failed to create company";
      setError(errorMessage);
      if (errorMessage.toLowerCase().includes("name")) {
        setErrorField("name");
        nameRef.current?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const fields: { label: string; name: CompanyTextFieldName; type: string; placeholder: string }[] = [
    { label: "Name",             name: "name",        type: "text", placeholder: "e.g. ABC Company" },
    { label: "Description",      name: "description", type: "text", placeholder: "e.g. Leading tech company in Thailand" },
    { label: "Website",          name: "website",     type: "text", placeholder: "e.g. https://abc.com" },
    { label: "Telephone number", name: "tel",         type: "tel",  placeholder: "e.g. 02-123-4567" },
    { label: "Address",          name: "address",     type: "text", placeholder: "e.g. 123 Sukhumvit Rd." },
    { label: "District",         name: "district",    type: "text", placeholder: "e.g. Khlong Toei" },
    { label: "Province",         name: "province",    type: "text", placeholder: "e.g. Bangkok" },
    { label: "Postal Code",      name: "postalcode",  type: "text", placeholder: "e.g. 10110" },
    
  ];

  const fieldsAccount: { label: string; name: CompanyTextFieldName; type: string; placeholder: string }[] = [
    { label: "Manager Tel",      name: "managerTel",  type: "tel",  placeholder: "e.g. 0812345678" },
    { label: "Manager Password", name: "password",    type: "password", placeholder: "Enter manager password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Enter Confirm password" },
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
        <div className="mt-auto relative w-62.5 md:w-100 h-62.5 md:h-87.5 opacity-90 pointer-events-none">
          <Image src="/images/people-stance.svg" alt="Admin illustration" fill className="object-contain object-bottom" priority />
        </div>
      </div>

      {/* ── Right: Create Company ── */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase mb-10 drop-shadow-sm">
          Company Details        
        </h1>
      
        <form
          onSubmit={handleSubmit}
          className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm flex flex-col gap-5"
        >
          <p className="text-primary font-bold text-center tracking-widest text-base md:text-lg mt-2">
            Company Account
          </p>

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
                value={form[field.name] ?? ""}
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

          <p className="text-primary font-bold text-center tracking-widest text-base md:text-lg mt-2">
            Company Account
          </p>

          {fieldsAccount.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-foreground font-bold text-sm md:text-base tracking-widest">
                {field.label}
              </label>
              <input
                ref={refMap[field.name] as React.RefObject<HTMLInputElement>}
                type={field.type}
                name={field.name}
                required
                value={form[field.name] ?? ""}
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


          {/* Upload Logo */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <span className="text-foreground font-bold text-sm md:text-base tracking-widest">Upload Logo</span>
            <button
              type="button"
              className="w-10 h-10 border border-primary rounded-lg flex items-center justify-center text-primary cursor-pointer hover:bg-primary-light transition-colors"
              onClick={() => logoInputRef.current?.click()}
              aria-label="Upload logo"
              title="Click to upload company logo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              title="Upload company logo"
              aria-label="Upload company logo"
            />
            <p className="text-xs text-foreground/70 text-center">
              {logoFile ? `Selected logo: ${logoFile.name}` : "No logo selected"}
            </p>
          </div>

          {/* Upload Photo List */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <span className="text-foreground font-bold text-sm md:text-base tracking-widest">Upload Photos</span>
            <input
              ref={photoListInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPhotoFiles(Array.from(e.target.files ?? []))}
              className="block w-full text-xs text-foreground file:mr-2 file:rounded file:border file:border-primary file:px-2 file:py-1 file:text-primary"
              title="Upload company photos"
              aria-label="Upload company photos"
            />
            <p className="text-xs text-foreground/70 text-center">
              {photoFiles.length > 0
                ? `${photoFiles.length} photo(s) selected`
                : "No photos selected"}
            </p>
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

      {/* ── Modal Popup ── */}  
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center gap-4 max-w-sm w-full mx-4 text-center">
            <h2 className="text-3xl font-extrabold text-primary">Account Created!</h2>
            <p className="text-gray-500 text-sm tracking-wide">This company has been created</p>
            <p className="text-base font-semibold">
              <span className="text-primary font-bold">Company : </span>
              <span className="text-gray-700">{createdName}</span>
            </p>
            {createdManagerEmail && (
              <p className="text-sm text-foreground/80">
                Manager email: <span className="font-semibold">{createdManagerEmail}</span>
              </p>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 bg-primary hover:opacity-90 text-white font-bold tracking-widest uppercase px-10 py-3 rounded-full transition-opacity"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}