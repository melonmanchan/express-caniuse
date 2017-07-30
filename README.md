# express-caniuse

> Express/Connect middleware for automatically determining browser capabilities


## Description

This express middleware parses the user-agent of the incoming request, compares
it to the [Can I use](https://caniuse.com/) database and adds an additional
`capabilities` object to the `req`, showing which predetermined browser
features are supported. Use it for analytics or for conditional rendering, for
example!

## Usage

```sh
npm install --save --production express-caniuse
```

```js

var express           = require('express');
var canIUseMiddleware = require('express-caniuse');

var app = express();

app.use(canIUseMiddleware({
  features: [
    'addeventlistener',
    'setimmediate'
  ]
}));

app.get('hello', function (req, res, next) {
  console.log(req.capabilities)
  // {
  //  'addeventlistener': true,
  //  'setimmediate': false
  // }
});

```

If the locale could not be determined or the user-agent header was missing,
`req.capabilities` will be an empty object.

## License

MIT © [Matti Jokitulppo](https://mattij.com)

[![npm version](https://badge.fury.io/js/express-caniuse.svg)](https://badge.fury.io/js/express-caniuse)
[![npm downloads](https://img.shields.io/npm/dm/express-caniuse.svg)](https://img.shields.io/npm/dm/express-caniuse.svg)
[![Build Status](https://travis-ci.org/melonmanchan/express-caniuse.svg?branch=master)](https://travis-ci.org/melonmanchan/express-caniuse)
