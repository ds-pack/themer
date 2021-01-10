# Themer

A theme builder utility for constructing css-in-js theme objects.

## Installation:

```sh
yarn add @ds-pack/themer
```

## Usage:

```ts
import themer from '@ds-pack/themer'

let baseTheme = {
  colors: {
    primary: '$green.3',
    green: ['greenyellow', 'lawngreen', 'limegreen', 'mediumspringgreen'],
  },
}

let theme = themer(baseTheme)

// theme === {
//   colors: {
//     primary: 'mediumspringgreen',
//     green: [
//       'greenyellow',
//       'lawngreen',
//       'limegreen',
//       'mediumspringgreen'
//     ]
//   }
// }
```

## Background:

See my
[blog post on computed theme](https://matthamlin.me/posts/2021/january/computed-theme).
