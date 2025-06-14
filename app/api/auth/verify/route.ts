import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verificación simple del token (base64 decode)
    const decoded = JSON.parse(atob(token))

    // Verificar estructura básica
    if (!decoded.userId || !decoded.username) {
      return NextResponse.json({ error: "Invalid token structure" }, { status: 401 })
    }

    // Verificar que no sea muy antiguo (24 horas)
    const tokenAge = Date.now() - decoded.timestamp
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    return NextResponse.json({
      valid: true,
      userId: decoded.userId,
      username: decoded.username,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
