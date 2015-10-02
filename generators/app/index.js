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
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
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
    },

    misc: function () {
      mkdirp('code/src/styles');
      mkdirp('code/src/scripts');
      mkdirp('code/src/templates');
      mkdirp('code/dist/images');
      mkdirp('code/dist/fonts');
      mkdirp('code/dist/js');
      mkdirp('code/dist/js/libs');
      mkdirp('code/dist/lang');
      mkdirp('code/dist/media');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
