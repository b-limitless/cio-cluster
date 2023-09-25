reserved_sesstion: [{orderId: 'abdd', qty: 10, completed: false}]
// I just want to let the product owner to know that this product 
// Sombody is trying to purchase 

// Simply when user click on add to card button then 
// In order table its should add for example 
// Product model  Array[{}, {}, {}, {}] 


// When user add the product then at the first time 
// it will be saved in the model and after if 
// Your kepp adding or removing product from the cart 
// then we will find the row with user id and order.status == notComplete 
// Same row will act as a cart unless this order is completed it will 
// act as cart and will never expire that,

// When the order is completed by the user then order.status will
// get update to completed 

// Again next time user comes and then add the product to the 
// Cart new order id will be created and row is keep get updated 

// Just for practice lets make it expiration base 
// Each time user add the product we will update the 
// Expiration date to existing + minutes 

