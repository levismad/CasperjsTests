/** TEST_001 - LOGIN USER INTO APPLICATION
  * #######################################################################
  * @desc Cenário usuário tenta logar na aplicação                        #
  * @author Levi Esteves levi.esteves@gmail.com                           #
  * #######################################################################
*/


var usuarios = [];
usuarios.push(new Usuario("x","z"));


var ambientes = [];
ambientes.push(new Ambiente("desenvolvimento","http://x/"));
// ambientes.push(new Usuario("homol","http://y"));
ambientes.push(new Ambiente("producao","http://z/"));


var height = 1;
var width = 1366;

var numberOfTestsExecuted = 0;

casper.each(usuarios, function(self, usuario, i) {
  casper.each(ambientes, function(self, ambiente, i) {
  casper.test.begin('TEST_001 - LOGIN USER='+ usuario.username +' INTO APPLICATION=' + ambiente.slug, function suite(test) {
    casper.start(ambiente.url, function() {
      var FILE_NAME = "TEST_001";
      numberOfTestsExecuted++;
      console.log("Executando teste: " + [FILE_NAME,ambiente.slug,usuario.username,''].join('/'));
      // firstUrl = this.getCurrentUrl();
      test.assertTitle("Questionário de Saúde", "Titulo OK - Questionario de Saude");
      test.assertExists('form.form-signin', "Formulario de Login encontrado.");
      this.fill('form.form-signin', {
        Usuario: usuario.username,
        Senha: usuario.password
      }, true);
      this.click('.btn-primary');
      console.log('Loggin..');

      this.wait(4000, function() {});

    });
    casper.viewport(width, height).then(function() {
      var FILE_NAME = "TEST_001";
      this.capture(teste._getSnapshotFileName([FILE_NAME,ambiente.slug,usuario.username,''].join('/')));
      console.log('Snapshot criado.');
      if(numberOfTestsExecuted == (usuarios.length * ambientes.length)){
        // phantom.exit(0);
      }
    });
    casper.run(function() {

      test.done();
    });
  });

});
});