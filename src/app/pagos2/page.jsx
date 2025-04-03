import Link from "next/link"

export default function InvoiceSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2 font-semibold">Puedes ayudar a realizar.</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Pagos y cobros</h2>
          
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              Precios y tarifas
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Factura y recibo
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold mb-3">¿Cómo puedo obtener una factura o recibo de mi alquiler?</h3>
              <p className="mb-4">
                Puedes obtener una factura o recibo de tu alquiler en la sección "Mis alquileres" de la aplicación.
                Simplemente selecciona el alquiler del que deseas obtener la factura y haz clic en el botón "Descargar factura".
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">¿Qué información incluye la factura o recibo?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Nombre del Aprendiz</li>
                <li>Nombre del arrendador</li>
                <li>Dirección del Inmueble</li>
                <li>Fecha del alquiler</li>
                <li>Precio del alquiler</li>
                <li>Tarifa de la aplicación</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">¿Puedo obtener una factura de un alquiler finalizado?</h3>
              <p>
                Sí, puedes obtener una factura o recibo de un alquiler que ya ha finalizado. Para ello:
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>Ve a la sección "Historial de alquileres"</li>
                <li>Selecciona el alquiler deseado</li>
                <li>Haz clic en "Descargar factura"</li>
              </ol>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold">Nota importante:</p>
              <p className="mt-1">
                Las facturas están disponibles durante 12 meses después de finalizado el alquiler.
                Para alquileres más antiguos, contacta con nuestro servicio de atención al cliente.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}