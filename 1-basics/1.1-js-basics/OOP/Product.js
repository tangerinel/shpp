/* eslint-disable object-shorthand */
'use strict'
function AbstractProduct ({ id, name, description, price, brand, quantity, images }) {
  if (this.constructor === AbstractProduct) {
    throw new Error('FYI: Instance of Abstract class cannot be instantiated')
  }
  this.id = id
  this.name = name
  this.description = description
  this.price = price
  this.brand = brand
  this.quantity = quantity
  this.date = new Date()
  this.reviews = []
  this.images = images
}

Object.assign(AbstractProduct.prototype, {
  getId () {
    return this.id
  },
  getName () {
    return this.name
  },
  getPrice () {
    return this.price
  },
  getDescription () {
    return this.description
  },
  getOrSetValue (property, value) {
    if (property in this) {
      if (value === undefined) {
        return Object.getOwnPropertyDescriptor(this, property).value
      } else {
        Object.defineProperty(this, property, { value: value })
      }
    }
  },
  getFullInformation () {
    let str = ''
    for (const prop in this) {
      if (typeof this[prop] !== 'function') {
        str += `${prop} - ${this[prop]}\n`
      }
    }
    return str
  },

  getPriceForQuantity (numOfproducts) {
    const price = this.getOrSetValue('price')
    return `$${price * numOfproducts}`
  },

  addReview (id, author, comment, service, price, value, quality) {
    const review = new Review(id, author, comment, service, price, value, quality)
    this.reviews.push(review)
  },
  getReviewById (id) {
    for (const review of this.reviews) {
      if (review.id === id) return review
    }
  },
  getImage (index) {
    if (index == undefined && this.images.length > 0) return this.images[0]
    if (index >= 0 && index <= this.images.length) return this.images[index]
  },
  deleteReview (id) {
    const index = this.reviews.indexOf(this.reviews.find(item => item.id === id))
    if (index !== -1) this.reviews.splice(index, 1)
  },
  getAverageRating () {
    let counter = 0
    for (const review of this.reviews) {
      const rating = review.rating
      counter += rating.value + rating.service + rating.price + rating.quality
    };
    const average = counter / (4 * this.reviews.length)
    return average
  }

})

function Clothes (id, name, description, price, brand, quantity, images, material, color) {
  AbstractProduct.call(this, { id, name, description, price, brand, quantity, images })
  this.material = material
  this.color = color
}

Clothes.prototype = Object.create(AbstractProduct.prototype)
Clothes.prototype.constructor = Clothes

Object.assign(Clothes.prototype, {
  getMaterial () {
    return this.material
  },
  setMaterial (material) {
    this.material = material
  },
  getColor () {
    return this.color
  },
  setColor (color) {
    this.color = color
  }
}
)

function Electronics (id, name, description, price, brand, quantity, images, warranty, power) {
  AbstractProduct.call(this, { id, name, description, price, brand, quantity, images })
  this.warranty = warranty
  this.power = power
}

Electronics.prototype = Object.create(AbstractProduct.prototype)
Electronics.prototype.constructor = Electronics

Object.assign(Electronics.prototype, {
  getWarranty () {
    return this.warranty
  },
  setWarranty (warranty) {
    this.warranty = warranty
  },
  getPower () {
    return this.power
  },
  setPower (power) {
    this.power = power
  }
}
)

function sortProducts (products, sortRule) {
  switch (sortRule) {
    case 'price':
      products.sort((a, b) => (a.getPrice() > b.getPrice()) ? 1 : -1)
      break
    case 'id':
      products.sort((a, b) => (a.getId() > b.getId()) ? 1 : -1)
      break
    case 'name':
      products.sort((a, b) => (a.getName() > b.getName()) ? 1 : -1)
      break
  }
  return products
}

function searchProducts (products, search) {
  const result = []
  const isSearchExtended = (search.indexOf('*') != -1)
  if (isSearchExtended) search = search.slice(0, search.length - 1)
  for (const product of products) {
    if (product.getName().indexOf(search) != -1 || product.getDescription().indexOf(search) != -1) {
      if (isSearchExtended) {
        result.push(product)
      } else {
        for (const word of product.getName().split(' ')) {
          if (word == search) result.push(product)
        }
        for (const word of product.getDescription().split(' ')) {
          if (word == search && !result.includes(product)) result.push(product)
        }
      }
    }
  }
  return result
};

function Review (id, author, comment, service, price, value, quality) {
  this.id = id
  this.author = author
  this.date = new Date()
  this.comment = comment
  // eslint-disable-next-line quote-props
  this.rating = { 'service': service, 'price': price, 'value': value, 'quality': quality }

  this.getId = () => { return this.id }
  this.setId = (id) => { this.id = id }
  this.getAuthor = () => { return this.author }
  this.setAuthor = (author) => { this.author = author }
  this.getComment = () => { return this.comment }
  this.setComment = (comment) => { this.comment = comment }
  this.getRating = () => { return this.rating }
  this.setRating = (rating) => { this.rating = rating }
};

// let c = new Clothes('1','abstr','lalaal',100,'heh',10,['q','s'], 'cotton','green')
// let c1 = new Clothes ('2', 'clot','good',10,'nen',2,['a'],'cott','white')
//  let c2 = new Clothes ('2', 'clot','good',10,'nen',2,['a'],'cott','white')
