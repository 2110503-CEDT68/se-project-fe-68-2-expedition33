"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { CompanyCreatePayload } from "../../interfaces";
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

export default function CompanyCreateForm ({ token }: Readonly<{ token: string }>) {
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
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [photoError, setPhotoError] = useState("");

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

        const validations =[
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
        {
            condition: photoFiles.length > 3,
            message: "Maximum 3 photos allowed.",
            field: "photoList",
            ref: photoListInputRef,
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

        if (!token || !validateForm()) return;

        setLoading(true);
        setError("");
        setErrorField("");
        setSuccess("");
        setCreatedName(form.name);

        try {

        const payload: CompanyCreatePayload = {
            name: form.name,
            description: form.description,
            website: form.website,
            tel: form.tel,
            address: form.address,
            district: form.district,
            province: form.province,
            postalcode: form.postalcode,
            managerTel: form.managerTel,
            password: form.password,
            logo: logoFile,
            photoList: photoFiles,
        }

        const createdCompany = await createCompany(token, payload);

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

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setLogoFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setLogoPreview(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setLogoPreview(null);
        }
    };

    const fields: { label: string; name: CompanyTextFieldName; type: string; placeholder: string }[] =[
        { label: "Name", name: "name", type: "text", placeholder: "e.g. ABC Company" },
        { label: "Description", name: "description", type: "text", placeholder: "e.g. Leading tech company in Thailand" },
        { label: "Website", name: "website", type: "text", placeholder: "e.g. https://abc.com" },
        { label: "Telephone number", name: "tel", type: "tel", placeholder: "e.g. 02-123-4567" },
        { label: "Address", name: "address", type: "text", placeholder: "e.g. 123 Sukhumvit Rd." },
        { label: "District", name: "district", type: "text", placeholder: "e.g. Khlong Toei" },
        { label: "Province", name: "province", type: "text", placeholder: "e.g. Bangkok" },
        { label: "Postal Code", name: "postalcode", type: "text", placeholder: "e.g. 10110" },
    ];

    const fieldsAccount: { label: string; name: CompanyTextFieldName; type: string; placeholder: string }[] =[
        { label: "Manager Telephone Number", name: "managerTel", type: "tel", placeholder: "e.g. 0812345678" },
        { label: "Manager Password", name: "password", type: "password", placeholder: "Enter manager password" },
        { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Enter Confirm password" },
    ];

    return (
        <>
            <form
            onSubmit={handleSubmit}
            className="w-full bg-surface border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm flex flex-col gap-5"
            >
            <p className="text-primary font-bold text-center tracking-widest text-base md:text-lg mt-2">
                Company Details
            </p>

            {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                <label className="text-foreground font-bold text-sm md:text-base tracking-widest">
                    {field.label}
                </label>
                <input
                    ref={refMap[field.name]}
                    type={field.type}
                    name={field.name}
                    required
                    value={form[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
                    errorField === field.name
                        ? "border-button-red focus:ring-button-red/30 shadow-sm"
                        : "border-surface-border focus:border-primary focus:ring-primary/30"
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
                    ref={refMap[field.name]}
                    type={field.type}
                    name={field.name}
                    required
                    value={form[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
                    errorField === field.name
                        ? "border-button-red focus:ring-button-red/30 shadow-sm"
                        : "border-surface-border focus:border-primary focus:ring-primary/30"
                    }`}
                />
                </div>
            ))}

            {/* Upload Logo */}
            <div className="flex flex-col items-center gap-2 pt-1">
                <span className="text-foreground font-bold text-sm md:text-base tracking-widest">Upload Logo</span>
                <button
                type="button"
                className="w-full max-w-50 border-2 border-dashed border-primary/30 rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:bg-primary-light/20 transition-all group"
                onClick={() => logoInputRef.current?.click()}
                >
                    {logoPreview ? (
                        <Image
                        width={200}
                        height={200}
                        src={logoPreview}
                        alt="Logo preview"
                        className="rounded-xl max-h-32 w-full object-contain mb-2"
                        />
                    ) : (
                        <div className="h-20 flex items-center justify-center text-primary/40 italic text-sm">No image</div>
                    )}
                    <div className="flex items-center gap-2 text-primary font-bold text-xs  tracking-tighter">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Change Logo
                    </div>
                </button>
                <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                title="Upload company logo"
                aria-label="Upload company logo"
                onChange={handleLogoChange}
                />
                <p className="text-xs text-foreground/70 text-center">
                {logoFile ? `Selected logo: ${logoFile.name}` : "No logo selected"}
                </p>
            </div>

            {/* Upload Photo List */}
            <div className="flex flex-col items-center gap-2 pt-1">
                <span className="text-foreground font-bold text-sm md:text-base tracking-widest">Upload Gallery Photos</span>
                <input
                ref={photoListInputRef}
                type="file"
                accept="image/*"
                multiple 
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  if (files.length > 3) {
                    setPhotoError("Maximum 3 photos allowed.");
                    setPhotoFiles([]);
                    if (photoListInputRef.current) photoListInputRef.current.value = "";
                  } else {
                    setPhotoError("");
                    setPhotoFiles(files);
                  }
                }}
                className="block w-full text-xs text-foreground file:mr-2 file:rounded file:border file:border-primary file:px-2 file:py-1 file:text-primary file:bg-primary-light/30 file:cursor-pointer"
                title="Upload company photos"
                aria-label="Upload company photos"
                />
                {photoError && <p className="text-button-red text-xs font-semibold text-center">{photoError}</p>}
                <p className="text-xs text-foreground/70 text-center">
                {photoFiles.length > 0
                    ? `${photoFiles.length} photo(s) selected`
                    : "No photos selected"}
                </p>
            </div>

            {error && <p className="text-button-red text-sm text-center font-semibold">{error}</p>}
            {success && <p className="text-button-green text-sm text-center font-semibold">{success}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-button-green hover:bg-button-green-hover disabled:opacity-50 text-white font-bold tracking-widest py-3 transition-all shadow-md active:scale-[0.98] rounded-full duration-300 hover:-translate-y-1 mt-5"
            >
                {loading ? "Creating..." : "Create Company"}
            </button>
            </form>

            {/* ── Modal Popup ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="bg-surface border border-surface-border rounded-3xl shadow-2xl px-8 py-10 md:px-12 flex flex-col items-center max-w-2xl w-full text-center">

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-wide">
                            {createdName}
                        </h2>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-11 tracking-wide">
                            Account Created!
                        </h2>

                        {/* Subtitle */}
                        <p className="text-foreground/80 text-sm mb-4">
                            You can now log in using this email:
                        </p>

                        {/* Email Box */}
                        <div className="bg-background border border-surface-border rounded-xl p-4 w-full mb-8">
                        <p className="text-sm md:text-base break-all">
                            <span className="text-primary font-bold">Email : </span>
                            <span className="text-foreground font-medium">
                                {createdManagerEmail}
                            </span>
                        </p>
                        </div>

                        {/* Button */}
                        <button
                        onClick={() => setShowModal(false)}
                        className="bg-primary hover:bg-primary-hover text-white font-bold tracking-widest uppercase px-12 py-3 rounded-full shadow-lg transition-colors active:scale-95"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}