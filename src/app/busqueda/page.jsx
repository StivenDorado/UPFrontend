import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Búsqueda y reservación</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <Link href="" className="text-sm underline hover:text-gray-600">
              Consejos de Búsqueda
            </Link>
            <Link href="/reservar" className="text-sm underline hover:text-gray-600">
              Reservar alojamientos
            </Link>
            <Link href="/revcita" className="text-sm underline hover:text-gray-600">
              Reservar citas
            </Link>
            <Link href="/mensajes" className="text-sm underline hover:text-gray-600">
              Enviar mensajes
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p>
              A veces solo quieres explorar. Otras, sabes exactamente lo que estás buscando. Los filtros de búsqueda son
              una excelente forma de acotar tus opciones cuando estás buscando un lugar donde quedarte.
            </p>
            <p>
              Si eres flexible, puedes seleccionar intervalos de fechas y tipos de lugares para ayudar a orientar tu
              búsqueda.
            </p>
            <p>
              En la parte superior de la página de resultados de búsqueda, se encuentran los filtros más destacados, que
              incluyen opciones como:
            </p>

            <ul className="space-y-4 list-disc pl-5">
              <li>
                <strong>Tipo de hospedaje:</strong> desde habitaciones compartidas hasta alojamientos completos; aquí
                obtendrás detalles adicionales sobre las diversas categorías de hospedaje.
              </li>
              <li>
                <strong>Servicios del hospedaje:</strong> elige los distintos servicios que tus necesidades ameriten así
                la búsqueda será más objetiva.
              </li>
              <li>
                <strong>Características de accesibilidad:</strong> ¿Tienes necesidades especiales o poco usuales? en
                esta casilla puedes seleccionar casillas especiales muy específicas, que atienden a las necesidades más
                personales de los aprendices Sena.
              </li>
              <li>
                <strong>Habitaciones y baños:</strong> la comodidad es importante, por lo cual podemos elegir la
                cantidad de habitaciones así como su tamaño, de igual forma podemos decidir qué tipo de baño necesitamos
                para nuestro uso continuo.
              </li>
              <li>
                <strong>Tiempo de Estadía:</strong> En esta sección, puedes especificar la duración de tu estancia
                durante la cual ocuparás la habitación que solicitarás.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

