function Summ(){return this.price * this.amount}
function Kcall(){return this.kcall * this.amount}
const products = {
  plainBurger:{
    name: 'Гамбургер простой',
    price: 10000,
    kcall: 500,
    amount: 0,
    Summ: Summ,
    Kcall: Kcall,
  },
  freshBurger:{
    name: 'Гамбургер FRESH',
    price: 20500,
    kcall: 700,
    amount: 0,
    Summ: Summ,
    Kcall: Kcall,
  },
  freshCombo:{
    name: 'FRESH COMBO',
    price: 31900,
    kcall: 1300,
    amount: 0,
    Summ: Summ,
    Kcall: Kcall,
  },
}
const extraProducts = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    price: 400,
    kcall: 200
  },
  lettuce: {
    name: 'Салатный лист',
    price: 500,
    kcall: 40
  },
  cheese: {
    name: 'Сыр',
    price: 700,
    kcall: 130
  },
}

const mainProducts = document.querySelectorAll('.main__product')

mainProducts.forEach(function(card, key){
  const cardBtns = card.querySelectorAll('.main__product-btn')
  const cardId = card.getAttribute('id')
  const mainOutput = card.querySelector('.main__product-num')
  const mainPrice = card.querySelector('.main__product-price span')
  const mainKcall = card.querySelector('.main__product-kcall span')
  const cardCheckbox = card.querySelectorAll('.main__product-checkbox');
  
  cardBtns.forEach(function(btn, btnKey){
    btn.addEventListener('click', function(){
      const dataSymbol = btn.getAttribute('data-symbol')
      
      if(dataSymbol == "+" && products[cardId].amount < 30){
        products[cardId].amount++
      }else if(dataSymbol == '-' && products[cardId].amount > 0){
        products[cardId].amount--
      }
      mainOutput.innerHTML = products[cardId].amount;
      mainPrice.innerHTML = products[cardId].Summ()
      mainKcall.innerHTML = products[cardId].Kcall()
    })
  })

  cardCheckbox.forEach(function(check, key){
    check.addEventListener('click', function(){
      const dataExtra = check.getAttribute('data-extra')
      products[cardId][dataExtra] = check.checked
      
      if(products[cardId][dataExtra] == true){
        products[cardId].price += extraProducts[dataExtra].price
        products[cardId].kcall += extraProducts[dataExtra].kcall
      }else{
        products[cardId].price -= extraProducts[dataExtra].price
        products[cardId].kcall -= extraProducts[dataExtra].kcall
      }
      mainPrice.innerHTML = products[cardId].Summ()
      mainKcall.innerHTML = products[cardId].Kcall()
    })
  })
   
  
  
}) 

const photo1 = document.querySelector('.a')
const photo2 = document.querySelector('.b')
const photo3 = document.querySelector('.c')

const view = document.querySelector('.view')
let viewF = document.querySelector('.view img') 

  photo1.addEventListener('dblclick', function(){
    view.classList.add('active') 
    viewF.setAttribute('src','images/product2.jpg')
   })
   photo2.addEventListener('dblclick', function(){
    view.classList.add('active') 
    viewF.setAttribute('src','images/product1.jpg')
   })
   photo3.addEventListener('dblclick', function(){
    view.classList.add('active') 
    viewF.setAttribute('src','images/product3.jpg')
   })
  
  
  var close = document.querySelector('.close')
  close.addEventListener('click', function(){
    view.classList.remove('active')
  })



const addCart = document.querySelector('.addCart')
const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptOut = document.querySelector('.receipt__window-out')
const receiptBtnClose = document.querySelector('.receipt__window-btn')

let arrProducts = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0

addCart.addEventListener('click', function(){
  for(const key in products){
    const pObj = products[key]
    if(pObj.amount > 0){
      arrProducts.push(pObj)
      pObj.name += `: ${pObj.amount}`
      for(const info in pObj){
        if(pObj[info] === true){
          pObj.name += `\n ${extraProducts[info].name}`
        }
      }
      pObj.name += `\n Стоимость: ${pObj.Summ()} \n Калорий: ${pObj.Kcall()}`
    }
  }
  for(let i = 0; i < arrProducts.length; i++){
    totalName += `\n ${arrProducts[i].name} \n`
    totalPrice += arrProducts[i].Summ()
    totalKcall += arrProducts[i].Kcall()
  }
  receiptOut.innerHTML = `Ваш заказ:${totalName}\n Каллориность: ${totalKcall} \n Общая стоимость: ${totalPrice}`
  
  
  receipt.style.display = 'flex'
  setTimeout(function(){
    receipt.style.opacity = '1'
  }, 100)
  setTimeout(function(){
    receiptWindow.style.top = '10%'
  }, 300)
})
receiptBtnClose.addEventListener('click', function(){
  window.location.reload()
})


function lvl(){
  let level = document.querySelector('.header__timer-extra')
  
      setInterval(function(){
          if(level.innerHTML < 50){
              level.innerHTML++
          }
      }, 10)
      
      setInterval(function(){
          if(level.innerHTML < 100){
              level.innerHTML++
          }
      }, 100)
}lvl()