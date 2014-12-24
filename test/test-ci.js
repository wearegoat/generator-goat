/* global describe, ddescribe, before, it */
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Goat:ci', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../ci'))
      .withArguments('name', '--force')
      .withOptions({ 'skip-install': true })
      .withPrompt({
        productionUrl: 'http://production.com',
        stagingUrl: 'http://staging.com',
        sshPort: '88',
        sshHost: '0.0.0.0',
        sshUser: 'hh',
        stagingSym: 'staging',
        productionSym: 'production'
      })
      .on('end', done);
  });

  it('creates wercker file', function () {
    assert.file([
      'wercker.yml'
    ]);
  });
  it('adds variables from cli to wercker file', function () {
    assert.fileContent('wercker.yml', /export PTOR_BASE_URL=http:\/\/production\.com/);
    assert.fileContent('wercker.yml', /export PTOR_BASE_URL=http:\/\/staging\.com/);
    assert.fileContent('wercker.yml', /hostname: 0\.0\.0\.0/);
    assert.fileContent('wercker.yml', /port: 88/);
  });

  it('creates playbook folder', function () {
    assert.file(['playbooks']);
  });

  it('creates hosts file in playbooks folder and fills with data from CLI', function () {
    assert.fileContent('playbooks/hosts', /0\.0\.0\.0/);
    assert.fileContent('playbooks/hosts', /ansible_ssh_port=88/);
    assert.fileContent('playbooks/hosts', /ansible_ssh_user=hh/);
  });

  it('creates playbooks files', function () {
    assert.files([
      'playbooks/add_key.yml',
      'playbooks/nginx.yml',
      'playbooks/production.yml',
      'playbooks/stage-add.yml'
    ]);
  });

  it('creates group variables file for playbooks', function () {
    assert.files(['playbooks/group_vars/all/vars.yml']);
  });

  it('appropriately fills the variables file from CLI', function () {
    assert.fileContent('playbooks/group_vars/all/vars.yml', /domain: http:\/\/staging.com/);
    assert.fileContent('playbooks/group_vars/all/vars.yml', /production_domain: http:\/\/production.com/);
    assert.fileContent('playbooks/group_vars/all/vars.yml', /www_symlink: staging/);
    assert.fileContent('playbooks/group_vars/all/vars.yml', /www_production_symlink: production/);
  });

  it('copies role files', function () {
    assert.files([
      'playbooks/roles/add_key',
      'playbooks/roles/nginx',
      'playbooks/roles/nginx-production',
      'playbooks/roles/production',
      'playbooks/roles/staging'
    ]);
  });

});
