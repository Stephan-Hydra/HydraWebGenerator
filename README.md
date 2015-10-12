# Prereqs and installation requirements

download and install node.js (min. version 4.0.0) [node](https://nodejs.org/en/download/)

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

To compile, minify and uglify the files from src to dist and start the server, run:

```bash
gulp serve
```



To bind all *.js and *.scss files in the debug.html, without minify and uglify to help you to debug, and start the server in debug modus, run:

```bash
gulp serve:debug
```
This 
