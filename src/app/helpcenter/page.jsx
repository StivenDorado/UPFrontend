import Link from "next/link"
import Footer from "../components/general/footer/Footer";
import Header from "../components/general/header/Headerlg";


export default function HelpPage() {
  return (
    <div>
      <Header showSearchBar={false} />
      <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-10">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Primera columna */}
        <div className="space-y-8">
          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Búsqueda y reservación</h2>
            <ul className="space-y-3">
              <li><Link href="/busqueda" className="text-gray-800 hover:underline">Consejos de Búsqueda</Link></li>
              <li><Link href="/reservar" className="text-gray-800 hover:underline">Reservar alojamientos</Link></li>
              <li><Link href="/revcita" className="text-gray-800 hover:underline">Reservar citas</Link></li>
              <li><Link href="/mensajes" className="text-gray-800 hover:underline">Enviar mensajes</Link></li>
              <li className="invisible">Espacio reservado</li> {/* Elemento invisible para alinear */}
            </ul>
          </div>

          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Tu cuenta</h2>
            <ul className="space-y-3">
              <li><Link href="/tucuenta1" className="text-gray-800 hover:underline">Administrar tu cuenta</Link></li>
              <li><Link href="/tucuenta2" className="text-gray-800 hover:underline">Identificación o Verificación</Link></li>
              <li><Link href="/tucuenta3" className="text-gray-800 hover:underline">Nivel de Seguridad</Link></li>
              <li><Link href="/tucuenta4" className="text-gray-800 hover:underline">Reseñas</Link></li>
              <li className="invisible">Espacio reservado</li> {/* Elemento invisible para alinear */}
            </ul>
          </div>

          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Políticas y reglas</h2>
            <ul className="space-y-3">
              <li><Link href="/politica1" className="text-gray-800 hover:underline">Políticas de Uso</Link></li>
              <li><Link href="/politica2" className="text-gray-800 hover:underline">Incumplimiento de reglas</Link></li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
            </ul>
          </div>
        </div>

        {/* Segunda columna */}
        <div className="space-y-8">
          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Seguridad y accesibilidad</h2>
            <ul className="space-y-3">
              <li><Link href="/temas" className="text-gray-800 hover:underline">Temas de seguridad</Link></li>
              <li><Link href="/reportar" className="text-gray-800 hover:underline">Como reportar problemas</Link></li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
            </ul>
          </div>

          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Tus reservaciones</h2>
            <ul className="space-y-3">
              <li><Link href="/reserva1" className="text-gray-800 hover:underline">Estado de tu reserva</Link></li>
              <li><Link href="/reserva2" className="text-gray-800 hover:underline">Cancelaciones</Link></li>
              <li><Link href="/reserva3" className="text-gray-800 hover:underline">Solución de Problemas</Link></li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
            </ul>
          </div>

          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Cancelaciones</h2>
            <ul className="space-y-3">
              <li><Link href="cancelar" className="text-gray-800 hover:underline">Cancelaciones</Link></li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
            </ul>
          </div>
        </div>

        {/* Tercera columna */}
        <div className="space-y-8">
          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Acerca de Urban Point</h2>
            <ul className="space-y-3">
              <li><Link href="/acerca1" className="text-gray-800 hover:underline">¿Quiénes somos?</Link></li>
              <li><Link href="/acerca2" className="text-gray-800 hover:underline">¿Cómo funciona UrbanPoint?</Link></li>
              <li><Link href="/acerca3" className="text-gray-800 hover:underline">Políticas y reglas de comunidad</Link></li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
            </ul>
          </div>

          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Ofertas y contra ofertas</h2>
            <ul className="space-y-3">
              <li><Link href="/oferta1" className="text-gray-800 hover:underline">¿Cómo funciona?</Link></li>
              <li><Link href="/oferta2" className="text-gray-800 hover:underline">¿Porqué fue implementado?</Link></li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
            </ul>
          </div>

          <div className="min-h-[200px]">
            <h2 className="font-medium text-gray-700 mb-4">Pagos y cobros</h2>
            <ul className="space-y-3">
              <li><Link href="/pagos1" className="text-gray-800 hover:underline">Precios y tarifas</Link></li>
              <li><Link href="/pagos2" className="text-gray-800 hover:underline">Facturas y recibos</Link></li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
              <li className="invisible">Espacio reservado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}