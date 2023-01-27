import  Calculadora  from "./Calculadora.js"
// variables de control
let decimales = false
let igual = false

// constantes con los botones e input
const bt1 = document.querySelector("#bt-1")
const bt2 = document.querySelector("#bt-2")
const bt3 = document.querySelector("#bt-3")
const bt4 = document.querySelector("#bt-4")
const bt5 = document.querySelector("#bt-5")
const bt6 = document.querySelector("#bt-6")
const bt7 = document.querySelector("#bt-7")
const bt8 = document.querySelector("#bt-8")
const bt9 = document.querySelector("#bt-9")
const bt0 = document.querySelector("#bt-0")

const btMulti = document.querySelector("#bt-multiplicar")
const btDiv = document.querySelector("#bt-dividir")
const btRestar = document.querySelector("#bt-restar")
const btSumar = document.querySelector("#bt-sumar")
const btIgual = document.querySelector("#bt-igual")

const btNegativo = document.querySelector("#bt-negativo")
const btLimpiar = document.querySelector("#bt-limpiar")
const btPunto = document.querySelector("#bt-punto")

const txtResultado = document.querySelector("#txtresultado")

// Objeto calculadora
const calculadora = new Calculadora()

// funciones

/**
 * Pinta en el input lo que se le pase
 * 
 * @param {string} cadena 
 */
function pintar(cadena) {
  txtResultado.value = cadena  
}

/**
 * Función lógica para mostrar y asignar números
 * @param {string} num 
 */
function logicaNumeral(num){

  // si ha pedido decimales, pinta el punto donde corresponda
  if(num==="."){
    pintar(txtResultado.value+".")
  }
  // entra si el primer número empieza en 0 y trabajamos con decimales
  else if(calculadora.getOp()===null&&calculadora.getNum1()===0&&decimales){
    let numero = parseFloat("0."+num)
    pintar(numero)
    calculadora.setNum1(parseFloat(numero))
    decimales=false
  }
  
  // entra si ha indicado para usar decimales con el primer número
  else if(calculadora.getOp()===null&&calculadora.getNum1()!==0&&decimales){
    let numero = calculadora.getNum1()+parseFloat("0."+num)
    pintar(numero)
    calculadora.setNum1(parseFloat(numero))
    decimales=false
  }
  // entra si ha empezado a entrar decimales en el primer número
  else if(calculadora.getOp()===null&&calculadora.getNum1()!==0&&!Number.isInteger(calculadora.getNum1())){
    let numero = calculadora.getNum1()+num
    pintar(calculadora.getNum1()+num)
    calculadora.setNum1(parseFloat(numero))
  }
  // entra si el segundo número empieza en 0 y trabajamos con decimales
  else if(calculadora.getOp()!==null&&calculadora.getNum2()===0&&decimales){
    let numero = parseFloat("0."+num)
    pintar(numero)
    calculadora.setNum2(parseFloat(numero))
    decimales=false
  }
  // entra si ha indicado para usar decimales con el segundo número
  else if(calculadora.getOp()!==null&&calculadora.getNum2()!==0&&decimales){
    let numero = calculadora.getNum2()+parseFloat("0."+num)
    pintar(numero)
    calculadora.setNum2(parseFloat(numero))
    decimales=false
  }
  // entra si ha empezado a entrar decimales en el segundo número
  else if(calculadora.getOp()!==null&&calculadora.getNum2()!==0&&!Number.isInteger(calculadora.getNum2())){
    let numero = calculadora.getNum2()+num
    pintar(calculadora.getNum2()+num)
    calculadora.setNum2(parseFloat(numero))
  }
  // si todavía no ha usado un operador y ya hay primer número, pasará a encadenarle
  else if(calculadora.getOp()===null&&calculadora.getNum1()!==0){
    let numero = calculadora.getNum1()+num
    pintar(calculadora.getNum1()+num)
    calculadora.setNum1(parseInt(numero))
  }
  // si no se ha usado un operador, trabajará con el primer número por vez primera
  else if(calculadora.getOp()===null){
    pintar(num)
    calculadora.setNum1(parseInt(num))
  }
  // si se ha usado operador y el segundo número tiene valores, le encadenará dígitos
  else if(calculadora.getOp()!==null&&calculadora.getNum2()!==0){
    let numero = calculadora.getNum2()+num
    pintar(calculadora.getNum2()+num)
    calculadora.setNum2(parseInt(numero))
  }
  // si se ha usado operador y el segundo número no tiene valores, lo inicializará
  else if(calculadora.getOp()!==null&&calculadora.getNum2()===0){
    pintar(num)
    calculadora.setNum2(parseInt(num))
  }
}

