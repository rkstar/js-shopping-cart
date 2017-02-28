var products = [{
  sku: 'ssct-1',
  name: "Swarovski Studded Crop Top",
  description: "Swarovski-studded crop top.  Perfect for a night out on the town.",
  price: 72,
  image: "swarovski-studded-top.jpg",
  getImage: function(){
    return "img/"+this.image
  },
  getPrice: function(){
    return "$"+parseFloat(this.price).toFixed(2)
  }
},{
  sku: 'cs-74',
  name: "Converse sneakers",
  description: "Classic!",
  price: 50,
  image: "converse.jpg",
  getImage: function(){
    return "img/"+this.image
  },
  getPrice: function(){
    return "$"+parseFloat(this.price).toFixed(2)
  }
},{
  sku: 'rlx-2k17',
  name: "Really Nice Watch",
  description: "This watch is awesome!  It does lots of things, including telling the time!",
  price: 3000,
  image: "rolex-watch.jpg",
  getImage: function(){
    return "img/"+this.image
  },
  getPrice: function(){
    return "$"+parseFloat(this.price).toFixed(2)
  }
}]

var taxPercentage = .13
var cart = {
  products: {},
  subtotal: 0,
  tax: 0,
  total: 0,
  getSubtotal: function(){
    return "$"+parseFloat(this.subtotal).toFixed(2)
  },
  getTax: function(){
    return "$"+parseFloat(this.tax).toFixed(2)
  },
  getTotal: function(){
    return "$"+parseFloat(this.total).toFixed(2)
  }
}

var productList = document.getElementById('products')
var cartDisplay = document.getElementById('cart-items')

function buildCart(products){
  products.map(function(product){
    var html = productHtml
    html = html
      .replace(/{{name}}/, product.name)
      .replace(/{{description}}/g, product.description)
      .replace(/{{image}}/, product.getImage())
      .replace(/{{price}}/, product.getPrice())
      .replace(/{{sku}}/, product.sku)

    var li = document.createElement('li')
    li.className = 'product'
    li.innerHTML = html
    productList.appendChild(li)
  })
}
buildCart(products)


// get our list of buttons on the page
// and then iterate over them to add event listeners to the buttons
var btnArray = document.getElementsByClassName('btn')
var numberOfButtons = btnArray.length
for( var i=0; i<numberOfButtons; i++ ){
  var btn = btnArray.item(i)
  btn.addEventListener('click', addToCart)
}


function addToCart(e){
  e.preventDefault()
  var href = e.target.href
  var parts = href.split('/')
  var sku = parts.pop()  // ** modifies the "parts" array...

  // check to see if this item is already in our cart...
  if( cart.products[sku] ){
    cart.products[sku].quantity++
  } else {
    var product = products.filter(function(item){
      return item.sku === sku
    }).shift()
    product.quantity = 1
    cart.products[sku] = product
  }

  var totalItems = updateCartDisplay()
  cartDisplay.innerHTML = totalItems

  var money = calculateCartTotal()
  cart.subtotal = money.subtotal
  cart.tax = money.tax
  cart.total = money.total
}

function getProductsFromCart(){
  var cartProductsArray = []
  var sku
  for( sku in cart.products ){
    cartProductsArray.push(cart.products[sku])
  }

  return cartProductsArray
}

function updateCartDisplay(){
  var productList = getProductsFromCart()
  var totalItems = 0
  productList.map(function(item){
    console.log('item:', item)
    totalItems += item.quantity
  })

  console.log('total:', totalItems)

  return totalItems
}

function calculateCartTotal(){
  var subtotal = 0
  var productList = getProductsFromCart()
  productList.map(function(item){
    subtotal += item.price
  })

  var tax = subtotal * taxPercentage
  var total = subtotal + tax

  return {
    subtotal: subtotal,
    tax: tax,
    total: total
  }
}