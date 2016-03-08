/** TEST_002 - LOGIN ATENDENTE INTO APPLICATION AND VIEW BENEFICIARIO ANSWER'S
  * #######################################################################
  * @desc Cenário usuário atendente tenta logar na aplicação e visualizar respostas 
  * @author Levi Esteves levi.esteves@gmail.com                           #
  * #######################################################################
*/


var usuarios = [];
usuarios.push(new Usuario("x","z"));

var beneficiarios = ['1','2','3','16','17','22']


var ambientes = [];
ambientes.push(new Ambiente("desenvolvimento","http://x/"));
// ambientes.push(new Usuario("homol","http://y"));
ambientes.push(new Ambiente("producao","http://z/"));


var height = 1;
var width = 1366;
var firstUrl = "";
var numberOfTestsExecuted = 0;

casper.each(usuarios, function(self, usuario, i) {
  casper.each(ambientes, function(self, ambiente, i) {
    casper.each(beneficiarios, function(self, beneficiario, i) {
      casper.test.begin('TEST_003 - LOGIN ATENDENTE='+ usuario.username +' INTO APPLICATION AND VIEW BENEFICIARIO='+ beneficiario +' ANSWERS PAGE', function suite(test) {
        casper.start(ambiente.url, function() {
          var FILE_NAME = "TEST_002";
          numberOfTestsExecuted++;
          console.log("Executando teste: " + [FILE_NAME,ambiente.slug,usuario.username,''].join('/'));
          firstUrl = this.getCurrentUrl();
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
        casper.then(function() {

          this.fill('form.form-horizontal', {
            empresaSelecionado: "1",
            questionarioSelecionado: "1",
            usuarioSelecionado: beneficiario
          }, true);
          test.assertExists('input[id=btnPesquisar]', "Botao de pesquisa");
          this.wait(4000, function() {});
        });
        casper.thenClick('input[id=btnPesquisar]', function() {
          console.log('Pesquisando..');
        });

        casper.then(function() {
          this.wait(2000, function() {});
        });
        casper.then(function() {
          temResposta = this.evaluate(function() {
            return document.querySelector('td[id=respondidoRespostaSim]').className != "hide";
          });
          if (temResposta) {
            console.log("Beneficiário respondeu o questionario no dia: " + this.evaluate(function() {
              return document.querySelector("td[id=dataRespostaSim]").innerHTML;
            }));
          } else {
            console.log("Beneficiario nao respondeu o questionario.");
          }

        });
        casper.then(function() {
          if (!temResposta) {
            this.bypass(3);
          }
        });
        casper.thenClick('a[class=irVisualizarResposta]', function() {
          console.log('Visualizando Resposta..');
        });
        casper.waitFor(function check() {
          return firstUrl != this.getCurrentUrl();

        }, function then() {
          this.wait(4000, function() {});
        });
        casper.viewport(width, height).then(function() {
          var FILE_NAME = "TEST_003";
          this.capture(teste._getSnapshotFileName([FILE_NAME,ambiente.slug,usuario.username,"beneficiario_" + beneficiario,''].join('/')));
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
});