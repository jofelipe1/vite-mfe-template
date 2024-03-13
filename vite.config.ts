import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

import packageJson from './package.json';

function parseRemotesFromEnv(env: Record<string, string>) {
  const remotes: Record<string, string> = {};

  Object.values(env).forEach((value) => {
    const [module, host] = value.split('@');
    remotes[module] = host;
  });

  return remotes;
}

export default defineConfig(({ mode }) => {
  const { APP_NAME, APP_PORT } = loadEnv(mode, process.cwd(), 'APP_');

  const remotes = parseRemotesFromEnv(loadEnv(mode, process.cwd(), 'REMOTE_'));

  const port = APP_PORT ? Number(APP_PORT) : undefined;

  return {
    envPrefix: 'APP_',
    build: {
      target: 'esnext',
    },
    server: {
      port,
    },
    preview: {
      port,
    },
    plugins: [
      react(),
      federation({
        name: APP_NAME,
        filename: `${APP_NAME}.remote.js`,
        exposes: {},
        remotes,
        shared: packageJson.dependencies,
      }),
    ],
    resolve: {
      alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
    },
  };
});
