import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, Text, Title, Group } from '@mantine/core';

const Home = () => {
  // Dados de exemplo
  const totalAlunos = 150;
  const rotasAtivas = 10;
  const escolasCadastradas = 5;

  // Posição central do mapa (exemplo: São Paulo)
  const mapCenter: L.LatLngExpression = L.latLng(-23.5505, -46.6333);

  return (
    <div style={{ padding: '20px' }}>
      <Title style={{ textAlign: 'center' }} mb="md">Painel de Controle</Title>
      <Group justify="space-around" mb="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Total de Alunos</Title>
          <Text size="xl" style={{ fontWeight: '500' }}>
            {totalAlunos}
          </Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Rotas Ativas</Title>
          <Text size="xl" style={{ fontWeight: '500' }}>
            {rotasAtivas}
          </Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Escolas Cadastradas</Title>
          <Text size="xl" style={{ fontWeight: '500' }}>
            {escolasCadastradas}
          </Text>
        </Card>
      </Group>
      <div style={{ height: '400px', width: '100%' }}>
        <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={mapCenter}>
            <Popup>
              Localização Central
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
