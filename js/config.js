const defaultConfig = {
  store_name: "Seblak Mama Ica",
  background_color: "#F3F4F6",
  sidebar_color: "#DC143C",
  text_color: "#1F2937",
  action_color: "#22C55E",
  surface_color: "#FFFFFF",
  font_family: "DM Sans",
  font_size: 16,
};

function applyConfig(config) {
  document.body.style.backgroundColor =
    config.background_color || defaultConfig.background_color;

  const storeTitle = document.getElementById("store-title");
  if (storeTitle) {
    storeTitle.textContent = config.store_name || defaultConfig.store_name;
  }

  const sidebarStoreName = document.getElementById("sidebar-store-name");
  if (sidebarStoreName) {
    sidebarStoreName.textContent =
      config.store_name || defaultConfig.store_name;
  }

  const font = config.font_family || defaultConfig.font_family;
  document.body.style.fontFamily = `${font}, DM Sans, sans-serif`;
}

if (window.elementSdk?.init) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      applyConfig(config);
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (v) => {
            config.background_color = v;
            window.elementSdk.setConfig({ background_color: v });
          },
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (v) => {
            config.surface_color = v;
            window.elementSdk.setConfig({ surface_color: v });
          },
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (v) => {
            config.text_color = v;
            window.elementSdk.setConfig({ text_color: v });
          },
        },
        {
          get: () => config.action_color || defaultConfig.action_color,
          set: (v) => {
            config.action_color = v;
            window.elementSdk.setConfig({ action_color: v });
          },
        },
        {
          get: () => config.sidebar_color || defaultConfig.sidebar_color,
          set: (v) => {
            config.sidebar_color = v;
            window.elementSdk.setConfig({ sidebar_color: v });
          },
        },
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => {
          config.font_family = v;
          window.elementSdk.setConfig({ font_family: v });
        },
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => {
          config.font_size = v;
          window.elementSdk.setConfig({ font_size: v });
        },
      },
    }),
    mapToEditPanelValues: (config) =>
      new Map([["store_name", config.store_name || defaultConfig.store_name]]),
  });
} else {
  console.warn("Element SDK not found. Using default config.");
  applyConfig(defaultConfig);
}