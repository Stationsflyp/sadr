"use client"

import { Shield, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function SuccessPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const envVars = `DISCORD_CLIENT_ID=1373548029008805950
DISCORD_CLIENT_SECRET=nyv0KnLZPoc6fd_iqiGhCfkIDIQCvsBm
DISCORD_REDIRECT_URI=https://oxcyshopsecuritybb.vercel.app/auth/callback
NEXT_PUBLIC_DISCORD_CLIENT_ID=1373548029008805950
NEXT_PUBLIC_APP_URL=https://oxcyshopsecuritybb.vercel.app`

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
          <h1 className="text-3xl font-bold text-white mb-2">✅ Aplicación Discord Confirmada</h1>
          <p className="text-gray-300">Ahora configuremos las variables de entorno</p>
        </div>

        {/* Success Alert */}
        <Card className="bg-green-900/20 border-green-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              ¡Aplicación Discord Verificada!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              La aplicación Discord con Client ID <code className="text-green-400">1373548029008805950</code> existe y
              funciona correctamente.
            </p>
          </CardContent>
        </Card>

        {/* Step 1: Get Client Secret */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                1
              </div>
              Obtener Client Secret
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">Necesitas obtener el Client Secret de tu aplicación Discord:</p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                  1
                </div>
                <span className="text-gray-300">Ve al Discord Developer Portal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                  2
                </div>
                <span className="text-gray-300">Selecciona tu aplicación (Client ID: 1373548029008805950)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                  3
                </div>
                <span className="text-gray-300">
                  En "General Information", copia el <strong>Client Secret</strong>
                </span>
              </div>
            </div>

            <Button
              onClick={() => window.open("https://discord.com/developers/applications/1373548029008805950", "_blank")}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir Tu Aplicación Discord
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Configure Redirect URI */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                2
              </div>
              Configurar Redirect URI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">Asegúrate de que esta URI esté configurada en Discord:</p>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <code className="text-sky-400 text-sm">https://oxcyshopsecuritybb.vercel.app/auth/callback</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("https://oxcyshopsecuritybb.vercel.app/auth/callback")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-400">
              <p>
                📍 Ve a <strong>OAuth2</strong> → <strong>General</strong>
              </p>
              <p>
                📍 En <strong>Redirects</strong>, agrega la URI de arriba
              </p>
              <p>
                📍 Haz clic en <strong>Save Changes</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Environment Variables */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                3
              </div>
              Variables de Entorno para Vercel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">Configura estas variables en tu proyecto de Vercel:</p>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Variables de entorno:</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(envVars)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="text-green-400 text-sm">
                <code>{envVars}</code>
              </pre>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">
                ⚠️ <strong>Importante:</strong> Reemplaza <code>tu_client_secret_aqui</code> con el Client Secret real de
                Discord
              </p>
            </div>

            <Button
              onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
              className="w-full bg-black hover:bg-gray-800 border border-gray-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir Dashboard de Vercel
            </Button>
          </CardContent>
        </Card>

        {/* Step 4: Test */}
        <Card className="bg-gray-900/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                4
              </div>
              Probar Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">Una vez configuradas las variables, prueba la autenticación:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/auth/login">
                <Button className="w-full bg-sky-500 hover:bg-sky-600">🔐 Probar Login</Button>
              </Link>
              <Link href="/debug">
                <Button variant="outline" className="w-full border-sky-500/50 text-sky-400">
                  🔍 Diagnóstico
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="bg-gray-900/50 border-gray-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">📋 Referencia Rápida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300 font-medium">Client ID:</p>
                <code className="text-sky-400">1373548029008805950</code>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Redirect URI:</p>
                <code className="text-sky-400 text-xs">https://oxcyshopsecuritybb.vercel.app/auth/callback</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
