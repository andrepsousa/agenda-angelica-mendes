const url = "https://go-wash-api.onrender.com/api/login";

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('senha').value;

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
            "user_type_id": 1
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 401) { 
        alert("Credenciais inválidas. Por favor, verifique seu e-mail e senha.");
        return;
    }

    if (response.status === 404) {
        alert("Usuário não encontrado. Por favor, verifique seu e-mail.");
        return;
    }

    if (response.status === 422) {
        let responseData = await response.json();
        alert(responseData.message);
        return;
    }

    if (response.ok) { 
        let responseApi = await response.json();
        localStorage.setItem('user', JSON.stringify(responseApi));
        console.log(responseApi);
        alert("Login Realizado")
        window.location.href = "home.html";
    }
}
