import {
  Uppy,
  Dashboard,
  Webcam,
  XHRUpload,
  DragDrop,
  GoogleDrive,
  Dropbox,
  Instagram,
  Facebook,
  ScreenCapture
} from 'https://releases.transloadit.com/uppy/v4.1.1/uppy.min.mjs';

// Configuración Cloudinary
const cloudName = 'dmyt0fswa'; // Reemplaza con tu cloud name de Cloudinary
const uploadPreset = 'ml_default'; // Reemplaza con tu upload preset de Cloudinary
const apiKey = '152897242549548'; // Reemplaza con tu API key de Cloudinary

// Simulación de firma de Cloudinary (esto debe venir de tu servidor o preconfigurado)
async function generateSignature(params) {
  // Simulación de la firma (esto debe ser generado en tu servidor)
  const timestamp = new Date().getTime();
  return { timestamp, signature: 'tu_firma_generada' }; // Aquí va tu firma
}

// Inicialización de Uppy con varios plugins
const uppy = new Uppy({ debug: true, autoProceed: false })
  .use(Dashboard, { target: '#uppyDashboard', inline: true })
  .use(Webcam, { target: Dashboard })
  .use(DragDrop, { target: Dashboard }) // Arrastrar y soltar
  .use(GoogleDrive, { target: Dashboard }) // Google Drive
  .use(Dropbox, { target: Dashboard }) // Dropbox
  .use(Instagram, { target: Dashboard }) // Instagram
  .use(Facebook, { target: Dashboard }) // Facebook
  .use(ScreenCapture, { target: Dashboard }) // Captura de pantalla
  .use(XHRUpload, {
    endpoint: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    fieldName: 'file',
    formData: true,
    getUploadParameters(file) {
      return generateSignature({
        upload_preset: uploadPreset,
        api_key: apiKey,
        timestamp: new Date().getTime(),
      }).then((signatureData) => {
        return {
          method: 'POST',
          url: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          fields: {
            upload_preset: uploadPreset,
            api_key: apiKey,
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
