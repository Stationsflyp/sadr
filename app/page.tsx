"use client"

import { useState } from "react"
import { Shield, Eye, ArrowRight, Github, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Particles } from "@/components/particles"

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Particles />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-sky-400" />
              <span className="text-xl font-bold text-white">OxcyShop Security</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-sky-400 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-sky-400 transition-colors">
                Pricing
              </Link>
              <Link href="#contact" className="text-gray-300 hover:text-sky-400 transition-colors">
                Contact
              </Link>
              <Link href="/auth/login">
                <Button className="bg-sky-500 hover:bg-sky-600 text-white">Access Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full w-96 h-96 mx-auto -z-10"></div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Ultimate <span className="text-sky-400">AntiCrack</span>
              <br />
              Protection System
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Enterprise-grade security solution for C++ executables and cross-platform applications. Protect your
            software from reverse engineering, cracking, and unauthorized manipulation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 text-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Protecting Now
                <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${isHovered ? "translate-x-1" : ""}`} />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-sky-500 text-sky-400 hover:bg-sky-500/10 px-8 py-4 text-lg"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-sky-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Sistema Operativo</h2>
            </div>
            <p className="text-gray-300 mb-4">
              OxcyShop Security está funcionando correctamente y listo para proteger tus aplicaciones.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-green-400 font-bold">✅ API Activa</div>
                <div className="text-gray-400">Servicios en línea</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-green-400 font-bold">✅ Autenticación</div>
                <div className="text-gray-400">Discord OAuth2</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-green-400 font-bold">✅ Dashboard</div>
                <div className="text-gray-400">Completamente funcional</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Acceso Rápido</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-sky-500/20 hover:border-sky-500/40 transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-sky-400 mb-4 mx-auto" />
                <CardTitle className="text-white">Dashboard de Seguridad</CardTitle>
                <CardDescription className="text-gray-300">
                  Accede al panel principal para monitorear y gestionar la protección de tus aplicaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth/login">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Acceder al Dashboard</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-sky-500/20 hover:border-sky-500/40 transition-all duration-300">
              <CardHeader>
                <Eye className="h-12 w-12 text-sky-400 mb-4 mx-auto" />
                <CardTitle className="text-white">Radar de Amenazas</CardTitle>
                <CardDescription className="text-gray-300">
                  Visualiza en tiempo real las amenazas detectadas y bloqueadas por el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth/login">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Ver Radar en Vivo</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-sky-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-sky-400" />
              <span className="text-lg font-bold text-white">OxcyShop Security</span>
            </div>
            <div className="flex space-x-6">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-sky-400">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-sky-400">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-sky-400">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 OxcyShop Security. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
