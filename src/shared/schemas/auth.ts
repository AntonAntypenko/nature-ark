import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type LoginRequestDTO = z.infer<typeof loginSchema>;

export type LoginResponseDTO = {
  user: {
    id: string;
    email: string;
    phone: string;
  };
  token: string;
};
