"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CompanyItem, UserItem } from "../../interfaces";
import UpdateCompanyPanel from "./modals/UpdateCompanyPanel";
import DeleteCompanyPanel from "./modals/DeleteCompanyPanel";
import getUserProfile from "@/libs/getUserProfile";

interface Props {
  user: UserItem;
}


export default function CompanyProfile({ user }: Props) {
  const { data: session } = useSession();

  // Refs for moving user focus automatically

  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [updating, setUpdating] = useState<CompanyItem | null>(null);
  const [deleting, setDeleting] = useState<CompanyItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
  const fetchCompany = async () => {
    if (!session?.user?.token) return;

    try {
      const res = await getUserProfile(session.user.token);

      if (!res?.data?.companyData) {
        setCompany(null);
        return;
      }

      const companyData = res.data.companyData;

      const mappedCompany: CompanyItem = {
        id: companyData.id,
        name: companyData.name,
        address: companyData.address,
        district: companyData.district,
        province: companyData.province,
        postalcode: companyData.postalcode,
        tel: companyData.tel,
        website: companyData.website,
        description: companyData.description,
        logo: companyData.logo,
        photoList: companyData.photoList,
      };

      setCompany(mappedCompany);
    } catch (err) {
      console.error("Fetch company error:", err);
    }
  };

  fetchCompany();
}, [session]);

  /*if (loading) {

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center text-primary font-bold text-xl tracking-widest gap-4">
      Loading Company...
      <div className="w-full max-w-md mt-4">
        <LinearProgress color="warning" />
      </div>
    </div>
  );
}*/
  
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
    <h1 className="col-span-5 text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase drop-shadow-sm">
          Company Profile
        </h1>
      {/* ── Left: Company Profile ── */}
      <div className="flex flex-col items-center col-span-2">
        

        <div className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-[80px_20px_1fr] md:grid-cols-[100px_30px_1fr] gap-y-6 md:gap-y-8 items-center text-lg md:text-xl font-bold">
            <span className="text-primary tracking-widest text-right">
              Role
            </span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide capitalize">
              {user.role}
            </span>

            <span className="text-primary tracking-widest text-right">
              Name
            </span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide">{user.name}</span>

            <span className="text-primary tracking-widest text-right">
              Email
            </span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide break-all">
              {user.email}
            </span>

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

      {/* ── Right: Company INFO ── */}
      <div className="flex flex-col items-center col-span-3">

        <div className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-5 shadow-xl backdrop-blur-sm">
          <div className="flex flex-column">
            <div className="flex-0 rounded-3xl w-auto h-auto bg-gray-200 p-10 text-4xl">
              {company?.name}
            </div>
            <div className="flex-1 rounded-3xl w-auto h-auto bg-gray-200 p-5 text-xl ml-5">
              <div className="grid grid-cols-[80px_20px_1fr] md:grid-cols-[100px_30px_1fr] gap-y-4 md:gap-y-1 items-center text-lg md:text-md ">
                <span className="text-primary tracking-widest text-right">
                  Name
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide capitalize">
                  {company?.name}
                </span>

                <span className="text-primary tracking-widest text-right">
                  Address
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide">
                  {company?.address}
                </span>

                <span className="text-primary tracking-widest text-right">
                  Website
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide break-all">
                  {company?.website}
                </span>

                <span className="text-primary tracking-widest text-right">
                  Phone
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide">
                  {company?.tel}
                </span>
              </div>
            </div>
          </div>

          <div className="my-5">
            <span className="text-2xl font-md text-primary">Description </span><span className="text-2xl font-md">Company {company?.name}</span>
            <div className="text-sm">
              {company?.description}
            </div>
          </div>

          <div className="flex flex-column border-b-2 border-surface-border pb-3">
            <div className="flex-1 rounded-3xl w-50 h-50 bg-gray-200 p-10 text-2xl m-2">
              Picture1
            </div>
            <div className="flex-1 rounded-3xl w-50 h-50 bg-gray-200 p-10 text-2xl m-2">
              Picture2
            </div>
            <div className="flex-1 rounded-3xl w-50 h-50 bg-gray-200 p-10 text-2xl m-2">
              Picture3
            </div>
          </div>

          <div className="my-5 mx-30 flex items-center ">
            <button 
              onClick={() => {
                  if (!company) return;
                  setUpdating(company);
                  setShowModal(true);
              }}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold mx-5">
              UPDATE
            </button>
            <button 
            onClick={() => setDeleting(company)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold mx-5">
              DELETE
            </button>

            {updating && session?.user.token && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative">

                  <button
                    onClick={() => {
                      setUpdating(null);
                      setShowModal(false);
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>

                  <UpdateCompanyPanel
                    company={updating}
                    token={session.user.token}
                    onClose={() => {
                      setUpdating(null);
                      setShowModal(false); 
                    }}
                    onUpdated={() => {
                      setShowModal(false); 
                      window.location.reload();
                    }}
                  />
                </div>
              </div>
            )}

              {deleting && session?.user.token && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

                  <button
                    onClick={() => setDeleting(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>

                  <DeleteCompanyPanel
                    company={deleting}
                    token={session.user.token}
                    onClose={() => setDeleting(null)}
                    onDeleted={() => {
                      window.location.href = "/companies";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
}
