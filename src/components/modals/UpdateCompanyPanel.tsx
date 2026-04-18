"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import updateCompany from "../../libs/updateCompany";
import { CompanyItem, CompanyUpdatePayload } from "../../../interfaces";

export default function UpdateCompanyPanel({
  company,
  token,
  onClose,
}: Readonly<{
  company: CompanyItem;
  token: string;
  onClose: () => void;
}>) {
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [website, setWebsite] = useState(company.website);
  const [tel, setTel] = useState(company.tel);
  const [address, setAddress] = useState(company.address);
  const [district, setDistrict] = useState(company.district);
  const [province, setProvince] = useState(company.province);
  const [postalcode, setPostalcode] = useState(company.postalcode);
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const payload: CompanyUpdatePayload = {
        name,
        description,
        website,
        tel,
        address,
        district,
        province,
        postalcode,
        logo: logoFile,
        photoList: photoFiles,
      }

      await updateCompany(company.id, token, payload);

      globalThis.location.reload();
      onClose();
    } catch (err) {
      setLoading(false);
      console.error("Failed to update company:", err);
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

  const inputFields = [
    { key: 'name', label: 'Name', value: name, setter: setName, placeholder: 'e.g. ABC Company', type: 'text' },
    { key: 'description', label: 'Description', value: description, setter: setDescription, placeholder: 'e.g. Leading tech company', type: 'text' },
    { key: 'website', label: 'Website', value: website, setter: setWebsite, placeholder: 'e.g. http://abc.com', type: 'text' },
    { key: 'tel', label: 'Telephone number', value: tel, setter: setTel, placeholder: 'e.g. 02-123-4567', type: 'tel' },
    { key: 'address', label: 'Address', value: address, setter: setAddress, placeholder: 'e.g. 123 Sukhumvit Rd.', type: 'text' },
    { key: 'district', label: 'District', value: district, setter: setDistrict, placeholder: 'e.g. Khlong Toei', type: 'text' },
    { key: 'province', label: 'Province', value: province, setter: setProvince, placeholder: 'e.g. Bangkok', type: 'text' },
    { key: 'postalcode', label: 'Postal Code', value: postalcode, setter: setPostalcode, placeholder: 'e.g. 10110', type: 'text' },
  ] as const;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm pt-5" onScroll={(e) => {e.stopPropagation()}}>
      <div className="bg-surface border border-surface-border rounded-3xl w-full max-w-xl p-8 md:p-10 relative shadow-2xl text-foreground max-h-[90vh] overflow-y-auto">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-foreground/50 hover:text-primary transition-colors text-xl"
        disabled={loading}
      >
        ✕
      </button>

      <h2 className="text-3xl font-extrabold text-center mb-8 text-primary tracking-widest uppercase drop-shadow-sm">
        Update Company
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Text Fields */}
        {inputFields.map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="text-foreground font-bold text-sm md:text-base tracking-widest ">
              {field.label}
            </label>
            <input
              type={field.type}
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              placeholder={field.placeholder}
              title={field.label}
              aria-label={field.label}
              required
              className="w-full border border-surface-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        ))}

        <hr className="border-surface-border my-2" />

        {/* Upload Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-foreground font-bold text-sm md:text-base tracking-widest ">
            Update Logo
          </span>
          <button
            type="button"
            className="w-full max-w-50 border-2 border-dashed border-primary/30 rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:bg-primary-light/20 transition-all group"
            onClick={() => logoInputRef.current?.click()}
          >
            {logoPreview || company.logo?.url ? (
              <Image
                width={200}
                height={200}
                src={logoPreview || company.logo?.url || ""}
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
            title="Upload company logo"
            aria-label="Upload company logo"
            placeholder="Select logo file"
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>

        {/* Upload Photos Section */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <span className="text-foreground font-bold text-sm md:text-base tracking-widest ">
            Update Gallery Photos
          </span>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            title="Upload gallery photos"
            aria-label="Upload gallery photos"
            placeholder="Select photo files"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length > 3) {
                setPhotoError("Maximum 3 photos allowed.");
                setPhotoFiles([]);
                if (photoInputRef.current) photoInputRef.current.value = "";
              } else {
                setPhotoError("");
                setPhotoFiles(files);
              }
            }}
            className="block w-full text-xs text-foreground file:mr-2 file:rounded file:border file:border-primary file:px-2 file:py-1 file:text-primary file:bg-primary-light/30 file:cursor-pointer"
          />
          {photoError && <p className="text-button-red text-xs font-semibold text-center">{photoError}</p>}
          <p className="text-[10px] text-foreground/50 italic">
            {photoFiles.length > 0
              ? `${photoFiles.length} new photo(s) selected`
              : "Keep existing or select new photos to replace"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-15">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-button-blue hover:brightness-95 disabled:opacity-50 text-white font-bold tracking-widest py-3 rounded-full shadow-lg transition-all active:scale-95 text-lg hover:-translate-y-1"
          >
            {loading ? "Saving..." : "Update"}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="w-full text-foreground/40 hover:text-foreground text-sm font-bold tracking-widest transition-colors mt-5"
            disabled={loading}
          >
            Cancel
          </button>
        </div>

      </form>
      </div>
    </div>
  );
}