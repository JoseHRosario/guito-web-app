"use client";
import { signIn } from "next-auth/react"
import { FaGoogle } from 'react-icons/fa';
import { PageContent } from '@/app/components/page-content';

function Login() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <PageContent title="Sign in" isLoading={false}>
            <form onSubmit={handleSubmit}>
                <div className="form-control mt-6">
                    <button className="btn btn-outline btn-primary">
                        <FaGoogle /> Google
                    </button>
                </div>
            </form>
        </PageContent>
    );
}

export default Login;