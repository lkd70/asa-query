
/**
 * @typedef {string} CriterionKey
 * @description The key to query against.
 * @example 'attributes.SESSIONNAME_s' - The server name.
 */
export type CriterionKey =
  | 'attributes.MINORBUILDID_s'
  | 'attributes.MODID_l'
  | 'attributes.CUSTOMSERVERNAME_s'
  | 'attributes.ADDRESSDEV_s'
  | 'attributes.ISPRIVATE_l'
  | 'attributes.SERVERPASSWORD_b'
  | 'attributes.MATCHTIMEOUT_d'
  | 'attributes.ENABLEDMODSFILEIDS_s'
  | 'attributes.DAYTIME_s'
  | 'attributes.SOTFMATCHSTARTED_b'
  | 'attributes.STEELSHIELDENABLED_l'
  | 'attributes.SERVERUSESBATTLEYE_b'
  | 'attributes.EOSSERVERPING_l'
  | 'attributes.ALLOWDOWNLOADCHARS_l'
  | 'attributes.OFFICIALSERVER_s'
  | 'attributes.GAMEMODE_s'
  | 'attributes.ADDRESS_s'
  | 'attributes.SEARCHKEYWORDS_s'
  | 'attributes.__EOS_BLISTENING_b'
  | 'attributes.ALLOWDOWNLOADITEMS_l'
  | 'attributes.LEGACY_l'
  | 'attributes.ADDRESSBOUND_s'
  | 'attributes.SESSIONISPVE_l'
  | 'attributes.__EOS_BUSESPRESENCE_b'
  | 'attributes.ENABLEDMODS_s'
  | 'attributes.SESSIONNAMEUPPER_s'
  | 'attributes.SERVERPLATFORMTYPE_s'
  | 'attributes.MAPNAME_s'
  | 'attributes.BUILDID_s'
  | 'attributes.SESSIONNAME_s'
  | 'id'
  | 'bucket'
  | 'totalPlayers'
  | 'openPublicPlayers'
  | 'publicPlayers'
  | 'started'
  | 'lastUpdated'
  | 'owner'
  | 'ownerPlatformId';

/**
 * @typedef {object} ServerCriteria
 * @description The criteria to use when querying servers.
 * @property {CriterionKey} key - The key to query against.
 * @property {'EQUAL' | 'NOT_EQUAL' | 'CONTAINS'} op - The operation to use when querying.
 * @property {string | number | boolean} value - The value to query against the key.
 * @example { key: 'attributes.SESSIONNAME_s', op: 'CONTAINS', value: '2142' } - Query for servers with a name that contains '2142'
 */
export interface ServerCriteria {
  key: CriterionKey;
  op: 'EQUAL' | 'NOT_EQUAL' | 'CONTAINS';
  value: string | number | boolean;
}

/**
 * @typedef {object} MatchmakingResponse
 * @description The response from the matchmaking API.
 * @property {Session[]} sessions - The sessions (servers) that match the criteria.
 * @property {number} count - The number of sessions (servers) that match the criteria.
 */
export interface MatchmakingResponse {
  sessions: Session[];
  count: number;
}

/**
 * @typedef {object} Session
 * @description A session (server) that matches the criteria.
 * @property {string} deployment - The deployment ID of Ark: Survival Ascended.
 * @property {string} id - The session (server)'s Epic Games ID.
 * @property {string} bucket - The bucket the session (server) is in.
 * @property {Settings} settings - The settings of the session (server).
 * @property {number} totalPlayers - The total number of players on the session (server).
 * @property {number} openPublicPlayers - The number of open public player slots on the session (server).
 * @property {any[]} publicPlayers - The public players on the session (server).
 * @property {boolean} started - Whether or not the session (server) has started.
 * @property {any} lastUpdated - The last time the session (server) was updated.
 * @property {Attributes} attributes - The attributes of the session (server).
 * @property {string} owner - The owner of the session (server).
 * @property {any} ownerPlatformId - The owner's platform ID.
 */
interface Session {
  deployment: string;
  id: string;
  bucket: string;
  settings: Settings;
  totalPlayers: number;
  openPublicPlayers: number;
  publicPlayers: string[];
  started: boolean;
  lastUpdated: null | string;
  attributes: Attributes;
  owner: string;
  ownerPlatformId: null | string;
}

