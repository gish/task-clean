// userType, 0 = normal, 1 = company
// productType, 0 = new product, 1 = old product
// price, the price of the product
var USERTYPE_NORMAL = 0;
var USERTYPE_COMPANY = 1;
var PRODUCTTYPE_NEW = 0;
var PRODUCTTYPE_OLD = 1;

var isProductPublishedToday = function(publishDate) {
  return publishDate.toDateString() === new Date().toDateString()
}

var isUserTypeNormal = function(userType) {
  return userType === USERTYPE_NORMAL;
}

var isUserTypeCompany = function(userType) {
  return userType === USERTYPE_COMPANY;
}

var addAdditionalPrice = function(price, productType) {
  var additionalPriceByType = {
    [PRODUCTTYPE_NEW]: 25,
    [PRODUCTTYPE_OLD]: 35
  }

  return price + additionalPriceByType[productType]
}

var addRebate = function(price, userType, productType, publishedDate) {
  if (productType === PRODUCTTYPE_NEW && isProductPublishedToday(publishedDate)) {
    price = price - 10;
  }

  if (isUserTypeCompany(userType)) {
    price = price - 5;
  }
  return price;
}

var calculatePrice = function (userType, productType, price, publishedDate) {
  price = addAdditionalPrice(price, productType);
  price = addRebate(price, userType, productType, publishedDate);

  return price;
}
