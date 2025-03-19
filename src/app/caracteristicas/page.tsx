"use client"

import React, { useState } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Checkbox } from "../components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
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
} from "lucide-react"
import { useRouter } from "next/navigation" // Importamos useRouter para la navegación

export default function AccommodationFiltersPage() {
  const router = useRouter() // Usamos useRouter para la navegación
  const [housingType, setHousingType] = useState<string>("")
  const [services, setServices] = useState<string[]>([])
  const [furnishingType, setFurnishingType] = useState<string>("")
  const [petPolicy, setPetPolicy] = useState<string>("")
  const [bedrooms, setBedrooms] = useState<number>(1)
  const [bathrooms, setBathrooms] = useState<number>(1)
  const [capacity, setCapacity] = useState<number>(1)
  const [parkingSpaces, setParkingSpaces] = useState<number>(0)
  const [outdoorFeatures, setOutdoorFeatures] = useState<string[]>([])

  const handleHousingTypeChange = (value: string) => setHousingType(value)
  const handleServiceChange = (service: string) => {
    setServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }
  const handleFurnishingChange = (value: string) => setFurnishingType(value)
  const handlePetPolicyChange = (value: string) => setPetPolicy(value)
  const handleOutdoorFeatureChange = (feature: string) => {
    setOutdoorFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  const goToNextStep = () => {
    console.log("Datos guardados:", {
      tipoVivienda: housingType,
      servicios: services,
      amueblado: furnishingType,
      politicaMascotas: petPolicy,
      habitaciones: bedrooms,
      baños: bathrooms,
      capacidad: capacity,
      estacionamientos: parkingSpaces,
      exteriores: outdoorFeatures,
    })
    // Redirigir a la página de imágenes
    router.push("/imagenes")
  }

  const serviceIcons: Record<string, React.ReactNode> = {
    Wifi: <Wifi className="h-6 w-6" />,
    Energía: <Flame className="h-6 w-6" />,
    TV: <Tv className="h-6 w-6" />,
    Cocina: <UtensilsCrossed className="h-6 w-6" />,
    Agua: <Droplet className="h-6 w-6" />,
    Garaje: <Car className="h-6 w-6" />,
    Lavadora: <Waves className="h-6 w-6" />,
    Nevera: <Refrigerator className="h-6 w-6" />,
    Gas: <Flame className="h-6 w-6" />,
  }

  const housingIcons: Record<string, React.ReactNode> = {
    Apartamento: <Building className="h-6 w-6" />,
    Casa: <Home className="h-6 w-6" />,
    "Casa de Familia": <Home className="h-6 w-6" />,
    Estudio: <Building className="h-6 w-6" />,
    Habitación: <Building className="h-6 w-6" />,
  }

  const outdoorFeatureIcons: Record<string, React.ReactNode> = {
    Jardín: <TreePine className="h-6 w-6" />,
    Piscina: <Droplet className="h-6 w-6" />, // Reemplazamos Pool con Droplet
    "Vista a la montaña": <Mountain className="h-6 w-6" />,
    Terraza: <Home className="h-6 w-6" />,
  }

  return (
    <div>
      <main className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#2A8C82]">Características del Alojamiento</h1>
        <div className="space-y-10">
          {/* Tipo de vivienda */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#41BFB3]">Tipo de vivienda</h2>
            <p className="text-[#91F2E9] mb-4">Selecciona un solo tipo de propiedad</p>
            <RadioGroup
              value={housingType}
              onValueChange={handleHousingTypeChange}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              {["Apartamento", "Casa", "Casa de Familia", "Estudio", "Habitación"].map((tipo) => (
                <div key={tipo} className="relative">
                  <RadioGroupItem value={tipo} id={`housing-${tipo}`} className="peer sr-only" />
                  <Label
                    htmlFor={`housing-${tipo}`}
                    className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:border-[#275950] peer-data-[state=checked]:border-[#275950] peer-data-[state=checked]:bg-[#275950]/10 transition-all h-full"
                  >
                    <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-[#275950]/10">
                      {housingIcons[tipo]}
                    </div>
                    <span className="text-sm font-medium text-[#260101]">{tipo}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </section>

          {/* Servicios */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#41BFB3]">Servicios</h2>
            <p className="text-[#91F2E9] mb-4">Puedes seleccionar múltiples servicios</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Wifi", "Energía", "TV", "Cocina", "Agua", "Garaje", "Lavadora", "Nevera", "Gas"].map((servicio) => (
                <Card
                  key={servicio}
                  className={`p-4 cursor-pointer hover:border-[#275950] transition-all ${services.includes(servicio) ? "border-[#275950] bg-[#275950]/10" : ""}`}
                  onClick={() => handleServiceChange(servicio)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`service-${servicio}`}
                      checked={services.includes(servicio)}
                      onCheckedChange={() => handleServiceChange(servicio)}
                    />
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#275950]/10">
                        {serviceIcons[servicio]}
                      </div>
                      <Label htmlFor={`service-${servicio}`} className="text-sm font-medium text-[#260101]">
                        {servicio}
                      </Label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Características principales */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#41BFB3]">Características principales</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Bed className="h-6 w-6 mb-2" />
                <span className="text-sm mb-2">Habitaciones</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}>-</Button>
                  <span className="px-4 py-2">{bedrooms}</span>
                  <Button variant="outline" size="sm" onClick={() => setBedrooms(bedrooms + 1)}>+</Button>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Bath className="h-6 w-6 mb-2" />
                <span className="text-sm mb-2">Baños</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}>-</Button>
                  <span className="px-4 py-2">{bathrooms}</span>
                  <Button variant="outline" size="sm" onClick={() => setBathrooms(bathrooms + 1)}>+</Button>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm mb-2">Capacidad</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCapacity(Math.max(1, capacity - 1))}>-</Button>
                  <span className="px-4 py-2">{capacity}</span>
                  <Button variant="outline" size="sm" onClick={() => setCapacity(capacity + 1)}>+</Button>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <ParkingCircle className="h-6 w-6 mb-2" />
                <span className="text-sm mb-2">Estacionamientos</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setParkingSpaces(Math.max(0, parkingSpaces - 1))}>-</Button>
                  <span className="px-4 py-2">{parkingSpaces}</span>
                  <Button variant="outline" size="sm" onClick={() => setParkingSpaces(parkingSpaces + 1)}>+</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Características exteriores */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-[#41BFB3]">Características exteriores</h2>
            <p className="text-[#91F2E9] mb-4">Selecciona las características que aplican</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Jardín", "Piscina", "Vista a la montaña", "Terraza"].map((feature) => (
                <Card
                  key={feature}
                  className={`p-4 cursor-pointer hover:border-[#275950] transition-all ${outdoorFeatures.includes(feature) ? "border-[#275950] bg-[#275950]/10" : ""}`}
                  onClick={() => handleOutdoorFeatureChange(feature)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={outdoorFeatures.includes(feature)}
                      onCheckedChange={() => handleOutdoorFeatureChange(feature)}
                    />
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#275950]/10">
                        {outdoorFeatureIcons[feature]}
                      </div>
                      <Label htmlFor={`feature-${feature}`} className="text-sm font-medium text-[#260101]">
                        {feature}
                      </Label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Otros filtros */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#41BFB3]">Otros filtros</h2>
            
            {/* Amueblado */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Estado del inmueble</h3>
              <p className="text-[#91F2E9] mb-4">Selecciona una opción</p>
              <RadioGroup
                value={furnishingType}
                onValueChange={handleFurnishingChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {["Amoblado", "Sin Amoblar"].map((opcion) => (
                  <div key={opcion} className="relative">
                    <RadioGroupItem value={opcion} id={`furnishing-${opcion}`} className="peer sr-only" />
                    <Label
                      htmlFor={`furnishing-${opcion}`}
                      className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-[#275950] peer-data-[state=checked]:border-[#275950] peer-data-[state=checked]:bg-[#275950]/10 transition-all h-full"
                    >
                      <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-[#275950]/10">
                        {opcion === "Amoblado" ? <Sofa className="h-6 w-6" /> : <Ban className="h-6 w-6" />}
                      </div>
                      <span className="text-sm font-medium text-[#260101]">{opcion}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Mascotas */}
            <div>
              <h3 className="text-lg font-medium mb-2">Política de mascotas</h3>
              <p className="text-[#91F2E9] mb-4">Selecciona una opción</p>
              <RadioGroup
                value={petPolicy}
                onValueChange={handlePetPolicyChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {["Acepta mascotas", "No acepta mascotas"].map((opcion) => (
                  <div key={opcion} className="relative">
                    <RadioGroupItem value={opcion} id={`pet-${opcion}`} className="peer sr-only" />
                    <Label
                      htmlFor={`pet-${opcion}`}
                      className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-[#275950] peer-data-[state=checked]:border-[#275950] peer-data-[state=checked]:bg-[#275950]/10 transition-all h-full"
                    >
                      <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-[#275950]/10">
                        {opcion === "Acepta mascotas" ? <Dog className="h-6 w-6" /> : <Ban className="h-6 w-6" />}
                      </div>
                      <span className="text-sm font-medium text-[#260101]">{opcion}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </section>

          {/* Botón para siguiente paso */}
          <Button className="w-full py-6 text-lg mt-8 bg-[#2A8C82] text-white" onClick={goToNextStep}>
            Siguiente
          </Button>
        </div>
      </main>
    </div>
  )
}