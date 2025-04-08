import Link from "next/link"

export default function AboutUrbanPoint3() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2">BUSCAR AYUDA Y DIAS.</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Tu cuenta</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              Administrar tu cuenta
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Identificación o Verificación
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Nivel de equitées
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Reaefas
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p className="mb-4">
              Las reseñas son clave en una app de alojamiento, ofreciendo valiosa retroalimentación directa de usuarios.
              Su importancia abarca varios aspectos:
            </p>

            <ul className="space-y-4 list-disc pl-5">
              <li>
                <strong>Transparencia y Confianza:</strong> Brindan una visión auténtica de la experiencia de otros usuarios, generando confianza entre propietarias e inquilinos.
              </li>
              <li>
                <strong>Evaluación de la Calidad:</strong> Permite a los usuarios evaluar propiedades y servicios, crucial para quienes buscan asegurarse de que cumplan sus expectativas al alquiler.
              </li>
              <li>
                <strong>Mejora Continua:</strong> Actúan como herramienta valiosa para ajustes y actualizaciones basadas en la retroalimentación del usuario, identificando áreas de oportunidad y fortalezas.
              </li>
              <li>
                <strong>Resolución de Problemas:</strong> Ofrecen a las usuarias la oportunidad de expresar problemas, permitiendo a la app abordar y resolver situaciones específicas, mejorando la experiencia general.
              </li>
              <li>
                <strong>Adaptación a Necesidades del Usuario:</strong> Comprendiendo preferencias a través de reseñas, la app puede ajustarse para satisfacer mejor las demandas del mercado.
              </li>
              <li>
                <strong>Creación de Comunidad:</strong> Fomentan un sentido de comunidad entre usuarios, fortaleciendo la interacción social mediante compartir experiencias y recomendaciones.
              </li>
              <li>
                <strong>Estimulo para Propietarias:</strong> Las reseñas positivas motivan a los propietarios, reconociendo y recompensando su esfuerzo por ofrecer un servicio excepcional.
              </li>
              <li>
                <strong>Orientación para Decisiones:</strong> Proporcionan información valiosa que orienta decisiones a usuarios en busca de alojamiento, ofreciendo percepciones sobre aspectos específicos de las propiedades.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}