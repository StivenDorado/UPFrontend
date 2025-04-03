import Link from "next/link"

export default function ReservationSupport() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Tus Reservaciones</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              Estado de tu reserva
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Cancelaciones
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Solución de Problemas
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p className="mb-4">
              Queremos asegurarnos de que tu experiencia con Urban Point sea lo mejor posible. Por eso, hemos
              creado un formulario especialmente diseñado para recibir tus comentarios y solucionar cualquier
              problema que puedas encontrar.
            </p>

            <p className="mb-4">
              Para acceder al formulario, simplemente haz clic en el botón a continuación. Después de redactar tu
              queja, envíala, y nos comprometemos a resolver tu problema de la manera más eficiente posible. No te
              preocupes, te proporcionaremos una respuesta rápida.
            </p>

            <div className="text-center my-6">
                <Link href="/reservafor">
              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Llena formulario
              </button>
              </Link>
            </div>

            <p className="mt-4">
              Agradecemos tu colaboración en la mejora continua de nuestros servicios. ¡Gracias por elegir Urban
              Point y por ser parte activa de nuestro compromiso con la excelencia!
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}