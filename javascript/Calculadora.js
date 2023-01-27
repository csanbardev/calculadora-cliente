export default class Calculadora{
  resultado
  num1 = 0
  num2 = 0
  op = null

  
  setNum1(num){
    this.num1=num
  }
  setNum2(num){
    this.num2=num
  }
  setResultado(num){
    this.resultado=num
  }
  setOp(operador){
    this.op=operador
  }

  getNum1(){
    return this.num1
  }
  getNum2(){
    return this.num2
  }
  getOp(){
    return this.op
  }
  getResultado(){
    return this.resultado
  }

  restar(){
    this.resultado = this.num1-this.num2

    let resultado = this.resultado
    if(resultado.toString().length>4&&!Number.isInteger(this.resultado)){
      this.resultado = this.resultado.toFixed(2)
    }
    
  }

  sumar(){
    this.resultado = this.num1+this.num2

    let resultado = this.resultado
    if(resultado.toString().length>4&&!Number.isInteger(this.resultado)){
      this.resultado = this.resultado.toFixed(2)
    }
    
  }

  multiplicar(){
    this.resultado = this.num1*this.num2

    let resultado = this.resultado
    if(resultado.toString().length>4&&!Number.isInteger(this.resultado)){
      this.resultado = this.resultado.toFixed(2)
    }
  }

  dividir(){
    this.resultado = this.num1/this.num2

    let resultado = this.resultado
    if(resultado.toString().length>4&&!Number.isInteger(this.resultado)){
      this.resultado = this.resultado.toFixed(2)
    }
  }

 

  limpiar(){
    this.num1 = 0
    this.num2 = 0
    this.resultado = ""
    this.op = null
  }
}

