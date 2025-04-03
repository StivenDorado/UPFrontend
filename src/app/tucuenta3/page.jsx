import Link from "next/link"

export default function AboutUrbanPoint3() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
        <p className="mt-2">BUSCAR AYUDA Y MÁS:</p>
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
              Nivel de seguridad
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Reseñas
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <ol className="space-y-6 list-decimal pl-5">
              <li>
                <strong>Seguridad en línea:</strong> Evita la urgencia: Los correos electrónicos fraudulentos suelen crear un sentido de urgencia y amenazan con suspender tu cuenta. ¡No te dejes intimidar! Revisa el "https": Asegúrate de que la URL del sitio web comienza con "https". Esto indica una conexión segura. Comprueba el remitente: Ten cuidado con los correos electrónicos de remitentes desconocidos.
              </li>
              <li>
                <strong>Contraseñas seguras:</strong> Utiliza una contraseña única para Urban Point. Combina letras mayúsculas y minúsculas, números y símbolos. Evita usar información personal como tu nombre o fecha de nacimiento.
              </li>
              <li>
                <strong>Historial de inicios de sesión:</strong> Revisa la ubicación, el dispositivo y la fecha de tus inicios de sesión. Si encuentras actividad sospechosa, cambia tu contraseña de inmediato.
              </li>
              <li>
                <strong>Autenticación en dos pasos:</strong> Agrega una capa adicional de seguridad a tu cuenta. Recibirás un código por SMS que deberás ingresar al iniciar sesión.
              </li>
              <li>
                <strong>Tu información personal:</strong> Urban Point se compromete a proteger tu privacidad. La mayoría de tus datos se eliminan al cerrar tu cuenta. Puedes descargar tu archivo de datos personales en cualquier momento.
              </li>
              <li>
                <strong>Denunciar mensajes sospechosos:</strong> Si recibes un mensaje que te parece extraño, repórtalo a Urban Point. Ayúdanos a mantener la comunidad segura.
              </li>
              <li>
                <strong>Cierre de cuenta:</strong> Al cerrar tu cuenta, se eliminan la mayoría de tus datos. Algunos datos se conservan por motivos legales o de seguridad.
              </li>
              <li>
                <strong>Archivo de datos personales:</strong> Descarga tu archivo para obtener una copia de tu información. El archivo incluye tus reservas, mensajes y otros datos.
              </li>
              <li>
                <strong>Notificaciones de inicio de sesión:</strong> Recibe una alerta cuando inicies sesión desde un dispositivo nuevo. Te ayuda a detectar actividad no autorizada.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}