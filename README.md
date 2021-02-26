# Typeorm Cache

A typeorm cache provider based on [keyv](https://www.npmjs.com/package/keyv).

## Installation

```bash
# npm
npm i typeorm-cache keyv --save

# or yarn
yarn add typeorm-cache keyv
```

## Usage

```ts
import { createConnection } from 'typeorm'
import { KeyvCacheProvider } from 'typeorm-cache'

// In-memory cache
createConnection({
  // ... db config
  cache: {
    provider() {
      return new KeyvCacheProvider()
    }
  }
})

// Redis
createConnection({
  // ... db config
  cache: {
    provider() {
      return new KeyvCacheProvider('redis://user:pass@localhost:6379')
    }
  }
})

// ...
```

For more examples, visit [keyv documentation](https://www.npmjs.com/package/keyv#usage).

## License

[MIT](https://github.com/acathur/typeorm-cache/blob/master/LICENSE)

Copyright (c) 2021, Acathur
