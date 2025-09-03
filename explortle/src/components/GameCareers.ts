export const baseCareers = [
  {
    id: 1,
    name: 'Aerospace Engineer',
    averagepay: "$126,000",
    image: '/src/assets/imgs/careers/aerospaceengineer.jpg',
    url: 'https://www.instagram.com/p/DItirm8s4-8/?img_index=1',
  },
  {
    id: 2,
    name: 'Agricultural Scientist',
    averagepay: "$74,000",
    image: '/src/assets/imgs/careers/agriculturalscientist.jpg',
    url: 'https://www.instagram.com/p/DK9tgDaO4Sp/?img_index=1',
  },
  {
    id: 3,
    name: 'AI Engineer',
    averagepay: "$160,000",
    image: '/src/assets/imgs/careers/aiengineer.jpg',
    url: 'https://www.instagram.com/p/DNlhvPgu83F/?img_index=1',
  },
  {
    id: 4,
    name: 'Architect',
    averagepay: "$89,000",
    image: '/src/assets/imgs/careers/architect.jpg',
    url: 'https://www.instagram.com/p/DNlhbfTg2YQ/?img_index=1',
  },
  {
    id: 5,
    name: 'Biomedical Engineer',
    averagepay: "$97,000",
    image: '/src/assets/imgs/careers/biomedicalengineer.jpg',
    url: 'https://www.instagram.com/p/DFnDGBquZdL/?img_index=1',
  },
  {
    id: 6,
    name: 'Chemical Engineer',
    averagepay: "$106,000",
    image: '/src/assets/imgs/careers/chemicalengineer.jpg',
    url: 'https://www.instagram.com/p/DFDJjlSOWDI/?img_index=1',
  },
  {
    id: 7,
    name: 'Climatologist',
    averagepay: "$85,000",
    image: '/src/assets/imgs/careers/climatologist.jpg',
    url: 'https://www.instagram.com/p/DKJ_417trR2/?img_index=1',
  },
  {
    id: 8,
    name: 'Computer Hardware Engineer',
    averagepay: "$128,000",
    image: '/src/assets/imgs/careers/computerhardwareengineer.jpg',
    url: 'https://www.instagram.com/p/DJjYn9KOlNH/?img_index=1',
  },
  {
    id: 9,
    name: 'Cybersecurity',
    averagepay: "$112,000",
    image: '/src/assets/imgs/careers/cybersecurityengineer.jpg',
    url: 'https://www.instagram.com/p/DMp0ckAu-Dg/?img_index=1',
  },
  {
    id: 10,
    name: 'Electrical Engineer',
    averagepay: "$101,000",
    image: '/src/assets/imgs/careers/electricalengineer.jpg',
    url: 'https://www.instagram.com/p/DLi2qCZMWtC/?img_index=1',
  },
  {
    id: 11,
    name: 'Epidemiologist',
    averagepay: "$78,000",
    image: '/src/assets/imgs/careers/epidemiology.jpg',
    url: 'https://www.instagram.com/p/DNykgL23oc2/?img_index=1',
  },
  {
    id: 12,
    name: 'Financial Analyst',
    averagepay: "$96,000",
    image: '/src/assets/imgs/careers/financialanalyst.jpg',
    url: 'https://www.instagram.com/p/DKZV0UVsGiX/?img_index=1',
  },
  {
    id: 13,
    name: 'Financial Technologist',
    averagepay: "$120,000",
    image: '/src/assets/imgs/careers/financialtechnologist.jpg',
    url: 'https://www.instagram.com/p/DLPhcTxRkI-/?img_index=1',
  },
  {
    id: 14,
    name: 'Hydrologist',
    averagepay: "$89,000",
    image: '/src/assets/imgs/careers/hydrologist.jpg',
    url: 'https://www.instagram.com/p/DKra0oxMveP/?img_index=1',
  },
  {
    id: 15,
    name: 'Marine Engineer',
    averagepay: "$102,000",
    image: '/src/assets/imgs/careers/marineengineer.jpg',
    url: 'https://www.instagram.com/p/DLzrW-QMxq9/?img_index=1',
  },
  {
    id: 16,
    name: 'Mechanical Engineer',
    averagepay: "$95,000",
    image: '/src/assets/imgs/careers/mechanicalengineer.jpg',
    url: 'https://www.instagram.com/p/DEw7qQcuZFL/?img_index=1',
  },
  {
    id: 17,
    name: 'Pharmacologist',
    averagepay: "$128,000",
    image: '/src/assets/imgs/careers/pharmacologist.jpg',
    url: 'https://www.instagram.com/p/DMXx9DqshW6/?img_index=1',
  },
  {
    id: 18,
    name: 'Sales Engineer',
    averagepay: "$112,000",
    image: '/src/assets/imgs/careers/salesengineer.jpg',
    url: 'https://www.instagram.com/p/DHBKJGCuKbK/?img_index=1',
  },
  {
    id: 19,
    name: 'Structural Engineer',
    averagepay: "$95,000",
    image: '/src/assets/imgs/careers/structuralengineer.jpg',
    url: 'https://www.instagram.com/p/DMNUeRSM7PH/?img_index=1',
  },
  {
    id: 20,
    name: 'Web Developer',
    averagepay: "$85,000",
    image: '/src/assets/imgs/careers/webdeveloper.jpg',
    url: 'https://www.instagram.com/p/DM8GDMZxrjX/?img_index=1',
  },
]

export const selectedCareers = []

export const careers = [...baseCareers, ...baseCareers]

export interface Career {
  id: number
  name: string
  averagepay: string
  uid?: string
}
