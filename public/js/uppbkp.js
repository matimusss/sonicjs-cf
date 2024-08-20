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




async function generateSignature() {
  try {
    // Realizar una solicitud GET al endpoint que has creado
    const response = await fetch('/signature');
    
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


// Inicialización de Uppy con varios plugins
const uppy = new Uppy({ debug: true, autoProceed: false })
  .use(Dashboard, { target: '#uppyDashboard', inline: true })
  .use(Transloadit, {
	assemblyOptions: {
			params: {
				auth: { key: '3f1f8718e27ab626f84dcbe1669c9ea9' }, //KEY DE TRANLSOADIT
				template_id: '0df3da82d5cb4d19bec255a8896b3ec4', //TEMPLATE ID DE TRANSLOADIT
			},
		},
	})
 .use(Instagram, {
    companionUrl: COMPANION_URL, //IMPORTADO DE TRANSLOADIT PLUGIN 
    companionAllowedHosts: COMPANION_ALLOWED_HOSTS, //IMPORTADO DE TRANLSOADIT PLUGIN
    companionKeysParams: {
      key: '3f1f8718e27ab626f84dcbe1669c9ea9', //KEY DE TRANSLOADIT
      credentialsName: 'testmatimusss', //NOBMRE DADO AL CREDENTIAL TEMPLATE EN TRANSLOADIT
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
