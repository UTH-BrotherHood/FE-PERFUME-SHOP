import { useEffect, useState } from "react";
import userQueryParams from "../hooks/userQueryParams";
import axios from "axios";

export default function VerifyEmail() {
    const [status, setStatus] = useState(false);
    const [resendemailAction, setResendemailAction] = useState(false);
    const query = userQueryParams();
    const getToken = () => {
        return localStorage.getItem('accessToken') || '';
    };
    const token = getToken();
    const config = {
        baseURL: "http://localhost:8001",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    useEffect(() => {
        const { token } = query;

        const verifyEmail = () => {
            if (token) {
                axios.post("/users/verify-email", { email_verify_token: token }, { baseURL: "http://localhost:8001" })
                    .then((res) => {
                        console.log(res);
                        alert(res.data.message);
                        window.location.href = "/sign-in";
                    })
                    .catch((err) => {
                        console.error(err);
                        setStatus(false);
                    });
            } else {
                setStatus(false);
            }
        };

        verifyEmail();
    }, [query]);

    const resendEmail = () => {
        axios.post("/users/resend-verify-email", {},
            config
        )
            .then((res) => {
                alert(res.data.message);
                setResendemailAction(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Email Verification</h1>
            {status ? (
                <p className="text-lg">Your email has been verified successfully! Click <a href="/sign-in" className="text-blue-600">here</a> to sign in.</p>
            ) : (
                <p className="text-lg {!resendemailAction display none}">Failed to verify your email! <a onClick={resendEmail} className="text-blue-600 cursor-pointer">Resend email</a></p>
            )}

            {resendemailAction && <p className="text-lg">Email has been sent successfully !, please check your email inbox.</p>}
        </div>
    );
}
