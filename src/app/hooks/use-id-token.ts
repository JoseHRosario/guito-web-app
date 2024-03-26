import { useSession } from "next-auth/react";

export const UseIdToken = () => {
    const { data: session } = useSession();
    return session?.user?.name;
}