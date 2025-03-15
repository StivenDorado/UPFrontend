export default function PiePagina() {
    return (
      <footer className="bg-gray-200 mt-8 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-4">Asistencia</h4>
              <ul className="space-y-2 text-sm">
                <li>Centro de ayuda</li>
                <li>AirCover</li>
                <li>Información de seguridad</li>
                <li>Opciones de cancelación</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Modo anfitrión</h4>
              <ul className="space-y-2 text-sm">
                <li>Ponte a prueba en Urban Point</li>
                <li>AirCover para anfitriones</li>
                <li>Recursos para anfitriones</li>
                <li>Foro comunitario</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Urban Point</h4>
              <ul className="space-y-2 text-sm">
                <li>Sala de prensa</li>
                <li>Funciones nuevas</li>
                <li>Empleo</li>
                <li>Inversionistas</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  