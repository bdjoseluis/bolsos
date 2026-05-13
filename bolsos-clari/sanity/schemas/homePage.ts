export default {
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow',  type: 'string', title: 'Texto pequeño arriba' },
        { name: 'title',    type: 'string', title: 'Título principal' },
        { name: 'titleEm',  type: 'string', title: 'Palabra resaltada (em)' },
        { name: 'subtitle', type: 'text',   title: 'Subtítulo' },
        { name: 'ctaLabel', type: 'string', title: 'Texto botón CTA' },
        { name: 'ctaLink',  type: 'string', title: 'Ruta botón CTA' },
        { name: 'image',    type: 'image',  title: 'Imagen hero', options: { hotspot: true } },
      ],
    },
    {
      name: 'featuredSection',
      title: 'Sección Destacados',
      type: 'object',
      fields: [
        { name: 'heading',    type: 'string', title: 'Título sección' },
        { name: 'limit',      type: 'number', title: 'Nº productos a mostrar', initialValue: 8 },
      ],
    },
    {
      name: 'banner',
      title: 'Banner CTA',
      type: 'object',
      fields: [
        { name: 'title',    type: 'string', title: 'Título' },
        { name: 'subtitle', type: 'text',   title: 'Subtítulo' },
        { name: 'ctaLabel', type: 'string', title: 'Texto botón' },
        { name: 'ctaLink',  type: 'string', title: 'Ruta botón' },
        { name: 'image',    type: 'image',  title: 'Imagen fondo', options: { hotspot: true } },
      ],
    },
    {
      name: 'marqueeText',
      title: 'Texto banda animada',
      type: 'string',
      description: 'Ej: "HECHO A MANO · ENVÍO GRATIS · EDICIÓN LIMITADA"',
    },
  ],
}