export const environment = {
  production: true,
  apiUrl: 'https://api.tudominio.com/api/v1',
  sanity: {
    projectId: 'tpglrho7',
    dataset: 'production',
  },
  // Endpoint al que el formulario de contacto manda los leads.
  // OJO: cualquier valor que pongas aqui viaja al navegador dentro del bundle,
  // asi que NO es un secreto. La proteccion real tiene que estar en el servidor
  // (rate limit por IP + validacion de origen), no en esta clave.
  integracionLeads: {
    url: 'https://api.bdev.qzz.io/api/integrations/lead',
    clave: '', // se rellena en el build: ver .env.example
  },
};
