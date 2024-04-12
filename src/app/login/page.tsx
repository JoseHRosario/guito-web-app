"use client";
import { signIn } from "next-auth/react"
import { FaGoogle } from 'react-icons/fa';
import { ContentWrapper } from '@/app/components/content-wrapper';

function Login() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <ContentWrapper title="Sign in" isLoading={false}>
            <form onSubmit={handleSubmit}>
                <div className="form-control mt-6">
                    <button className="btn btn-outline btn-primary">
                        <FaGoogle /> Google
                    </button>
                </div>
            </form>
        </ContentWrapper>
    );
}

export default Login;