import NavBar from '@/components/general/Navbar';
import React from 'react';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const { getUser } = getKindeServerSession();
    // const user = await getUser(); // ✅ Fetch user on the server

    return (
        <>
            {/* <NavBar /> */}
            {/* <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
                {children}
            {/* </main> */}
        </>
    );
}
