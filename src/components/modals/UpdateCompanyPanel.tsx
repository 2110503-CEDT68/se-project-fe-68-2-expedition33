"use client";
import { useState, useRef } from "react";
import updateCompany from "../../libs/updateCompany";
import { CompanyItem } from "../../../interfaces";

export default function UpdateCompanyPanel({
  company,
  token,
  onClose,
  onUpdated
}: {
  company: CompanyItem;
  token: string;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [website, setWebsite] = useState(company.website);
  const [tel, setTel] = useState(company.tel);
  const [address, setAddress] = useState(company.address);
  const [district, setDistrict] = useState(company.district);
  const [province, setProvince] = useState(company.province);
  const [postalcode, setPostalcode] = useState(company.postalcode);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCompany(company.id, token, {
        name,
        description,
        website,
        tel,
        address,
        district,
        province,
        postalcode
      });
      onUpdated();
      onClose();
    } catch (err) {
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

  const inputStyle = (key: string): React.CSSProperties => ({
    border: `2px solid var(--primary)`,
    background: hoveredInput === key ? 'var(--surface-hover, rgba(0,0,0,0.04))' : 'var(--surface)',
    color: 'var(--foreground)',
    outline: 'none',
    transition: 'background 0.18s, box-shadow 0.18s',
    boxShadow: hoveredInput === key ? '0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent)' : 'none',
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div
        className="rounded-2xl w-[90%] max-w-sm px-8 py-7 relative shadow-lg"
        style={{
          background: 'var(--surface)',
          color: 'var(--foreground)',
          border: '1px solid var(--surface-border)'
        }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-50 rounded-2xl">
            <span className="text-primary font-bold text-lg animate-pulse">Updating...</span>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
          className="absolute top-4 right-5 text-2xl"
          style={{
            color: 'var(--primary)',
            transform: closeHovered ? 'scale(1.2) rotate(-10deg)' : 'scale(1)',
            transition: 'transform 0.15s',
          }}
        >
          ↩
        </button>

        {/* Title */}
        <h2
          className="text-2xl font-bold text-center tracking-[0.15em] mb-5"
          style={{ color: 'var(--primary)' }}
        >
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
              className="rounded-md px-3 py-2 text-sm"
              style={inputStyle(key)}
              onMouseEnter={() => setHoveredInput(key)}
              onMouseLeave={() => setHoveredInput(null)}
              onFocus={() => setHoveredInput(key)}
              onBlur={() => setHoveredInput(null)}
            />
          ))}

          {/* Upload */}
          <div className="flex flex-col items-center gap-2 mt-3">
            <span className="text-xs tracking-widest" style={{ color: 'var(--primary)' }}>
              Upload logo
            </span>
            <div
              className="rounded-md p-2 flex flex-col items-center cursor-pointer"
              style={{
                border: `2px solid var(--primary)`,
                background: logoHovered ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'transparent',
                boxShadow: logoHovered ? '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)' : 'none',
                transform: logoHovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s',
              }}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              title="Select logo file"
            >
              <span
                className="text-2xl"
                style={{
                  transform: logoHovered ? 'translateY(-2px)' : 'translateY(0)',
                  display: 'inline-block',
                  transition: 'transform 0.18s',
                }}
              >
                ⬆
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="rounded-md border border-surface-border max-h-24 max-w-full object-contain bg-surface"
                  style={{ background: 'var(--surface)' }}
                />
              ) : (
                <img
                  src={`/images/${company.id}.png`}
                  alt="Current logo"
                  className="rounded-md border border-surface-border max-h-24 max-w-full object-contain bg-surface"
                  style={{ background: 'var(--surface)' }}
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="py-2 rounded-lg mt-4 font-bold tracking-[0.2em]"
            onMouseEnter={() => setSubmitHovered(true)}
            onMouseLeave={() => setSubmitHovered(false)}
            style={{
              background: submitHovered
                ? 'color-mix(in srgb, var(--primary) 80%, black)'
                : 'var(--primary)',
              color: 'white',
              transform: submitHovered ? 'translateY(-1px)' : 'translateY(0)',
              boxShadow: submitHovered ? '0 4px 16px color-mix(in srgb, var(--primary) 35%, transparent)' : 'none',
              transition: 'background 0.18s, transform 0.15s, box-shadow 0.18s',
            }}
          >
            Update
          </button>

        </form>
      </div>
    </div>
  );
}