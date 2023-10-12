import { config } from "config";

export const environment = {
  production: true,
  apiURL: config.apiUrl,
  apiURLKC:config.apiUrlKeyCloak,
  TOKEN_AUTH_USERNAME: 'mitomediapp',
  TOKEN_AUTH_PASSWORD: 'mito89codex',
  TOKEN_NAME: 'access_token',
  REINTENTOS: 3
};
