'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');



module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling' + chalk.red('Goat') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'So what is this ' + chalk.red('project name') + '?',
      default: this.appname
    },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your project, please',
        default: 'Fancy new goat\'s web project'
      },
      {
        type: 'confirm',
        name: 'ci',
        message: 'Do you need to setup CI for this project?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.name;
      this.projectDesc = props.description;
      this.ci = props.ci;
      done();
    }.bind(this));

  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {projectName: this.projectName,
          projectDesc: this.projectDesc}
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {projectName: this.projectName,
          projectDesc: this.projectDesc}
      );

      this.fs.copy(
        this.templatePath('_gulp/_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('_karma.conf.js'),
        this.destinationPath('karma.conf.js')
      );

      this.fs.copy(
        this.templatePath('_ptor.conf.js'),
        this.destinationPath('ptor.conf.js')
      );

      this.fs.copy(
        this.templatePath('_scripts/*'),
        this.destinationPath('scripts')
      );

      this.mkdir('gulp');
      this.mkdir('gulp/util');

      this.fs.copy(
        this.templatePath('_gulp/gulp-essentials/util/*'),
        this.destinationPath('gulp/util/')
      );

      this.fs.copy(
        this.templatePath('_gulp/gulp-essentials/tasks/*'),
        this.destinationPath('gulp/tasks/')
      );

      this.fs.copy(
        this.templatePath('_gulp/gulp-essentials/_index.js'),
        this.destinationPath('gulp/index.js')
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

    composeSubgenerators: function () {
      if(this.ci){
        this.composeWith('goat:ci', {});
      }
    }

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
