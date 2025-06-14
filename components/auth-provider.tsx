"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
  discriminator: string
  avatar: string
  roles?: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("oxcy_auth_token")
      const userInfo = localStorage.getItem("oxcy_user_info")

      if (token && userInfo) {
        // Verificar que el token siga siendo válido
        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const parsedUser = JSON.parse(userInfo)
          setUser(parsedUser)
        } else {
          // Token inválido, limpiar
          logout()
        }
      }
    } catch (error) {
      console.error("Error checking auth:", error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAuth = async () => {
    await checkAuth()
  }

  const logout = () => {
    localStorage.removeItem("oxcy_auth_token")
    localStorage.removeItem("oxcy_user_info")
    setUser(null)

    // Limpiar cookies también
    document.cookie = "oxcy_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
