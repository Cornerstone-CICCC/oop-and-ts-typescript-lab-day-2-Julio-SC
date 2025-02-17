// 🛍️ E-Commerce Cart System
// 🛒 Create a shopping cart system that manages products and their quantities.
//
// 1. Implement a class `ShoppingCart<T>` to handle products in a cart.
// 2. Implement a method `addToCart` that adds a product to the cart and updates the quantity if it already exists.
// 3. Implement a method `removeFromCart` that removes a product from the cart completely.
// 4. Implement a method `updateQuantity` that updates the quantity of a product in the cart.
// 5. Implement a method `getProductsOfCategory` that accepts a string and returns an array of items from the cart that match that category.
// 6. Implement a method `getTotalPrice` that returns the total cost of all items in the cart.
var Category;
(function (Category) {
    Category["Fruit"] = "Fruit";
    Category["Vegetable"] = "Vegetable";
    Category["Electronics"] = "Electronics";
    Category["Pastry"] = "Pastry";
    Category["Cereal"] = "Cereal";
})(Category || (Category = {}));
class ShoppingCart {
    cart = [];
    addToCart(product) {
        const existingProduct = this.cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
            return `${existingProduct.name} quantity updated to ${existingProduct.quantity}.`;
        }
        else {
            this.cart.push(product);
            return `${product.name} added to cart.`;
        }
    }
    updateQuantity(id, qty) {
        const product = this.cart.find((item) => item.id === id);
        if (product) {
            if (qty <= 0) {
                return this.removeFromCart(id);
            }
            product.quantity = qty;
            return `Updated quantity of ${product.name} to ${product.quantity}.`;
        }
        else {
            return `Product with ID ${id} not found in cart.`;
        }
    }
    getTotalPrice() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    getProductsOfCategory(category) {
        return this.cart.filter((item) => item.category === category);
    }
    removeFromCart(id) {
        const index = this.cart.findIndex((item) => item.id === id);
        if (index !== -1) {
            const removedProduct = this.cart.splice(index, 1)[0];
            return `${removedProduct.name} removed from cart.`;
        }
        else {
            return `Product with ID ${id} not found in cart.`;
        }
    }
}
// Test cases
const cart = new ShoppingCart();
console.log(cart.addToCart({ id: 1, name: "Headphones", price: 50, quantity: 1, category: Category.Electronics })); // "Headphones added to cart."
console.log(cart.addToCart({ id: 2, name: "Keyboard", price: 100, quantity: 1, category: Category.Electronics })); // "Keyboard added to cart."
console.log(cart.updateQuantity(1, 3)); // "Updated quantity of Headphones to 3."
console.log(cart.getProductsOfCategory(Category.Electronics)); // Should return all electronics
console.log(cart.getTotalPrice()); // Should return the total cost of items
console.log(cart.removeFromCart(2)); // "Keyboard removed from cart."
