module.exports.priceNewProducts = (products) => { 
    const newArray = products.map(item=>{
        item.pricenew =(( item.price * (100 - item.discountPercentage))/100).toFixed(0);
        return item;
    })
    return newArray
};
module.exports.priceNewProduct = (product) => { 
    const pricenew = (( product.price * (100 - product.discountPercentage))/100).toFixed(0);
    
    return pricenew
};