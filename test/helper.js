var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var path    = require('path');

exports.createSubGenerator = function (type, asserts) {
  var deps = [
    [helpers.createDummyGenerator()]
  ];
  helpers.run(path.join(__dirname, '../' + type))
    .withArguments(['foo'])
    .withGenerators(deps)
    .on('end', asserts);
};

