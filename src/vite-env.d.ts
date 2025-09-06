interface ImportMetaEnv {
  VITE_TMDB_TOKEN: any;
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  // інші змінні
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
