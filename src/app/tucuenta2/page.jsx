import Link from "next/link"

export default function AboutUrbanPoint3() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">HOLA, MURIEL. ¿CÓMO PODEMOS AYUDARTE?</h1>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">BUSCAR AYUDA Y MÁS...</h2>
          
          <h3 className="text-lg font-semibold mb-4 text-center">Tu cuenta</h3>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="#" className="text-sm hover:text-gray-600">
              Administrar tu cuenta
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Identificación y Verificación
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Nivel de equirides
            </Link>
            <Link href="#" className="text-sm hover:text-gray-600">
              Reseñas
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p className="mb-4">
              La identidad y la verificación de la cuenta del usuario son los procesos de garantizar que un usuario es quien dice ser. Esto es importante para proteger las datos y recursos del usuario, así como para prevenir el fraude y el abuso.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Es responsabilidad del aprendiz realizar entrega de la totalidad de la documentación:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Fotocopia del documento de identidad Vigente (Por ambas caras).</li>
                  <li>Certificado el cual acredita que pertenece a una institución educativa superior.</li>
                  <li>Foto de perfil del actual año.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Es responsabilidad del arrendador realizar entrega de la totalidad de la documentación:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Fotocopia del documento de identidad Vigente (Por ambas caras).</li>
                  <li>Documento de libertad y estradición.</li>
                  <li>Foto de perfil del año actual.</li>
                  <li>Direccion de la residencia que está en arriendo con una descripción de la propiedad detallada.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}