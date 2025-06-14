"use client"

import { useState, useEffect } from "react"
import { Shield, CheckCircle, XCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function AuthTestPage() {
  const [authStatus, setAuthStatus] = useState<any>(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const token = localStorage.getItem("oxcy_auth_token")
    const userInfo = localStorage.getItem("oxcy_user_info")
    const cookies = document.cookie

    setAuthStatus({
      hasToken: !!token,
      hasUserInfo: !!userInfo,
      tokenPreview: token ? token.substring(0, 50) + "..." : null,
      userInfo: userInfo ? JSON.parse(userInfo) : null,
      cookies: cookies,
      currentPath: window.location.pathname,
    })
  }

  const clearAuth = () => {
    localStorage.removeItem("oxcy_auth_token")
    localStorage.removeItem("oxcy_user_info")
    document.cookie = "oxcy_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    checkAuthStatus()
  }

  const goToDashboard = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Particles />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-sky-400" />
            <span className="text-2xl font-bold text-white">OxcyShop Security</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Test de Autenticación</h1>
          <p className="text-gray-300">Verificar estado de la sesión</p>
        </div>

        {/* Auth Status */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Estado de Autenticación</CardTitle>
          </CardHeader>
          <CardContent>
            {authStatus && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    {authStatus.hasToken ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <span className="text-gray-300">Token en localStorage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {authStatus.hasUserInfo ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <span className="text-gray-300">Información de usuario</span>
                  </div>
                </div>

                {authStatus.userInfo && (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-8 w-8 text-sky-400" />
                      <div>
                        <p className="text-white font-medium">{authStatus.userInfo.username}</p>
                        <p className="text-gray-400 text-sm">ID: {authStatus.userInfo.id}</p>
                      </div>
                    </div>
                  </div>
                )}

                {authStatus.tokenPreview && (
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-gray-300 text-sm mb-1">Token (preview):</p>
                    <code className="text-sky-400 font-mono text-xs">{authStatus.tokenPreview}</code>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Button onClick={checkAuthStatus} className="bg-sky-500 hover:bg-sky-600">
            🔄 Actualizar Estado
          </Button>
          <Button onClick={goToDashboard} className="bg-green-500 hover:bg-green-600">
            🚀 Ir al Dashboard
          </Button>
          <Button onClick={clearAuth} variant="outline" className="border-red-500 text-red-400">
            🗑️ Limpiar Sesión
          </Button>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center space-x-4">
          <Link href="/auth/login">
            <Button variant="outline" className="border-sky-500/50 text-sky-400">
              ← Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-gray-600 text-gray-300">
              Dashboard →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
