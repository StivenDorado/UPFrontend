import Link from "next/link"

export default function AboutUrbanPoint2() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Acerca de Urban Point</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              ¿Quiénes somos?
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              ¿Cómo funciona UrbanPoint?
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Políticas y reglas de comunidad
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p>
              UrbanPoint funciona como una plataforma digital que facilita la búsqueda de alojamiento temporal para
              aprendices del SENA CTG. El funcionamiento de UrbanPoint se puede dividir en los siguientes pasos:
            </p>

            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Registro y Creación de Perfil:</strong> Los usuarios, tanto arrendadores como aprendices, deben
                registrarse en la plataforma y crear un perfil. Aquí los aprendices pueden especificar sus preferencias
                de alojamiento y los arrendadores pueden detallar la características de sus propiedades.
              </li>
              <li>
                <strong>Búsqueda de Alojamiento:</strong> Los aprendices pueden explorar las opciones de alojamiento
                disponibles utilizando filtros como ubicación, tipo de alojamiento, precio y comodidades. La plataforma
                muestra una lista de resultados que se ajustan a los criterios de búsqueda del usuario.
              </li>
              <li>
                <strong>Visualización del Hospedaje:</strong> Los aprendices pueden ver los detalles completos de cada
                propiedad, incluyendo fotos, descripciones, precios, disponibilidad y reseñas de otros usuarios.
              </li>
              <li>
                <strong>Comunicación y Negociación:</strong> Los aprendices pueden contactar directamente a los
                propietarios a través de la plataforma para negociar el precio o hacer una reserva. También tienen la
                opción de hacer contrapreguntas y negociar los términos del contrato de arrendamiento.
              </li>
              <li>
                <strong>Confirmación de Reserva:</strong> Una vez que se llega a un acuerdo entre el aprendiz y el
                arrendador, se realiza la reserva a través de la plataforma. UrbanPoint puede proporcionar herramientas
                de pago seguro para garantizar transacciones seguras.
              </li>
              <li>
                <strong>Estadía:</strong> Durante la estadía, los aprendices pueden utilizar la plataforma para
                comunicarse con el propietario, realizar pagos adicionales si es necesario y dejar reseñas una vez
                finalizada su estadía.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}

