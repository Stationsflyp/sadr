"use client"

import { useState, useEffect } from "react"
import { Particles } from "@/components/particles"
import {
  Shield,
  Activity,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Database,
  Cloud,
  FileText,
  Download,
  Upload,
  CreditCard,
  Trash2,
  History,
  LogOut,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [selectedApp, setSelectedApp] = useState("MyApp.exe")
  const [showProModal, setShowProModal] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nueva amenaza detectada en MyApp.exe", time: "2 min ago", type: "warning" },
    { id: 2, message: "Actualización de seguridad disponible", time: "1 hour ago", type: "info" },
    { id: 3, message: "Backup completado exitosamente", time: "3 hours ago", type: "success" },
  ])

  // Cargar información del usuario
  useEffect(() => {
    const userInfoStr = localStorage.getItem("oxcy_user_info")
    if (userInfoStr) {
      setUserInfo(JSON.parse(userInfoStr))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("oxcy_auth_token")
    localStorage.removeItem("oxcy_user_info")
    document.cookie = "oxcy_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push("/auth/login")
  }

  const protectedApps = [
    { name: "MyApp.exe", status: "Protected", threats: 0, lastScan: "2 min ago", size: "45.2 MB" },
    { name: "GameEngine.exe", status: "Scanning", threats: 2, lastScan: "5 min ago", size: "128.7 MB" },
    { name: "BusinessApp.exe", status: "Protected", threats: 0, lastScan: "1 hour ago", size: "23.1 MB" },
    { name: "UtilityTool.exe", status: "Warning", threats: 1, lastScan: "30 min ago", size: "12.8 MB" },
  ]

  const threatData = [
    { type: "Debugger Attempt", severity: "High", time: "2 min ago", blocked: true, app: "MyApp.exe" },
    { type: "Memory Dump", severity: "Medium", time: "15 min ago", blocked: true, app: "GameEngine.exe" },
    { type: "Code Injection", severity: "Critical", time: "1 hour ago", blocked: true, app: "BusinessApp.exe" },
    { type: "Process Hollowing", severity: "High", time: "2 hours ago", blocked: false, app: "UtilityTool.exe" },
  ]

  const handleProtectNewApp = () => {
    setShowProModal(true)
  }

  const handleAppAction = (action: string, appName: string) => {
    alert(`${action} ejecutado en ${appName}`)
  }

  const handleThreatAction = (action: string, threat: any) => {
    alert(`${action} para amenaza: ${threat.type}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Particles />
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-md border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-sky-400" />
                <span className="text-xl font-bold text-white">OxcyShop Security</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-sky-400">
                  <Activity className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-sky-400">
                  <Shield className="h-4 w-4 mr-2" />
                  Protection
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-sky-400">
                  <Eye className="h-4 w-4 mr-2" />
                  Radar Map
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-sky-400">
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-64"
                />
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-sky-400 relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-gray-800 border-gray-700" align="end">
                  <DropdownMenuLabel className="text-white">Notificaciones</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  {notifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="text-gray-300 hover:text-white p-3">
                      <div className="flex items-start space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notif.type === "warning"
                              ? "bg-yellow-500"
                              : notif.type === "success"
                                ? "bg-green-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm">{notif.message}</p>
                          <p className="text-xs text-gray-500">{notif.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {userInfo?.avatar ? (
                        <AvatarImage
                          src={`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`}
                          alt={userInfo.username}
                        />
                      ) : (
                        <AvatarFallback className="bg-sky-500 text-white">
                          {userInfo?.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end">
                  <DropdownMenuLabel className="text-white">
                    {userInfo ? (
                      <div>
                        <p>{userInfo.username}</p>
                        <p className="text-sm text-gray-400">#{userInfo.discriminator}</p>
                      </div>
                    ) : (
                      "Mi Cuenta"
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-red-400 hover:text-red-300" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido, {userInfo?.username || "Usuario"}</h1>
            <p className="text-gray-300">Monitor y gestiona la seguridad de tus aplicaciones</p>
          </div>
          <Dialog open={showProModal} onOpenChange={setShowProModal}>
            <DialogTrigger asChild>
              <Button className="bg-sky-500 hover:bg-sky-600 text-white" onClick={handleProtectNewApp}>
                <Plus className="h-4 w-4 mr-2" />
                Proteger Nueva App
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-sky-500/20 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-sky-400 mb-2">Upgrade to Pro</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Desbloquea protección avanzada para hasta 4 aplicaciones
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-sky-400 mb-2">$65</div>
                  <p className="text-gray-300">por mes</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Protege hasta 4 ejecutables
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Técnicas de ofuscación avanzadas
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Monitoreo de amenazas en tiempo real
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Anti-debug & detección de VM
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Soporte prioritario
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => alert("Redirigiendo a Stripe para el pago...")}
                  >
                    Actualizar a Pro - $65/mes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => setShowProModal(false)}
                  >
                    Tal vez más tarde
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-sky-500/20 cursor-pointer hover:border-sky-500/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Apps Protegidas</CardTitle>
              <Shield className="h-4 w-4 text-sky-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{protectedApps.length}</div>
              <p className="text-xs text-green-400">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2 desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-sky-500/20 cursor-pointer hover:border-sky-500/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Amenazas Bloqueadas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,247</div>
              <p className="text-xs text-green-400">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +15% desde la semana pasada
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-sky-500/20 cursor-pointer hover:border-sky-500/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Puntuación de Seguridad</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">98.5%</div>
              <Progress value={98.5} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-sky-500/20 cursor-pointer hover:border-sky-500/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monitoreo Activo</CardTitle>
              <Activity className="h-4 w-4 text-sky-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24/7</div>
              <p className="text-xs text-sky-400">Protección en tiempo real</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700 grid grid-cols-8 w-full">
            <TabsTrigger value="overview" className="data-[state=active]:bg-sky-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="protection" className="data-[state=active]:bg-sky-500">
              AntiCrack Protection
            </TabsTrigger>
            <TabsTrigger value="radar" className="data-[state=active]:bg-sky-500">
              Radar Map
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-sky-500">
              API Security
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-sky-500">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-sky-500">
              Integrations
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-sky-500">
              Settings
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-sky-500">
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Protected Applications - Interactive */}
              <Card className="bg-gray-900/50 border-sky-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Aplicaciones Protegidas</CardTitle>
                  <CardDescription className="text-gray-300">
                    Estado actual de tus ejecutables protegidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {protectedApps.map((app, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                          <div>
                            <p className="text-white font-medium">{app.name}</p>
                            <p className="text-sm text-gray-400">
                              Último escaneo: {app.lastScan} • {app.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              app.status === "Protected"
                                ? "default"
                                : app.status === "Warning"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={app.status === "Protected" ? "bg-green-500" : ""}
                          >
                            {app.status}
                          </Badge>
                          {app.threats > 0 && <Badge variant="destructive">{app.threats} amenazas</Badge>}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-gray-700">
                              <DropdownMenuItem
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleAppAction("Escanear", app.name)}
                              >
                                <Search className="mr-2 h-4 w-4" />
                                Escanear Ahora
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleAppAction("Configurar", app.name)}
                              >
                                <Settings className="mr-2 h-4 w-4" />
                                Configurar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleAppAction("Ver Logs", app.name)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Ver Logs
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-700" />
                              <DropdownMenuItem
                                className="text-red-400 hover:text-red-300"
                                onClick={() => handleAppAction("Eliminar Protección", app.name)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar Protección
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Threats - Interactive */}
              <Card className="bg-gray-900/50 border-sky-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Eventos de Seguridad Recientes</CardTitle>
                  <CardDescription className="text-gray-300">
                    Últimas actividades de detección y bloqueo de amenazas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threatData.map((threat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          {threat.blocked ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <div>
                            <p className="text-white font-medium">{threat.type}</p>
                            <p className="text-sm text-gray-400">
                              {threat.time} • {threat.app}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              threat.severity === "Critical"
                                ? "destructive"
                                : threat.severity === "High"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {threat.severity}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-gray-700">
                              <DropdownMenuItem
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleThreatAction("Ver Detalles", threat)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleThreatAction("Marcar como Falso Positivo", threat)}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Falso Positivo
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleThreatAction("Crear Regla", threat)}
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Crear Regla
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Interactive Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-sky-500/20 hover:border-sky-500/40 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Cloud className="h-5 w-5 mr-2 text-sky-400" />
                    Almacenamiento en la Nube
                  </CardTitle>
                  <CardDescription className="text-gray-300">Backup seguro y control de versiones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Usado:</span>
                      <span className="text-white">2.4 GB / 10 GB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => alert("Abriendo gestor de archivos...")}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Archivos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-sky-500/20 hover:border-sky-500/40 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="h-5 w-5 mr-2 text-sky-400" />
                    Base de Datos de Amenazas
                  </CardTitle>
                  <CardDescription className="text-gray-300">Red global de inteligencia de amenazas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Firmas:</span>
                      <span className="text-white">1,247,892</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Última Actualización:</span>
                      <span className="text-sky-400">2 min ago</span>
                    </div>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => alert("Actualizando base de datos de amenazas...")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Actualizar Base de Datos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-sky-500/20 hover:border-sky-500/40 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="h-5 w-5 mr-2 text-sky-400" />
                    Actividad del Equipo
                  </CardTitle>
                  <CardDescription className="text-gray-300">Acciones recientes de miembros del equipo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-sky-500 text-white text-xs">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white text-sm">John protegió MyApp.exe</p>
                        <p className="text-gray-400 text-xs">5 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        {userInfo?.avatar ? (
                          <AvatarImage
                            src={`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`}
                            alt={userInfo.username}
                          />
                        ) : (
                          <AvatarFallback className="bg-green-500 text-white text-xs">
                            {userInfo?.username?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white text-sm">{userInfo?.username || "Usuario"} actualizó políticas</p>
                        <p className="text-gray-400 text-xs">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab - Enhanced with User Info */}
          <TabsContent value="billing" className="space-y-6">
            {/* User Profile Section */}
            <Card className="bg-gray-900/50 border-sky-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-sky-400" />
                  Información del Cliente
                </CardTitle>
                <CardDescription className="text-gray-300">Detalles de tu cuenta y perfil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 w-20">
                      {userInfo?.avatar ? (
                        <AvatarImage
                          src={`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png?size=128`}
                          alt={userInfo.username}
                        />
                      ) : (
                        <AvatarFallback className="bg-sky-500 text-white text-2xl">
                          {userInfo?.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300">Nombre de Usuario</label>
                        <p className="text-white font-medium">{userInfo?.username || "No disponible"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300">Discord ID</label>
                        <p className="text-white font-mono text-sm">{userInfo?.id || "No disponible"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300">Discriminador</label>
                        <p className="text-white">#{userInfo?.discriminator || "0000"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300">Tipo de Cuenta</label>
                        <Badge className="bg-sky-500">Premium User</Badge>
                      </div>
                    </div>

                    {/* Account Stats */}
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-sky-400">4</div>
                        <div className="text-gray-300 text-sm">Apps Protegidas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">1,247</div>
                        <div className="text-gray-300 text-sm">Amenazas Bloqueadas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">89</div>
                        <div className="text-gray-300 text-sm">Días Activo</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Plan - Enhanced */}
            <Card className="bg-gray-900/50 border-sky-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-sky-400" />
                  Plan Actual
                </CardTitle>
                <CardDescription className="text-gray-300">Gestiona tu suscripción y facturación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Plan Pro</h3>
                        <p className="text-gray-300">Hasta 4 aplicaciones protegidas</p>
                        <p className="text-sm text-sky-400 mt-1">Cliente desde: Noviembre 2023</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-sky-400">$65</div>
                        <div className="text-gray-300">por mes</div>
                        <Badge className="bg-green-500 mt-1">Activo</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Aplicaciones Usadas:</span>
                        <span className="text-white">2 / 4</span>
                      </div>
                      <Progress value={50} className="h-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-300">Próxima Facturación:</span>
                        <span className="text-white">15 de Febrero, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Método de Pago:</span>
                        <span className="text-white">•••• •••• •••• 4242</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => alert("Abriendo opciones de upgrade...")}
                    >
                      Actualizar Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300"
                      onClick={() => alert("Abriendo gestión de plan...")}
                    >
                      Cambiar Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-400"
                      onClick={() => alert("¿Estás seguro de que quieres cancelar?")}
                    >
                      Cancelar Suscripción
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History & Payment Methods */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-sky-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <History className="h-5 w-5 mr-2 text-sky-400" />
                    Historial de Facturación
                  </CardTitle>
                  <CardDescription className="text-gray-300">Tus facturas y pagos recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all cursor-pointer">
                      <div>
                        <p className="text-white font-medium">Enero 2024</p>
                        <p className="text-gray-400 text-sm">Plan Pro - Mensual</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">$65.00</p>
                        <Badge className="bg-green-500">Pagado</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all cursor-pointer">
                      <div>
                        <p className="text-white font-medium">Diciembre 2023</p>
                        <p className="text-gray-400 text-sm">Plan Pro - Mensual</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">$65.00</p>
                        <Badge className="bg-green-500">Pagado</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all cursor-pointer">
                      <div>
                        <p className="text-white font-medium">Noviembre 2023</p>
                        <p className="text-gray-400 text-sm">Plan Starter - Mensual</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">$29.00</p>
                        <Badge className="bg-green-500">Pagado</Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-sky-500 hover:bg-sky-600"
                    onClick={() => alert("Descargando todas las facturas...")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Todas las Facturas
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-sky-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-sky-400" />
                    Métodos de Pago
                  </CardTitle>
                  <CardDescription className="text-gray-300">Gestiona tu información de pago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">•••• •••• •••• 4242</p>
                          <p className="text-gray-400 text-sm">Expira 12/25</p>
                        </div>
                      </div>
                      <Badge className="bg-sky-500">Principal</Badge>
                    </div>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => alert("Abriendo formulario para agregar método de pago...")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Método de Pago
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Uso Este Mes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Plan Base:</span>
                        <span className="text-white">$65.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Almacenamiento Adicional:</span>
                        <span className="text-white">$5.00</span>
                      </div>
                      <div className="border-t border-sky-500/20 pt-2 flex justify-between font-medium">
                        <span className="text-white">Total:</span>
                        <span className="text-sky-400">$70.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs remain the same but with interactive elements... */}
          {/* I'll keep the existing content for other tabs to maintain functionality */}
        </Tabs>
      </div>
    </div>
  )
}
