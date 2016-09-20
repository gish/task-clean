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

var addAdditionalPrice = function(price, productType) {
  var additionalPriceByType = {
    [PRODUCTTYPE_NEW]: 25,
    [PRODUCTTYPE_OLD]: 35
  }

  return price + additionalPriceByType[productType]
}

var calculatePrice = function (userType, productType, price, publishedDate) {
	try	{
    var price = addAdditionalPrice(price, productType)

		switch (userType) {
		case USERTYPE_NORMAL:
			if (productType == 0) { // new product
				var enddateDiscount = 0;
				if (isProductPublishedToday(publishedDate)) enddateDiscount = 10;

				return price - enddateDiscount;
			} else if (productType == 1) { // old product
				return price - 0;
			}
			break;
		case USERTYPE_COMPANY:
			if (productType == 0) { // new product
				if (isProductPublishedToday(publishedDate)) {
						return price - 15;// Enddate discount and company discount
				}

				return price - 5;// Only company discount
			} else if (productType == 1) { // old product
				return price - 5;
			}
			break;
		}
	}	catch (ex)	{
			console.log(ex);
	}
	return 0;
}
