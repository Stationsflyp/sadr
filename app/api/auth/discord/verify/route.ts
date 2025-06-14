import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { access_token, user_id } = await request.json()

    if (!access_token || !user_id) {
      return NextResponse.json({ error: "Access token and user ID are required" }, { status: 400 })
    }

    // Verificación simple - solo verificar que el token sea válido
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Invalid access token" }, { status: 401 })
    }

    const userData = await userResponse.json()

    // Crear token simple (base64)
    const sessionToken = btoa(
      JSON.stringify({
        userId: user_id,
        username: userData.username,
        avatar: userData.avatar,
        timestamp: Date.now(),
      }),
    )

    return NextResponse.json({
      success: true,
      sessionToken: sessionToken,
      user: userData,
      message: "Access granted to OxcyShop Security Dashboard",
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
