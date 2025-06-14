"use client"

import { useState } from "react"
import { Shield, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Particles } from "@/components/particles"
import Link from "next/link"

export default function SimpleAuthPage() {
  const [step, setStep] = useState(1)

  // Configuración simplificada
  const discordClientId = "1373548029008805950"
  const redirectUri = "https://oxcyshopsecurity.netlify.app/auth/callback"

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify%20guilds%20guilds.members.read`

  const steps = [
    {
      title: "Paso 1: Verificar Configuración",
      description: "Asegúrate de que tu aplicación Discord esté configurada correctamente",
      action: () => window.open("https://discord.com/developers/applications", "_blank"),
    },
    {
      title: "Paso 2: Probar Autorización",
      description: "Haz clic para probar el flujo de autorización de Discord",
      action: () => window.open(discordAuthUrl, "_blank"),
    },
    {
      title: "Paso 3: Verificar Callback",
      description: "Si todo está bien, serás redirigido de vuelta a la aplicación",
      action: () => setStep(4),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <Particles />

      <div className="max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-sky-400" />
            <span className="text-2xl font-bold text-white">OxcyShop Security</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Autenticación Simplificada</h1>
          <p className="text-gray-300">Proceso paso a paso para configurar Discord OAuth2</p>
        </div>

        {/* Current Configuration */}
        <Card className="bg-gray-900/50 border-sky-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Configuración Actual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <span className="text-gray-300 text-sm">Client ID:</span>
              <code className="block text-sky-400 font-mono">{discordClientId}</code>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <span className="text-gray-300 text-sm">Redirect URI:</span>
              <code className="block text-sky-400 font-mono text-sm break-all">{redirectUri}</code>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((stepInfo, index) => (
            <Card
              key={index}
              className={`bg-gray-900/50 border-sky-500/20 ${step === index + 1 ? "ring-2 ring-sky-500" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      step > index + 1 ? "bg-green-500" : step === index + 1 ? "bg-sky-500" : "bg-gray-600"
                    }`}
                  >
                    {step > index + 1 ? "✓" : index + 1}
                  </div>
                  {stepInfo.title}
                </CardTitle>
                <CardDescription className="text-gray-300 ml-11">{stepInfo.description}</CardDescription>
              </CardHeader>
              <CardContent className="ml-11">
                <Button onClick={stepInfo.action} className="bg-sky-500 hover:bg-sky-600" disabled={step < index + 1}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {index === 0 ? "Abrir Developer Portal" : index === 1 ? "Probar Autorización" : "Continuar"}
                </Button>
                {step === index + 1 && index < 2 && (
                  <Button variant="outline" className="ml-2 border-gray-600" onClick={() => setStep(step + 1)}>
                    Marcar como Completado
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manual URL Test */}
        <Card className="bg-gray-900/50 border-yellow-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-white">🔗 URL de Prueba Manual</CardTitle>
            <CardDescription className="text-gray-300">
              Copia y pega esta URL en tu navegador para probar manualmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <code className="text-sky-400 text-sm break-all">{discordAuthUrl}</code>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => navigator.clipboard.writeText(discordAuthUrl)}
                variant="outline"
                className="border-sky-500/50 text-sky-400"
              >
                📋 Copiar URL
              </Button>
              <Button onClick={() => window.open(discordAuthUrl, "_blank")} className="bg-[#5865F2] hover:bg-[#4752C4]">
                🔗 Abrir en Nueva Pestaña
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
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
