setTimeout(function() {
// Handle tailwind's use of slashes in css names
const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-');

const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  selectorManager: { escapeName },
  plugins: ['grapesjs-tailwind'],
});

}, 3000);
//}
