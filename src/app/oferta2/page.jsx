import Link from "next/link"

export default function OffersImplementation() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2 font-semibold">BUSCAR AYUDA Y MÁS</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-6 text-center">Ofertas y contra ofertas</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link href="#" className="text-sm hover:text-gray-600 pb-1">
              ¿Cómo funciona?
            </Link>
            <Link href="#" className="text-sm font-bold border-b-2 border-black pb-1">
              ¿Por qué fue implementado?
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <p>
              La implementación del modelo de contraofertas se llevó a cabo con el objetivo principal de fomentar la competitividad y mejorar la dinámica de precios en el proceso de arrendamiento. Al responder a la pregunta sobre por qué fue implementado, podemos destacar varios beneficios y razones clave:
            </p>

            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Competitividad de Precios:</strong> La introducción de contraofertas busca crear un entorno competitivo donde tanto arrendadores como aprendices puedan influir en el precio del alojamiento, promoviendo tarifas más justas y equitativas.
              </li>
              <li>
                <strong>Mejora Continua:</strong> El modelo fue adoptado como parte de una estrategia para impulsar la mejora continua en la calidad de los alojamientos. Al permitir ajustes dinámicos en los precios, se incentiva a las arrendadoras a ofrecer servicios y condiciones más atractivas.
              </li>
              <li>
                <strong>Flexibilidad para Ambas Partes:</strong> La implementación del modelo proporciona flexibilidad tanto a los arrendadores como a los aprendices al permitirles proponer y negociar precios de manera activa, adaptándose a las necesidades y expectativas de ambas partes.
              </li>
              <li>
                <strong>Ajuste a las Características Ofrecidas:</strong> La contraoferta incentiva a los arrendadores a considerar las características específicas ofrecidas por los aprendices al proponer precios competitivos. Esto conduce a una alineación más precisa entre las expectativas de ambas partes.
              </li>
              <li>
                <strong>Innovación y Diferenciación:</strong> La implementación de este modelo refleja un enfoque innovador en el sector de arrendamiento, diferenciando la plataforma al ofrecer una experiencia más dinámica y participativa para los usuarios.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}