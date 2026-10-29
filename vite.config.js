import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';
// './' makes asset URLs relative, so the build works at username.github.io/repo-name/ and on a custom domain.
export default defineConfig({base:'./',plugins:[react()]});
