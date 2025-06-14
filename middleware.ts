import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Rutas que requieren autenticación
  const protectedPaths = ["/dashboard"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // Verificar token en cookies primero, luego en headers
  const authToken =
    request.cookies.get("oxcy_auth_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  console.log("Middleware - Checking auth for:", request.nextUrl.pathname)
  console.log("Middleware - Token exists:", !!authToken)

  if (!authToken) {
    console.log("Middleware - No token found, redirecting to login")
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Verificación simple del token (base64 decode)
    const decoded = JSON.parse(atob(authToken))
    console.log("Middleware - Token decoded successfully:", decoded.username)

    // Verificar que el token tenga la estructura básica
    if (!decoded.userId || !decoded.username) {
      throw new Error("Token inválido")
    }

    // Verificar que no sea muy antiguo (24 horas)
    const tokenAge = Date.now() - decoded.timestamp
    if (tokenAge > 24 * 60 * 60 * 1000) {
      throw new Error("Token expirado")
    }

    console.log("Middleware - Auth successful, allowing access")

    // Agregar headers de seguridad
    const response = NextResponse.next()
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

    return response
  } catch (error) {
    console.error("Middleware - Token verification failed:", error.message)
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("error", "session_expired")
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
