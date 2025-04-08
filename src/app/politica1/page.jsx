import Link from "next/link"

export default function PoliciesSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2 font-semibold">BUSCAR AYUDA Y MÁS</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-6 text-center">Políticas y reglas</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link href="#" className="text-sm font-bold border-b-2 border-black pb-1">
              Políticas de Uso
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600 pb-1">
              Incumplimiento de reglas
            </Link>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Registro y Creación de Cuenta:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Durante el registro, es fundamental proporcionar información precisa y completa.</li>
                <li>La plataforma se reserva el derecho de cancelar cuentas que no cumplan con las políticas de uso.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Publicación de Propiedades:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Las propiedades deben estar disponibles para arrendar.</li>
                <li>Fotos y descripciones deben ser precisas y actualizadas.</li>
                <li>Los propietarios establecen el precio y condiciones.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Reservas y Pagos:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Las reservas a través de la plataforma son vinculantes para ambas partes.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Comunicación y Gestión de Arriendos:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>La plataforma proporciona un canal seguro para propietarios e inquilinos.</li>
                <li>Ofrece herramientas para gestionar arriendos sin intervenir en disputas.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Privacidad y Seguridad:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>La plataforma protege la privacidad según su política.</li>
                <li>Implementa medidas de seguridad para la información del usuario.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Modificaciones a las Políticas:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reserva el derecho de modificar políticas.</li>
                <li>Usuarios serán notificados de cambios.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Aceptación de Políticas de Uso:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Al usar la plataforma, los usuarios aceptan las políticas.</li>
                <li>Incumplirlas puede resultar en la cancelación de la cuenta.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}