import Link from "next/link"

export default function AboutUrbanPoint3() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">BUSCAR AYUDA Y PAÍS:</h2>
          
          <h3 className="text-lg font-semibold mb-4 text-center">Tu cuenta</h3>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              Administrar tu cuenta
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Identificación o verificación
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Nivel de seguirlos
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Reseños
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Accede a la Configuración:</strong> Cuando inicias la aplicación, ve a la sección de Configuración o Ajustes. Por lo general, encontrarás esta opción en el menú principal, como el lugar central para personalizar tu experiencia.
              </li>
              <li>
                <strong>Actualiza tu Perfil:</strong> "Perfil" o "Información Personal". Es vital asegurarte de que tu nombre esté al día y tengas una foto reciente para que tu interacción sea más personalizado.
              </li>
              <li>
                <strong>Gestiona la Seguridad:</strong> "Seguridad" o "Configuración de Cuenta" podrás cambiar tu contraseña, activar la verificación en dos pasos y garantizar la protección de tu cuenta. Es como ponerle un candado extra a tu información.
              </li>
              <li>
                <strong>Métodos de Pago y Finanzas:</strong> "Métodos de Pago" o "Finanzas". En este espacio, puedes agregar, quitar o actualizar la información, asegurando transacciones sin complicaciones. Es tu área financiera dentro de la aplicación.
              </li>
              <li>
                <strong>Configura Notificaciones:</strong> "Notificaciones" ajusta la frecuencia y tipo de mensajes que deseas recibir. Esto te permite estar informado sin sentirte abrumado, para adaptar la aplicación a tus preferencias.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}