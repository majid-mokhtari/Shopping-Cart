/*
==============================================
knockoutjs - Shopping Cart App
==============================================
*/

//waiting for html to load first
(function(){


//creating item object using function constructer
function Item(name, price, quantity) {
    var self = this;
    self.name = name;
    self.price = parseFloat(price).toFixed(2);  
    self.formattedPrice = ko.computed(function(){
        var price = self.price;
        return price === 'NaN' ? 0 : price;
    });
    this.quantity = ko.observable(quantity);
}

//creating knockout.js model
function CartViewModel() {
    // Data
    var self = this;
    self.newItemName = ko.observable();
    self.newItemPrice = ko.observable();
    self.newItemQuantity = ko.observable(1);

    self.itemsInCart = ko.observableArray([]);
    
    // Operations
    //add new item to the cart
    self.addNewItem = function() {
        self.itemsInCart.push(new Item(self.newItemName(), self.newItemPrice(), self.newItemQuantity() ));
        self.newItemName("");
    };
    //remove item ffrom the row when clicked on remove button
    self.removeItem = function(task) { self.itemsInCart.remove(task) };

    //calculating the total cost and updating when cart items and quantity changes
    self.calculateTotal = ko.computed(function(){
        var total= 0;
        for(var i=0; i<self.itemsInCart().length; i++)
            total += self.itemsInCart()[i].quantity()*self.itemsInCart()[i].price;
            
            return total.toFixed(2);
    });

    //jQuery effect
    ko.bindingHandlers.fadeVisible = {

        init: function(element, valueAccessor) {
        // Start visible/invisible according to initial value
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
        update: function(element, valueAccessor) {
        // On update, fade in/out
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    } 
};
    //enable the button when the user start typing in the input field
    self.addNewItemEnabled = ko.pureComputed(function() {
     var name = self.newItemName(),
         price = self.newItemPrice();

     return name && name.length && price && price.length;
    }, CartViewModel);
}

ko.applyBindings(new CartViewModel());


//function ready ends here
})();
