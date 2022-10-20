function Product(id, name, description, price,
    brand, sizes, activeSize, quantity,
    images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = new Date();
    this.reviews = [];
    this.images = images;

    this.getId = () => { return this.id };
    this.setId = (id) => { this.id = id };
    this.getName = () => { return this.name };
    this.setName = (name) => { this.name = name };
    this.getDescription = () => { return this.description };
    this.setDescription = (description) => { this.description = description };
    this.getPrice = () => { return this.price };
    this.setPrice = (price) => { this.price = price };
    this.getBrand = () => { return this.brand };
    this.setBrand = (brand) => { this.brand = brand };
    this.getSizes = () => { return this.sizes };
    this.setSizes = (sizes) => { this.sizes = sizes };
    this.getActiveSize = () => { return this.activeSize };
    this.setActiveSize = (activeSize) => { this.activeSize = activeSize };
    this.getQuantity = () => { return this.quantity };
    this.setQuantity = (quantity) => { this.quantity = quantity };
    this.getDate = () => { return this.date };
    this.setDate = (date) => { this.date = date };
    this.getReviews = () => { return this.reviews };
    this.setReviews = (reviews) => { this.reviews = reviews };
    this.getImages = () => { return this.images };
    this.setImages = (images) => { this.images = images };

    this.addReview = (id, author, comment, service, price, value, quality) => {
        let review = new Review(id, author, comment, service, price, value, quality);
        this.reviews.push(review);
    };

    this.getReviewById = (id) => {
        for (let review of this.reviews) {
            if (review.id == id) return review;
        }
    };

    this.getImage = (index) => {
        if (index == undefined && images.length > 0) return this.images[0];
        if (index >= 0 && index <= images.length) return this.images[index];
    };

    this.addSize = (size) => {
        this.sizes.push(size);
    };

    this.deleteSize = (size) => {
        let index = this.sizes.indexOf(size);
        if (index != -1) this.sizes.splice(index, 1);
    };
    this.deleteReview = (id) => {
        let index = this.reviews.indexOf(this.reviews.find(item => item.id == id));
        if (index != -1) this.reviews.splice(index, 1);
    };

    this.getAverageRating = () => {
        let counter = 0;
        for (let review of this.reviews) {
            let rating = review.rating;
            counter += rating.value + rating.service + rating.price + rating.quality;
        };
        let average = counter / (4 * this.reviews.length);
        return average;
    };

};

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

 
function searchProducts(products, search) {
    let result = [];
    let isSearchExtended = (search.indexOf('*') != -1);
    if (isSearchExtended) search = search.slice(0, search.length - 1);
    for (let product of products) {
        if (product.getName().indexOf(search) != -1 || product.getDescription().indexOf(search) != -1) {
            if (isSearchExtended) {
                result.push(product);
            } else {
                for (let word of product.getName().split(" ")) {
                    if (word == search) result.push(product);
                }
                for (let word of product.getDescription().split(" ")) {
                    if (word == search && !result.includes(product)) result.push(product);
                }
            }
        }
    }
    return result;
};


function sortProducts(products, sortRule){
     switch(sortRule){
        case 'price':
            products.sort((a,b) => (a.getPrice() > b.getPrice()) ? 1 : -1)
            break;
        case 'id':
            products.sort((a,b) => (a.getId() > b.getId()) ? 1 : -1)
            break;
        case 'name':
            products.sort((a,b) => (a.getName() > b.getName()) ? 1 : -1)
            break;        
     }
     return products;
}


let p1 = new Product("1", "t-shirt with flower", "white t-shirt eye", 17.3, "good brand",
    ['XS', 'S', 'M', 'L', 'L', 'XXL'], "L", 50, ['image 1', 'image 2']);

let p2 = new Product("2", "t-shirt with eyes", "white t-shirt flower", 18, "good brand",
    ['XS', 'S', 'M', 'L', 'L', 'XXL'], "L", 50, ['image 1', 'image 2']);

let p3 = new Product("3", "t-shirt while ", "white t-shirt flow", 19, "good brand",
    ['XS', 'S', 'M', 'L', 'L', 'XXL'], "L", 50, ['image 1', 'image 2']);
