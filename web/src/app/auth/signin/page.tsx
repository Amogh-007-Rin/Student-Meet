'use client'

import { Suspense } from "react";
import AuthSignInButton from "@/components/ui/buttons/AuthSignInButton";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";


function SignInContent() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/auth/signin"

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <AuthSignInButton tag="githubAuthButton" iconSrc="/github.svg" className="w-12 h-12"
                onClick={() => signIn("github", { callbackUrl })}
            />
            <AuthSignInButton tag="googlehubAuthButton" iconSrc="/google.svg" className="w-12 h-12"
                onClick={() => signIn("google", { callbackUrl })}
            />
        </div>
    );
};

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="w-screen h-screen bg-black" />}>
            <SignInContent />
        </Suspense>
    );
};

/* Wrapped inside the suspense because : Build fixed. The error occurred because useSearchParams()
triggers a client-side bailout during static generation. At build time, there are no search params
to read, so Next.js errors out unless the component using useSearchParams() is wrapped in a <Suspense>
boundary. The fix extracts the useSearchParams() logic into a child component (SignInContent) and wraps
it with <Suspense> in the page export, giving Next.js a fallback UI to render during prerendering.*/