/* global describe, before, it */
'use strict';

var path = require('path');
var yeoman = require('yeoman-environment');
var generators = require('yeoman-generator');
var TestAdapter = require('../node_modules/yeoman-generator/lib/test/adapter').TestAdapter;
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var tempdir = path.join(os.tmpdir(), './temp-test');

describe('goat:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        name: 'new-project',
        description: 'New project description'
      })
      .on('end', done);
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

//describe('goat:app with compose', function () {
//  before(helpers.setUpTestDirectory(tempdir));
//  beforeEach(function () {
//    this.env = yeoman.createEnv([], { 'skip-install': true }, new TestAdapter());
//
//    this.spy = sinon.spy();
//  //
//    this.SubGen = generators.Base.extend({
//      exec: this.spy
//    });
//    console.log(typeof this.SubGen)
//    var deps = [path.join(__dirname, '../app')];
//
//    this.env.registerStub(this.SubGen, 'goat:ci');
//    this.gen = helpers.createGenerator('goat:app', deps, [], {
//      'skip-install': true, env: this.env
//    });
//
//    helpers.mockPrompt(this.gen, {'ci': 'y'});
//
//  });
//
//  it('creates wercker file', function (done) {
//    //console.log(this.gen);
//    var runSpy = sinon.spy(this.gen, 'run');
//    helpers.run(this.gen)
//      .on('end', done);
//  });
//
//});
