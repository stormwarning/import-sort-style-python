# import-sort-style-python

[![npm version][npm-img]][npm-url]
[![npm downloads][npm-dls]][npm-url]

A style for [import-sort][] that groups and sorts imports by module, inspired by
[isort][]’s grouping style:

1. Node standard modules
2. Framework modules
3. Third-party modules
4. First-party modules
5. Explicitly local modules

Framework and First-party require setting some options in your config:

```json
"importSort": {
  ".js": {
    "parser": "babylon",
    "style": "python",
    "options": {
      "knownFramework": [],
      "knownFirstparty": []
    }
  },
}
```

[npm-url]: https://www.npmjs.com/package/import-sort-style-python

[npm-img]: https://img.shields.io/npm/v/import-sort-style-python.svg?style=flat-square

[npm-dls]: https://img.shields.io/npm/dt/import-sort-style-python.svg?style=flat-square

[import-sort]: https://github.com/renke/import-sort

[isort]: https://timothycrosley.github.io/isort/#how-does-isort-work