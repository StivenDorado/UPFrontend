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
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Reservar alojamientos
            </Link>
            <Link href="/revcita" className="text-sm hover:text-gray-600">
              Reservar citas
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Enviar mensajes
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p>¿Necesitas asegurar un alojamiento antes de tu llegada a la ciudad?</p>
            <p>
              La mejor manera de reservar tu estancia es creando una reserva previa, para lo cual debes elegir un
              alojamiento que satisfaga completamente tus necesidades.
            </p>
            <p>
              En el proceso de solicitud, encontrarás opciones útiles que facilitarán la comunicación con el arrendador:
            </p>

            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Fecha de llegada:</strong> Indica al arrendador la fecha exacta de tu llegada para que esté
                informado y pueda brindarte un servicio eficiente.
              </li>
              <li>
                <strong>Oferta de precio:</strong> Para completar la reserva, debes ofrecer un precio al arrendador por
                su habitación. La decisión del precio es tuya, pero ten en cuenta que no eres el único que puede enviar
                ofertas.
              </li>
              <li>
                <strong>Número de huéspedes:</strong> Informa al arrendador sobre la cantidad de huéspedes que ocuparán
                el espacio ofrecido.
              </li>
              <li>
                <strong>Mapa interactivo:</strong> Utiliza esta función para visualizar la ubicación precisa del
                alojamiento, facilitando así la ubicación del lugar reservado.
              </li>
            </ol>

            <p>Además, ten en cuenta las siguientes recomendaciones:</p>

            <ul className="space-y-2 list-disc pl-5">
              <li>El arrendador tiene un tiempo limitado para aceptar o cancelar tu reserva.</li>
              <li>
                Tus ofertas juegan un papel crucial, ya que influirán en la consideración de tu solicitud por parte del
                arrendador.
              </li>
            </ul>

            <p>
              Recuerda que la claridad y la prontitud en la comunicación son clave para asegurar una reserva exitosa.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

