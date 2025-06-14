import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Código de autorización requerido" }, { status: 400 })
    }

    // Configuración CORRECTA para Vercel
    const clientId = "1373548029008805950"
    const clientSecret = "nyv0KnLZPoc6fd_iqiGhCfkIDIQCvsBm"
    const redirectUri = "https://oxcyshopsecuritybb.vercel.app/auth/callback"

    console.log("=== TOKEN EXCHANGE DEBUG ===")
    console.log("Client ID:", clientId)
    console.log("Client Secret exists:", !!clientSecret)
    console.log("Redirect URI:", redirectUri)
    console.log("Code received:", code.substring(0, 10) + "...")

    // Intercambiar código por token de acceso
    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    })

    console.log("Sending request to Discord...")

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "OxcyShop-Security/1.0",
      },
      body: tokenParams,
    })

    console.log("Discord response status:", tokenResponse.status)

    const responseText = await tokenResponse.text()
    console.log("Discord response:", responseText)

    if (!tokenResponse.ok) {
      let errorDetails = "Unknown error"
      try {
        const parsedError = JSON.parse(responseText)
        errorDetails = parsedError.error_description || parsedError.error || "Discord API error"
        console.error("❌ Discord API Error:", parsedError)
      } catch (e) {
        console.error("❌ Discord API Error (raw):", responseText)
      }

      return NextResponse.json(
        {
          error: "Error al intercambiar código por token",
          details: errorDetails,
          discord_response: responseText,
          status: tokenResponse.status,
        },
        { status: 400 },
      )
    }

    const tokenData = JSON.parse(responseText)
    console.log("✅ Token exchange successful")

    return NextResponse.json({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in,
    })
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
