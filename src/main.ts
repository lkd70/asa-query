import queryServers, {
  QueryServersOptions,
  ServerCriteria,
  CriterionKey,
  MatchmakingResponse,
} from './eos/query';
import getAccessToken, {
  GetAccessTokenOptions,
  defaultOptions,
} from './eos/token';

/**
 * @class AsaQuery
 * @description A class for building queries to the Ark: Survival Ascended matchmaking API.
 * @example - Query for official servers with a name that contains '2142'
 * const query = new AsaQuery();
 * const response = query
 *   .official()
 *   .serverNameContains('2142')
 *   .exec();
 * console.log(response);
 */
class AsaQuery {
  private criteria: ServerCriteria[] = [];
  private maxResults = 10;
  private access_token: string | undefined;
  private token_expires: number | undefined;

  /**
   * addCriteria allows you to add a custom criterion to the query.
   * @param key - The key of the criterion to add.
   * @param op - The operator to use when comparing the value.
   * @param value - The value to compare against.
   * @returns {AsaQuery} - The AsaQuery instance.
   * to make use of this, call exec() after calling this function.
   * @example
   * const query = new AsaQuery();
   * const response = query
   *   .addCriteria(
   *     'attributes.CUSTOMSERVERNAME_s',
   *     'EQUAL',
   *     'NA-PVP-TheIsland2142')
   *   .exec();
   * console.log(response);
   */
  addCriteria(
    key: CriterionKey,
    op: 'EQUAL' | 'NOT_EQUAL' | 'CONTAINS',
    value: string | number | boolean,
  ) {
    this.criteria.push({ key, op, value });
    return this;
  }

  /**
   * serverName allows you to query for servers with a specific name.
   * @param name - The exact name of the server to query for.
   * @returns {AsaQuery} - The AsaQuery instance.
   * to make use of this, call exec() after calling this function.
   * @example
   * const query = new AsaQuery();
   * const response = query
   *  .serverName('NA-PVP-TheIsland2142')
   *  .exec();
   * console.log(response);
   */
  serverName(name: string) {
    return this.addCriteria('attributes.CUSTOMSERVERNAME_s', 'EQUAL', name);
  }

  /**
   * serverNameContains allows you to query for servers with a name that contains a specific string.
   * @param name - The string to query for.
   * @returns {AsaQuery} - The AsaQuery instance.
   * to make use of this, call exec() after calling this function.
   * @example
   * const query = new AsaQuery();
   * const response = query
   *  .serverNameContains('2142')
   *  .exec();
   * console.log(response);
   */
  serverNameContains(name: string) {
    return this.addCriteria('attributes.CUSTOMSERVERNAME_s', 'CONTAINS', name);
  }

  /**
   * official allows you to query for official servers only, excluding unofficial servers.
   * @returns {AsaQuery} - The AsaQuery instance.
   * to make use of this, call exec() after calling this function.
   * @example
   * const query = new AsaQuery();
   * const response = query
   *   .official()
   *   .exec();
   * console.log(response);
   */
  official() {
    return this.addCriteria('attributes.OFFICIALSERVER_s', 'EQUAL', '1');
  }

  /**
   * unofficial allows you to query for unofficial servers only, excluding official servers.
   * @returns {AsaQuery} - The AsaQuery instance.
   * to make use of this, call exec() after calling this function.
   * @example
   * const query = new AsaQuery();
   * const response = query
   *  .unofficial()
   *  .exec();
   * console.log(response);
   */
  unofficial() {
    return this.addCriteria('attributes.OFFICIALSERVER_s', 'EQUAL', '0');
  }

  /**
   * serverId allows you to query for a specific server by ID.
   * @param id - The Epic Server ID of the server to query for.
   * @returns {AsaQuery} - The AsaQuery instance.
   * to make use of this, call exec() after calling this function.
   * @example
   * const query = new AsaQuery();
   * const response = query
   *   .serverId('69ee7eab580f43eeb904527d439b8fae')
   *   .exec();
   * console.log(response);
   */
  serverId(id: string) {
    return this.addCriteria('id', 'EQUAL', id);
  }

  max(max: number) {
    this.maxResults = max;
    return this;
  }

  /**
   * getToken allows you to manually grab an access token from the API.
   * This is useful if you wish to use your own credentials.
   * If this isn't called, exec() will call this and grab a default token.
   * @param options - The options to use when grabbing the token.
   */
  async getToken(options: GetAccessTokenOptions = defaultOptions) {
    options = { ...defaultOptions, ...options };
    const token = await getAccessToken(options);

    this.access_token = token.access_token;
    this.token_expires = Date.now() + token.expires_in * 1000;
  }

  /**
   * exec executes the query and returns the response.
   * If getToken() hasn't been called, it will call it with default options.
   * If you wish to use your own credentials, call getToken() manually.
   * @throws {Error} - If no criteria are provided.
   * @returns {Promise<MatchmakingResponse>} - The response from the EOS API.
   */
  async exec(): Promise<MatchmakingResponse> {
    if (
      !this.access_token ||
      !this.token_expires ||
      this.token_expires < Date.now()
    ) {
      await this.getToken();
    }

    const queryOptions: QueryServersOptions = {
      access_token: this.access_token,
      criteria: this.criteria,
      maxResults: this.maxResults,
    };

    return queryServers(queryOptions);
  }
}

export = AsaQuery;
