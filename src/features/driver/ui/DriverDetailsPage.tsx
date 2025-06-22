import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Select, Flex, Button } from '@mantine/core';
import { api } from '@/libs/api/rest/api.client';
import { Driver } from '@/features/driver/model/driver.schema';
import { Status } from '@/shared/types/enums';
import { usePersonForm } from "@/shared/hooks/usePersonForm";
import { useAddressForm } from "@/shared/hooks/useAddressForm";
import { PersonFields } from "@/shared/components/form/groups/PersonFields";
import { AddressFields } from "@/shared/components/form/groups/AddressFields";
import { ContactFields } from "@/shared/components/form/groups/ContactFields";
import { useContactForm } from "@/shared/hooks/useContactForm";
import {
    ContactWithRequiredCellPhoneSchema,
    ContactConfigs,
} from "@/shared/schemas/fields/contact.schema";

const DriverDetailsPage = () => {
  const { id } = useParams<{id: string}>();
  const [driver, setDriver] = useState<Driver | null>(null);

  const personForm = usePersonForm();
  const addressForm = useAddressForm();
  const contactForm = useContactForm(ContactWithRequiredCellPhoneSchema);

  useEffect(() => {
    // Dados fake para teste
    const fakeDriver: Driver = {
      id: id,
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
        <p>ID: {id}</p>
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
            {/* Conteúdo da aba "Rotas Programadas" */}
            <div>Em breve, as rotas programadas para este motorista!</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default DriverDetailsPage;
