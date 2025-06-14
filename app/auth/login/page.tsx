"use client"

import { useState } from "react"
import { Shield, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDiscordLogin = async () => {
    setIsLoading(true)

    // Discord OAuth2 URL para Vercel
    const discordClientId = "1373548029008805950"
    const redirectUri = encodeURIComponent("https://oxcyshopsecuritybb.vercel.app/auth/callback")
    const scope = encodeURIComponent("identify")

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`

    // Redirigir a Discord para autenticación
    window.location.href = discordAuthUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <Particles />

      <div className="max-w-md w-full mx-4">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-sky-400" />
            <span className="text-2xl font-bold text-white">OxcyShop Security</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Acceso al Dashboard</h1>
          <p className="text-gray-300">Inicia sesión con Discord para continuar</p>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-900/50 border-sky-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Autenticación Discord</CardTitle>
            <CardDescription className="text-gray-300">
              Usa tu cuenta de Discord para acceder al panel de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Discord Login Button */}
            <Button
              onClick={handleDiscordLogin}
              disabled={isLoading}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 text-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Conectando...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Iniciar Sesión con Discord
                </div>
              )}
            </Button>

            {/* Info */}
            <div className="text-center text-sm text-gray-400">
              <p>🔒 Autenticación segura con Discord OAuth2</p>
              <p className="mt-1">Solo necesitas una cuenta de Discord válida</p>
              <p className="mt-2 text-sky-400">Powered by OxcyShop</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Protegido por OxcyShop Security</p>
          <p className="text-xs mt-1">oxcyshopsecuritybb.vercel.app</p>
        </div>
      </div>
    </div>
  )
}
