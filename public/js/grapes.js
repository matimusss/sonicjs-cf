setTimeout(function() {
  const escapeName = (name) =>
    `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");
  
  window.editor = grapesjs.init({
    height: "100vh",
    container: "#gjs",
    showOffsets: true,
    fromElement: true,
    noticeOnUnload: false,
    storageManager: false,
    selectorManager: { escapeName },
    plugins: [
      "grapesjs-ga",
      "grapesjs-component-twitch",
      "grapesjs-plugin-forms",
      "grapesjs-tailwind"

    ],
    pluginsOpts: {
      "grapesjs-ga": {
        /* Test here your options  */
      },
      "grapesjs-component-twitch": {
        /* Test here your options  */
      }
    }
  });
  
  editor.Panels.addButton("options", {
    id: "update-theme",
    className: "fa fa-adjust",
    command: "open-update-theme",
    attributes: {
      title: "Update Theme",
      "data-tooltip-pos": "bottom"
    }
  });
  
}, 3000);
//}
