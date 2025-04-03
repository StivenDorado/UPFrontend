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
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Reservar citas
            </Link>
            <Link href="/mensajes" className="text-sm hover:text-gray-600">
              Enviar mensajes
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p>¿Quieres visitar el alojamiento antes de tomar una decisión?</p>
            <p>
              Para estar seguro de tu elección puedes solicitar una cita, en la cual el arrendador te va a dar acceso
              para que puedas ir de visita al inmueble y ver todo lo que ofrece, esto te ayudará elegir mejor tu lugar
              de alojamiento.
            </p>
            <p>
              En el proceso de agendar cita, encontrarás opciones útiles que facilitarán la comunicación con el
              arrendador para acordar la visita:
            </p>

            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Fecha de visita:</strong> Indica al arrendador la fecha exacta de tu visita para que esté
                informado y pueda brindarte un servicio eficiente.
              </li>
              <li>
                <strong>Hora de la cita:</strong> para que el arrendador pueda preparar la visita es necesario
                especificar la hora de llegada.
              </li>
              <li>
                <strong>Número de acompañantes:</strong> Informa al arrendador sobre la cantidad de acompañantes que
                acudirán a la visita, ayudando a que se haga una idea de cuantas personas irán a la visita.
              </li>
              <li>
                <strong>Mapa interactivo:</strong> Utiliza esta función para visualizar la ubicación precisa del
                alojamiento, facilitando así la ubicación del lugar al cual se ara la visita.
              </li>
              <li>
                <strong>Cancelar cita:</strong> Si surge algún imprevisto puedes cancelar la cita para evitar que el
                arrendador no espere tu llegada.
              </li>
            </ol>

            <p>Además, ten en cuenta las siguientes recomendaciones:</p>

            <ul className="space-y-2 list-disc pl-5">
              <li>El arrendador tiene un tiempo limitado para aceptar o cancelar la cita.</li>
              <li>Podrás chatear con el arrendador ara mejorar la comunicación con las dos partes.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

