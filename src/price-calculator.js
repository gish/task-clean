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

var isProductTypeNew = function(productType) {
  return productType === PRODUCTTYPE_NEW;
}

var isProductTypeOld = function(productType) {
  return productType === PRODUCTTYPE_OLD;
}

var getAdditionalPrice = function(productType) {
  var additionalPriceByType = {
    [PRODUCTTYPE_NEW]: 25,
    [PRODUCTTYPE_OLD]: 35
  }

  return additionalPriceByType[productType]
}

var getRebate = function(userType, productType, publishedDate) {
  var rebate = 0;

  if (isProductTypeNew(productType) && isProductPublishedToday(publishedDate)) {
    rebate = rebate + 10;
  }

  if (isUserTypeCompany(userType)) {
    rebate = rebate + 5;
  }
  return rebate;
}

var calculatePrice = function (userType, productType, price, publishedDate) {
  price = price + getAdditionalPrice(productType) - getRebate(userType, productType, publishedDate)

  return price;
}
