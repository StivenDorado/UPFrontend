import Link from "next/link"

export default function CancelledReservations() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4 text-center">Tus Reservaciones</h3>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              Estado de tu reserva
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Condiciones
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Solución de Problemas
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <div className="mb-6">
              <p>La reservación se canceló, probablemente porque:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>El usuario no verificó su identidad en el plazo de 12 horas</li>
                <li>No se realizó el pago y no actualizó su información de pago en un plazo de 24 horas</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Oferta vencida</h4>
              <p>El huésped recibió una oferta especial del anfitrión, pero no la aceptó en el plazo de 24 horas.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}