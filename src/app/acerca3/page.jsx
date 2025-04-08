import Link from "next/link"

export default function AboutUrbanPoint3() {
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
            <Link href="#" className="text-sm hover:text-gray-600">
              ¿Cómo funciona UrbanPoint?
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Políticas y reglas de comunidad
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Respeto y Cortesía:</strong> Se espera que todos los usuarios se traten entre sí con respeto y
                cortesía en todas las interacciones dentro de la plataforma.
              </li>
              <li>
                <strong>Cumplimiento de las Normativas:</strong> Los arrendadores deben cumplir con todas las normativas
                y regulaciones gubernamentales con el arrendamiento de propiedades, garantizando la legalidad y
                seguridad de los servicios ofrecidos.
              </li>
              <li>
                <strong>Veracidad y Transparencia:</strong> Toda la información proporcionada por los usuarios, ya sea
                sobre sus propiedades o sobre ellos mismos, debe ser veraz y precisa. Se prohíbe cualquier intento de
                engaño o fraude.
              </li>
              <li>
                <strong>Prohibición de Discriminación:</strong> Se prohíbe la discriminación por motivos de raza,
                género, religión, orientación sexual, nacionalidad o por factores protegidos por la ley.
              </li>
              <li>
                <strong>Propiedad Intelectual:</strong> Los usuarios deben respetar los derechos de propiedad
                intelectual, lo que significa legal o que viola los derechos de propiedad intelectual de terceros.
              </li>
              <li>
                <strong>Confidencialidad y Privacidad:</strong> Se debe respetar la privacidad y confidencialidad de la
                información personal de los usuarios, y no se permite compartir información personal sin consentimiento.
              </li>
              <li>
                <strong>Resolución de Conflictos:</strong> Se proporcionará procedimientos para la resolución de
                conflictos entre arrendadores y aprendices, con la mediación de UrbanPoint si es necesario.
              </li>
              <li>
                <strong>Comentarios y Evaluaciones Constructivas:</strong> Se alienta a los usuarios a dejar comentarios
                y calificaciones constructivas sobre sus experiencias, con el objetivo de mejorar la calidad del
                servicio y la comunidad en general.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}

