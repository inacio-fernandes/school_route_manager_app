import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Select, Flex, Button } from '@mantine/core';
import { Driver } from '@/features/driver/model/driver.schema';
import { Status } from '@/shared/types/enums';
import { usePersonForm } from "@/shared/hooks/usePersonForm";
import { useAddressForm } from "@/shared/hooks/useAddressForm";
import { PersonFields } from "@/shared/components/form/groups/PersonFields";
import { AddressFields } from "@/shared/components/form/groups/AddressFields";
import { ContactFields } from "@/shared/components/form/groups/ContactFields";
import { useContactForm } from "@/shared/hooks/useContactForm";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import {
    ContactWithRequiredCellPhoneSchema,
    ContactConfigs,
} from "@/shared/schemas/fields/contact.schema";
import MapWithRoute from "@/features/driver/components/MapWithRoute";

const DriverDetailsPage = () => {
  const { id } = useParams<{id: string}>();
  const driverId = id || '1';
  const [driver, setDriver] = useState<Driver | null>(null);

  const personForm = usePersonForm();
  const addressForm = useAddressForm();
  const contactForm = useContactForm(ContactWithRequiredCellPhoneSchema);

  useEffect(() => {
    // Dados fake para teste
    const fakeDriver: Driver = {
      id: driverId,
      name: 'John Doe',
      birthDate: new Date(),
      cpf: '123.456.789-00',
      address: {
        street: 'Fake Street',
        number: '123',
        neighborhood: 'Fake Neighborhood',
        city: 'Fake City',
        zipCode: '12345-678',
        state: 'SP',
      },
      status: Status.ACTIVE,
      contact: {
        phone: '1234-5678',
        cellphone: '91234-5678',
        email: 'john.doe@example.com',
      },
      cnh: '1234567890',
    };
    personForm.setValues({
      name: fakeDriver.name,
      birthDate: fakeDriver.birthDate,
      cpf: fakeDriver.cpf,
      status: fakeDriver.status,
    });
    addressForm.setValues(fakeDriver.address);
    contactForm.setValues(fakeDriver.contact);
    setDriver(fakeDriver);
  }, [id]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Seção Superior (1/3) */}
      <div style={{ flex: 1, backgroundColor: '#f0f0f0', padding: '16px' }}>
        <h2>Dados do Motorista</h2>
        <p>Nome: {driver?.name || 'N/A'}</p>
        <p>Telefone: {driver?.contact?.phone || 'N/A'}</p>
        <p>ID: {driverId}</p>
        <p>Status: {driver?.status || 'N/A'}</p>
      </div>

      {/* Seção Inferior (2/3) */}
      <div style={{ flex: 2, padding: '16px' }}>
        <Tabs defaultValue="dadosMotorista">
          <Tabs.List>
            <Tabs.Tab value="dadosMotorista">Dados Motorista</Tabs.Tab>
            <Tabs.Tab value="rotasProgramadas">Rotas Programadas</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="dadosMotorista">
            {/* Conteúdo da aba "Dados Motorista" */}
            <PersonFields form={personForm} />
            <ContactFields
                form={contactForm}
                config={ContactConfigs.withRequiredCellPhone}
            />
            <AddressFields form={addressForm} />
            <Select
                label="Status"
                data={[
                    { value: `${Status.ACTIVE}`, label: "Ativo" },
                    { value: `${Status.INACTIVE}`, label: "Inativo" },
                ]}
                {...personForm.getInputProps("status")}
                withAsterisk
            />
            <Flex justify="flex-end" mt="md">
                <Button type="submit">Salvar motorista</Button>
            </Flex>
          </Tabs.Panel>
            <Tabs.Panel value="rotasProgramadas">
              {/* Cabeçalho da rota */}
              <div style={{
              marginBottom: 24,
              padding: 20,
              borderRadius: 12,
              background: "#f8fafc",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}>
              <h3 style={{ margin: 0, fontWeight: 600, fontSize: 22 }}>Rota: Rota Exemplo 1</h3>
              <Flex gap={32} mt={8} wrap="wrap">
                <div><strong>Motorista:</strong> {driver?.name || 'N/A'}</div>
                <div><strong>Horário:</strong> 07:00 - 12:00</div>
                <div><strong>Monitor(a):</strong> Maria Silva</div>
              </Flex>
              </div>

              {/* Mapa OpenStreetMap com rota e paradas */}
              <div style={{
              height: 340,
              marginBottom: 24,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
              }}>
              {/* Usando um mapa Leaflet com rota e marcadores */}
              <MapWithRoute />
              </div>

              {/* Lista de paradas */}
              <div style={{
              marginBottom: 24,
              padding: 16,
              borderRadius: 10,
              background: "#f4f7fb"
              }}>
              <h4 style={{ marginTop: 0 }}>Paradas da Rota</h4>
              <ol style={{ paddingLeft: 20, margin: 0 }}>
                <li>Rua A, 123 - Bairro 1</li>
                <li>Rua B, 456 - Bairro 2</li>
                <li>Rua C, 789 - Bairro 3</li>
                <li>Rua D, 101 - Bairro 4</li>
                <li>Rua E, 202 - Bairro 5</li>
              </ol>
              </div>

              {/* Lista de alunos */}
              <div style={{
              padding: 16,
              borderRadius: 10,
              background: "#f4f7fb"
              }}>
              <h4 style={{ marginTop: 0 }}>Alunos</h4>
              <table style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                background: "#fff",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
              }}>
                <thead>
                <tr style={{ background: "#f0f3f8" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500 }}>Nome</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500 }}>Entrada</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500 }}>Saída</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td style={{ padding: "10px 12px" }}>Lucas Pereira</td>
                  <td style={{ padding: "10px 12px" }}>Rua B, 456</td>
                  <td style={{ padding: "10px 12px" }}>Rua D, 101</td>
                </tr>
                <tr style={{ background: "#f8fafc" }}>
                  <td style={{ padding: "10px 12px" }}>Ana Souza</td>
                  <td style={{ padding: "10px 12px" }}>Rua A, 123</td>
                  <td style={{ padding: "10px 12px" }}>Rua E, 202</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px" }}>João Lima</td>
                  <td style={{ padding: "10px 12px" }}>Rua C, 789</td>
                  <td style={{ padding: "10px 12px" }}>Rua B, 456</td>
                </tr>
                <tr style={{ background: "#f8fafc" }}>
                  <td style={{ padding: "10px 12px" }}>Beatriz Alves</td>
                  <td style={{ padding: "10px 12px" }}>Rua D, 101</td>
                  <td style={{ padding: "10px 12px" }}>Rua A, 123</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px" }}>Marcos Silva</td>
                  <td style={{ padding: "10px 12px" }}>Rua E, 202</td>
                  <td style={{ padding: "10px 12px" }}>Rua C, 789</td>
                </tr>
                </tbody>
              </table>
              </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default DriverDetailsPage;
