export interface Partner {
  name: string
  path: string
  link: string
}

export const partners: Partner[] = [
  {
    name: 'Google',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547804/google-logo-transparent-background-free-png_crewre.png',
    link: 'https://www.google.com'
  },
  {
    name: 'New York University',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547672/Nyu-Logo-PNG-File_paatss.png',
    link: 'https://www.nyu.edu'
  },
  {
    name: 'Architecture Construction Engineering Mentorship',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547491/ace_kuq1ug.png',
    link: 'https://www.acementor.org'
  },
  {
    name: 'STEM Kids NYC',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1750454719/IMG_7710-removebg-preview_xcl08w.png',
    link: 'https://stemkidsnyc.org'
  },
  {
    name: 'Staten Island Technical High School',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547755/114812-30708864-cc30-4eeb-8975-6e7ff636fbd4-removebg-preview_c32fpv.png',
    link: 'https://www.siths.org'
  },
  {
    name: 'DI Group Architecture',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547919/cropped-DIGroupArchitecture_Tagline_Full_Color-01-6-1024x252_bxks5i.webp',
    link: 'https://www.digrouparchitecture.com'
  },
  {
    name: 'LEAP Academy',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747548087/Screenshot_40-removebg-preview-removebg-preview_d76tjr.png',
    link: 'https://www.yourleapforward.com'
  }
]

export const accomplishmentPartners: Partner[] = [
  ...partners,
  {
    name: 'Manhattan University (pending)',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1750455043/250px-Manhattan_College_logo.svg_jllogn.png',
    link: 'https://manhattan.edu'
  },
  {
    name: 'The National Association of Asian American Professionals (pending)',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1750455212/logoo-1_yt4v0c.webp',
    link: 'https://ny.naaap.org'
  }
]
