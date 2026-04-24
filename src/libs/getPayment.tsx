export default async function getPayment(id:string,token:string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch payments");
    }

    const data = await res.json();
    return data.data;
}