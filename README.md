# Gulp Front

_A lean and powerful, gulp-based boilerplate for better front-end coding with [Gulp](http://gulpjs.com/), [Pug](https://pugjs.org/) and [Stylus](http://stylus-lang.com/)_


## Demo

[github.com/peterjj91/frontend-boilerplate](https://github.com/peterjj91/frontend-boilerplate)

## Documentation

More information see in [docs](docs/README.md) folder

## Core features

- Modern and fast build tool
- Module based BEM CSS framework
- Automatic icon system based on SVG Symbols
- Easy PNG Sprites generation (including @2x)
- A convenient @media mixins
- Smart image compression

## Quickstart

1.  Install the [node.js](https://nodejs.org)
2.  Clone the project or [download](https://github.com/peterjj91/frontend-boilerplate/archive/master.zip) the file
    ```sh
    git clone git@github.com:peterjj91/frontend-boilerplate.git --depth 1 my-project
    ```
3.  Go to project folder and run
    ```bash
    npm run setup
    ```
4.  Start dev server
    ```bash
    npm start
    ```
5.  In browser open page with address [`http://localhost:3000/`](http://localhost:3000/)

## Main tasks

- `npm run dev` - launches watchers and server
- `npm run build` - compile a project
- `npm run zip` - compile a project in zip
- `npm run deploy` - compile a project and push in `build` branch to git repository
- `npm run cleanup` - remove demo app

## Module generator

Create empty module by name in `source/modules` folder

By default generate only `*.pug` and `*.styl` files.

You can call `amo` with additional params like `js` and `yml`

```sh
npm run amo <module-name> [js || yml]
```

## License

[The MIT License (MIT)](LICENSE)
