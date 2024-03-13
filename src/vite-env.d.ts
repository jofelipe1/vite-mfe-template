/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_PORT: string;
  readonly APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
