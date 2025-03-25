"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuración del icono personalizado
const CustomIcon = L.icon({
  iconUrl: '/marcador-de-posicion.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

L.Marker.prototype.options.icon = CustomIcon;

interface MapEventsProps {
  setPosition: (pos: [number, number]) => void;
  updateAddress: (lat: number, lng: number) => Promise<void>;
}

const MapEvents = ({ setPosition, updateAddress }: MapEventsProps) => {
  const map = useMapEvents({
    async click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      await updateAddress(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null;
};

const UpdateMapView = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);
  return null;
};

interface MapaComponentProps {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
  updateAddress: (lat: number, lng: number) => Promise<void>;
}

export default function MapaComponent({
  position,
  setPosition,
  updateAddress
}: MapaComponentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>Cargando mapa...</p>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Ubicación seleccionada</Popup>
      </Marker>
      <MapEvents setPosition={setPosition} updateAddress={updateAddress} />
      <UpdateMapView position={position} />
    </MapContainer>
  );
}