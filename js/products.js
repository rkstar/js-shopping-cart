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
