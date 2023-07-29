let cart = []
let list = document.getElementById("cart-list")
let productList = document.getElementById("product-list")

function fetchData(){
  fetch('/api/v1/products')
  .then(res => res.json())
  .then(res => {
    renderShoesList(res)
  })
}

function renderShoesList(data) {
    productList.innerHTML = ""
    for(const shoe of data.shoes){
        let container = document.createElement("div")
        let shoeImageContainer = document.createElement("div")
        let shoeImage = document.createElement("img")
        let shoeName = document.createElement("h3")
        let description = document.createElement("p")
        let buttonContainer = document.createElement("div")
        let button = document.createElement("button")
        let price = document.createElement("h4")
        let addToCartExistedImg = document.createElement("img")
        addToCartExistedImg.src = "/assets/check.png"
        
        shoeImageContainer.classList.add("shoe-image-container")
        shoeImageContainer.style.backgroundColor = shoe.color

        shoeImage.src = shoe.image
        shoeImage.classList.add("shoe-image")

        shoeImageContainer.appendChild(shoeImage)

        shoeName.innerText = shoe.name
        description.innerText = shoe.description

        buttonContainer.classList.add("button-container")
        price.innerText = "$" + shoe.price

        if(cart.some(i => i.shoe.id == shoe.id)){
          button.appendChild(addToCartExistedImg)
          button.classList.add("add-to-cart-existed-button")
        }
        else{
          button.classList.add("add-to-cart-button")
          button.innerText = "ADD TO CART"
        }

        button.addEventListener("click", (e) => {
            if(!cart.some(i => i.shoe.id == shoe.id)){
              cart.push({
                "shoe": shoe,
                "quantity": 1
              });

              button.classList.add("add-to-cart-button-fade-out")
              renderCart(cart.length > 0 ? cart[cart.length - 1] : null)
              setTimeout(() => fetchData(),500)
              calculateTotal()
            }
        })
        
        buttonContainer.appendChild(price)
        buttonContainer.appendChild(button)

        container.appendChild(shoeImageContainer)
        container.appendChild(shoeName)
        container.appendChild(description)
        container.appendChild(buttonContainer)

        container.classList.add("shoe-container")
        productList.appendChild(container);
    }   
}

function checkEmpty() {
  if(cart.length == 0){
    let message = document.createElement("p")
    message.id = "empty message"
    message.innerText = "Your cart is empty"
    list.appendChild(message)
    return
  }
  else {
    if(document.getElementById("empty message")){
      document.getElementById("empty message").remove()
    }
  }
}

function renderCart(item){
  if(!item) return
  checkEmpty()
        let id = "shoe-" + item.shoe.id
        let counterId = "shoe-counter-" + item.shoe.id
        let container = document.createElement("div")
        container.classList.add("cart-container")
        let shoeContainer = document.createElement("div")
        let shoeImage = document.createElement("img")
        let shoeInfoContainer = document.createElement("div")
        let shoeName = document.createElement("h5")
        let shoePrice = document.createElement("h3")
        let shoeBtnContainer = document.createElement("div")
        let shoeIncreamentContainer = document.createElement("div")
        let shoeIncreaseBtn = document.createElement("button")
        let shoeDecreaseBtn = document.createElement("button")
        let shoeRemoveBtn = document.createElement("button")
        let shoeIncreaseBtnImage = document.createElement("img")
        let shoeDecreaseBtnImage = document.createElement("img")
        let shoeRemoveBtnImage = document.createElement("img")
        let quantity = document.createElement("span")

        quantity.id = counterId

        container.id = id

        shoeIncreaseBtnImage.src = "/assets/plus.png"
        shoeDecreaseBtnImage.src = "/assets/minus.png"
        shoeRemoveBtnImage.src = "/assets/trash.png"

        shoeIncreaseBtn.appendChild(shoeIncreaseBtnImage)
        shoeDecreaseBtn.appendChild(shoeDecreaseBtnImage)
        shoeRemoveBtn.appendChild(shoeRemoveBtnImage)

        shoeDecreaseBtn.addEventListener("click", (e) => {
          if(item.quantity == 1){
            cart = cart.filter((i) => i.shoe.id != item.shoe.id)
            document.getElementById(id).classList.add("cart-item-fade-out")
            setTimeout(() => {
              document.getElementById(id).remove()
              checkEmpty()
            }, 500)
            fetchData()
            
          }
          else {
            item.quantity -= 1
            document.getElementById(counterId).innerText = item.quantity
          }
          calculateTotal()
        })

        shoeIncreaseBtn.addEventListener("click", (e) => {
          item.quantity += 1
          document.getElementById(counterId).innerText = item.quantity
          calculateTotal()
        })

        shoeRemoveBtn.addEventListener("click", (e) => {
          cart = cart.filter((i) => i.shoe.id != item.shoe.id)
          fetchData()
          document.getElementById(id).classList.add("cart-item-fade-out")
          setTimeout(() => {
            document.getElementById(id).remove()
            checkEmpty()
          }, 500)
          
          calculateTotal()
        })

        shoeName.innerText = item.shoe.name
        shoePrice.innerText = "$" + item.shoe.price
        quantity.innerText = item.quantity

        shoeRemoveBtn.classList.add("shoe-remove-btn")

        shoeIncreamentContainer.appendChild(shoeDecreaseBtn)
        shoeIncreamentContainer.appendChild(quantity)
        shoeIncreamentContainer.appendChild(shoeIncreaseBtn)

        shoeIncreamentContainer.classList.add("shoe-increament-container")

        shoeBtnContainer.appendChild(shoeIncreamentContainer)
        shoeBtnContainer.appendChild(shoeRemoveBtn)
        
        shoeInfoContainer.style.width = "100%"
        shoeInfoContainer.appendChild(shoeName)
        shoeInfoContainer.appendChild(shoePrice)
        shoeInfoContainer.appendChild(shoeBtnContainer)

        shoeBtnContainer.classList.add("shoe-btn-container")

        shoeImage.src = item.shoe.image
        shoeImage.classList.add("cart-shoe-image")

        shoeContainer.classList.add("cart-shoe-container")
        shoeContainer.style.backgroundColor = item.shoe.color

        shoeContainer.appendChild(shoeImage)
        container.appendChild(shoeContainer)
        container.appendChild(shoeInfoContainer)

        list.appendChild(container)
}

function calculateTotal() {
  let total = document.getElementById("total")
  let sumPrice = cart.reduce((prev, curr) => prev + (curr.shoe.price * curr.quantity), 0)
  total.innerText = "$" + sumPrice.toFixed(2)
}

fetchData()
checkEmpty()
