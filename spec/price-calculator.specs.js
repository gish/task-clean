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

      var expected = price + 25 - rebate;
      var actual = calculatePrice(userType, productType, price, publishedDate);

      expect(actual).to.equal(expected);
    });

    it('should add rebate to company users', function(){
      var userType = USERTYPE_COMPANY;
      var productType = PRODUCTTYPE_NEW;
      var rebate = REBATE_COMPANY + REBATE_NEW_PUBLISHED_TODAY;
      var price = 1;
      var publishedDate = new Date();

      var expected = price + 25 - rebate;
      var actual = calculatePrice(userType, productType, price, publishedDate);

      expect(actual).to.equal(expected);
    })
  })

  describe('isProductPublishedToday', function(){
    it('should be true when publish date is today', function(){
      var input = new Date();

      var expected = true;
      var actual = isProductPublishedToday(input);

      expect(actual).to.equal(expected);
    })

    it('should be false when publish date is not today', function(){
      var input = new Date(1970, 1, 1);

      var expected = false;
      var actual = isProductPublishedToday(input);

      expect(actual).to.equal(expected);
    })
  })

  describe('isType', function() {
    it('should be true when given is same as expected', function() {
      var givenType = 'a';
      var expectedType = 'a';
      var expected = true;

      var actual = isType(expectedType)(givenType)
      expect(actual).to.equal(expected)
    })

    it('should be false when given is not same as expected', function() {
      var givenType = 1;
      var expectedType = 0;
      var expected = false;

      var actual = isType(expectedType)(givenType)
      expect(actual).to.equal(expected)
    })
  })

  describe('isUserTypeNormal', function() {
    it('should be true when usertype is 0', function() {
      var userType = 0;
      var expected = true;
      var actual = isUserTypeNormal(userType);

      expect(actual).to.equal(expected);
    });

    it('should be false when usertype is 1', function() {
      var userType = 1;
      var expected = false;
      var actual = isUserTypeNormal(userType);

      expect(actual).to.equal(expected);
    })
  })

  describe('isUserTypeCompany', function() {
    it('should be true when usertype is 1', function() {
      var userType = 1;
      var expected = true;
      var actual = isUserTypeCompany(userType);

      expect(actual).to.equal(expected);
    });

    it('should be false when usertype is 0', function() {
      var userType = 0;
      var expected = false;
      var actual = isUserTypeCompany(userType);

      expect(actual).to.equal(expected);
    })
  })

  describe('isProductTypeNew', function() {
    it('should be true when type is 0', function() {
      var productType = 0;
      var expected = true;
      var actual = isProductTypeNew(productType);

      expect(actual).to.equal(expected);
    });

    it('should be false when type is 1', function() {
      var productType = 1;
      var expected = false;
      var actual = isUserTypeNormal(productType);

      expect(actual).to.equal(expected);
    })
  })

  describe('isProductTypeOld', function() {
    it('should be true when type is 1', function() {
      var type = 1;
      var expected = true;
      var actual = isProductTypeOld(type);

      expect(actual).to.equal(expected);
    });

    it('should be false when type is 0', function() {
      var type = 0;
      var expected = false;
      var actual = isProductTypeOld(type);

      expect(actual).to.equal(expected);
    })
  })

  describe('getAdditionalPrice', function() {
    it('should return 25 SEK when product is new', function() {
      var productType = PRODUCTTYPE_NEW;

      var expected = 25;
      var actual = getAdditionalPrice(productType);

      expect(actual).to.equal(expected);
    })

    it('should add 35 SEK when product is old', function() {
      var productType = PRODUCTTYPE_OLD;

      var expected = 35;
      var actual = getAdditionalPrice(productType);

      expect(actual).to.equal(expected);
    })
  })

  describe('getRebate', function() {
    it('should return 10 when new and published today', function() {
      var userType = undefined;
      var productType = PRODUCTTYPE_NEW;
      var publishedDate = new Date();

      var expected = 10;
      var actual = getRebate(userType, productType, publishedDate)

      expect(actual).to.equal(expected);
    })

    it('should return 5 when company user', function() {
      var userType = USERTYPE_COMPANY;
      var productType = undefined;
      var publishedDate = undefined;

      var expected = 5;
      var actual = getRebate(userType, productType, publishedDate)

      expect(actual).to.equal(expected);
    })

    it('should 15 when new, published today and company user', function() {
      var userType = USERTYPE_COMPANY;
      var productType = PRODUCTTYPE_NEW;
      var publishedDate = new Date();

      var expected = 15;
      var actual = getRebate(userType, productType, publishedDate)

      expect(actual).to.equal(expected);
    })
  })
});
