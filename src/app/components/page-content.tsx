"use client";

interface AuthGateProps {
    title: string;
    isLoading: boolean;
    children: React.ReactNode;
}

export const PageContent = ({ title, isLoading, children }: AuthGateProps) => {
    return (

        <div className="flex items-center justify-center pt-5">
            <div className="card w-11/12 max-w-md bg-base-200 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    {isLoading ? (
                        <div className="flex flex-col gap-4 w-full">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>

    );
}