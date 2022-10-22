'use strict'
function AbstractProduct(id, name, description, price, brand, quantity, images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.date = new Date();
    this.reviews = [];
    this.images = images;
}

Object.assign(AbstractProduct.prototype, {
    getOrSetValue(property, value) {
        if (property in this) {
            if (value === undefined) {
                return Object.getOwnPropertyDescriptor(this, property).value;
            } else {
                Object.defineProperty(this, property, { value: value });
            }
        }
    },
    getFullInformation() {
        let str = "";
        for (let prop in this) {
            if (typeof this[prop] !== "function") {
                str += `${prop} - ${this[prop]}\n`;
            }
        }
        return str;
    }
});





function Review(id, author, comment, service, price, value, quality) {
    this.id = id;
    this.author = author;
    this.date = new Date();
    this.comment = comment;
    this.rating = { 'service': service, 'price': price, 'value': value, 'quality': quality };

    this.getId = () => { return this.id };
    this.setId = (id) => { this.id = id };
    this.getAuthor = () => { return this.author };
    this.setAuthor = (author) => { this.author = author };
    this.getComment = () => { return this.comment };
    this.setComment = (comment) => { this.comment = comment };
    this.getRating = () => { return this.rating };
    this.setRating = (rating) => { this.rating = rating }
};
