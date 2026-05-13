export default {
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    { name: 'label',    title: 'Nombre visible', type: 'string' },
    { name: 'value',    title: 'Slug interno',   type: 'slug', options: { source: 'label' } },
    { name: 'order',    title: 'Orden',          type: 'number' },
    { name: 'icon',     title: 'Emoji / Icono',  type: 'string' },
    { name: 'image',    title: 'Imagen banner',  type: 'image', options: { hotspot: true } },
    { name: 'active',   title: 'Visible',        type: 'boolean', initialValue: true },
  ],
  orderings: [{ title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
}