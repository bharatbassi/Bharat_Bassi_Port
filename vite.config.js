import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import {viteSingleFile} from 'vite-plugin-singlefile';
// Single self-contained index.html (JS, CSS and portrait inlined): opens by double-click and works on GitHub Pages.
export default defineConfig({base:'./',plugins:[react(),viteSingleFile()],build:{assetsInlineLimit:100000000}});
