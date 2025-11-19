import type { Farmer } from '@/types/producer';

const producers: Farmer[] = [
  {
    id: '1',
    document: '111.222.333-44',
    documentType: 'CPF',
    name: 'João da Silva',
    farms: [
      {
        id: 'f-1-1',
        name: 'Fazenda Boa Vista',
        city: 'Uberlândia',
        state: 'MG',
        areaTotal: 120,
        cultivableLand: 80,
        vegetatedArea: 30,
        safras: [
          {
            year: 2021,
            name: 'Safra 2021',
            cultures: [
              { name: 'Soja', areaPlanted: 50 },
              { name: 'Milho', areaPlanted: 20 },
            ],
          },
          {
            year: 2022,
            name: 'Safra 2022',
            cultures: [{ name: 'Algodão', areaPlanted: 30 }],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    document: '55.666.777/0001-88',
    documentType: 'CNPJ',
    name: 'Agropecuária Verde LTDA.',
    farms: [],
  },
];

export default producers;
