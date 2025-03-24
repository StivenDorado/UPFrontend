"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {
  Home,
  Wifi,
  Tv,
  UtensilsCrossed,
  Droplet,
  Car,
  Waves,
  Refrigerator,
  Flame,
  Dog,
  Ban,
  Sofa,
  Building,
  Bed,
  Bath,
  Users,
  ParkingCircle,
  Mountain,
  TreePine,
} from "lucide-react";

export default function CaracteristicasPage(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propiedad_id = searchParams.get("propiedadId");

  // Estados para las características
  const [housingType, setHousingType] = useState<string>("");
  const [services, setServices] = useState<string[]>([]);
  const [furnishingType, setFurnishingType] = useState<string>("");
  const [petPolicy, setPetPolicy] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [capacity, setCapacity] = useState<number>(1);
  const [parkingSpaces, setParkingSpaces] = useState<number>(0);
  const [outdoorFeatures, setOutdoorFeatures] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propiedad_id) {
      setError(
        "No se encontró el id de la propiedad. Por favor, regresa y crea el alojamiento."
      );
    }
  }, [propiedad_id]);

  // Funciones para actualizar estados
  const handleHousingTypeChange = (value: string) => setHousingType(value);
  const handleServiceChange = (service: string) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };
  const handleFurnishingChange = (value: string) => setFurnishingType(value);
  const handlePetPolicyChange = (value: string) => setPetPolicy(value);
  const handleOutdoorFeatureChange = (feature: string) => {
    setOutdoorFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  // Función para enviar las características asociadas a la propiedad
  const goToNextStep = async () => {
    if (!propiedad_id) {
      setError("No se encontró el id de la propiedad");
      return;
    }

    const data = {
      propiedad_id: Number(propiedad_id),
      tipo_vivienda: housingType,
      wifi: services.includes("Wifi"),
      energia: services.includes("Energía"),
      tv: services.includes("TV"),
      cocina: services.includes("Cocina"),
      agua: services.includes("Agua"),
      garaje: services.includes("Garaje"),
      lavadora: services.includes("Lavadora"),
      nevera: services.includes("Nevera"),
      gas: services.includes("Gas"),
      habitaciones: bedrooms,
      // Si tu backend espera la propiedad "baños", asegúrate de que el nombre coincida
      baños: bathrooms,
      capacidad: capacity,
      estacionamientos: parkingSpaces,
      jardin: outdoorFeatures.includes("Jardín"),
      piscina: outdoorFeatures.includes("Piscina"),
      vista_montaña: outdoorFeatures.includes("Vista a la montaña"),
      terraza: outdoorFeatures.includes("Terraza"),
      amoblado: furnishingType === "Amoblado",
      acepta_mascotas: petPolicy === "Acepta mascotas",
    };

    try {
      const response = await fetch("http://localhost:4000/api/caracteristicas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al guardar las características");
        return;
      }
      const result = await response.json();
      console.log("Características guardadas:", result);
      // Redirigimos a la página de imágenes incluyendo el id de la propiedad en la URL
      router.push(`/imagenes?propiedadId=${propiedad_id}`);
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Error en la petición");
    }
  };

  return (
    <div>
      <main className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#2A8C82]">
          Características del Alojamiento
        </h1>

        {/* Formulario para seleccionar características */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#41BFB3]">
            Tipo de vivienda
          </h2>
          <RadioGroup
            value={housingType}
            onValueChange={handleHousingTypeChange}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {["Apartamento", "Casa", "Casa de Familia", "Estudio", "Habitación"].map((tipo) => (
              <div key={tipo} className="relative">
                <RadioGroupItem
                  value={tipo}
                  id={`housing-${tipo}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`housing-${tipo}`}
                  className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:border-[#275950] peer-data-[state=checked]:border-[#275950] peer-data-[state=checked]:bg-[#275950]/10 transition-all h-full"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-[#275950]/10">
                    {tipo === "Apartamento" ? (
                      <Building className="h-6 w-6" />
                    ) : tipo === "Casa" ? (
                      <Home className="h-6 w-6" />
                    ) : (
                      <Home className="h-6 w-6" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#260101]">{tipo}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#41BFB3]">
            Servicios
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Wifi",
              "Energía",
              "TV",
              "Cocina",
              "Agua",
              "Garaje",
              "Lavadora",
              "Nevera",
              "Gas",
            ].map((servicio) => (
              <div
                key={servicio}
                onClick={() => handleServiceChange(servicio)}
                className={`cursor-pointer border p-4 rounded-lg transition-all hover:border-[#275950] ${
                  services.includes(servicio) ? "border-[#275950] bg-[#275950]/10" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`service-${servicio}`}
                    checked={services.includes(servicio)}
                    onCheckedChange={() => handleServiceChange(servicio)}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#275950]/10">
                      {servicio === "Wifi" ? (
                        <Wifi className="h-6 w-6" />
                      ) : servicio === "Energía" ? (
                        <Flame className="h-6 w-6" />
                      ) : servicio === "TV" ? (
                        <Tv className="h-6 w-6" />
                      ) : servicio === "Cocina" ? (
                        <UtensilsCrossed className="h-6 w-6" />
                      ) : servicio === "Agua" ? (
                        <Droplet className="h-6 w-6" />
                      ) : servicio === "Garaje" ? (
                        <Car className="h-6 w-6" />
                      ) : servicio === "Lavadora" ? (
                        <Waves className="h-6 w-6" />
                      ) : servicio === "Nevera" ? (
                        <Refrigerator className="h-6 w-6" />
                      ) : (
                        <Flame className="h-6 w-6" />
                      )}
                    </div>
                    <Label
                      htmlFor={`service-${servicio}`}
                      className="text-sm font-medium text-[#260101]"
                    >
                      {servicio}
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[#41BFB3]">
            Características principales
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Bed className="h-6 w-6 mb-2" />
              <span className="text-sm mb-2">Habitaciones</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2">{bedrooms}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBedrooms(bedrooms + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Bath className="h-6 w-6 mb-2" />
              <span className="text-sm mb-2">Baños</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2">{bathrooms}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBathrooms(bathrooms + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm mb-2">Capacidad</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCapacity(Math.max(1, capacity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2">{capacity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCapacity(capacity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <ParkingCircle className="h-6 w-6 mb-2" />
              <span className="text-sm mb-2">Estacionamientos</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setParkingSpaces(Math.max(0, parkingSpaces - 1))
                  }
                >
                  -
                </Button>
                <span className="px-4 py-2">{parkingSpaces}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setParkingSpaces(parkingSpaces + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#41BFB3]">
            Características exteriores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Jardín", "Piscina", "Vista a la montaña", "Terraza"].map((feature) => (
              <div
                key={feature}
                onClick={() => handleOutdoorFeatureChange(feature)}
                className={`cursor-pointer border p-4 rounded-lg transition-all hover:border-[#275950] ${
                  outdoorFeatures.includes(feature)
                    ? "border-[#275950] bg-[#275950]/10"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={outdoorFeatures.includes(feature)}
                    onCheckedChange={() => handleOutdoorFeatureChange(feature)}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#275950]/10">
                      {feature === "Jardín" ? (
                        <TreePine className="h-6 w-6" />
                      ) : feature === "Piscina" ? (
                        <Droplet className="h-6 w-6" />
                      ) : feature === "Vista a la montaña" ? (
                        <Mountain className="h-6 w-6" />
                      ) : (
                        <Home className="h-6 w-6" />
                      )}
                    </div>
                    <Label
                      htmlFor={`feature-${feature}`}
                      className="text-sm font-medium text-[#260101]"
                    >
                      {feature}
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[#41BFB3]">
            Otros filtros
          </h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Estado del inmueble</h3>
            <RadioGroup
              value={furnishingType}
              onValueChange={handleFurnishingChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {["Amoblado", "Sin Amoblar"].map((opcion) => (
                <div key={opcion} className="relative">
                  <RadioGroupItem
                    value={opcion}
                    id={`furnishing-${opcion}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`furnishing-${opcion}`}
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-[#275950] peer-data-[state=checked]:border-[#275950] peer-data-[state=checked]:bg-[#275950]/10 transition-all h-full"
                  >
                    <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-[#275950]/10">
                      {opcion === "Amoblado" ? (
                        <Sofa className="h-6 w-6" />
                      ) : (
                        <Ban className="h-6 w-6" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-[#260101]">
                      {opcion}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Política de mascotas</h3>
            <RadioGroup
              value={petPolicy}
              onValueChange={handlePetPolicyChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {["Acepta mascotas", "No acepta mascotas"].map((opcion) => (
                <div key={opcion} className="relative">
                  <RadioGroupItem
                    value={opcion}
                    id={`pet-${opcion}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`pet-${opcion}`}
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-[#275950] peer-data-[state=checked]:border-[#275950] peer-data-[state=checked]:bg-[#275950]/10 transition-all h-full"
                  >
                    <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-[#275950]/10">
                      {opcion === "Acepta mascotas" ? (
                        <Dog className="h-6 w-6" />
                      ) : (
                        <Ban className="h-6 w-6" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-[#260101]">
                      {opcion}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </section>

        <Button
          className="w-full py-6 text-lg mt-8 bg-[#2A8C82] text-white"
          onClick={goToNextStep}
        >
          Siguiente
        </Button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </main>
    </div>
  );
}
