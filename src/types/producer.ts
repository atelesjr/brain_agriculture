export interface Culture {
  name: string;
  areaPlanted: number;
}

export interface Safra {
  year: number;
  name: string;
  cultures: Culture[];
}

export interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  areaTotal: number;
  cultivableLand: number;
  vegetatedArea: number;
  safras: Safra[];
}

export interface Farmer {
  id: string;
  document: string;
  documentType: string;
  name: string;
  farms: Farm[];
}
