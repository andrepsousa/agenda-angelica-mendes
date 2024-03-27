const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

async function cadastroUsuario(){   

    var name = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var cpf_cnpj = document.getElementById('cpf_cnpj').value;
    var password = document.getElementById('password').value;
    var date = document.getElementById('date').value;
    if(name =='' || email == '' || cpf_cnpj == '' || password == '' || date == ''){
        alert('Preencha todos os campos');
        return
    }

    if (cpf_cnpj.length !== 14) { 
        alert('CPF incompleto. Por favor, digite os 11 dígitos do CPF.');
        return;
    }

    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
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
            return
        }
        if(respostaApi.data.errors.password){
            alert('A senha deve conter pelo menos 6 caracteres.')
            return
        }
        if(respostaApi.data.errors.name){
            alert(respostaApi.data.errors.name[0])
        }
        if(respostaApi.data.errors.date){
            alert(respostaApi.data.errors.date[0])
        }
        alert("Cadastro realizado com sucesso");
         window.location.href = "login.html";
}
}
