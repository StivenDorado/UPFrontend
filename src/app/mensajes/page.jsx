import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Búsqueda y reservación</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              Consejos de Búsqueda
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Reservar alojamientos
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Reservar citas
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Enviar mensajes
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <p>¿Buscas una comunicación más cercana?</p>

            <p>
              Hemos decidido implementar un chat que facilitará la interacción con el arrendador, promoviendo así una
              comunicación más personalizada. Con esta iniciativa, pretendemos facilitar la coordinación de fechas y
              proporcionar respuestas a cualquier pregunta que puedas tener sobre el alojamiento.
            </p>

            <p>
              Envía un mensaje al arrendador para iniciar una negociación sobre el lugar de alojamiento. Es tan sencillo
              como enviar un mensaje personal, y el arrendador se pondrá en contacto contigo para dar inicio a la
              negociación.
            </p>

            <p>
              Recuerda que la claridad y la prontitud en la comunicación son fundamentales para asegurar una negociación
              exitosa.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

