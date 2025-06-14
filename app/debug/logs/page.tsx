"use client"

import { useState } from "react"
import { Shield, Terminal, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function LogsDebugPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testTokenExchange = async () => {
    setIsLoading(true)
    try {
      // Simular el flujo completo
      const discordClientId = "1373548029008805950"
      const redirectUri = encodeURIComponent("https://oxcyshopsecuritybb.vercel.app/auth/callback")
      const scope = encodeURIComponent("identify")

      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`

      setTestResult({
        step: "redirect",
        authUrl: authUrl,
        message: "Redirigiendo a Discord para obtener código...",
      })

      // Abrir Discord OAuth
      window.open(authUrl, "_blank")
    } catch (error) {
      setTestResult({
        step: "error",
        error: error.message,
      })
    }
    setIsLoading(false)
  }

  const checkEnvironmentVars = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      setTestResult({
        step: "environment",
        data: data,
      })
    } catch (error) {
      setTestResult({
        step: "error",
        error: error.message,
      })
    }
    setIsLoading(false)
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
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Debug Logs & Token Exchange</h1>
          <p className="text-gray-300">Diagnóstico detallado del error de autenticación</p>
        </div>

        {/* Current Error */}
        <Card className="bg-red-900/20 border-red-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
              Error Actual: Token Exchange Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-300">
                El error "Error al intercambiar código por token" indica que Discord está enviando el código
                correctamente, pero nuestro servidor no puede convertirlo en un token de acceso.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-red-400 font-mono text-sm">❌ Error: "Error al intercambiar código por token"</p>
                <p className="text-gray-400 text-xs mt-1">
                  Esto ocurre en: /api/auth/discord/token cuando se hace POST con el código
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discord App Info */}
        <Card className="bg-blue-900/20 border-blue-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-400" />
              Información de la Aplicación Discord
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300 text-sm">Application ID:</p>
                    <code className="text-green-400 font-mono">1373548029008805950</code>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Public Key:</p>
                    <code className="text-green-400 font-mono text-xs">
                      bf3790f52a68c6f23cafa8fc7811a62da36ab4471b625b06294619ad553ac77d
                    </code>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  ✅ <strong>Aplicación Discord confirmada</strong> - Ahora necesitamos obtener el Client Secret
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debug Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Terminal className="h-5 w-5 mr-2 text-sky-400" />
                Verificar Variables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Verificar que todas las variables de entorno estén configuradas correctamente
              </p>
              <Button
                onClick={checkEnvironmentVars}
                disabled={isLoading}
                className="w-full bg-sky-500 hover:bg-sky-600"
              >
                {isLoading ? "Verificando..." : "🔍 Verificar Environment"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-sky-400" />
                Probar Flujo Completo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">Probar el flujo completo de OAuth2 y ver los logs detallados</p>
              <Button
                onClick={testTokenExchange}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                {isLoading ? "Probando..." : "🧪 Probar OAuth2"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        {testResult && (
          <Card className="bg-gray-900/50 border-sky-500/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">📊 Resultados del Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Most Likely Issues */}
        <Card className="bg-gray-900/50 border-yellow-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
              Problemas Más Probables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-white font-medium">DISCORD_CLIENT_SECRET No Configurado</p>
                  <p className="text-gray-400 text-sm">
                    La variable más crítica. Sin ella, Discord rechaza la petición inmediatamente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="text-white font-medium">Client Secret Incorrecto</p>
                  <p className="text-gray-400 text-sm">
                    El valor no coincide con el que está en Discord Developer Portal.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-white font-medium">Redirect URI Mismatch</p>
                  <p className="text-gray-400 text-sm">
                    La URI configurada en Discord no coincide exactamente con la que enviamos.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step by Step Fix */}
        <Card className="bg-gray-900/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Solución Paso a Paso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-white font-medium mb-2">1. Obtener Client Secret Correcto</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Ve a Discord Developer Portal y copia el Client Secret exacto
                </p>
                <Button
                  onClick={() =>
                    window.open("https://discord.com/developers/applications/1373548029008805950", "_blank")
                  }
                  className="bg-[#5865F2] hover:bg-[#4752C4]"
                >
                  🔗 Abrir Discord App
                </Button>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-white font-medium mb-2">2. Configurar en Vercel</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Ve a tu proyecto en Vercel → Settings → Environment Variables
                </p>
                <div className="bg-gray-800 rounded-lg p-3 mb-3">
                  <code className="text-green-400 text-sm">DISCORD_CLIENT_SECRET=tu_client_secret_real</code>
                </div>
                <Button
                  onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                  className="bg-black hover:bg-gray-800 border border-gray-700"
                >
                  🔗 Abrir Vercel
                </Button>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-white font-medium mb-2">3. Verificar Logs en Tiempo Real</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Después de configurar, los logs de Vercel mostrarán exactamente qué está pasando
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <Link href="/auth/login">
                    <Button className="w-full bg-sky-500 hover:bg-sky-600">🔐 Probar Login</Button>
                  </Link>
                  <Button
                    onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                    variant="outline"
                    className="w-full border-gray-600"
                  >
                    📊 Ver Logs Vercel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
