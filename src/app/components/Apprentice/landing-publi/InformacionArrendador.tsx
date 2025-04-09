import { useEffect, useState } from "react";

// Definimos un tipo más específico para el objeto arrendador
interface Arrendador {
  uid?: string;
  nombre?: string;
  fotoPerfil?: string;
  email?: string;
  descripcion?: string;
  historial_sistema_arriendo?: any[];
  [key: string]: any; // Para otras propiedades que puedan existir
}

interface InformacionArrendadorProps {
  arrendador?: Arrendador | null;
  uid?: string | null;
}

export default function InformacionArrendador({ arrendador: arrendadorProp, uid: uidProp }: InformacionArrendadorProps) {
  const [arrendador, setArrendador] = useState<Arrendador | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener datos del arrendador
    const fetchArrendador = async () => {
      try {
        setLoading(true);
        setError(null);

        // Determinar el ID a utilizar (prioridad al ID del prop arrendador)
        const uidToUse = arrendadorProp?.uid || uidProp;
        
        console.log(`Intentando obtener datos del arrendador usando UID: ${uidToUse}`);
        
        if (!uidToUse) {
          throw new Error("No se pudo determinar el ID del arrendador");
        }

        const response = await fetch(`http://localhost:4000/api/arrendador/${uidToUse}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo obtener los datos del arrendador`);
        }
        
        const data = await response.json();
        
        if (!data || data.length === 0) {
          throw new Error("No se encontraron datos del arrendador");
        }
        
        console.log("Datos del arrendador recibidos de API:", data[0]);
        setArrendador(data[0]);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    // Lógica principal del useEffect
    console.log("Props recibidas en InformacionArrendador:", { arrendadorProp, uidProp });

    // Caso 1: Tenemos datos completos del arrendador
    if (arrendadorProp && Object.keys(arrendadorProp).length > 0 && 
        arrendadorProp.nombre && arrendadorProp.email) {
      console.log("Usando datos completos del arrendador proporcionados directamente");
      setArrendador(arrendadorProp);
      setLoading(false);
      return;
    }
    
    // Caso 2: Tenemos datos parciales o solo ID, intentamos completar con API
    if (arrendadorProp?.uid || uidProp) {
      console.log("Datos parciales o solo ID disponible, completando con API");
      fetchArrendador();
      return;
    }
    
    // Caso 3: No tenemos datos ni ID
    console.error("No se proporcionó información del arrendador ni ID válido");
    setError("No se proporcionó información del arrendador ni ID válido");
    setLoading(false);
    
  }, [arrendadorProp, uidProp]);

  // Renderizado según el estado
  if (loading) return <div className="p-6 text-center">Cargando información del arrendador...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!arrendador) return <div className="p-6 text-center">No se encontró información del arrendador</div>;

  // Valores por defecto si los datos son null o undefined
  const nombre = arrendador.nombre && arrendador.nombre !== "Nombre no proporcionado" 
    ? arrendador.nombre 
    : "Arrendador anónimo";
    
  const fotoPerfil = arrendador.fotoPerfil || "/default-profile.png";
  const email = arrendador.email || "Correo no disponible";
  const años = arrendador.historial_sistema_arriendo 
    ? arrendador.historial_sistema_arriendo.length 
    : "N/A";

  return (
    <div className="rounded-lg p-6 shadow-sm h-full" style={{ backgroundColor: "#F0F7F6", borderColor: "#41BFB3" }}>
      <h3 className="font-medium text-xl mb-6" style={{ color: "#275950" }}>Conoce a tu arrendador</h3>
      
      <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: "white", borderColor: "#41BFB3", border: "1px solid #41BFB3" }}>
        <div className="flex gap-4">
          <img 
            src={fotoPerfil} 
            alt="Foto de perfil" 
            className="h-16 w-16 rounded-full object-cover"
            onError={(e) => {
              // Fallback si la imagen no carga
              e.currentTarget.src = "/default-profile.png";
              console.error("Error al cargar imagen de perfil:", fotoPerfil);
            }} 
          />
          <div>
            <h4 className="font-medium text-lg" style={{ color: "#275950" }}>{nombre}</h4>
            <p className="text-sm" style={{ color: "#2A8C82" }}>{email}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3" style={{ color: "#275950" }}>Información sobre el arrendador</h4>
        <p className="text-sm" style={{ color: "#275950" }}>Años arrendando: {años}</p>
        {arrendador.descripcion && (
          <p className="text-sm mt-2" style={{ color: "#275950" }}>{arrendador.descripcion}</p>
        )}
      </div>
      
      <button className="w-full py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors" 
              style={{ backgroundColor: "#275950", borderColor: "#275950", color: "white" }}>
        Contactar al arrendador
      </button>
    </div>
  );
}