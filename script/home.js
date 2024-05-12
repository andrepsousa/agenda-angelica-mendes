let url = "https://api-go-wash-efc9c9582687.herokuapp.com/api/auth/address"
async function endereço(){

    let token = JSON.parse(localStorage.getItem('user')).access_token

   
    let responseApi = await fetch(url, {
        method: "GET",
        headers:{
            "Authorization": "Bearer "+token
        }
    })
    
    let response = await responseApi.json();
    console.log(response)

}

endereço();