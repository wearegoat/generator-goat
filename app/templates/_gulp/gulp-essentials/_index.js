var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

/*
Create task for every script in 'tasks' folder
 */
tasks.forEach(function(task) {
   require('./tasks/' + task);
});
