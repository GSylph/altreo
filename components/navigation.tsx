"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, User, Wallet, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import { useWallet } from "@/components/wallet-provider"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string; username: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const { isConnected, address, connect, disconnect } = useWallet()

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        console.log("Fetching user data from /api/me");
        const res = await fetch('/api/me', {
          method: 'GET',
          credentials: 'include', // Important for including cookies
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        console.log(`/api/me response status: ${res.status}`);

        if (res.ok) {
          const data = await res.json();
          console.log("User data received:", data);

          if (data.authenticated) {
            setUser(data.user);
          } else {
            console.log("User not authenticated:", data.message);
            setUser(null);
          }
        } else {
          console.log(`Failed to fetch user: ${res.status} ${res.statusText}`);

          try {
            const errorData = await res.json();
            console.log("Error response:", errorData);
          } catch (jsonError) {
            console.log("Could not parse error response as JSON");
          }

          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      })

      if (res.ok) {
        setUser(null)
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const shortenAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Challenges", href: "/challenges" },
    { name: "Simulator", href: "/simulator" },
    { name: "Achievements", href: "/achievements" },
    { name: "Learn", href: "/learn" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="border-b border-[#2A2A2A] bg-[#121212]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-300 hover:text-white hover:bg-dark-100"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {/* User profile button (when logged in) */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Avatar>
                        <AvatarFallback className="bg-orange-500 text-white">
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user.username}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Wallet connection button */}
              {isConnected ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 rounded-full px-4 flex items-center gap-2 text-orange-500 border border-orange-500/30 hover:bg-orange-500/10">
                      <Wallet className="h-4 w-4" />
                      <span>{shortenAddress(address)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Wallet Connected</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex flex-col items-start">
                      <span className="text-xs text-gray-500">Address</span>
                      <span className="text-sm font-mono">{shortenAddress(address)}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => disconnect()} className="text-red-500 focus:text-red-500">
                      Disconnect Wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => connect()} className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              )}

              {/* Login/Register buttons (when not logged in) */}
              {!user && !isLoading && (
                <div className="flex space-x-2">
                  <Button asChild variant="ghost" className="text-gray-300 hover:text-white">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-orange-500 hover:bg-orange-600">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href
                  ? "text-orange-500 bg-dark-100"
                  : "text-gray-300 hover:text-white hover:bg-dark-100"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[#2A2A2A]">
            <div className="px-2 space-y-1">
              {/* User profile section on mobile */}
              {user && (
                <>
                  <div className="px-3 py-2 flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <Avatar className="h-10 w-10 bg-orange-500">
                        <AvatarFallback className="text-white">
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="text-base font-medium text-white">{user.username}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-white hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                  <div className="my-2 border-t border-[#2A2A2A]"></div>
                </>
              )}

              {/* Wallet section on mobile */}
              {isConnected ? (
                <>
                  <div className="px-3 py-2 flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <Avatar className="h-10 w-10 bg-orange-500/10 border border-orange-500/30">
                        <AvatarFallback className="text-orange-500">
                          <Wallet className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="text-base font-medium text-white">Connected</div>
                      <div className="text-sm font-mono text-orange-500">{shortenAddress(address)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      disconnect()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-white hover:bg-red-900/20"
                  >
                    Disconnect Wallet
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    connect()
                    setIsOpen(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600"
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </button>
              )}

              {/* Login/Register buttons on mobile */}
              {!user && !isLoading && (
                <div className="mt-2 space-y-2">
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-100 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
