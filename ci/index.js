'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('Setting up CI.');

    //this.argument('name', {
    //  required: true,
    //  type: String,
    //  desc: 'The subgenerator name'
    //});
  },
  prompting: function () {
    var done = this.async();
    var ciPrompts = [{
      type: 'input',
      name: 'sshHost',
      message: 'What is the host ip for deploy',
      default: '0.0.0.0'
    },
      {
        type: 'input',
        name: 'sshPort',
        message: 'What is the host ssh port',
        default: '88'
      },
      {
        type: 'input',
        name: 'stagingUrl',
        message: 'What is the staging url?',
        default: 'http://something.wearegoat.uk'
      },
      {
        type: 'input',
        name: 'productionUrl',
        message: 'What is the production url?',
        default: 'http://something.com'
      },
      {
        type: 'input',
        name: 'sshUser',
        message: 'What is ssh user name?',
        default: 'bambi'
      },
      {
        type: 'input',
        name: 'stagingSym',
        message: 'What is staging symlink name?',
        default: 'stage'
      },
      {
        type: 'input',
        name: 'productionSym',
        message: 'What is production symlink name?',
        default: 'production'
      }
    ];

    this.prompt(ciPrompts, function (props) {
      this.productionUrl = props.productionUrl;
      this.stagingUrl = props.stagingUrl;
      this.sshHost = props.sshHost;
      this.sshPort = props.sshPort;
      this.sshUser = props.sshUser;
      this.stagingSym = props.stagingSym;
      this.productionSym = props.productionSym;
      done();
    }.bind(this));

  },

  writing: function () {
    var data = {
      productionUrl: this.productionUrl,
      stagingUrl: this.stagingUrl,
      sshHost: this.sshHost,
      sshPort: this.sshPort,
      sshUser: this.sshUser,
      stagingSym: this.stagingSym,
      productionSym: this.productionSym
    };
    this.fs.copyTpl(
      this.templatePath('_wercker.yml'),
      this.destinationPath('wercker.yml'),
      data
    );

    this.mkdir('playbooks/group_vars/all');

    this.fs.copyTpl(
      this.templatePath('_playbooks/_hosts'),
      this.destinationPath('playbooks/hosts'),
      data
    );

    this.fs.copyTpl(
      this.templatePath('_playbooks/_group_vars/all/_vars.yml'),
      this.destinationPath('playbooks/group_vars/all/vars.yml'),
      data
    );

    this.fs.copy(
      this.templatePath('_playbooks/_pb/*'),
      this.destinationPath('playbooks')
    );

    this.fs.copy(
      this.templatePath('_playbooks/_roles/**/*'),
      this.destinationPath('playbooks/roles')
    );
  }
});
