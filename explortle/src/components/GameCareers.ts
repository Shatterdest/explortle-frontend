export interface Career {
  id: number
  name: string
  averagepay: string
  image: string
  url: string
  description: string
  uid?: string
}

export const baseCareers: Career[] = [
  {
    id: 1,
    name: 'Aerospace Engineer',
    averagepay: "$126,000",
    image: new URL('@/assets/imgs/careers/aerospaceengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DItirm8s4-8/?img_index=1',
    description: 'Design aircraft, spacecraft, and satellites.'
  },
  {
    id: 2,
    name: 'Agricultural Scientist',
    averagepay: "$74,000",
    image: new URL('@/assets/imgs/careers/agriculturalscientist.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DK9tgDaO4Sp/?img_index=1',
    description: 'Research ways to improve the efficiency and safety of agricultural establishments and products.'
  },
  {
    id: 3,
    name: 'AI Engineer',
    averagepay: "$160,000",
    image: new URL('@/assets/imgs/careers/aiengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DNlhvPgu83F/?img_index=1',
    description: 'Develop artificial intelligence systems and machine learning models.'
  },
  {
    id: 4,
    name: 'Architect',
    averagepay: "$89,000",
    image: new URL('@/assets/imgs/careers/architect.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DNlhbfTg2YQ/?img_index=1',
    description: 'Plan and design buildings, homes, and other structures.'
  },
  {
    id: 5,
    name: 'Biomedical Engineer',
    averagepay: "$97,000",
    image: new URL('@/assets/imgs/careers/biomedicalengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DFnDGBquZdL/?img_index=1',
    description: 'Combine engineering principles and medical sciences to design healthcare equipment.'
  },
  {
    id: 6,
    name: 'Chemical Engineer',
    averagepay: "$106,000",
    image: new URL('@/assets/imgs/careers/chemicalengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DFDJjlSOWDI/?img_index=1',
    description: 'Develop and design chemical manufacturing processes.'
  },
  {
    id: 7,
    name: 'Climatologist',
    averagepay: "$85,000",
    image: new URL('@/assets/imgs/careers/climatologist.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DKJ_417trR2/?img_index=1',
    description: 'Study climate patterns and how they change over time.'
  },
  {
    id: 8,
    name: 'Computer Hardware Engineer',
    averagepay: "$128,000",
    image: new URL('@/assets/imgs/careers/computerhardwareengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DJjYn9KOlNH/?img_index=1',
    description: 'Design, develop, and test computer systems and components.'
  },
  {
    id: 9,
    name: 'Cybersecurity Engineer',
    averagepay: "$112,000",
    image: new URL('@/assets/imgs/careers/cybersecurityengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DMp0ckAu-Dg/?img_index=1',
    description: 'Protect computer systems and networks from digital attacks, damage or theft.'
  },
  {
    id: 10,
    name: 'Electrical Engineer',
    averagepay: "$101,000",
    image: new URL('@/assets/imgs/careers/electricalengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DLi2qCZMWtC/?img_index=1',
    description: 'Design, develop, and test electrical equipment and systems.'
  },
  {
    id: 11,
    name: 'Epidemiologist',
    averagepay: "$78,000",
    image: new URL('@/assets/imgs/careers/epidemiology.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DNykgL23oc2/?img_index=1',
    description: 'Study the patterns, causes, and effects of health and disease conditions.'
  },
  {
    id: 12,
    name: 'Financial Analyst',
    averagepay: "$96,000",
    image: new URL('@/assets/imgs/careers/financialanalyst.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DKZV0UVsGiX/?img_index=1',
    description: 'Evaluate financial data, market trends, and economic conditions to provide insight and recommendations.'
  },
  {
    id: 13,
    name: 'Financial Technologist',
    averagepay: "$120,000",
    image: new URL('@/assets/imgs/careers/financialtechnologist.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DLPhcTxRkI-/?img_index=1',
    description: 'Develop and implement technology solutions for financial services.'
  },
  {
    id: 14,
    name: 'Hydrologist',
    averagepay: "$89,000",
    image: new URL('@/assets/imgs/careers/hydrologist.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DKra0oxMveP/?img_index=1',
    description: 'Study the movement, distribution, and quality of water on Earth.'
  },
  {
    id: 15,
    name: 'Marine Engineer',
    averagepay: "$102,000",
    image: new URL('@/assets/imgs/careers/marineengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DLzrW-QMxq9/?img_index=1',
    description: 'Design, build, and maintain ships, boats, and other marine vessels.'
  },
  {
    id: 16,
    name: 'Mechanical Engineer',
    averagepay: "$95,000",
    image: new URL('@/assets/imgs/careers/mechanicalengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DEw7qQcuZFL/?img_index=1',
    description: 'Design, develop, build, and test mechanical devices and systems.'
  },
  {
    id: 17,
    name: 'Pharmacologist',
    averagepay: "$128,000",
    image: new URL('@/assets/imgs/careers/pharmacologist.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DMXx9DqshW6/?img_index=1',
    description: 'Study the effects of drugs and medications on biological systems.'
  },
  {
    id: 18,
    name: 'Sales Engineer',
    averagepay: "$112,000",
    image: new URL('@/assets/imgs/careers/salesengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DHBKJGCuKbK/?img_index=1',
    description: 'Sell complex scientific and technological products or services to businesses.'
  },
  {
    id: 19,
    name: 'Structural Engineer',
    averagepay: "$95,000",
    image: new URL('@/assets/imgs/careers/structuralengineer.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DMNUeRSM7PH/?img_index=1',
    description: 'Design and analyze structures that support or resist loads.'
  },
  {
    id: 20,
    name: 'Web Developer',
    averagepay: "$85,000",
    image: new URL('@/assets/imgs/careers/webdeveloper.jpg', import.meta.url).href,
    url: 'https://www.instagram.com/p/DM8GDMZxrjX/?img_index=1',
    description: 'Design, create, and maintain websites and web applications.'
  },
]
