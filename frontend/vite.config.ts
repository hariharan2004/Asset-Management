import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "@bangjelkoski/vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills({ protocolImports: true })],
  server: {
    port: 3000, // You can change the port if needed
  },
});