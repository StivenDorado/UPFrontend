import Link from "next/link"; 
import { Facebook, Twitter } from "lucide-react";  

export default function Footer() {   
  return (     
    <footer className="w-full">
      {/* Sección principal con fondo turquesa */}
      <div className="bg-[#41BFB3] text-white py-10">       
        <div className="container mx-auto px-6">         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">           
            <div className="w-full max-w-xs">             
              <h3 className="font-bold mb-6 text-lg">Asistencia</h3>             
              <ul className="space-y-4 text-base">               
                <li><Link href="#" className="hover:underline">Centro de ayuda</Link></li>               
                <li><Link href="#" className="hover:underline">SelfPoint</Link></li>               
                <li><Link href="#" className="hover:underline">Antidiscriminación</Link></li>               
                <li><Link href="#" className="hover:underline">Opciones de cancelación</Link></li>
              </ul>           
            </div>           
            <div className="w-full max-w-xs">             
              <h3 className="font-bold mb-6 text-lg">Modo anfitrión</h3>             
              <ul className="space-y-4 text-base">               
                <li><Link href="#" className="hover:underline">Pon tu espacio en Urban Point</Link></li>               
                <li><Link href="#" className="hover:underline">SelfPoint para arrendadores</Link></li>               
                <li><Link href="#" className="hover:underline">Recursos para arrendadores</Link></li>               
                <li><Link href="#" className="hover:underline">Foro comunitario</Link></li>               
                <li><Link href="#" className="hover:underline">Arrendar con responsabilidad</Link></li>
              </ul>           
            </div>           
            <div className="w-full max-w-xs">             
              <h3 className="font-bold mb-6 text-lg">Urban Point</h3>             
              <ul className="space-y-4 text-base">               
                <li><Link href="#" className="hover:underline">Sala de prensa</Link></li>               
                <li><Link href="#" className="hover:underline">Funciones nuevas</Link></li>               
                <li><Link href="#" className="hover:underline">Inversionistas</Link></li>
              </ul>           
            </div>         
          </div>       
        </div>
      </div>
        
      {/* Sección inferior con fondo verde más oscuro */}
      <div className="bg-[#2A8C82] text-white py-4">         
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">           
          <div className="mb-4 md:mb-0 text-base">             
            © 2024 UrbanPoint ·{" "}             
            <Link href="#" className="hover:underline">               
              Privacidad             
            </Link>{" "}             
            ·{" "}             
            <Link href="#" className="hover:underline">               
              Términos             
            </Link>
          </div>           
          <div className="flex items-center space-x-6">             
            <button className="flex items-center space-x-2 text-base">               
              <span>Español (CO)</span>             
            </button>             
            <button className="flex items-center space-x-2 text-base">               
              <span>COP</span>             
            </button>             
            <Link href="#" aria-label="Facebook" className="hover:opacity-80">               
              <Facebook size={22} />             
            </Link>             
            <Link href="#" aria-label="Twitter" className="hover:opacity-80">               
              <Twitter size={22} />             
            </Link>
          </div>         
        </div>       
      </div>     
    </footer>   
  ); 
}