import { LoginResponseDTO } from "@/shared/schemas";

export type AuthSession = {
  access_token: string;
  refresh_token: string;
};

export type LoginServiceResponse = {
  dto: LoginResponseDTO;
  session: AuthSession;
};
