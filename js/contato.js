
const form = document.getElementById('form');
const campos = document.querySelectorAll('.required'); //pega todos os elemtnos que tem a classe required
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //serve para validar a estrutura de um email
const telefoneRegex = /^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/;



form.addEventListener('submit', (event) => {
    event.preventDefault();
    nameValidate();
    validaEmail();
    validaTelefone();
    
});


function confirmarFormulario() {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const tel = document.getElementById('tel').value
    
    if (nome === '' || email === '' || tel === '' || tel.length < 15) {
        swal({
            title: "Preencha o formulario!!",
            icon: "error",
          });
        }else{
        swal({
            title: "Formulario preenchido com sucesso!",
            icon: "success",
        }).then(function () {
            window.location.href = "contato.html";
          });
    }

}

// VALIDAÇÃO DE FORM


function setError(index) { //Coloca o erro quando o formulário não estiver de acordo
    campos[index].style.border = '2px solid #e63636'; // coloca uma borda vermelha em todos os elementos com a classe required 
    spans[index].style.display = 'block'; //desbloqueia o valor none do display no css mostrando assim o span com a mensagem de erro
}

function removeError(index) { // remove o erro validando assim o campo
    campos[index].style.border = ''; //retira a borda vermelha
    spans[index].style.display = 'none'; // retira o span de aviso de erro 
}

function nameValidate() {
    if (campos[0].value.length < 3) {// Pega o valor do input nome e verifica se o tamanho do valor escrito é menor que 3 
        setError(0); //Se sim ele chama a função setError
    } else {
        removeError(0);//Se o tamanho for igual ou maior que 3 ele chama a função removeError
    }
}

function validaEmail() {
    if (!emailRegex.test(campos[1].value)) {//Se o campo do email não estiver de acordo com essa estrutura do regex ele chama a função setError
        setError(1);
    } else {//Quando cumprir com a estrutura do regex ele retira o erro
        removeError(1);
    }
}



function validaTelefone() {
    if(campos[2].value == ""){// Se o campo do telefone estiver vazio ele chama a função setError
        setError(2);
    }else{//Se o mesmo campo não estiver vazio ele chama a função removeError
        removeError(2);

    //Preenchimento automático da estrutura de um telefone (99) 99999-9999
    var valor = campos[2].value;
    console.log(typeof(valor))
    // Remove tudo que não é dígito
    valor = valor.replace(/\D/g, '');
    
    // Aplica a máscara
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    
    // Atualiza o valor do campo
    campos[2].value = valor;
    }  
}
