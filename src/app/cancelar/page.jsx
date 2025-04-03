import Link from "next/link"

export default function CancellationSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2 font-semibold">BUSCAR AYUDA Y MÁS...</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Cancelaciones</h2>
          
          <h3 className="text-lg font-semibold mb-4 text-center">Cancelación de Reserva</h3>

          <p className="mb-6 text-sm">
            ¿Tus planes cambiaron y ahora tienes que cancelar la reservación? No hay problema. 
            Puedes acceder a Solicitud de reservas para cancelar tu reservación.
          </p>

          <div className="space-y-4 text-sm">
            <h4 className="font-semibold">Pasos para cancelar:</h4>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Haz click en el apartado de solicitud de reservas</li>
              <li>Busca y selecciona la reserva que quieras cancelar</li>
              <li>Presiona el botón "Cancelar Reserva"</li>
              <li>Escribe el motivo por el cual quieres cancelar</li>
              <li>Confirma la cancelación</li>
            </ol>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold">Nota importante:</p>
              <p className="mt-1">
                Por favor revisa nuestra política de cancelaciones para conocer posibles cargos 
                por cancelación según el tiempo de anticipación.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}