import Link from "next/link"

export default function ActiveReservations() {
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
              <p>El estado de tu reserva brinda actualizaciones sobre el progreso de tu reserva.</p>
            </div>

            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Llegado hoy</h4>
                <p>El huésped llegará en las próximas 24 horas.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Llegado mañana</h4>
                <p>El huésped se espera pronto, pero no dentro de las próximas 24 horas.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Llegado en __ días</h4>
                <p>El huésped realizará el check-in en el número de días especificados. Es recomendable imprimir los detalles de la reserva y coordinar el check-in con anticipación.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Identificación del huésped pendiente</h4>
                <p>El anfitrión requiere que el huésped verifique su identidad antes de aceptar la solicitud de reserva. Se otorgan 12 horas para completar este proceso; de lo contrario, la solicitud expirará.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Reseña del huésped pendiente</h4>
                <p>El huésped ha realizado el check-out y tiene 14 días para escribir una reseña sobre su estancia.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}