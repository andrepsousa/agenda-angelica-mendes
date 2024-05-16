async function salvarEndereco() {
    const url= "https://go-wash-api.onrender.com/api/auth/address";

    let titulo = document.getElementById("titulo").value;
    let cep = document.getElementById("cep").value;
    let endereco = document.getElementById("endereco").value;
    let numero = document.getElementById("numero").value;

    let user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;

    let apiEndereco = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title": titulo,
            "cep": cep,
            "address": endereco,
            "number": numero,
        }),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+token
        }
    });

    if (apiEndereco.status === 500) { 
        alert("Endereço Inválido.");
        return;
    }

     if (apiEndereco.status === 422) { 
        alert("Preencha todos os campos.");
        return;
    }

    let response = await apiEndereco.json();
    if (apiEndereco.ok) {
        exibirEnderecosSalvos(); 
        window.location.href = "home.html";
    } else {
        console.error("Erro ao salvar o endereço:", response);
    }
}

async function exibirEnderecosSalvos() {
    const url = "https://go-wash-api.onrender.com/api/auth/address";
    
    let user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;

    let apiEnderecos = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    let response = await apiEnderecos.json();
    if (apiEnderecos.ok) {
        let listaEnderecos = document.getElementById("lista-enderecos");
        listaEnderecos.innerHTML = "";
        response.data.forEach(endereco => {
            let enderecoItem = document.createElement("p");
            enderecoItem.textContent = `${endereco.title}: ${endereco.address}, ${endereco.number}, CEP: ${endereco.cep}`;
            listaEnderecos.appendChild(enderecoItem);
        });

}}
