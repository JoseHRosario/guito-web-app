"use client";

interface ContentWrapperProps {
    title: string;
    isLoading: boolean;
    children: React.ReactNode;
}

export const ContentWrapper = ({ title, isLoading, children }: ContentWrapperProps) => {
    return (

        <div className="flex items-center justify-center pt-5">
            <div className="card w-11/12 max-w-md shadow-xl">
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