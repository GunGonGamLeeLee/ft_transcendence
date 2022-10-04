/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_EP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
