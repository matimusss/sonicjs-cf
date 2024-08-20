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



// Simulación de firma de Cloudinary (esto debe venir de tu servidor o preconfigurado)
async function generateSignature(params) {
  //HACER EL FETCH AL ENDPOINT
}

// Inicialización de Uppy con varios plugins
const uppy = new Uppy({ debug: true, autoProceed: false })
  .use(Dashboard, { target: '#uppyDashboard', inline: true })
  .use(Transloadit, {
	assemblyOptions: {
			params: {
				auth: { key: 'your-transloadit-key' }, //KEY DE TRANLSOADIT
				template_id: 'your-template-id', //TEMPLATE ID DE TRANSLOADIT
			},
		},
	})
 .use(Instagram, {
    companionUrl: COMPANION_URL, //IMPORTADO DE TRANSLOADIT PLUGIN 
    companionAllowedHosts: COMPANION_ALLOWED_HOSTS, //IMPORTADO DE TRANLSOADIT PLUGIN
    companionKeysParams: {
      key: 'YOUR_TRANSLOADIT_API_KEY', //KEY DE TRANSLOADIT
      credentialsName: 'my_companion_dropbox_creds', //NOBMRE DADO AL CREDENTIAL TEMPLATE EN TRANSLOADIT
    },
  })
  .use(XHRUpload, {
    endpoint: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    fieldName: 'file',
    formData: true,
    getUploadParameters(file) {
      return generateSignature().then((signatureData) => {
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
