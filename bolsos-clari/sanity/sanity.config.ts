import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { colorInput } from '@sanity/color-input'
import siteTheme from './schemas/siteTheme'
import product   from './schemas/product'
import category from './schemas/category'
import homePage from './schemas/homePage'

declare const process: { env: { SANITY_STUDIO_PROJECT_ID?: string } }

export default defineConfig({
  name: 'bolsos-clari',
  title: 'Bolsos Clari — CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'tpglrho7',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Documento único para el Tema
            S.listItem()
              .title('🎨 Tema Visual')
              .child(S.document().schemaType('siteTheme').documentId('siteTheme')),
            
            // Documento único para la Home
            S.listItem()
              .title('🏠 Home Page')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            
            S.divider(),

            // Listado de Productos
            S.documentTypeListItem('product').title('👜 Productos'),
            
            // Listado de Categorías
            S.documentTypeListItem('category').title('📁 Categorías'),
          ]),
    }),
    colorInput(),
  ],

  schema: {
    types: [siteTheme, product, category, homePage],
  },
})