interface Settings {
  maxPublicPlayers: number;
  allowInvites: boolean;
  shouldAdvertise: boolean;
  allowReadById: boolean;
  allowJoinViaPresence: boolean;
  allowJoinInProgress: boolean;
  allowConferenceRoom: boolean;
  checkSanctions: boolean;
  allowMigration: boolean;
  rejoinAfterKick: string;
  platforms: null | string;
}

interface Attributes {
  MINORBUILDID_s: string;
  MODID_l: number;
  CUSTOMSERVERNAME_s: string;
  ADDRESSDEV_s: string;
  ISPRIVATE_l: number;
  SERVERPASSWORD_b: boolean;
  MATCHTIMEOUT_d: number;
  ENABLEDMODSFILEIDS_s: string;
  DAYTIME_s: string;
  SOTFMATCHSTARTED_b: boolean;
  STEELSHIELDENABLED_l: number;
  SERVERUSESBATTLEYE_b: boolean;
  EOSSERVERPING_l: number;
  ALLOWDOWNLOADCHARS_l: number;
  OFFICIALSERVER_s: string;
  GAMEMODE_s: string;
  ADDRESS_s: string;
  SEARCHKEYWORDS_s: string;
  __EOS_BLISTENING_b: boolean;
  ALLOWDOWNLOADITEMS_l: number;
  LEGACY_l: number;
  ADDRESSBOUND_s: string;
  SESSIONISPVE_l: number;
  __EOS_BUSESPRESENCE_b: boolean;
  ENABLEDMODS_s: string;
  SESSIONNAMEUPPER_s: string;
  SERVERPLATFORMTYPE_s: string;
  MAPNAME_s: string;
  BUILDID_s: string;
  SESSIONNAME_s: string;
}

/**
 * @typedef {object} QueryServersOptions
 * @description The options to use when querying servers.
 * @property {string} deployment_id - The deployment ID of Ark: Survival Ascended.
 * @property {ServerCriteria[]} criteria - The criteria to use when querying servers.
 * @property {string} api_endpoint - The API endpoint of Epic Games.
 * @property {string} access_token - The access token for the API.
 */
export interface QueryServersOptions {
  deployment_id?: string;
  criteria?: ServerCriteria[];
  api_endpoint?: string;
  access_token?: string;
  maxResults?: number;
}

/**
 * @constant {QueryServersOptions} defaultOptions
 * @description The default options to use when querying servers.
 * @property {string} deployment_id - The deployment ID of Ark: Survival Ascended.
 * @property {string} api_endpoint - The API endpoint of Epic Games.
 * @property {number} maxResults - The maximum number of results to return. Defaults to 10.
 * These options can be overridden by passing an object to the queryServers function.
 */
const defaultOptions: QueryServersOptions = {
  deployment_id: 'ad9a8feffb3b4b2ca315546f038c3ae2',
  api_endpoint: 'https://api.epicgames.dev',
  maxResults: 10,
};

/**
 * @function queryServers - Queries the matchmaking API for servers.
 * @param options - The options to use when querying servers.
 * @returns {Promise<MatchmakingResponse>} - The response from the matchmaking API.
 */
export default async function queryServers(
  options: QueryServersOptions = defaultOptions,
) {
  options = { ...defaultOptions, ...options };

  const { deployment_id, api_endpoint, maxResults, access_token, criteria } =
    options;

  if (typeof access_token !== 'string' || !access_token)
    throw new Error('Invalid or missing access_token');

  if (typeof criteria !== 'object' || !criteria)
    throw new Error('Invalid or missing criteria');

  if (maxResults === undefined) throw new Error('maxResults is required');

  if (criteria.length < 1) throw new Error('Criteria object is empty');

  let url: URL;
  try {
    url = new URL(`/matchmaking/v1/${deployment_id}/filter`, api_endpoint);
  } catch (e) {
    throw new Error('Invalid API endpoint');
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const body = JSON.stringify({
    criteria,
    maxResults,
  });

  let res: Response;
  try {
    res = await fetch(url.toString(),
      {
        method: 'POST',
        headers,
        body,
      },
    );
  } catch (e) {
    throw new Error('Network error occurred');
  }

  if (!res.ok) throw new Error('Invalid response from server');

  let json: MatchmakingResponse;
  try {
    json = await res.json();
    if (!Array.isArray(json.sessions)) throw new Error('Invalid sessions');
    if (typeof json.count !== 'number') throw new Error('Invalid count');
  } catch (e) {
    throw new Error('Error parsing JSON response');
  }

  return json;
}
