var child = require('child_process');
var python = child.spawn( 'python', ['myPythonScript.py']);

python.stdout.on('data', function(data){
    console.log('data = ' + data);
});
