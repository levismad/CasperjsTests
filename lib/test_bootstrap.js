/** 
  * #######################################################################
  * @desc this file will hold functions for every test's interaction(s)   #
  * examples include underscore, casper                                   #
  * @author Levi Esteves levi.esteves@gmail.com                           #
  * #######################################################################
*/


var system        = require('system');
var args          = system.args;
var fs            = require('fs');
var CURRENT_PATH  = "";


/** 
  * @desc set current working PATH to load scripts
  * example CURRENT_PATH
  * @author Levi Esteves levi.esteves@gmail.com
*/
var curFilePath = fs.absolute(system.args[0]).split('/');
if (curFilePath.length > 1) {
    curFilePath.pop(); // remove filaname
    CURRENT_PATH = curFilePath.join('/') + '/';
    // fs.changeWorkingDirectory(CURRENT_PATH + 'lib/');
}

/** 
  * @function GetDirectory(filename)
  * @desc get formated path with filaname;
  * examples GetDirectory("teste.png") -> CURRENT_PATH/teste.png
  * @author Levi Esteves levi.esteves@gmail.com
*/
function GetDirectory(filename){
  return CURRENT_PATH + filename;
}



/** 
  * @desc insert Casper dependency into session
  * @author Levi Esteves levi.esteves@gmail.com
*/
phantom.casperTest = true;
phantom.casperPath = GetDirectory('lib/casperjs');
phantom.injectJs(GetDirectory('lib/casperjs/bin/bootstrap.js'));


/** 
  * @desc insert underscorejs/utils helpers into session
  * @author Levi Esteves levi.esteves@gmail.com
*/
phantom.injectJs(GetDirectory('lib/underscore-min.js'));
phantom.injectJs(GetDirectory('lib/util.js'));


/** 
  * @desc get all arguments into object "teste.cli" to be used accross test(s)
  * examples teste.cli.options (--foo=bar),teste.cli.props (Hello=1)
  * @author Levi Esteves levi.esteves@gmail.com
  * @test _testeArguments();
*/
if (typeof teste              == 'undefined') { teste = new Object(); }
if (typeof teste.cli          == 'undefined') { teste.cli = new Object(); }
if (typeof teste.cli.options  == 'undefined') { teste.cli.options = new Object(); }
if (typeof teste.cli.props    == 'undefined') { teste.cli.props = new Object(); }

if (args.length > 1) {
  args.forEach(function(arg, i) {
    var value;
    var explode;
    if (arg.match(/--/)) {
      value = arg.replace(/--/g, "");
      explode = value.split("=");
      teste.cli.options[explode[0]] = explode[1];


    } else {
      value = arg;
      explode = value.split("=");
      teste.cli.props[explode[0]] = explode[1];
    }

  });

  /* //LIST ALL ARGUMENT'S
    console.log("Options passed:");
    _.each(teste.cli.options, function(v){
       console.log(v);
    });
    console.log("Props passed:");
    _.each(teste.cli.props, function(v){
       console.log(v);
    });
  */
}


/** 
  * @function _getSnapshotFileName()
  * @desc get formated path with snapshot default filname (yyyyMMdd_HHmmss.png);
  * examples _getSnapshotFileName() -> CURRENT_PATH/capture/20160131_103059.png
  * @author Levi Esteves levi.esteves@gmail.com
*/
teste._getSnapshotFileName = function(prefix){
  if(prefix === undefined){
    prefix = "";
  }
  var a = new Date();
  var astr = a.toTimeString();
  var b = a.yyyymmdd();
  var c = astr.substring(0,8).replace(/[:]/g,"");
  return GetDirectory('capture/')  + prefix + b + "_" + c + ".png";
}