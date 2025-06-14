"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Particles } from "@/components/particles"
import Link from "next/link"

type AuthStatus = "loading" | "success" | "error"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<AuthStatus>("loading")
  const [userInfo, setUserInfo] = useState<any>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      setStatus("error")
      setError("Autenticación cancelada o falló")
      return
    }

    if (code) {
      handleDiscordCallback(code)
    } else {
      setStatus("error")
      setError("No se recibió código de autorización")
    }
  }, [searchParams])

  const handleDiscordCallback = async (code: string) => {
    try {
      // Intercambiar código por token de acceso
      const tokenResponse = await fetch("/api/auth/discord/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!tokenResponse.ok) {
        throw new Error("Error al intercambiar código por token")
      }

      const { access_token } = await tokenResponse.json()

      // Obtener información del usuario
      const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      if (!userResponse.ok) {
        throw new Error("Error al obtener información del usuario")
      }

      const userData = await userResponse.json()
      setUserInfo(userData)

      // Crear sesión simple
      const sessionToken = btoa(
        JSON.stringify({
          userId: userData.id,
          username: userData.username,
          avatar: userData.avatar,
          timestamp: Date.now(),
        }),
      )

      // Guardar en localStorage
      localStorage.setItem("oxcy_auth_token", sessionToken)
      localStorage.setItem("oxcy_user_info", JSON.stringify(userData))

      // También guardar en cookies para el middleware
      document.cookie = `oxcy_auth_token=${sessionToken}; path=/; max-age=86400; secure; samesite=strict`

      setStatus("success")

      // Redirección inmediata y más robusta
      console.log("Redirigiendo al dashboard...")
      setTimeout(() => {
        console.log("Ejecutando redirección...")
        window.location.href = "/dashboard"
      }, 1500)

      // Backup: redirección alternativa si la primera falla
      setTimeout(() => {
        if (window.location.pathname !== "/dashboard") {
          console.log("Redirección de respaldo...")
          router.replace("/dashboard")
        }
      }, 3000)
    } catch (err) {
      console.error("Error de autenticación:", err)
      setStatus("error")
      setError(err instanceof Error ? err.message : "Error desconocido")
    }
  }

  const getStatusContent = () => {
    switch (status) {
      case "loading":
        return {
          icon: <Loader2 className="h-12 w-12 text-sky-400 animate-spin" />,
          title: "Verificando acceso...",
          description: "Por favor espera mientras verificamos tu cuenta de Discord",
          color: "sky",
        }

      case "success":
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-400" />,
          title: "¡Acceso concedido!",
          description: "Bienvenido al Dashboard de OxcyShop Security. Redirigiendo...",
          color: "green",
        }

      case "error":
        return {
          icon: <XCircle className="h-12 w-12 text-red-400" />,
          title: "Error de autenticación",
          description: error || "Ocurrió un error durante la autenticación",
          color: "red",
        }
    }
  }

  const content = getStatusContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <Particles />

      <div className="max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-sky-400" />
            <span className="text-2xl font-bold text-white">OxcyShop Security</span>
          </Link>
        </div>

        {/* Status Card */}
        <Card className="bg-gray-900/50 border-sky-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">{content.icon}</div>
            <CardTitle className="text-white text-xl">{content.title}</CardTitle>
            <CardDescription className="text-gray-300">{content.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Info */}
            {userInfo && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{userInfo.username}</p>
                    <p className="text-gray-400 text-sm">#{userInfo.discriminator}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Autenticación exitosa
                </div>
                <div className="flex items-center text-green-400 text-sm mt-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Sesión iniciada correctamente
                </div>
                <Button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="w-full mt-3 bg-sky-500 hover:bg-sky-600"
                >
                  Ir al Dashboard Manualmente
                </Button>
              </div>
            )}

            {/* Error Actions */}
            {status === "error" && (
              <div className="border-t border-gray-700 pt-4">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => router.push("/auth/login")}
                >
                  Intentar de nuevo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Autenticación segura con Discord OAuth2</p>
        </div>
      </div>
    </div>
  )
}
