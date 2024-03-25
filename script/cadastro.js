const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

async function cadastroUsuario(){   

    var name = document.getElementById('fullname');
    var email = document.getElementById('email');
    var cpf_cnpj = document.getElementById('cpf_cnpj');
    var password = document.getElementById('password');
    var date = document.getElementById('date');
    if(name.value=='' || email.value == '' || cpf_cnpj.value == '' || password.value == '' || date.value == ''){
        alert('Preencha todos os campos');
        return
    }

    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "name":name.value,
                "email":email.value,
                "user_type_id":1,
                "password": password.value,
                "cpf_cnpj": cpf_cnpj.value,
                "terms": 1,
                "birthday": date.value    
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
            alert('Esse E-mail já possui cadastro.')
            return
        }
        if(respostaApi.data.errors.password){
            alert('A senha deve ter pelo menos 6 caracteres.')
            return
        }
        if(respostaApi.data.errors.name){
            alert(respostaApi.data.errors.name[0])
        }
        if(respostaApi.data.errors.date){
            alert(respostaApi.data.errors.date[0])
        }
        alert("Cadastro feito com sucesso");
         window.location.href = "login.html";
}
}