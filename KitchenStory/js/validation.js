function validate(){
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    if(email === 'kitchenstory@gmail.com' && password === '123@kitchenstory'){
        return true;
    }else{
        return false;
    }
}

function success(msg){
    alert(msg);
}