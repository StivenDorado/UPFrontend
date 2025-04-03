import Link from "next/link"

export default function PoliciesSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2">BUSCAR AYUDA Y MÁS.</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">Políticas y reglas</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm font-bold border-b-2 border-black">
              Políticas de Uso
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Incumplimiento de reglas
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Publicación de Propiedades:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Publica propiedades disponibles para arrendo.</li>
                <li>Asegúrate de que fotos y descripciones sean precisas.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Reservas y Pagos:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Realiza reservas a través de la app, son vinculantes.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Registro y Creación de Cuenta:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Proporciona información precisa y completa al registrarte.</li>
                <li>Gestiona arriendos con las herramientas proporcionadas.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Responsabilidades:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mantén tu propiedad en buen estado si eres propietario.</li>
                <li>Cuida las propiedades que arriendas como inquilino.</li>
                <li>La app no asume responsabilidad por daños.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Privacidad y Seguridad:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Tu privacidad está protegida según la política de privacidad.</li>
                <li>La app implementa medidas de seguridad para tu información.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}