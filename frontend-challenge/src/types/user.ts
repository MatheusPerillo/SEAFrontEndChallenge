export interface User {
  name: string;
  cpf: string;
  gender: string;
  status: string;
  role: string;
  usesEPI: boolean;
  healthCertificate: string;
  activities: Array<{
    name: string;
    EPIs: string[];
  }>;
}
