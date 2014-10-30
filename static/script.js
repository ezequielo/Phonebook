
function noVacio(campo){
    if(campo.value.length==0){
        return false;

    }else{
        return true;
    }
}


function validar_string(campo){
    var exp=/^[a-zA-Z.\-áéíóúÁÉÍÓÚñÑ]+$/;
    if(!noVacio(campo)){
        return false;
    }
    if(!exp.test(campo.value)){
        var img=document.getElementById("status"+campo.name);
        img.setAttribute("src", "static/images/wrong.png");
        return false;
    }else{
        var img=document.getElementById("status"+campo.name);
        img.setAttribute("src", "static/images/ok.png");
        campo.setAttribute("class", "status");
        return true;
    }
}

function validar_email(campo){
    var exp=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!noVacio(campo)){
        return false;
    }
    if(!exp.test(campo.value)){
        var img=document.getElementById("status"+campo.name);
        img.setAttribute("src", "static/images/wrong.png");
        return false;
    }else{
        var img=document.getElementById("status"+campo.name);
        img.setAttribute("src", "static/images/ok.png");
        campo.setAttribute("class", "status");
        return true;
    }
}

function validar_tlf(campo){
    var exp=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if(!noVacio(campo)){
        return false;
    }
    if(!exp.test(campo.value)){
        var img=document.getElementById("status"+campo.name);
        img.setAttribute("src", "static/images/wrong.png");
        return false;
    }else{
        var img=document.getElementById("status"+campo.name);
        img.setAttribute("src", "static/images/ok.png");
        campo.setAttribute("class", "status");
        return true;
    }
}

function comprobar(){
    var cont=0;

    var name=document.getElementById("contact_name");
    if(validar_string(name)){
        sal=true;
    }else{
        name.setAttribute("class", "error");
        cont++;
    }

    var surname=document.getElementById("contact_lastname");
    if(validar_string(surname)){
        sal=true;
    }else{
        surname.setAttribute("class", "error");
        cont++;
    }

    var email=document.getElementById("contact_email");
    if(validar_email(email)){
        sal=true;
    }else{
        email.setAttribute("class", "error");
        cont++;
    }

    var phone=document.getElementById("contact_phone");
    if(validar_tlf(phone)){
        sal=true;
    }else{
        phone.setAttribute("class", "error");
        cont++;
    }

    if(cont==0){
        return true;
    }else{
        return false;
    }
}