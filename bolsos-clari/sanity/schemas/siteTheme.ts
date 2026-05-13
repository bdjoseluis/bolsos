import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteTheme',
  title: 'Tema Visual del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Nombre del tema',
      type: 'string',
      description: 'Ej: "Tema Verano 2025"',
      validation: Rule => Rule.required(),
    }),

    // ── Colores ─────────────────────────────────────────────
    defineField({ name: 'primaryColor',    title: 'Color Principal (botones, textos)',   type: 'color' }),
    defineField({ name: 'secondaryColor',  title: 'Color Secundario (hero, fondo alt)', type: 'color' }),
    defineField({ name: 'accentColor',     title: 'Color de Acento (precios, badges)',  type: 'color' }),
    defineField({ name: 'backgroundColor', title: 'Fondo General',                      type: 'color' }),
    defineField({ name: 'surfaceColor',    title: 'Fondo de Tarjetas',                  type: 'color' }),
    defineField({ name: 'textColor',       title: 'Color de Texto Principal',           type: 'color' }),

    // ── Tipografía ───────────────────────────────────────────
    defineField({
      name: 'headingFont',
      title: 'Fuente de Títulos',
      type: 'string',
      description: 'Nombre exacto de Google Fonts. Ej: "Playfair Display", "Cormorant Garamond", "DM Serif Display"',
    }),
    defineField({
      name: 'bodyFont',
      title: 'Fuente de Cuerpo de Texto',
      type: 'string',
      description: 'Ej: "Lato", "Nunito", "DM Sans", "Source Sans 3"',
    }),

    // ── Forma y espaciado ────────────────────────────────────
    defineField({
      name: 'borderRadius',
      title: 'Radio de Bordes',
      type: 'string',
      description: 'Afecta botones, tarjetas y badges',
      options: {
        list: [
          { title: 'Sin redondeo (cuadrado)', value: '0px' },
          { title: 'Sutil',                  value: '4px' },
          { title: 'Moderado',               value: '8px' },
          { title: 'Redondeado',             value: '16px' },
          { title: 'Píldora',                value: '999px' },
        ],
      },
    }),
    defineField({
      name: 'spacing',
      title: 'Unidad de Espaciado Base',
      type: 'string',
      description: 'Múltiplo base del espaciado. Ej: "8px" (compacto) o "12px" (aireado)',
      options: {
        list: ['6px', '8px', '10px', '12px'],
      },
    }),
  ],

  preview: {
    select: { title: 'label' },
    prepare({ title }) {
      return { title: `🎨 ${title}` }
    },
  },
})
