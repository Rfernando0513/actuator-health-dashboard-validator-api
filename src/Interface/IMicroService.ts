export interface IMicroService {
    id?: number;
    name: string;
    origem: string;
    url: string;
    status: 'UP' | 'DOWN';
    time: string;
  }
  