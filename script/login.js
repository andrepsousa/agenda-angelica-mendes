const url = "https://go-wash-api.onrender.com/api/login"
async function login(){

    let email = document.getElementById('email').value;
    let password = document.getElementById('senha').value;

    let response = await fetch(url, {
        method:"POST",
        body:JSON.stringify({
            "email": email,
            "password":password,
            "user_type_id":1

        }),
        headers:{
            'Content-Type': 'application/json',
        }
    });

    let responseApi = await response.json();

    localStorage.setItem('user', JSON.stringify(responseApi))
    
    window.location.href="home.html"
}