"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function TokenDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkEnvironment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      setDebugInfo(data)
    } catch (error) {
      setDebugInfo({ error: error.message })
    }
    setIsLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const envVarsTemplate = `DISCORD_CLIENT_ID=1373548029008805950
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
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Debug Token Exchange</h1>
          <p className="text-gray-300">Diagnosticar error de intercambio de token</p>
        </div>

        {/* Error Alert */}
        <Card className="bg-red-900/20 border-red-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
              Error Detectado: Token Exchange Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              El código de autorización se recibe correctamente de Discord, pero falla al intercambiarlo por un token de
              acceso.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-red-400 font-mono text-sm">Error: "Error al intercambiar código por token"</p>
            </div>
          </CardContent>
        </Card>

        {/* Environment Check */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <RefreshCw className="h-5 w-5 mr-2 text-sky-400" />
              Verificar Variables de Entorno
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={checkEnvironment} disabled={isLoading} className="w-full bg-sky-500 hover:bg-sky-600">
              {isLoading ? "Verificando..." : "🔍 Verificar Configuración"}
            </Button>

            {debugInfo && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Most Common Issues */}
        <Card className="bg-gray-900/50 border-yellow-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
              Problemas Más Comunes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-white font-medium">Client Secret No Configurado</p>
                  <p className="text-gray-400 text-sm">La variable DISCORD_CLIENT_SECRET no está en Vercel</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="text-white font-medium">Client Secret Incorrecto</p>
                  <p className="text-gray-400 text-sm">El valor del Client Secret no coincide con Discord</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-white font-medium">Redirect URI No Coincide</p>
                  <p className="text-gray-400 text-sm">La URI en Discord no es exactamente igual a la configurada</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution Steps */}
        <Card className="bg-gray-900/50 border-green-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Solución Paso a Paso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-sky-500 pl-4">
              <h3 className="text-white font-medium mb-2">1. Verificar Client Secret en Discord</h3>
              <p className="text-gray-300 text-sm mb-3">Ve a tu aplicación Discord y copia el Client Secret correcto</p>
              <Button
                onClick={() => window.open("https://discord.com/developers/applications/1373548029008805950", "_blank")}
                className="bg-[#5865F2] hover:bg-[#4752C4]"
              >
                🔗 Abrir Aplicación Discord
              </Button>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-sky-500 pl-4">
              <h3 className="text-white font-medium mb-2">2. Configurar Variables en Vercel</h3>
              <p className="text-gray-300 text-sm mb-3">Configura estas 5 variables exactamente como se muestra:</p>
              <div className="bg-gray-800 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Variables de entorno:</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(envVarsTemplate)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-green-400 text-sm">
                  <code>{envVarsTemplate}</code>
                </pre>
              </div>
              <Button
                onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                className="bg-black hover:bg-gray-800 border border-gray-700"
              >
                🔗 Abrir Vercel Dashboard
              </Button>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-sky-500 pl-4">
              <h3 className="text-white font-medium mb-2">3. Verificar Redirect URI en Discord</h3>
              <p className="text-gray-300 text-sm mb-3">Asegúrate de que esta URI esté configurada exactamente así:</p>
              <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
                <code className="text-sky-400 text-sm">https://oxcyshopsecuritybb.vercel.app/auth/callback</code>
              </div>
              <p className="text-gray-400 text-xs">📍 OAuth2 → General → Redirects → Add Redirect</p>
            </div>
          </CardContent>
        </Card>

        {/* Test Again */}
        <Card className="bg-gray-900/50 border-sky-500/20">
          <CardHeader>
            <CardTitle className="text-white">🧪 Probar Después de Configurar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">Una vez configuradas las variables, prueba de nuevo:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/auth/login">
                <Button className="w-full bg-sky-500 hover:bg-sky-600">🔐 Probar Login</Button>
              </Link>
              <Link href="/debug">
                <Button variant="outline" className="w-full border-sky-500/50 text-sky-400">
                  🔍 Diagnóstico General
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
