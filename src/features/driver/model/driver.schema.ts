import { AddressSchema, StatusSchema } from "@/shared/schemas";
import { isValidCpf } from "@/shared/validators";
import { z } from "zod";

export const DriverSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Nome é obrigatório"),
	birthDate: z.date({
		required_error: "Data de nascimento é obrigatória",
		invalid_type_error: "Data inválida",
	}),
	cpf: z
		.string()
		.regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF inválido")
		.refine(isValidCpf, { message: "CPF inválido" }),
	address: AddressSchema,
	status: StatusSchema,
	contact: z.object({
		phone: z.string().optional(),
		cellphone: z.string().optional(),
		email: z.string().email("Email inválido").optional(),
	}),
	cnh: z.string(),
});

export type Driver = z.infer<typeof DriverSchema>;
