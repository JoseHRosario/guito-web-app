"use client";
import { signIn } from "next-auth/react"
import { FaGoogle } from 'react-icons/fa';

function Login() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <div className="flex items-center justify-center pt-5">
            <div className="card w-11/12 max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title">Sign in with</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline btn-primary">
                                <FaGoogle /> Google
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default Login;