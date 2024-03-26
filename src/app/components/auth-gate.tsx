"use client";
import { UseIdToken } from "../hooks/use-id-token";
import { useRouter } from 'next/navigation';

interface AuthGateProps {
    children: React.ReactNode;
}

export const AuthGate = ({ children }: AuthGateProps) => {
    const idToken = UseIdToken();
    const router = useRouter();

    if (!idToken) {
        router.push('/login')
    }
    else
        return <>
            {children}
        </>;
}