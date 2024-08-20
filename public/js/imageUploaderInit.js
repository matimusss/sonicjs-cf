let preloaded = [
  {id: 1, src: 'https://picsum.photos/500/500?random=1'},
  {id: 2, src: 'https://picsum.photos/500/500?random=2'},
  {id: 3, src: 'https://picsum.photos/500/500?random=3'},
  {id: 4, src: 'https://picsum.photos/500/500?random=4'},
  {id: 5, src: 'https://picsum.photos/500/500?random=5'},
  {id: 6, src: 'https://picsum.photos/500/500?random=6'},
];

$('.input-images-2').imageUploader({
  preloaded: preloaded,
  imagesInputName: 'photos',
  preloadedInputName: 'old',
  maxSize: 2 * 1024 * 1024,
  maxFiles: 10
});

$('.input-images-2').imageUploader({
  preloaded: preloaded,
  imagesInputName: 'photos',
  preloadedInputName: 'old',
  maxSize: 2 * 1024 * 1024,
  maxFiles: 10
});
