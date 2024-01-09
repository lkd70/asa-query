[![Issues][issues-shield]][issues-url]
[![AGPL-3.0 License][license-shield]][license-url]

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#methods">Methods</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

`asa-query` is a powerful and flexible tool designed to query Ark: Survival Ascended servers. It was created to provide a simple yet specific way to retrieve server information. The tool uses a `Query Builder` structure, allowing users to build complex queries with ease.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

Provided below are instructions to initiate and start using asa-query.
We assume you have a basic understanding of Node.js, but also try to keep it
as "noob" friendly as possible.

### Prerequisites

* [Node.js](https://nodejs.org)
* A Node package manager of your choice ([Yarn](https://yarnpkg.com), [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), etc...)


### Installation

Begin by installing the asa-query package with your chosen Node package manager

* npm - `npm install asa-query`
* yarn - `yarn add asa-query`
* pnpm - `pnpm add asa-query`

Once you've obtained the package, import it in to your project.
This can be done with either imports or require(), depending on how you've setup your project/environment.

```javascript
import AsaQuery from 'asa-query';
```
or
```javascript
const AsaQuery = require('asa-query');
```

You're now ready to use asa-query!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

Let's take a look at an example usage.

```typescript
import AsaQuery from 'asa-query';

const query = new AsaQuery();

const main = async () => {
  const res = query.official().serverNameContains("2142").exec();
  console.log(res);
};

main();
```
In the above example, we're querying for any official servers in which the server name contains the string "2142".

This will return us a sessions array with the matching severs, and a count element, with the total count.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Methods

These are the available methods on the AsaQuery class.

### addCriteria

Adds a criterion to the query.

**Parameters:**

- `key` (`CriterionKey`): The key of the criterion. This corresponds to a specific attribute of a server.
- `op` (`'EQUAL' | 'NOT_EQUAL' | 'CONTAINS'`): The operation to perform on the key. This can be 'EQUAL', 'NOT_EQUAL', or 'CONTAINS'.
- `value` (`string | number | boolean`): The value to compare the key against.


<details>
  <summary>Available keys</summary>
  <ul>
    <li>attributes.MINORBUILDID_s</li>
    <li>attributes.MODID_l</li>
    <li>attributes.CUSTOMSERVERNAME_s</li>
    <li>attributes.ADDRESSDEV_s</li>
    <li>attributes.ISPRIVATE_l</li>
    <li>attributes.SERVERPASSWORD_b</li>
    <li>attributes.MATCHTIMEOUT_d</li>
    <li>attributes.ENABLEDMODSFILEIDS_s</li>
    <li>attributes.DAYTIME_s</li>
    <li>attributes.SOTFMATCHSTARTED_b</li>
    <li>attributes.STEELSHIELDENABLED_l</li>
    <li>attributes.SERVERUSESBATTLEYE_b</li>
    <li>attributes.EOSSERVERPING_l</li>
    <li>attributes.ALLOWDOWNLOADCHARS_l</li>
    <li>attributes.OFFICIALSERVER_s</li>
    <li>attributes.GAMEMODE_s</li>
    <li>attributes.ADDRESS_s</li>
    <li>attributes.SEARCHKEYWORDS_s</li>
    <li>attributes.__EOS_BLISTENING_b</li>
    <li>attributes.ALLOWDOWNLOADITEMS_l</li>
    <li>attributes.LEGACY_l</li>
    <li>attributes.ADDRESSBOUND_s</li>
    <li>attributes.SESSIONISPVE_l</li>
    <li>attributes.__EOS_BUSESPRESENCE_b</li>
    <li>attributes.ENABLEDMODS_s</li>
    <li>attributes.SESSIONNAMEUPPER_s</li>
    <li>attributes.SERVERPLATFORMTYPE_s</li>
    <li>attributes.MAPNAME_s</li>
    <li>attributes.BUILDID_s</li>
    <li>attributes.SESSIONNAME_s</li>
    <li>id</li>
    <li>bucket</li>
    <li>totalPlayers</li>
    <li>openPublicPlayers</li>
    <li>publicPlayers</li>
    <li>started</li>
    <li>lastUpdated</li>
    <li>owner</li>
    <li>ownerPlatformId</li>
  </ul>
</details>

**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// Add a criterion for servers with a specific name
query.addCriteria('attributes.SERVERNAME_s', 'EQUAL', 'My Servers Name');
const res = query.exec();
```

### serverName

Filters for an exact server name

**Parameters:**

- `name` (`String`) - The exact name of the server(s) to return.


**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// filter for servers with the exact name: "NA-PVP-TheIsland2142"
query.serverName('NA-PVP-TheIsland2142');
const res = query.exec();
```

### serverNameContains

Filters for servers with a name that contains the given string

**Parameters:**

- `name` (`String`) - The string that exists in the servers name.

**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// filter for servers with a name containing the text: "2142"
query.serverNameContains('2142');
const res = query.exec();
```

### official

Filters for official servers only.

**Parameters:**

None

**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// filter for servers on the official network
query.official();
const res = query.exec();
```

### unofficial

Filters for unofficial servers only.

**Parameters:**

None

**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// filter for unofficial servers, not on the official network.
query.unofficial();
const res = query.exec();
```

### serverId

Filters for servers with the given Epic Session (Server) ID.

**Parameters:**

- `id` (`string`) - The Epic Session/server ID of the server.

**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// filter for servers with the ID: 69ee7eab580f43eeb904527d439b8fae
query.serverId("69ee7eab580f43eeb904527d439b8fae");
const res = query.exec();
```

### max

Specifies the maximum amount of servers to return, defaults to 10.

**Parameters:**

- `max` (`number`) - The amount of servers to return.

**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// filter for servers with a name containing "42"
// limit the response to 100 servers.
query.serverNameContains("42").max(100);
const res = query.exec();
```

### getToken

Allows you to get a custom access_token to use for the authentication
instead of using the ones provided by Ark (default)

**Parameters:**

- `max` (`number`) - The amount of servers to return.
- `client_id` (`string`) - the JWT client ID
- `client_secret` (`string`) - The JWT client secret
- `deployment_id` (`string`) - The deployment ID (ASA servers)
- `api_endpoint` (`string`) - The API endpoint (Epic Games API)

**Returns:**

- The `AsaQuery` instance, allowing for method chaining.
- exec() must be called following this in order to return results.

**Example:**

```typescript
// Returns the server with the specified ID.
// Authenticates the request using the provided credentials
const options = {
  client_id: 'xyza7891muomRmynIIHaJB9COBKkwj6n',
  client_secret: 'PP5UGxysEieNfSrEicaD1N2Bb3TdXuD7xHYcsdUHZ7s',
  deployment_id: 'ad9a8feffb3b4b2ca315546f038c3ae2',
  api_endpoint: 'https://api.epicgames.dev',
};

const res = query
    .getToken(options)
    .serverId("69ee7eab580f43eeb904527d439b8fae");
```


## Roadmap

- [ ] Add ChangeLog
- [ ] Add a wider range of pre-baked methods
- [ ] Provide more criteria operators (Currently only "EQUAL", "CONTAINS", etc...)

See the [open issues](https://github.com/lkd70/asa-query/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

Distributed under the AGPL-3.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Contact

Feel free to reach out to me:
- Telegram: [@LKD70](https://t.me/LKD70)
- Discord: [@LKD70](https://discordapp.com/users/131728767168020480)
- Github: [LKD70](https://github.com/lkd70)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[issues-shield]: https://img.shields.io/github/issues/lkd70/asa-query.svg?style=for-the-badge
[issues-url]: https://github.com/lkd70/asa-query/issues
[license-shield]: https://img.shields.io/github/license/lkd70/asa-query.svg?style=for-the-badge
[license-url]: https://github.com/lkd70/asa-query/blob/master/LICENSE
