'use client'

import AuthSignInButton from "@/components/ui/buttons/AuthSignInButton";


export default function SignInPage() {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <AuthSignInButton iconSrc="/github.svg" className="w-12 h-12"></AuthSignInButton>
        </div>
    );
};