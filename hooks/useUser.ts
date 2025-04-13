'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    username: string;
}

export function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadUserFromAPI() {
            try {
                // Call API to get current user
                const res = await fetch('/api/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error loading user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUserFromAPI();
    }, []);

    useEffect(() => {
        // If no redirect needed, just return
        if (!redirectTo || loading) return;

        // If redirectIfFound is true and user is found, redirect
        if (redirectIfFound && user) {
            router.push(redirectTo);
            return;
        }

        // If redirectIfFound is false and no user is found, redirect
        if (!redirectIfFound && !user) {
            router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, user, loading, router]);

    return { user, loading };
} 