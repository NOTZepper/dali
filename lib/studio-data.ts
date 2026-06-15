export type Service = {
  id: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: 'photography',
    title: 'Photography',
    description:
      'Editorial, portrait, and brand photography composed with an unhurried eye for light, texture, and quiet detail.',
  },
  {
    id: 'videography',
    title: 'Videography & Editing',
    description:
      'Cinematic motion work from concept to final cut — direction, capture, color, and edit handled end to end.',
  },
  {
    id: 'design',
    title: 'Design',
    description:
      'Identity systems, art direction, and print that give your work a considered, lasting visual language.',
  },
]

export type Project = {
  id: string
  title: string
  category: string
  year: string
  image: string
  span: string
  description: string
  gallery: string[]
}

export const projects: Project[] = [
  {
    id: 'crimson-silk',
    title: 'Crimson Silk',
    category: 'Photography',
    year: '2025',
    image: '/images/portfolio-1.png',
    span: 'md:row-span-2',
    description:
      'An editorial study of movement and fabric, shot against warm seamless backdrops with a single sculpted light source.',
    gallery: ['/images/portfolio-1.png', '/images/portfolio-3.png', '/images/portfolio-6.png'],
  },
  {
    id: 'interior-light',
    title: 'Interior Light',
    category: 'Photography',
    year: '2024',
    image: '/images/portfolio-2.png',
    span: '',
    description:
      'A spatial series exploring how daylight moves through architecture across a single afternoon.',
    gallery: ['/images/portfolio-2.png', '/images/portfolio-5.png'],
  },
  {
    id: 'monochrome',
    title: 'Monochrome',
    category: 'Photography',
    year: '2025',
    image: '/images/portfolio-3.png',
    span: '',
    description:
      'High-contrast black and white portraiture made to feel timeless, intimate, and unmistakably editorial.',
    gallery: ['/images/portfolio-3.png', '/images/portfolio-1.png'],
  },
  {
    id: 'maison-identity',
    title: 'Maison Identity',
    category: 'Design',
    year: '2024',
    image: '/images/portfolio-4.png',
    span: 'md:row-span-2',
    description:
      'A full brand identity for a boutique atelier — wordmark, type system, and a suite of printed collateral.',
    gallery: ['/images/portfolio-4.png', '/images/work-design.png'],
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    category: 'Videography & Editing',
    year: '2025',
    image: '/images/portfolio-5.png',
    span: '',
    description:
      'A short cinematic film captured during golden hour, graded for warmth and edited to breathe.',
    gallery: ['/images/portfolio-5.png', '/images/work-videography.png'],
  },
  {
    id: 'objet',
    title: 'Objet',
    category: 'Photography',
    year: '2024',
    image: '/images/portfolio-6.png',
    span: '',
    description:
      'Still-life product work for a fragrance house, balancing reflective glass with soft draped fabric.',
    gallery: ['/images/portfolio-6.png', '/images/portfolio-2.png'],
  },
]
