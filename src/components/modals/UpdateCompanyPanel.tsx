"use client";
import { useState, useRef } from "react";
import updateCompany from "../../libs/updateCompany";
import { CompanyItem } from "../../../interfaces";

export default function UpdateCompanyPanel({
  company,
  token,
  onClose,
  onUpdated
}: Readonly<{
  company: CompanyItem;
  token: string;
  onClose: () => void;
  onUpdated: () => void;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("website", website);
      formData.append("tel", tel);
      formData.append("address", address);
      formData.append("district", district);
      formData.append("province", province);
      formData.append("postalcode", postalcode);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      for (const photo of photoFiles) {
        formData.append("photoList", photo);
      }

      await updateCompany(company.id, token, formData);
      onUpdated();
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

  const handlePhotoListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoFiles(Array.from(e.target.files ?? []));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-sm px-8 py-7 relative shadow-2xl text-foreground">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-50 rounded-2xl">
            <span className="text-primary font-bold text-lg animate-pulse">Updating...</span>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-primary hover:scale-125 hover:-rotate-12 transition-transform duration-150 cursor-pointer"
        >
          ↩
        </button>

        <h2 className="text-2xl font-bold text-center tracking-[0.15em] mb-5 text-primary">
          Update Company
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {(
            [
              { key: 'name', value: name, setter: setName, placeholder: 'Name' },
              { key: 'description', value: description, setter: setDescription, placeholder: 'Description' },
              { key: 'website', value: website, setter: setWebsite, placeholder: 'Website' },
              { key: 'tel', value: tel, setter: setTel, placeholder: 'Telephone number' },
              { key: 'address', value: address, setter: setAddress, placeholder: 'Address' },
              { key: 'district', value: district, setter: setDistrict, placeholder: 'District' },
              { key: 'province', value: province, setter: setProvince, placeholder: 'Province' },
              { key: 'postalcode', value: postalcode, setter: setPostalcode, placeholder: 'Postal Code' },
            ] as const
          ).map(({ key, value, setter, placeholder }) => (
            <input
              key={key}
              value={value}
              onChange={e => setter(e.target.value)}
              placeholder={placeholder}
              className="w-full border-2 border-primary rounded-md px-3 py-2 text-sm bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-black/5 transition-all"
            />
          ))}

          <div className="flex flex-col items-center gap-2 mt-3">
            <span className="text-xs tracking-widest text-primary font-bold">
              Upload logo
            </span>
            <button
              type="button"
              className="w-full border-2 border-primary rounded-md p-2 flex flex-col items-center cursor-pointer hover:bg-primary/5 hover:scale-[1.02] transition-all group focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              title="Select logo file"
            >
              <span className="text-2xl text-primary group-hover:-translate-y-1 transition-transform">
                ⬆
              </span>
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="rounded-md border border-surface-border max-h-24 max-w-full object-contain bg-surface mt-2"
                />
              ) : (
                <img
                  src={`/images/${company.id}.png`}
                  alt="Current logo"
                  className="rounded-md border border-surface-border max-h-24 max-w-full object-contain bg-surface mt-2"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              title="Upload logo"
              aria-label="Upload logo"
              onChange={handleLogoChange}
            />

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              title="Upload gallery photos"
              aria-label="Upload gallery photos"
              onChange={handlePhotoListChange}
            />
            <button
              type="button"
              className="text-xs rounded-md px-3 py-1 border border-primary text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => photoInputRef.current?.click()}
            >
              Upload gallery photos
            </button>
            <p className="text-xs text-primary/70">
              {photoFiles.length > 0
                ? `${photoFiles.length} photo(s) selected`
                : "No gallery photos selected"}
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg mt-4 font-bold tracking-[0.2em] bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer"
          >
            Update
          </button>

        </form>
      </div>
    </div>
  );
}