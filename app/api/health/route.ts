import { NextResponse } from "next/server"

export async function GET() {
  try {
    const config = {
      discord: {
        clientId: process.env.DISCORD_CLIENT_ID ? "✅ Configurado" : "❌ Faltante",
        clientSecret: process.env.DISCORD_CLIENT_SECRET ? "✅ Configurado" : "❌ Faltante",
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      status: "ok",
      message: "OxcyShop Security API is running",
      config,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
