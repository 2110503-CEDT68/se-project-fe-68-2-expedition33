import { CreateCompanyResponse, CompanyCreatePayload } from "@/../interfaces";
import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

async function appendCompressedFile(formData: FormData, key: string, file: File) {
  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    formData.append(key, compressedFile);
  } catch (error) {
    console.error(`Error compressing ${key}:`, error);
    formData.append(key, file);
  }
}

async function processPayloadEntry(formData: FormData, key: string, value: any) {
  if (value === undefined || value === null) return;

  if (key === "photoList" && Array.isArray(value)) {
    for (const file of value) {
      await appendCompressedFile(formData, "photoList", file as File);
    }
    return;
  }

  if (key === "logo") {
    const logoFile = (Array.isArray(value) ? value[0] : value) as File;
    await appendCompressedFile(formData, "logo", logoFile);
    return;
  }

  formData.append(key, String(value));
}

export default async function createCompany(
  token: string,
  payload: CompanyCreatePayload
): Promise<CreateCompanyResponse> {
  const formData = new FormData();

  for (const [key, value] of Object.entries(payload)) {
    await processPayloadEntry(formData, key, value);
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.msg || body?.message || "Failed to create company");
  }

  return await response.json();
}