"use client"

import { useState } from "react"
import { Shield, ExternalLink, Copy, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function SetupPage() {
  const [newClientId, setNewClientId] = useState("")
  const [step, setStep] = useState(1)

  const currentDomain = "https://oxcyshopsecuritybb.vercel.app"
  const redirectUri = `${currentDomain}/auth/callback`

  const steps = [
    {
      title: "Verificar Aplicación Existente",
      description: "Primero verificamos si la aplicación actual funciona",
    },
    {
      title: "Crear Nueva Aplicación",
      description: "Si no funciona, creamos una nueva aplicación Discord",
    },
    {
      title: "Configurar OAuth2",
      description: "Configuramos los permisos y redirect URIs",
    },
    {
      title: "Actualizar Código",
      description: "Actualizamos el código con el nuevo Client ID",
    },
  ]

  const testCurrentApp = () => {
    const currentClientId = "1373548029008805950"
    const testUrl = `https://discord.com/api/oauth2/authorize?client_id=${currentClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`
    window.open(testUrl, "_blank")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
          <h1 className="text-3xl font-bold text-white mb-2">Configuración Discord OAuth2</h1>
          <p className="text-gray-300">Resolver problemas de autenticación</p>
        </div>

        {/* Problem Alert */}
        <Card className="bg-red-900/20 border-red-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
              Problema Detectado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              La URL de OAuth2 está redirigiendo a la página principal de Discord en lugar de la página de autorización.
              Esto indica que la aplicación Discord no está configurada correctamente.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-300 text-sm mb-2">URL que está fallando:</p>
              <code className="text-red-400 text-xs break-all">
                https://discord.com/oauth2/authorize?client_id=1373548029008805950&response_type=code&redirect_uri=https%3A%2F%2Foxcyshopsecuritybb.vercel.app%2Fauth%2Fcallback&scope=identify
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Solution */}
        <div className="space-y-6">
          {/* Step 1: Verify Current App */}
          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                  1
                </div>
                Verificar Aplicación Actual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Primero, vamos a verificar si tu aplicación Discord actual existe y está configurada:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open("https://discord.com/developers/applications", "_blank")}
                  className="bg-[#5865F2] hover:bg-[#4752C4]"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir Developer Portal
                </Button>
                <Button onClick={testCurrentApp} variant="outline" className="border-sky-500/50 text-sky-400">
                  🔗 Probar App Actual
                </Button>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm mb-2">Busca esta aplicación:</p>
                <code className="text-sky-400">Client ID: 1373548029008805950</code>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Create New App */}
          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                  2
                </div>
                Crear Nueva Aplicación Discord
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Si la aplicación no existe o no funciona, crea una nueva:</p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span className="text-gray-300">Ve a Discord Developer Portal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span className="text-gray-300">Haz clic en "New Application"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span className="text-gray-300">Nombra tu aplicación: "OxcyShop Security"</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Configure OAuth2 */}
          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                  3
                </div>
                Configurar OAuth2
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Una vez creada la aplicación:</p>

              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium mb-2">1. Ve a OAuth2 → General</p>
                  <p className="text-gray-400 text-sm">En el panel izquierdo de tu aplicación</p>
                </div>

                <div>
                  <p className="text-white font-medium mb-2">2. Agrega Redirect URI:</p>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <code className="text-sky-400 text-sm">{redirectUri}</code>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(redirectUri)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-white font-medium mb-2">3. Copia el Client ID:</p>
                  <Input
                    placeholder="Pega aquí el nuevo Client ID"
                    value={newClientId}
                    onChange={(e) => setNewClientId(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Update Code */}
          {newClientId && (
            <Card className="bg-gray-900/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Código Actualizado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">Usa estas variables de entorno en Vercel:</p>

                <div className="bg-gray-800 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    DISCORD_CLIENT_ID={newClientId}
                    <br />
                    DISCORD_CLIENT_SECRET=tu_client_secret_aqui
                    <br />
                    DISCORD_REDIRECT_URI={redirectUri}
                    <br />
                    NEXT_PUBLIC_DISCORD_CLIENT_ID={newClientId}
                    <br />
                    NEXT_PUBLIC_APP_URL={currentDomain}
                  </code>
                </div>

                <Button
                  onClick={() => {
                    const testUrl = `https://discord.com/api/oauth2/authorize?client_id=${newClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`
                    window.open(testUrl, "_blank")
                  }}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  🧪 Probar Nueva Configuración
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link href="/debug">
            <Button variant="outline" className="border-sky-500/50 text-sky-400">
              🔍 Diagnóstico Completo
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" className="border-gray-600 text-gray-300">
              ← Volver al Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
