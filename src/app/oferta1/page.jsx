import Link from "next/link"

export default function OffersSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2 font-semibold">BUSCAR AYUDA Y TAIS</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-6 text-center">Ofertas y contra ofertas</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link href="#" className="text-sm hover:text-gray-600 border-b-2 border-transparent hover:border-black pb-1">
              ¿Cómo funciona?
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600 border-b-2 border-transparent hover:border-black pb-1">
              ¿Por qué fue implementado?
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <p>
              Los arrendadores pueden aprovechar nuestro innovador modelo de contra oferta, que opera como una subasta para el alojamiento. Con esta estrategia, buscamos fomentar la competitividad de precios, beneficiando a ambas partes y contribuyendo a la mejora continua de los alojamientos a largo plazo. Hemos diseñado el modelo de manera simple para garantizar su eficacia óptima.
            </p>

            <p>
              Los aprendices tienen la libertad de ofrecer un precio que consideran justo por el alojamiento que les interesa. Mientras tanto, los arrendadores cuentan con la flexibilidad de establecer un precio inicial, el cual puede ajustarse según las ofertas recibidas de los interesados.
            </p>

            <p>
              En este proceso, el arrendador tiene la opción de aceptar o rechazar la oferta inicial, y, de manera recíproca, puede realizar una contraoferta en respuesta al monto ofrecido por el aprendiz. Esta dinámica asegura una mayor competencia en los precios, incentivando la adaptación de las tarifas a las características ofrecidas por los alojamientos. Este enfoque innovador no solo simplifica el proceso, sino que también impulsa la eficiencia y la equidad en la transacción entre arrendadores y aprendices.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}