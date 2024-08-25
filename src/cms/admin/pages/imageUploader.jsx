import React, { useState } from 'react';

const ImageUploader = ({ initialImages = [], maxFileSize = 5000000, allowedTypes = ['image/jpeg', 'image/png'] }) => {
  const [images, setImages] = useState(initialImages);

  // Validar archivo
  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de archivo no permitido');
      return false;
    }
    if (file.size > maxFileSize) {
      alert('El archivo es demasiado grande');
      return false;
    }
    return true;
  };

  // Manejar la subida de imágenes
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => validateFile(file));
    const newImages = validFiles.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  // Manejar la eliminación de una imagen
  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Manejar la edición de una imagen existente
  const handleEditImage = (index, event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
      const newImage = URL.createObjectURL(file);
      setImages(prevImages => 
        prevImages.map((img, i) => (i === index ? newImage : img))
      );
    }
  };

  return (
    <div>
      <div className="image-gallery">
        {images.map((src, index) => (
          <div key={index} className="image-item">
            <img src={src} alt={`Imagen ${index + 1}`} />
            <div className="image-actions">
              <button onClick={() => handleRemoveImage(index)}>Borrar</button>
              <label>
                <input 
                  type="file" 
                  onChange={(event) => handleEditImage(index, event)} 
                  style={{ display: 'none' }} 
                />
                <button>Editar</button>
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="upload-button">
        <label>
          <input 
            type="file" 
            multiple 
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
          />
          <button>Añadir Imagen</button>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
