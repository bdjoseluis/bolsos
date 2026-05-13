import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({ name: 'name',  title: 'Nombre',     type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug',  title: 'URL (Slug)', type: 'slug',   options: { source: 'name' }, validation: Rule => Rule.required() }),
    defineField({ name: 'price', title: 'Precio (€)', type: 'number', validation: Rule => Rule.required().positive() }),
    defineField({ name: 'stock', title: 'Stock',      type: 'number', initialValue: 0 }),
    defineField({ name: 'isNew', title: '¿Marcar como Nuevo?', type: 'boolean', initialValue: false }),

    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Totes',     value: 'totes' },
          { title: 'Clutches',  value: 'clutches' },
          { title: 'Crossbody', value: 'crossbody' },
          { title: 'Mochilas',  value: 'backpacks' },
        ],
      },
    }),

    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'images',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 4 }),
  ],

  preview: {
    select: {
      title:  'name',
      media:  'image',
      price:  'price',
    },
    prepare({ title, media, price }) {
      return { title, media, subtitle: `€${price}` }
    },
  },
})
