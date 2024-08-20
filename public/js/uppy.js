import {
  Uppy,
  Dashboard
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

// Función para subir archivos manualmente
async function uploadFiles(files) {
  const { signature, timestamp } = await generateSignature();
  
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('api_key', '152897242549548');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dmyt0fswa/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
  });

// Manejar el evento de carga completa
uppy.on('complete', (result) => {
  console.log('Upload complete! We’ve uploaded these files:', result.successful);
  // Subir archivos manualmente
  uploadFiles(result.successful.map(file => file.data));
});
