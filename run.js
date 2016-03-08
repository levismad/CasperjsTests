/** INITIALIZE TEST'S
  * #######################################################################
  * @desc get all test's files and execute			                      #
  * @author Levi Esteves levi.esteves@gmail.com                           #
  * #######################################################################
*/
 phantom.injectJs('D:\\phantom\\casper\\lib\\test_bootstrap.js');



var casper = require('casper').create();
/* Path location to test's files */
var path = GetDirectory('test_files/');
var list = fs.list(path);
for(var x = 0; x < list.length; x++){
    var file = path + list[x];
    if(fs.isFile(file)){
    	phantom.injectJs(file);
    }
}
// TODO: phantom.exit(0)
