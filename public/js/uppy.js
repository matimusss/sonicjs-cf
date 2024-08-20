import {
  Uppy,
  Dashboard,
  XHRUpload
} from 'https://releases.transloadit.com/uppy/v4.1.1/uppy.min.mjs';

// Función para generar la firma
async function generateSignature() {
  try {
    const response = await fetch('https://sonicjs-cf2.pages.dev/admin/signature');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!data.signature || !data.timestamp) {
      throw new Error('Invalid response data');
    }
    return {
      signature: data.signature,
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Error generating signature:', error);
    throw error;
  }
}

// Inicialización de Uppy
const uppy = new Uppy({
  debug: true,
  autoProceed: false
})
  .use(Dashboard, { 
    target: '#uppyDashboard', 
    inline: true 
  })
  .use(XHRUpload, {
    endpoint: 'https://api.cloudinary.com/v1_1/dmyt0fswa/image/upload',
    formData: true,
    fieldName: 'file',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    async getParameters(file) {
      const { signature, timestamp } = await generateSignature();
      console.log(signature);
      console.log(timestamp);
      return {
        timestamp: timestamp,
        signature: signature,
        api_key: '152897242549548'
      };
    }
  });

// Manejar el evento de carga completa
uppy.on('complete', (result) => {
  console.log('Upload complete! We’ve uploaded these files:', result.successful);
  // Puedes manejar los resultados aquí, como mostrar un mensaje de éxito
});
