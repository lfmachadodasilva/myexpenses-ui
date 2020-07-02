#!/usr/bin/env bash
jsonFile=$1;

node > out_${jsonFile} <<EOF
//Read data
var data = require('./${jsonFile}');

//Manipulate data
data.homepage = 'https://lfmachadodasilva.github.io/myexpenses-ui';

//Output data
console.log(JSON.stringify(data));

EOF

mv out_${jsonFile} ${jsonFile}
