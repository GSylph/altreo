'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AuthDebugPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cookieContent, setCookieContent] = useState<string>('Checking...');
    const [emailToCheck, setEmailToCheck] = useState<string>('');
    const [checkResult, setCheckResult] = useState<any>(null);
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [authTestResult, setAuthTestResult] = useState<any>(null);
    const [authTestLoading, setAuthTestLoading] = useState(false);
    const router = useRouter();

    async function fetchUser() {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/me', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });

            const data = await res.json();

            if (res.ok && data.authenticated) {
                setUser(data.user);
            } else {
                setUser(null);
                setError(data.message || 'Not authenticated');
            }
        } catch (err) {
            console.error('Error fetching user:', err);
            setError('Error fetching user data');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin() {
        if (!loginEmail || !loginPassword) {
            alert('Please enter both email and password');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                fetchUser();
            } else {
                alert(`Login failed: ${data.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('Login failed due to an error');
        }
    }

    async function handleLogout() {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                alert('Logout successful!');
                setUser(null);
                fetchUser();
            } else {
                alert('Logout failed');
            }
        } catch (err) {
            console.error('Logout error:', err);
            alert('Logout failed due to an error');
        }
    }

    function checkCookies() {
        const cookieStr = document.cookie;
        if (cookieStr) {
            setCookieContent(`Cookies found: ${cookieStr}`);
        } else {
            setCookieContent('No cookies found');
        }
    }

    function navigateTo(path: string) {
        router.push(path);
    }

    async function checkUserExists() {
        if (!emailToCheck) {
            alert('Please enter an email to check');
            return;
        }

        try {
            const response = await fetch('/api/check-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailToCheck,
                }),
            });

            const data = await response.json();
            setCheckResult(data);

        } catch (err) {
            console.error('Check user error:', err);
            setCheckResult({ success: false, error: 'Error checking user' });
        }
    }

    async function createTestUser() {
        const testEmail = 'test@example.com';
        const testPassword = 'password123';
        const testUsername = 'TestUser';

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: testEmail,
                    password: testPassword,
                    username: testUsername,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Test user created successfully with email: ${testEmail} and password: ${testPassword}`);
                setLoginEmail(testEmail);
                setLoginPassword(testPassword);
            } else {
                if (response.status === 409) {
                    alert(`Test user already exists with email: ${testEmail}`);
                    setLoginEmail(testEmail);
                    setLoginPassword(testPassword);
                } else {
                    alert(`Failed to create test user: ${data.message || 'Unknown error'}`);
                }
            }
        } catch (err) {
            console.error('Create test user error:', err);
            alert('Failed to create test user due to an error');
        }
    }

    async function testAuthSetup() {
        setAuthTestLoading(true);
        try {
            const response = await fetch('/api/auth-test');
            const data = await response.json();
            setAuthTestResult(data);
        } catch (err) {
            console.error('Auth test error:', err);
            setAuthTestResult({ error: 'Failed to test auth setup' });
        } finally {
            setAuthTestLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
        checkCookies();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>

            <div className="grid gap-6">
                <div className="p-4 border rounded-lg bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Current Authentication Status:</h2>
                    {loading ? (
                        <p>Loading user data...</p>
                    ) : user ? (
                        <div>
                            <p className="text-green-500">✅ Authenticated</p>
                            <pre className="mt-2 p-2 bg-gray-900 rounded overflow-auto">
                                {JSON.stringify(user, null, 2)}
                            </pre>
                        </div>
                    ) : (
                        <p className="text-red-500">❌ Not authenticated {error && `(${error})`}</p>
                    )}
                </div>

                <div className="p-4 border rounded-lg bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Cookie Information:</h2>
                    <p>{cookieContent}</p>
                    <Button onClick={checkCookies} className="mt-2">
                        Refresh Cookie Info
                    </Button>
                </div>

                <div className="p-4 border rounded-lg bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Check If User Exists:</h2>
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="email"
                            placeholder="Email to check"
                            value={emailToCheck}
                            onChange={(e) => setEmailToCheck(e.target.value)}
                            className="p-2 rounded bg-gray-700 border border-gray-600 flex-grow"
                        />
                        <Button onClick={checkUserExists} variant="outline">
                            Check
                        </Button>
                    </div>
                    {checkResult && (
                        <div className="mt-2">
                            <h3 className="font-medium mb-1">Result:</h3>
                            <pre className="p-2 bg-gray-900 rounded overflow-auto">
                                {JSON.stringify(checkResult, null, 2)}
                            </pre>
                        </div>
                    )}
                    <div className="mt-4">
                        <Button onClick={createTestUser} variant="outline" className="bg-blue-600 hover:bg-blue-700">
                            Create Test User
                        </Button>
                        <p className="text-xs mt-1 text-gray-400">
                            This will create a user with email: test@example.com and password: password123
                        </p>
                    </div>
                </div>

                <div className="p-4 border rounded-lg bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Test Login:</h2>
                    <div className="space-y-3 mb-3">
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="p-2 w-full rounded bg-gray-700 border border-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="p-2 w-full rounded bg-gray-700 border border-gray-600"
                            />
                        </div>
                    </div>
                    <Button onClick={handleLogin} variant="default" className="bg-green-600 hover:bg-green-700">
                        Test Login
                    </Button>
                </div>

                <div className="p-4 border rounded-lg bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Authentication Actions:</h2>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={fetchUser} variant="outline">
                            Refresh User Data
                        </Button>
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>
                </div>

                <div className="p-4 border rounded-lg bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">Navigation Tests:</h2>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={() => navigateTo('/dashboard')} variant="outline">
                            Go to Dashboard
                        </Button>
                        <Button onClick={() => navigateTo('/challenges')} variant="outline">
                            Go to Challenges
                        </Button>
                        <Button onClick={() => navigateTo('/simulator')} variant="outline">
                            Go to Simulator
                        </Button>
                        <Button onClick={() => router.push('/login')} variant="outline">
                            Go to Login
                        </Button>
                        <Button onClick={() => router.push('/register')} variant="outline">
                            Go to Register
                        </Button>
                    </div>
                </div>

                <div className="p-4 border rounded-lg bg-gray-800">
                    <h2 className="text-xl font-semibold mb-2">JWT Authentication Setup Test:</h2>
                    <Button
                        onClick={testAuthSetup}
                        variant="outline"
                        className="mb-4"
                        disabled={authTestLoading}
                    >
                        {authTestLoading ? 'Testing...' : 'Test AUTH_SECRET & JWT Setup'}
                    </Button>

                    {authTestResult && (
                        <div className="mt-2">
                            <h3 className="font-medium mb-1">Results:</h3>
                            <div className="space-y-2">
                                <div className="p-2 bg-gray-900 rounded-md">
                                    <span className="font-medium">AUTH_SECRET exists: </span>
                                    <span className={authTestResult.authSecretExists ? 'text-green-500' : 'text-red-500'}>
                                        {authTestResult.authSecretExists ? '✅ Yes' : '❌ No'}
                                    </span>
                                </div>

                                {authTestResult.authSecretExists && (
                                    <>
                                        <div className="p-2 bg-gray-900 rounded-md">
                                            <span className="font-medium">AUTH_SECRET length: </span>
                                            <span className={authTestResult.authSecretLength > 20 ? 'text-green-500' : 'text-yellow-500'}>
                                                {authTestResult.authSecretLength} characters
                                                {authTestResult.authSecretLength < 20 && ' (should be longer for security)'}
                                            </span>
                                        </div>

                                        <div className="p-2 bg-gray-900 rounded-md">
                                            <span className="font-medium">Can create JWT: </span>
                                            <span className={authTestResult.canCreateToken ? 'text-green-500' : 'text-red-500'}>
                                                {authTestResult.canCreateToken ? '✅ Yes' : '❌ No'}
                                            </span>
                                        </div>

                                        <div className="p-2 bg-gray-900 rounded-md">
                                            <span className="font-medium">Can verify JWT: </span>
                                            <span className={authTestResult.canVerifyToken ? 'text-green-500' : 'text-red-500'}>
                                                {authTestResult.canVerifyToken ? '✅ Yes' : '❌ No'}
                                            </span>
                                        </div>
                                    </>
                                )}

                                {authTestResult.error && (
                                    <div className="p-2 bg-red-900/30 rounded-md text-red-300">
                                        <span className="font-medium">Error: </span>
                                        {authTestResult.error}
                                    </div>
                                )}

                                {authTestResult.tokenPayload && (
                                    <div className="mt-2">
                                        <span className="font-medium">Test Token Payload:</span>
                                        <pre className="p-2 bg-gray-900 rounded overflow-auto mt-1">
                                            {JSON.stringify(authTestResult.tokenPayload, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 