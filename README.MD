# Hapi Panda ES

Briefly, it ain't a story about a happy panda bear, but it's actually a plugin wrapper for Hapi17 built over panda-es-orm nodeJS plugin.

## Configuration

The configuration follows the reference in the panda-es-orm node module.

https://github.com/replsv/panda-es-orm#configuration

Eg.
```js
my-manifest.json
{
    "server": {
      "register": {
        "plugins": [
          {
            "plugin": "hapi-panda-es",
            "options": {
              "connection": {
                "host": ["10.10.10.19:9204"]
              },
              "logger": {
                "level": 10
              }
            }
          }
        ]
      }
    }
}
```

## Server decorations

- pandaES - the entire plugin - usable for creating your own models and so on
- pandaEsOrm - instance of the ORM

## How to use it?

Browse the nodeJS' examples dir as you might get a flavour on how to use it. Do this using the exposed server decorations where needed.

## Compatibility and dependencies

- joi ^13.1.1
- panda-es-orm ^0.1.0
- hapi ^17.0.0
- node >= 8