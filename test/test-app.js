/* global describe, before, it */
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');

describe('goat:app', function () {
  before(function (done) {
    this.dummyGen = helpers.createDummyGenerator();
    this.spy = sinon.spy();
    this.dummyGen.prototype.initializing = this.spy;

    var deps = [[this.dummyGen, 'goat:ci']];
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withGenerators(deps)
      .withPrompt({
        name: 'new-project',
        description: 'New project description'
      })
      .on('end', done);
  });

  it('doesn\'t call ci subgenerator', function () {
    assert(!this.spy.called);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.gitignore',
      'ptor.conf.js',
      'karma.conf.js'
    ]);
  });


  it('sets project name and description from prompt', function () {
    assert.fileContent('bower.json', /"name": "new-project"/);
    assert.fileContent('bower.json', /"description": "New project description"/);
    assert.fileContent('package.json', /"name": "new-project"/);
    assert.fileContent('package.json', /"description": "New project description"/);
  });

  it('copies the gulpfile', function () {
    assert.file(['gulpfile.js']);
  });

  it('copies essential gulp tasks and utils', function () {
    assert.file(['gulp/util/', 'gulp/tasks', 'gulp/index.js']);
  });

  it('copies shellscripts folder', function () {
    assert.file(['scripts/']);
  });

});

describe('goat:app composability with ci', function () {
  before(function (done) {
    this.dummyGen = helpers.createDummyGenerator();
    this.spy = sinon.spy();
    this.dummyGen.prototype.initializing = this.spy;

    var deps = [[this.dummyGen, 'goat:ci']];
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withGenerators(deps)
      .withPrompt({
        name: 'new-project',
        description: 'New project description',
        ci: true
      })
      .on('end', done);
  });

  it('call ci subgenerator', function () {
    assert(this.spy.called);
  });

});
