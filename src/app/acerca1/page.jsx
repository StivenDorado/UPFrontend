import Link from "next/link"

export default function AboutUrbanPoint1() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Acerca de Urban Point</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              ¿Quiénes somos?
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              ¿Cómo funciona UrbanPoint?
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Políticas y reglas de comunidad
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p>
              Como UrbanPoint, somos una empresa dedicada a facilitar la búsqueda de alojamiento temporal para
              aprendices del SENA CTG. Nos comprometemos a proporcionar una plataforma digital y eficiente a las
              necesidades de vivienda de esta comunidad estudiantil. Ofreciendo una plataforma digital intuitiva y
              accesible, buscamos simplificar el proceso de búsqueda de vivienda de manera segura, confiable y sin
              conflictos. Nuestro equipo está formado por profesionales comprometidos con mejorar la experiencia
              educativa de los aprendices. Desarrollamos avisos y sistemas de reserva y calendarios a sus necesidades
              individuales. Con un enfoque centrado en el usuario y una pasión por la innovación, nos esforzamos por ser
              el socio confiable y eficaz durante para los aprendices del SENA CTG en su búsqueda de alojamiento
              temporal.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

