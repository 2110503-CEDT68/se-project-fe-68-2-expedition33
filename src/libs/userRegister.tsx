import { AuthResponse, RegisterPayload } from "../../interfaces";

export default async function userLogIn(user: RegisterPayload): Promise<AuthResponse> {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
            tel: user.tel,
            role: user.role
        }),
    });

    if (!response.ok) {
        if (response.status === 400) {
            const error = await response.json();
            throw new Error(error.msg);
        }
        throw new Error("Failed to register");
    }

    return await response.json();
}