import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;

import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import { useState } from 'react';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

const MapWithRoute = () => {
  const routePoints = [
    [-23.5489, -46.6388] as [number, number], // Ponto 1
    [-23.5495, -46.6380] as [number, number], // Ponto 2
    [-23.5505, -46.6365] as [number, number], // Ponto 3
    [-23.5515, -46.6355] as [number, number], // Ponto 4
    [-23.5525, -46.6345] as [number, number], // Ponto 5
    [-23.5535, -46.6335] as [number, number], // Ponto 7
    [-23.5545, -46.6325] as [number, number], // Ponto 7
    [-23.5550, -46.6310] as [number, number], // Ponto 8
    [-23.5555, -46.6300] as [number, number], // Ponto 9
  ];

  const center = [-23.5522, -46.6344] as [number, number]; // São Paulo

  return (
    <MapContainer center={center} zoom={15} style={{ height: '340px', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={routePoints} color="red" weight={5}/>
      {routePoints.map((point, index) => (
        <Marker key={index} position={point} icon={L.icon({
          iconUrl: icon,
          iconRetinaUrl: iconRetina,
          shadowUrl: shadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })}>
          <Popup>
            Ponto {index + 1}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithRoute;
