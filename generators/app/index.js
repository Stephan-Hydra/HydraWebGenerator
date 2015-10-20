'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('HydraWeb') + ' generator!'
    ));

  },

  writing: {
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          date: (new Date).toISOString().split('T')[0],
          contents:'<%= contents %>'
        }
      );
    },

    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      /*
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      */
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
    },

    misc: function () {
      mkdirp('code/src/styles');
      mkdirp('code/src/scripts');
      mkdirp('code/src/templates');
      mkdirp('code/dist/images');
      mkdirp('code/dist/fonts');
      mkdirp('code/dist/js');
      mkdirp('code/dist/js/libs');
      mkdirp('code/dist/debug');
      mkdirp('code/dist/lang');
      mkdirp('code/dist/media');
    },

    html: function () {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('code/dist/index.html')
      );
      this.fs.copyTpl(
        this.templatePath('debug.html'),
        this.destinationPath('code/dist/debug.html')
      );
    },

    template: function () {
      this.fs.copyTpl(
        this.templatePath('helloworld.hbs'),
        this.destinationPath('code/src/templates/helloworld.hbs')
      );
    },

    xml: function () {
      this.fs.copyTpl(
        this.templatePath('de.xml'),
        this.destinationPath('code/dist/lang/de.xml')
      );
      this.fs.copyTpl(
        this.templatePath('en.xml'),
        this.destinationPath('code/dist/lang/en.xml')
      );
    },

    styles: function () {
      this.fs.copyTpl(
        this.templatePath('main.scss'),
        this.destinationPath('code/src/styles/main.scss')
      );
    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('code/src/scripts/main.js')
      );
    this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('code/dist/js/main.min.js')
      );
    this.fs.copy(
        this.templatePath('handlebars.min.js'),
        this.destinationPath('code/dist/js/libs/handlebars.min.js')
      );
    this.fs.copy(
        this.templatePath('jquery.easing.js'),
        this.destinationPath('code/dist/js/libs/jquery.easing.js')
      );
    this.fs.copy(
        this.templatePath('jquery.min.js'),
        this.destinationPath('code/dist/js/libs/jquery.min.js')
      );
    this.fs.copy(
        this.templatePath('jquery.min.map'),
        this.destinationPath('code/dist/js/libs/jquery.min.map')
      );
    this.fs.copy(
        this.templatePath('modernizr.js'),
        this.destinationPath('code/dist/js/libs/modernizr.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    /*
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      */
    }


  },

  install: function () {
    //this.installDependencies();
      this.spawnCommand('npm', ['install']);
  }

});
