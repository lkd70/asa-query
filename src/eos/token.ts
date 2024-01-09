/**
 * @module eos/token - A module for getting access tokens from the EOS API.
 * @description This module is used to get access tokens from the EOS API.
 */

/**
 * @typedef {object} GetAccessTokenOptions
 * @description The options to use when getting an access token.
 * @property {string} client_id - The client ID to use when getting an access token. - Defaults to the one used by Ark: Survival Ascended.
 * @property {string} client_secret - The client secret to use when getting an access token. - Defaults to the one used by Ark: Survival Ascended.
 * @property {string} deployment_id - The deployment ID to use when getting an access token. - Defaults to Ark: Survival Ascended's deployment ID.
 * @property {string} api_endpoint - The API endpoint to use when getting an access token. - Defaults to api.epicgames.dev.
 */
export interface GetAccessTokenOptions {
  client_id?: string;
  client_secret?: string;
  deployment_id?: string;
  api_endpoint?: string;
}

/**
 * @interface TokenResponse - The response from the EOS API when getting an access token.
 * @property {string} access_token - The access token.
 * @property {string} token_type - The type of token.
 * @property {string} expires_at - The time at which the token expires.
 * @property {string[]} features - The features of the token.
 * @property {string} organization_id - The organization ID of the token.
 * @property {string} product_id - The product ID of the token.
 * @property {string} sandbox_id - The sandbox ID of the token.
 * @property {string} deployment_id - The deployment ID of the token.
 * @property {number} expires_in - The time in seconds until the token expires.
 * @description This is the response from the EOS API when getting an access token.
 */
interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
  features: string[];
  organization_id: string;
  product_id: string;
  sandbox_id: string;
  deployment_id: string;
  expires_in: number;
}

/**
 * @constant {GetAccessTokenOptions} defaultOptions - The default options to use when getting an access token.
 * @property {string} client_id - The client ID to use when getting an access token. - Defaults to the one used by Ark: Survival Ascended.
 * @property {string} client_secret - The client secret to use when getting an access token. - Defaults to the one used by Ark: Survival Ascended.
 * @property {string} deployment_id - The deployment ID to use when getting an access token. - Defaults to Ark: Survival Ascended's deployment ID.
 * @property {string} api_endpoint - The API endpoint to use when getting an access token. - Defaults to api.epicgames.dev.
 * These options can be overridden by passing an object to the getAccessToken function.
 */
export const defaultOptions: GetAccessTokenOptions = {
  client_id: 'xyza7891muomRmynIIHaJB9COBKkwj6n',
  client_secret: 'PP5UGxysEieNfSrEicaD1N2Bb3TdXuD7xHYcsdUHZ7s',
  deployment_id: 'ad9a8feffb3b4b2ca315546f038c3ae2',
  api_endpoint: 'https://api.epicgames.dev',
};

/**
 * @function getAccessToken - Gets an access token from the EOS API.
 * @param options - The options to use when getting an access token.
 * @returns {Promise<TokenResponse>} - The response from the EOS API.
 */
export default async function getAccessToken(
  options: GetAccessTokenOptions = defaultOptions,
) {
  options = { ...defaultOptions, ...options };

  const { client_id, client_secret, deployment_id, api_endpoint } = options;
  if (typeof client_id !== 'string' || !client_id)
    throw new Error('Invalid or missing client_id');
  if (typeof client_secret !== 'string' || !client_secret)
    throw new Error('Invalid or missing client_secret');
  if (typeof deployment_id !== 'string' || !deployment_id)
    throw new Error('Invalid or missing deployment_id');
  if (typeof api_endpoint !== 'string' || !api_endpoint)
    throw new Error('Invalid or missing api_endpoint');

  let url: URL;
  try {
    url = new URL('/auth/v1/oauth/token', api_endpoint);
  } catch (e) {
    throw new Error('Invalid API endpoint');
  }

  const auth: string = btoa(`${client_id}:${client_secret}`);

  const headers: Record<string, string> = {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');
  body.append('deployment_id', deployment_id);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body,
    });
  } catch (e) {
    throw new Error('Network error occurred');
  }

  if (!res.ok) throw new Error('Invalid response from server');

  let json: TokenResponse;
  try {
    json = await res.json();
    if (typeof json.access_token !== 'string')
      throw new Error('Invalid or missing access_token');
    if (typeof json.expires_in !== 'number')
      throw new Error('Invalid or missing expires_in');
  } catch (e) {
    throw new Error('Error parsing JSON response');
  }

  return json;
}
