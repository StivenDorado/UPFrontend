"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

// Importación dinámica para evitar errores en SSR
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const useMapEvents = dynamic(() => import("react-leaflet/hooks").then(mod => mod.useMapEvents), { ssr: false });

// Ícono del marcador
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapaComponent({ position, setPosition }: { position: [number, number]; setPosition: (pos: [number, number]) => void }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function LocationMarker() {
    if (!isClient) return null;

    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return <Marker position={position} icon={markerIcon} />;
  }

  return isClient ? (
    <div className="h-[400px] w-full">
      <MapContainer center={position} zoom={6} style={{ width: "100%", height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  ) : (
    <p className="text-center">Cargando mapa...</p>
  );
}
