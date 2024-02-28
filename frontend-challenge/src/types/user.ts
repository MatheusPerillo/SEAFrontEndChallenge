export interface User {
  name: string;
  cpf: string;
  rg: string;
  dateOfBirth: string;
  gender: string;
  status: string;
  role: string;
  usesEPI: boolean;
  healthCertificate?: string;
  activities?: Array<{
    name?: string;
    EPIs?: Array<{
      name?: string;
      CA?: string;
    }>;
  }>;
}
