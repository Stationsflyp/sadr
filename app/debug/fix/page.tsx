"use client"

import { useState } from "react"
import { Shield, AlertTriangle, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function FixConfigPage() {
  const [step, setStep] = useState(1)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const correctRedirectUri = "https://oxcyshopsecuritybb.vercel.app/auth/callback"
  const correctAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=1373548029008805950&response_type=code&redirect_uri=${encodeURIComponent(correctRedirectUri)}&scope=identify`

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
          <h1 className="text-3xl font-bold text-white mb-2">🔧 Arreglar Configuración</h1>
          <p className="text-gray-300">Solucionar inconsistencia de dominios</p>
        </div>

        {/* Problem Identified */}
        <Card className="bg-red-900/20 border-red-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
              Problema Identificado: Inconsistencia de Dominios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-red-400 text-sm mb-2">❌ Discord configurado para:</p>
                <code className="text-red-400 font-mono text-sm">oxcyshopsecurity.netlify.app/auth/callback</code>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-green-400 text-sm mb-2">✅ Tu aplicación está en:</p>
                <code className="text-green-400 font-mono text-sm">oxcyshopsecuritybb.vercel.app</code>
              </div>
              <p className="text-gray-300 text-sm">
                Por eso ves "Page not found" - Discord está redirigiendo al dominio incorrecto.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Solution Steps */}
        <div className="space-y-6">
          {/* Step 1: Update Discord */}
          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                  1
                </div>
                Actualizar Redirect URI en Discord
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Cambia la configuración en Discord para que apunte a Vercel:</p>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Nueva Redirect URI:</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(correctRedirectUri)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <code className="text-green-400 font-mono text-sm">{correctRedirectUri}</code>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 Ve a Discord Developer Portal</p>
                <p>📍 OAuth2 → General → Redirects</p>
                <p>📍 Reemplaza la URI antigua con la nueva</p>
                <p>📍 Haz clic en "Save Changes"</p>
              </div>

              <Button
                onClick={() => window.open("https://discord.com/developers/applications/1373548029008805950", "_blank")}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
              >
                <ExternalLink className="h-4 w-4 mr-2" />🔗 Abrir Discord Developer Portal
              </Button>
            </CardContent>
          </Card>

          {/* Step 2: Configure Vercel */}
          <Card className="bg-gray-900/50 border-sky-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                  2
                </div>
                Configurar Variables en Vercel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Configura estas variables exactas en Vercel:</p>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Variables de entorno:</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      copyToClipboard(`DISCORD_CLIENT_ID=1373548029008805950
DISCORD_CLIENT_SECRET=nyv0KnLZPoc6fd_iqiGhCfkIDIQCvsBm
DISCORD_REDIRECT_URI=https://oxcyshopsecuritybb.vercel.app/auth/callback
NEXT_PUBLIC_DISCORD_CLIENT_ID=1373548029008805950
NEXT_PUBLIC_APP_URL=https://oxcyshopsecuritybb.vercel.app`)
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-green-400 text-sm">
                  <code>{`DISCORD_CLIENT_ID=1373548029008805950
DISCORD_CLIENT_SECRET=nyv0KnLZPoc6fd_iqiGhCfkIDIQCvsBm
DISCORD_REDIRECT_URI=https://oxcyshopsecuritybb.vercel.app/auth/callback
NEXT_PUBLIC_DISCORD_CLIENT_ID=1373548029008805950
NEXT_PUBLIC_APP_URL=https://oxcyshopsecuritybb.vercel.app`}</code>
                </pre>
              </div>

              <Button
                onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                className="w-full bg-black hover:bg-gray-800 border border-gray-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />🔗 Abrir Vercel Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Step 3: Test */}
          <Card className="bg-gray-900/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                  3
                </div>
                Probar Configuración Corregida
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">Una vez actualizadas ambas configuraciones:</p>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 text-sm">URL de prueba corregida:</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(correctAuthUrl)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <code className="text-green-400 font-mono text-xs break-all">{correctAuthUrl}</code>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open(correctAuthUrl, "_blank")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  🧪 Probar OAuth2 Corregido
                </Button>
                <Link href="/auth/login">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600">🔐 Ir al Login</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="bg-gray-900/50 border-gray-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">📋 Resumen de Cambios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-red-400">
                <span className="mr-2">❌</span>
                <span>Antes: oxcyshopsecurity.netlify.app/auth/callback</span>
              </div>
              <div className="flex items-center text-green-400">
                <span className="mr-2">✅</span>
                <span>Ahora: oxcyshopsecuritybb.vercel.app/auth/callback</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
