# Prereqs and installation requirements

install [yeoman](http://yeoman.io/).
```shell
npm install -g yo
```


# generator-hydraweb installation

To install generator-hydraweb from npm, run:

```bash
npm install -g generator-hydraweb
```

Go to your project's folder:

```bash
cd my/new/project
```

Finally, initiate the generator:

```bash
yo hydraweb
```

# How to use

To start the server, run:

```bash
gulp serve
```
This compile and minify the files from src to dist


To start the server in debug modus, run:

```bash
gulp serve:debug
```
This bind all *.js and *.scss files in the debug.html, without minify and uglify to help you to debug