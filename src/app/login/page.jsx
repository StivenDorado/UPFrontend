"use client"
import { useRouter } from "next/navigation"
import { useAuth } from "../../context/AuthContext"
import { useState, useEffect } from "react"
import { LogIn, UserPlus, Mail, Lock, KeyRound } from "lucide-react"

export default function Login() {
  const { login, loginWithGoogle, register, user, sendPasswordReset } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (user) {
      router.push("/landing")
    }
  }, [user, router])

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email y contraseña son obligatorios.")
      return
    }

    try {
      if (isNewUser) {
        await register(email, password)
        console.log("Usuario registrado correctamente")
      } else {
        await login(email, password)
        console.log("Inicio de sesión exitoso")
      }
    } catch (error) {
      console.error("Error en la autenticación:", error.message)
      setError(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      console.log("Inicio de sesión con Google exitoso")
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message)
      setError(error.message)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico.")
      return
    }

    try {
      setIsSending(true)
      setError(null)
      await sendPasswordReset(email)
      setSuccessMessage("Se ha enviado un correo con las instrucciones para restablecer tu contraseña.")
    } catch (error) {
      console.error("Error al recuperar contraseña:", error.message)
      setError(error.message)
      setSuccessMessage(null)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#275950] to-[#1a3b35] p-4">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#88F2E8] via-[#41BFB3] to-[#88F2E8] opacity-30 blur-md"></div>
        <div className="relative bg-white bg-opacity-10 rounded-full p-1 backdrop-blur-sm shadow-xl">
          <img src="/logoUP.png" alt="Logo" className="w-32 h-32 object-contain" />
        </div>
      </div>

      <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm border border-[#88F2E8] border-opacity-20">
        {forgotPassword ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-white text-center">Recuperar Contraseña</h1>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#88F2E8]" />
              </div>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-[#41BFB3] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88F2E8] text-white placeholder-gray-300"
              />
            </div>

            {successMessage && (
              <div className="mb-4 p-3 bg-green-900 bg-opacity-20 text-green-400 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            <button
              onClick={handleForgotPassword}
              disabled={isSending}
              className="w-full bg-[#2A8C82] hover:bg-[#41BFB3] text-white font-bold py-3 px-4 rounded-lg mb-4 transition duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              <KeyRound className="h-5 w-5" /> 
              {isSending ? "Enviando..." : "Enviar correo de recuperación"}
            </button>

            <button
              onClick={() => {
                setForgotPassword(false)
                setError(null)
                setSuccessMessage(null)
              }}
              className="w-full bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-medium py-3 px-4 rounded-lg border border-[#41BFB3] border-opacity-50 transition duration-300"
            >
              Volver al inicio de sesión
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-900 bg-opacity-20 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-white text-center">
              {isNewUser ? "Regístrate" : "Inicia sesión"}
            </h1>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#88F2E8]" />
              </div>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-[#41BFB3] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88F2E8] text-white placeholder-gray-300"
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#88F2E8]" />
              </div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-[#41BFB3] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88F2E8] text-white placeholder-gray-300"
              />
            </div>

            <button
              onClick={handleAuth}
              className="w-full bg-[#2A8C82] hover:bg-[#41BFB3] text-white font-bold py-3 px-4 rounded-lg mb-4 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              {isNewUser ? (
                <>
                  <UserPlus className="h-5 w-5" /> Registrarse
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" /> Iniciar sesión
                </>
              )}
            </button>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-[#275950] hover:bg-[#1e433c] text-white font-bold py-3 px-4 rounded-lg mb-5 transition duration-300 flex items-center justify-center gap-2 shadow-lg border border-[#41BFB3] border-opacity-30"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Iniciar sesión con Google
            </button>

            {error && <div className="text-red-400 mt-2 text-sm bg-red-400 bg-opacity-10 p-2 rounded-lg">{error}</div>}

            <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 text-sm">
              <p
                onClick={() => {
                  setIsNewUser(!isNewUser)
                  setError(null)
                }}
                className="text-[#88F2E8] cursor-pointer hover:underline mb-2 sm:mb-0"
              >
                {isNewUser ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
              </p>

              <p 
                onClick={() => {
                  setForgotPassword(true)
                  setError(null)
                }} 
                className="text-[#88F2E8] cursor-pointer hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 text-center text-white text-opacity-70 text-sm">
        © {new Date().getFullYear()} | Todos los derechos reservados
      </div>
    </div>
  )
}