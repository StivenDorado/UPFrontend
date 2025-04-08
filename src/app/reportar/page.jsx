import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Seguridad y Accesibilidad</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Temas de seguridad
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Cómo reportar problemas
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <p>
              Con el objetivo de elevar la calidad de nuestro servicio, hemos implementado varias herramientas que
              pueden beneficiar a nuestros usuarios durante su estadía.
            </p>

            <p>
              Al seleccionar un alojamiento, se recomienda revisar las calificaciones y reseñas asociadas. Del mismo
              modo, verificar la verificación del arrendador puede prevenir posibles contratiempos durante el proceso de
              reserva.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