/**
 * Hace la operación según el operador que haya y pinta el resultado
 */
function hacerOperacion(){
  if(calculadora.getOp()!==null&&calculadora.getNum1()!==null&&calculadora.getNum2()!==null){
    switch(calculadora.getOp()){
      case "sumar":
        calculadora.sumar()
        break;
      case "restar":
        calculadora.restar()
        break
      case "multiplicar":
        calculadora.multiplicar()
        break
      case "dividir":
        calculadora.dividir()
        break      
    }

    pintar(calculadora.getResultado())
  }
}


/**
 * Hace determinadas accciones dependiendo del estado de los operadores y cuál sea
 * @param {string} tipo 
 */
function logicaOperadores(tipo){
  // asigna por primera vez un operador
  if(calculadora.getOp()===null){
    calculadora.setOp(tipo)
  }
  // se ha pulsado ya el botón de igual, así que no vuelve a calcular el resultado
  else if(igual){
    calculadora.setOp(tipo)
    calculadora.setNum1(calculadora.getResultado())
    calculadora.setNum2(0)
    igual = false
  }
  // no se ha pulsado el botón de igual, así que calcula el resultado para trabajar a partir de él
  else{
    hacerOperacion()
    calculadora.setOp(tipo)
    calculadora.setNum1(calculadora.getResultado())
    calculadora.setNum2(0)
  }
}

// eventos de los botones numerales
bt1.addEventListener('click', ()=>logicaNumeral("1"))
bt2.addEventListener('click', ()=>logicaNumeral("2"))
bt3.addEventListener('click', ()=>logicaNumeral("3"))
bt4.addEventListener('click', ()=>logicaNumeral("4"))
bt5.addEventListener('click', ()=>logicaNumeral("5"))
bt6.addEventListener('click', ()=>logicaNumeral("6"))
bt7.addEventListener('click', ()=>logicaNumeral("7"))
bt8.addEventListener('click', ()=>logicaNumeral("8"))
bt9.addEventListener('click', ()=>logicaNumeral("9"))
bt0.addEventListener('click', ()=>logicaNumeral("0"))


btPunto.addEventListener('click', ()=>{logicaNumeral("."); decimales=true;})

// eventos de los botones operadores
btSumar.addEventListener('click',()=>{pintar("+");logicaOperadores("sumar")})
btRestar.addEventListener('click',()=>{pintar("-");logicaOperadores("restar")})
btMulti.addEventListener('click',()=>{pintar("*");logicaOperadores("multiplicar")})
btDiv.addEventListener('click',()=>{pintar("/");logicaOperadores("dividir")})
btIgual.addEventListener('click', ()=>{hacerOperacion(); igual=true})


// eventos de teclas especiales
btLimpiar.addEventListener('click', ()=>{
  calculadora.limpiar()
  pintar("")
  igual = false
  decimales = false
})

btNegativo.addEventListener('click', ()=>{
  let exp = new RegExp('\\d\\.\\d{1,}')
  let num = 0
  if(exp.test(txtResultado.value)){
    num = parseFloat(txtResultado.value)
  }else{
    num = parseInt(txtResultado.value)
  }

  if(num===calculadora.getNum1()&&calculadora.getOp()===null){
    calculadora.setNum1(num*-1)
  }else 
  if(num===calculadora.getNum2()&&calculadora.getOp()!==null){
    calculadora.setNum2(num*-1)
  }else
  if(num===calculadora.getResultado()&&calculadora.getOp()!==null){
    calculadora.setResultado(num*-1)
  }
  
  pintar(num*-1)
  
})

