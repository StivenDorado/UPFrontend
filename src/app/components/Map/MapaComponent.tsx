"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuración del icono personalizado
const CustomIcon = L.icon({
  iconUrl: '/marcador-de-posicion.png', // Ruta directa desde public
  iconSize: [32, 32], // Tamaño del icono en píxeles [ancho, alto]
  iconAnchor: [16, 32], // Punto del icono que corresponderá a la posición del marcador
  popupAnchor: [0, -32] // Punto desde el cual se abrirá el popup
});

L.Marker.prototype.options.icon = CustomIcon;

// Resto del código permanece igual...
const MapEvents = ({ setPosition }: { setPosition: (pos: [number, number]) => void }) => {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
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

export default function MapaComponent({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}) {
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
      <MapEvents setPosition={setPosition} />
      <UpdateMapView position={position} />
    </MapContainer>
  );
}