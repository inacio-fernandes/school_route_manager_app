import React from 'react';
import { Driver } from '@/features/driver/model/driver.schema';
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
import { Select, Flex, Button } from '@mantine/core';
import { Status } from '@/shared/types/enums';

type DriverDetailsProps = {
  driver: Driver;
};

const DriverDetails: React.FC<DriverDetailsProps> = ({ driver }: DriverDetailsProps) => {
  const personForm = usePersonForm(driver ? {
    name: driver.name,
    birthDate: driver.birthDate,
    cpf: driver.cpf,
    status: driver.status,
  } : undefined);
  const addressForm = useAddressForm(driver ? driver.address : undefined);
  const contactForm = useContactForm(ContactWithRequiredCellPhoneSchema, driver ? driver.contact : undefined);

  return (
    <div>
      <h2>Detalhes do Motorista</h2>
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
    </div>
  );
};

export default DriverDetails;
