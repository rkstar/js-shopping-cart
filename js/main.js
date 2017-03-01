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

$productList = $('#products')
$cartDisplay = $('#cart-items')

$(function(){
  products.map(function(product){
    var html = productHtml
    html = html
      .replace(/{{name}}/, product.name)
      .replace(/{{description}}/g, product.description)
      .replace(/{{image}}/, product.getImage())
      .replace(/{{price}}/, product.getPrice())
      .replace(/{{sku}}/, product.sku)

    var $li = $('<li>')
    $li.html(html).addClass('product')
    $productList.append($li)
  })

  $('a.btn').on('click', addToCart)
})


// get our list of buttons on the page
// and then iterate over them to add event listeners to the buttons

// OLD WAY....
// var btnArray = document.getElementsByClassName('btn')
// var numberOfButtons = $btnArray.length
// for( var i=0; i<numberOfButtons; i++ ){
//   var btn = btnArray.item(i)
//   btn.addEventListener('click', addToCart)
// }
//
// NEW WAY!!
// ......
// NOTE!!!!!
// ....... you MUST put this code into the $(function(){}) block
// above or else the '.btn' objects may not be available when this
// code is run.  ** <-- common problem.
// $('a.btn').on('click', addToCart)


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
  $cartDisplay.html(totalItems)

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
    totalItems += item.quantity
  })

  return totalItems
}

function calculateCartTotal(){
  var subtotal = 0
  var productList = getProductsFromCart()
  productList.map(function(item){
    subtotal += item.price * item.quantity
  })

  var tax = subtotal * taxPercentage
  var total = subtotal + tax

  return {
    subtotal: subtotal,
    tax: tax,
    total: total
  }
}