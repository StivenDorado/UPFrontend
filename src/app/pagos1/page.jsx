import Link from "next/link"

export default function PaymentsSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2 font-semibold">Página 1</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-6 text-center">Pagos y cobros</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link href="#" className="text-sm font-bold border-b-2 border-black pb-1">
              Precios y tarifas
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600 pb-1">
              Sistemas y medios
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <h3 className="font-semibold">¿Cómo se establecen los precios y tarifas de los alojamientos?</h3>
            
            <p>
              Los precios y tarifas de los alojamientos en la aplicación se establecen por los propietarios de cada inmueble, quienes basan sus precios en una serie de factores que incluyen:
            </p>

            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Ubicación:</strong> La ubicación es uno de los factores más importantes que determinan el precio del alquiler. Los inmuebles ubicados en zonas céntricas, con fácil acceso a transporte público, centros comerciales, parques y otros servicios, suelen tener precios más altos que aquellos ubicados en zonas más periféricas. La demanda de alojamiento en una zona específica también juega un papel importante.
              </li>
              <li>
                <strong>Tamaño del inmueble:</strong> El tamaño del inmueble es otro factor clave. Los inmuebles más grandes, con más habitaciones y baños, generalmente tienen precios más altos que los inmuebles más pequeños.
              </li>
              <li>
                <strong>Características del inmueble:</strong> Las características adicionales que ofrece un inmueble también pueden afectar su precio. Los inmuebles que incluyen servicios como WiFi, amueblado, piscina o gimnasio suelen tener precios más altos.
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold">Nota:</p>
              <p className="mt-1">
                Los precios pueden variar según temporada y disponibilidad. Siempre verifica el precio final antes de realizar una reserva.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}