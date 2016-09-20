var USERTYPE_NORMAL = 0;
var USERTYPE_COMPANY = 1;

var PRODUCTTYPE_NEW = 0;
var PRODUCTTYPE_OLD = 1;

var REBATE_COMPANY = 5;
var REBATE_NEW_PUBLISHED_TODAY = 10;

describe('price calculator', function(){
  describe('acceptance tests', function(){
    it('should calculate right price for normal user and new product', function(){
      var userType = USERTYPE_NORMAL;
      var productType = PRODUCTTYPE_NEW;
      var rebate = REBATE_NEW_PUBLISHED_TODAY;
      var price = 1;
      var publishedDate = new Date();

      var expected = price + 25 - 10;
      var actual = calculatePrice(userType, productType, price, publishedDate);
      expect(expected).to.equal(actual);
    });

    it('should add rebate to company users', function(){
      var userType = USERTYPE_COMPANY;
      var productType = PRODUCTTYPE_NEW;
      var rebate = REBATE_COMPANY + REBATE_NEW_PUBLISHED_TODAY;
      var price = 1;
      var publishedDate = new Date();

      var expected = price + 25 - rebate;
      var actual = calculatePrice(userType, productType, price, publishedDate)
      expect(expected).to.equal(actual);
    })
  })

  describe('isProductPublishedToday', function(){
    it('should be true when publish date is today', function(){
      var input = new Date();

      var expected = true;
      var actual = isProductPublishedToday(input);

      expect(expected).to.equal(actual);
    })

    it('should be false when publish date is not today', function(){
      var input = new Date(1970, 1, 1);

      var expected = false;
      var actual = isProductPublishedToday(input);

      expect(expected).to.equal(actual);
    })
  })

  describe('addAdditionalPrice', function() {
    it('should add 25 SEK when product is new', function() {
      var price = 10;
      var productType = PRODUCTTYPE_NEW;

      var expected = 35;
      var actual = addAdditionalPrice(price, productType);

      expect(expected).to.equal(actual);
    })

    it('should add 35 SEK when product is old', function() {
      var price = 12;
      var productType = PRODUCTTYPE_OLD;

      var expected = 47;
      var actual = addAdditionalPrice(price, productType);

      expect(expected).to.equal(actual);
    })
  })
});
