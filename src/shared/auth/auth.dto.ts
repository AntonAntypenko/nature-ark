export type LoginRequestDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  user: {
    id: string;
    email: string;
  };
  token: string;
};
