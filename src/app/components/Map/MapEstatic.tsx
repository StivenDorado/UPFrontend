import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: '/marcador-de-posicion.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function MapSizeUpdater() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

interface MapaEstaticProps {
  position: [number, number];
}

export default function MapEstatic({ position }: MapaEstaticProps) {
  useEffect(() => {
    console.log("Posición en MapEstatic:", position);
  }, [position]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>Ubicación guardada</Popup>
      </Marker>
      <MapSizeUpdater />
    </MapContainer>
  );
}
