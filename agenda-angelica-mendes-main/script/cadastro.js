const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastroUsuario(){   

    var name = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var cpf_cnpj = document.getElementById('cpf_cnpj').value;
    var password = document.getElementById('password').value;
    var date = document.getElementById('date').value;

    if(name ==='' || email === '' || cpf_cnpj === '' || password === '' || date === ''){
        alert('Preencha todos os campos');
        return;
    }

    if (cpf_cnpj.length < 11) { 
        alert('CPF incompleto. Por favor, digite os 11 dígitos do CPF.');
        return;
    }

    if (!validarCPF(cpf_cnpj)) { 
        alert('CPF inválido.');
        return;
    }

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = soma % 11;
    var digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
        return false;
    }
    
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    var digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
        return false;
    }
    
    return true;
}

    if (!validarEmail(email)) { 
        alert('E-mail inválido.');
        return;
    }

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

    let resposta = await fetch(url,{
        method:"POST",
        body: JSON.stringify(
            {
                "name":name,
                "email":email,
                "user_type_id":1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": 1,
                "birthday": date
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }        
    });
    
    let respostaApi = await resposta.json();

    if(respostaApi.data.statusCode == 422){
        if(respostaApi.data.errors.cpf_cnpj){
            alert(respostaApi.data.errors.cpf_cnpj[0]);
        }
        if(respostaApi.data.errors.email){
            alert('Este E-mail já possui cadastro.')
            return;
        }
        if(respostaApi.data.errors.password){
            alert('A senha deve conter pelo menos 6 caracteres.')
            return;
        }
        if(respostaApi.data.errors.name){
            alert(respostaApi.data.errors.name[0]);
        }
        if(respostaApi.data.errors.date){
            alert(respostaApi.data.errors.date[0]);
        }
        return;
    }

    alert("Cadastro realizado com sucesso");
    window.location.href = "login.html";
}
