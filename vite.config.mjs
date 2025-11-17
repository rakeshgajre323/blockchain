import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import path from "path";
import { fileURLToPath } from "url";

// Proper path resolution for ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Build configuration
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },

  // Plugins
  plugins: [tsconfigPaths(), react(), tagger()],

  // ✅ Fix for import resolution (especially in OneDrive / Windows)
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      utils: path.resolve(__dirname, "./src/utils"),
      styles: path.resolve(__dirname, "./src/styles"),
    },
  },

  // ✅ Fixes for OneDrive caching, HMR overlay, and file resolution
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: false, // disables red error overlay in browser
    },
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
  },
});
