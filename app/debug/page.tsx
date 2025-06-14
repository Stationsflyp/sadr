"use client"

import { useState } from "react"
import { Shield, CheckCircle, AlertTriangle, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function DebugPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1373548029008805950"
  const redirectUri = "https://oxcyshopsecuritybb.vercel.app/auth/callback"
  const currentDomain = typeof window !== "undefined" ? window.location.origin : ""

  const runDiagnostics = async () => {
    setIsLoading(true)
    const results = {
      environment: {},
      discord: {},
      api: {},
      recommendations: [],
    }

    // Test 1: Environment Variables
    results.environment = {
      clientId: !!discordClientId,
      clientIdValue: discordClientId,
      redirectUri: redirectUri,
      currentDomain: currentDomain,
    }

    // Test 2: Discord Application Check
    try {
      const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`

      results.discord = {
        authUrl: discordAuthUrl,
        clientIdValid: discordClientId.length === 18,
        redirectUriEncoded: encodeURIComponent(redirectUri),
      }
    } catch (error) {
      results.discord.error = error.message
    }

    // Test 3: API Endpoints
    try {
      const response = await fetch("/api/health", { method: "GET" })
      results.api.health = response.ok
      results.api.status = response.status
    } catch (error) {
      results.api.error = error.message
    }

    // Generate recommendations
    if (!results.environment.clientId) {
      results.recommendations.push("❌ DISCORD_CLIENT_ID no está configurado")
    }

    if (!results.discord.clientIdValid) {
      results.recommendations.push("❌ Client ID no tiene el formato correcto (debe ser 18 dígitos)")
    }

    if (results.environment.currentDomain !== "https://oxcyshopsecuritybb.vercel.app") {
      results.recommendations.push("⚠️ Dominio actual no coincide con la configuración de producción")
    }

    setTestResults(results)
    setIsLoading(false)
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
          <h1 className="text-3xl font-bold text-white mb-2">Sistema de Diagnóstico</h1>
          <p className="text-gray-300">Diagnosticar problemas de autenticación Discord</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Button onClick={runDiagnostics} disabled={isLoading} className="bg-sky-500 hover:bg-sky-600">
            {isLoading ? "Diagnosticando..." : "🔍 Ejecutar Diagnóstico"}
          </Button>

          <Button
            onClick={() =>
              window.open(
                `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`,
                "_blank",
              )
            }
            variant="outline"
            className="border-sky-500/50 text-sky-400"
          >
            🔗 Probar OAuth Discord
          </Button>

          <Button
            onClick={() => window.open("https://discord.com/developers/applications", "_blank")}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            ⚙️ Discord Developer Portal
          </Button>
        </div>

        {/* Configuration Info */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Configuración Actual - Vercel</CardTitle>
            <CardDescription className="text-gray-300">oxcyshopsecuritybb.vercel.app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Client ID:</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(discordClientId)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <code className="text-sky-400 font-mono text-sm">{discordClientId}</code>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Redirect URI:</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(redirectUri)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <code className="text-sky-400 font-mono text-sm break-all">{redirectUri}</code>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <span className="text-gray-300">Dominio Actual: </span>
              <code className="text-white font-mono">{currentDomain}</code>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center text-green-400 mb-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">Configurado para Vercel</span>
              </div>
              <p className="text-gray-300 text-sm">
                La aplicación está optimizada para deployment en Vercel con el dominio oxcyshopsecuritybb.vercel.app
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults && (
          <div className="space-y-6">
            {/* Environment Tests */}
            <Card className="bg-gray-900/50 border-sky-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Variables de Entorno
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Client ID configurado:</span>
                    {testResults.environment.clientId ? (
                      <Badge className="bg-green-500">✅ Sí</Badge>
                    ) : (
                      <Badge variant="destructive">❌ No</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Formato Client ID:</span>
                    {testResults.discord.clientIdValid ? (
                      <Badge className="bg-green-500">✅ Válido</Badge>
                    ) : (
                      <Badge variant="destructive">❌ Inválido</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Plataforma:</span>
                    <Badge className="bg-blue-500">Vercel</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discord Tests */}
            <Card className="bg-gray-900/50 border-sky-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-sky-400" />
                  Configuración Discord
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">URL de Autorización:</span>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(testResults.discord.authUrl)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <code className="text-sky-400 font-mono text-xs break-all">{testResults.discord.authUrl}</code>
                  </div>

                  <Button
                    onClick={() => window.open(testResults.discord.authUrl, "_blank")}
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                  >
                    🔗 Probar Autorización Discord
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {testResults.recommendations.length > 0 && (
              <Card className="bg-gray-900/50 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                    Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {testResults.recommendations.map((rec, index) => (
                      <div key={index} className="text-gray-300 text-sm">
                        {rec}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Vercel Configuration Guide */}
        <Card className="bg-gray-900/50 border-sky-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">📋 Configuración Discord OAuth2</CardTitle>
            <CardDescription className="text-gray-300">
              Configurar Discord para oxcyshopsecuritybb.vercel.app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="text-white font-medium">Ve al Discord Developer Portal</p>
                  <p className="text-gray-400 text-sm">https://discord.com/developers/applications</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="text-white font-medium">Selecciona tu aplicación</p>
                  <p className="text-gray-400 text-sm">Client ID: {discordClientId}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="text-white font-medium">Ve a OAuth2 → General</p>
                  <p className="text-gray-400 text-sm">Agrega esta Redirect URI:</p>
                  <code className="block bg-gray-800 p-2 rounded text-sky-400 text-sm mt-1">{redirectUri}</code>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="text-white font-medium">Configura Variables de Entorno en Vercel</p>
                  <div className="bg-gray-800 p-3 rounded mt-2">
                    <code className="text-sky-400 text-sm">
                      DISCORD_CLIENT_ID=1373548029008805950
                      <br />
                      DISCORD_CLIENT_SECRET=tu_client_secret
                      <br />
                      DISCORD_REDIRECT_URI=https://oxcyshopsecuritybb.vercel.app/auth/callback
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link href="/auth/login">
            <Button variant="outline" className="border-sky-500/50 text-sky-400">
              ← Volver al Login
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
