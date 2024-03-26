"use client";
import { UseIdToken } from "../hooks/use-id-token";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGateProps {
    children: React.ReactNode;
}

export const AuthGate = ({ children }: AuthGateProps) => {
    const idToken = UseIdToken();
    const router = useRouter();

    useEffect(() => {
        if (!idToken) {
            router.push('/login');
        }
    });

    return <>
        {children}
    </>;
}