"use client"

import { useState } from "react"
import { Shield, Key, Copy, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function ClientSecretPage() {
  const [clientSecret, setClientSecret] = useState("")
  const [isValidated, setIsValidated] = useState(false)

  const validateClientSecret = () => {
    // Basic validation - Discord client secrets are typically 32 characters
    if (clientSecret.length >= 32 && clientSecret.includes("_")) {
      setIsValidated(true)
    } else {
      setIsValidated(false)
    }
  }

  const copyEnvVars = () => {
    const envVars = `DISCORD_CLIENT_ID=1373548029008805950
DISCORD_CLIENT_SECRET=${clientSecret}
DISCORD_REDIRECT_URI=https://oxcyshopsecuritybb.vercel.app/auth/callback
NEXT_PUBLIC_DISCORD_CLIENT_ID=1373548029008805950
NEXT_PUBLIC_APP_URL=https://oxcyshopsecuritybb.vercel.app`

    navigator.clipboard.writeText(envVars)
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
          <h1 className="text-3xl font-bold text-white mb-2">🔑 Obtener Client Secret</h1>
          <p className="text-gray-300">Último paso para completar la configuración</p>
        </div>

        {/* App Info Confirmed */}
        <Card className="bg-green-900/20 border-green-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />✅ Aplicación Discord Confirmada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-300 text-sm">Application ID:</p>
                <code className="text-green-400 font-mono">1373548029008805950</code>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-300 text-sm">Status:</p>
                <span className="text-green-400 font-medium">✅ Verificada y Activa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Get Client Secret */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Key className="h-5 w-5 mr-2 text-sky-400" />
              Paso 1: Obtener Client Secret
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                  1
                </div>
                <span className="text-gray-300">Haz clic en el botón para abrir tu aplicación Discord</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                  2
                </div>
                <span className="text-gray-300">En "General Information", busca "Client Secret"</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                  3
                </div>
                <span className="text-gray-300">Si no lo ves, haz clic en "Reset Secret"</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                  4
                </div>
                <span className="text-gray-300">Copia el Client Secret y pégalo abajo</span>
              </div>
            </div>

            <Button
              onClick={() => window.open("https://discord.com/developers/applications/1373548029008805950", "_blank")}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
            >
              <ExternalLink className="h-4 w-4 mr-2" />🔗 Abrir Mi Aplicación Discord
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Enter Client Secret */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Key className="h-5 w-5 mr-2 text-sky-400" />
              Paso 2: Pegar Client Secret
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Client Secret de Discord:</label>
              <Input
                type="password"
                placeholder="Pega aquí tu Client Secret..."
                value={clientSecret}
                onChange={(e) => {
                  setClientSecret(e.target.value)
                  validateClientSecret()
                }}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {clientSecret && (
              <div
                className={`p-3 rounded-lg border ${isValidated ? "bg-green-500/10 border-green-500/20" : "bg-yellow-500/10 border-yellow-500/20"}`}
              >
                {isValidated ? (
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2" />✅ Formato válido del Client Secret
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-400 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    ⚠️ Verifica que hayas copiado el Client Secret completo
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 3: Configure Vercel */}
        {isValidated && (
          <Card className="bg-gray-900/50 border-green-500/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                Paso 3: Configurar Variables en Vercel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Copia estas variables y configúralas en Vercel:</p>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Variables de entorno completas:</span>
                  <Button size="sm" variant="ghost" onClick={copyEnvVars}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-green-400 text-sm">
                  <code>{`DISCORD_CLIENT_ID=1373548029008805950
DISCORD_CLIENT_SECRET=${clientSecret}
DISCORD_REDIRECT_URI=https://oxcyshopsecuritybb.vercel.app/auth/callback
NEXT_PUBLIC_DISCORD_CLIENT_ID=1373548029008805950
NEXT_PUBLIC_APP_URL=https://oxcyshopsecuritybb.vercel.app`}</code>
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                  className="bg-black hover:bg-gray-800 border border-gray-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />🔗 Abrir Vercel Dashboard
                </Button>
                <Button onClick={copyEnvVars} variant="outline" className="border-green-500/50 text-green-400">
                  <Copy className="h-4 w-4 mr-2" />📋 Copiar Variables
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Test */}
        {isValidated && (
          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-sky-400" />
                Paso 4: Probar Configuración
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Una vez configuradas las variables en Vercel:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/auth/login">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600">🔐 Probar Login</Button>
                </Link>
                <Link href="/debug/logs">
                  <Button variant="outline" className="w-full border-sky-500/50 text-sky-400">
                    📊 Ver Logs Detallados
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-gray-900/50 border-gray-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">📋 Instrucciones para Vercel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-300">
              <p>1. Ve a tu proyecto en Vercel Dashboard</p>
              <p>
                2. Haz clic en <strong>Settings</strong>
              </p>
              <p>
                3. Ve a <strong>Environment Variables</strong>
              </p>
              <p>4. Agrega cada variable una por una</p>
              <p>
                5. Haz clic en <strong>Save</strong> después de cada una
              </p>
              <p>6. Vercel automáticamente redesplegará tu aplicación</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
