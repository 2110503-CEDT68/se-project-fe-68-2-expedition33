import BookingList from "@/components/test/BookingList";
import getBookings from "@/libs/getBookings";
import getCompanies from "@/libs/getCompanies";
import getUserProfile from "@/libs/getUserProfile";
import userLogIn from "@/libs/userLogIn";

export default async function Test() {

    const companiesJson = await getCompanies();
    const companies = companiesJson.data;

    const adminToken = (await userLogIn("narongdech@example.com", "123456")).token; 
    const admin = await getUserProfile(adminToken);

    const userToken = (await userLogIn("somchai@example.com", "123456")).token; 
    const user = await getUserProfile(userToken);

    const bookingsResponse = await getBookings(adminToken);

    return (
        <main className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-5xl mx-auto flex flex-col gap-12">
                

                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-primary tracking-tight">System Test Dashboard</h1>
                    <p className="mt-2 text-foreground/70">Validating Companies, Users, and Bookings API</p>
                </div>


                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-surface-border pb-2">
                        Companies Directory
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companies.map((company) => (
                            <div 
                                key={company.id} 
                                className="bg-background border border-surface-border rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
                            >
                                <h3 className="text-xl font-bold text-primary mb-2">{company.name}</h3>
                                <span className="text-xs font-mono text-foreground/50 bg-surface px-2 py-1 rounded-md">
                                    {company.id}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>


                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-background border-l-4 border-primary rounded-r-xl shadow-sm p-6 flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                            Admin Account
                        </span>
                        <h3 className="text-2xl font-bold text-foreground">{admin.data.name}</h3>
                        <p className="text-foreground/70">{admin.data.email}</p>
                        <p className="text-xs font-mono text-foreground/50 mt-4 truncate" title={admin.data.id}>
                            ID: {admin.data.id}
                        </p>
                    </div>

                    <div className="bg-background border-l-4 border-surface-border rounded-r-xl shadow-sm p-6 flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-1">
                            Test User Account
                        </span>
                        <h3 className="text-2xl font-bold text-foreground">{user.data.name}</h3>
                        <p className="text-foreground/70">{user.data.email}</p>
                        <p className="text-xs font-mono text-foreground/50 mt-4 truncate" title={user.data.id}>
                            ID: {user.data.id}
                        </p>
                    </div>
                </section>

                <section className="bg-background border border-surface-border rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-primary mb-6 border-b border-surface-border pb-2">
                        Active Bookings
                    </h2>
                    <BookingList company={companies[0]} bookingsResponse={bookingsResponse} adminToken={adminToken} userToken={userToken} />
                </section>

            </div>
        </main>
    );
}