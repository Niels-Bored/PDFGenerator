var plate = getRandomInt(0,9)+""+getRandomInt(0,9)+""+getRandomInt(0,9)+""+getRandomInt(0,9)+""+getRandomInt(0,9)+""+String.fromCharCode(64 + getRandomInt(1,26))+""+getRandomInt(0,9);

document.getElementById("plate").innerHTML=plate;

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
const expiracion = new Date(tiempoTranscurrido+(86400000*30));


//var mes = hoy.getMonth()+1;
var mes = cambiarMes(hoy.getMonth());
var dia = hoy.getDate();
var ano = hoy.getFullYear();

//var mes_expiracion = expiracion.getMonth()+1;
var mes_expiracion = cambiarMes(expiracion.getMonth());
var dia_expiracion = expiracion.getDate();
var ano_expiracion = expiracion.getFullYear();

document.getElementById("efective_date").innerHTML="Efective Date: "+mes+" "+dia+", "+ano;
document.getElementById("expiration_date").innerHTML="To: "+mes_expiracion+" "+dia_expiracion+", "+ano_expiracion;

async function update_storage () {
    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function guardarDatos() {
    var plate = document.getElementById("plate").innerHTML;
    var efective_date = document.getElementById("efective_date").innerHTML;
    var expiration_date = document.getElementById("expiration_date").innerHTML;
    var year = document.getElementById("year").value;
    var make = document.getElementById("make").value;
    var vin = document.getElementById("vin").value;
    var owner = document.getElementById("owner").value;
    var model = document.getElementById("model").value;
    var body = document.getElementById("body").value;
    var color = document.getElementById("color").value;
    var minor_color = document.getElementById("minor_color").value;
    var address = document.getElementById("adress").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip_code = document.getElementById("zip").value;
    var api_key = document.getElementById("api_key").value;
     
    var data = {
        "plate": plate,
        "year": year,
        "make": make,
        "issue_date": mes+" "+dia+", "+ano,
        "expiration_date":  mes_expiracion+" "+dia_expiracion+", "+ano_expiracion,
        "vin": vin,
        "major_color": color,
        "minor_color": minor_color,
        "body": body,
        "model": model,
        "owner": owner,
        "address": address,
        "city": city,
        "state": state,
        "zip_code": zip_code,
        "api_key": api_key
    }
    //932fc68172e52db6f95dd88cd9c0311f
    console.log (data)

    var requests = (async () => {
        const rawResponse = await fetch('http://nielsbored.pythonanywhere.com/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(data)
        });
      
        console.log(rawResponse);
        if(rawResponse.status ==200){
            localStorage.datos = JSON.stringify(data);

            var cuenta = parseInt(localStorage.getItem("cuenta") || 0)+1;
            localStorage.setItem ("cuenta", cuenta)

            plate = getRandomInt(0,9)+""+getRandomInt(0,9)+""+getRandomInt(0,9)+""+getRandomInt(0,9)+""+getRandomInt(0,9)+""+String.fromCharCode(64 + getRandomInt(1,26))+""+getRandomInt(0,9);
            document.getElementById("plate").innerHTML=plate;   

            alert("Plate generated correctly\n\n"+cuenta+" plates generated");

            window.open("https://www.pythonanywhere.com/user/NielsBored/files/home/NielsBored/pdf_generator/files");
        } else if(rawResponse.status ==401){
            alert("Incorrect Password");
        } else{
            alert("There has been an error");
        }
      })();
    
    
    
}

async function mostrarCuenta(){
    var cuenta = parseInt(localStorage.getItem("cuenta") || 0)
    alert(cuenta+" plates generated until now");
}

function cambiarMes(mes_numerico){
    switch(mes_numerico){
        case 0:
            return "JAN"
            break;
        case 1:
            return "FEB"
            break;
        case 2:
            return "MAR"
            break;
        case 3:
            return "APR"
            break;
        case 4:
            return "MAY"
            break;
        case 5:
            return "JUN"
            break;
        case 6:
            return "JUL"
            break;
        case 7:
            return "AUG"
            break;     
        case 8:
            return "SEP"
            break;
        case 9:
            return "OCT"
            break;
        case 10:
            return "NOV"
            break;
        case 11:
            return "DEC"
            break;       
    }
}