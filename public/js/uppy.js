import {
  Uppy,
  Dashboard,
  XHRUpload
} from 'https://releases.transloadit.com/uppy/v4.1.1/uppy.min.mjs';

async function generateSignature() {
  try {
    // Realizar una solicitud GET al endpoint que has creado
    const response = await fetch('https://sonicjs-cf2.pages.dev/admin/signature');
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Extraer los datos JSON de la respuesta
    const data = await response.json();
    
    // Verificar si la respuesta contiene los campos necesarios
    if (!data.signature || !data.timestamp) {
      throw new Error('Invalid response data');
    }
    
    // Retornar los datos necesarios
    return {
      signature: data.signature,
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Error generating signature:', error);
    throw error;
  }
}

const cloudName =  "dmyt0fswa";

// Inicialización de Uppy con varios plugins
const uppy = new Uppy({ debug: true, autoProceed: false })
  .use(Dashboard, { target: '#uppyDashboard', inline: true })
  .use(XHRUpload, {
    endpoint: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    fieldName: 'file',
    formData: true,
    getUploadParameters(file) {
      return generateSignature().then((signatureData) => {
        return {
          method: 'POST',
          url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          fields: {
            api_key: 152897242549548,
            timestamp: signatureData.timestamp,
            signature: signatureData.signature,
          },
        };
      });
    },
  });

// Monitoreo de subida
uppy.on('upload-progress', (file, progress) => {
  console.log(`Uploading ${file.name}: ${progress.bytesUploaded} / ${progress.bytesTotal}`);
});
 
uppy.on('upload-success', (file, response) => {
  console.log(`File ${file.name} uploaded successfully`);
  console.log('Cloudinary URL:', response.uploadURL);
});
