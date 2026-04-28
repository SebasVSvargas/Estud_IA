"use client";

import { signIn, signOut } from "next-auth/react";

export function SignIn({ provider }: { provider: string }) {
    return (
        <button onClick={() => signIn(provider)}>
        Sign in with {provider}
        </button>
    );
}

export function SignOut() {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded justify-center" onClick={() => signOut()}>
        Sign out
        </button>
    );
}