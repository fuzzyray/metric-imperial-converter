/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

suite('Unit Tests', () => {

  suite('Function convertHandler.initNum', () => {

    test('Whole number input', done => {
      const input = '32L';
      const convertHandler = new ConvertHandler(input);
      assert.equal(convertHandler.initNum, 32);
      done();
    });

    test('Decimal Input', done => {
      const input = '3.2L';
      const convertHandler = new ConvertHandler(input);
      assert.equal(convertHandler.initNum, 3.2);
      done();
    });

    test('Fractional Input', done => {
      const input = '3/2L';
      const convertHandler = new ConvertHandler(input);
      assert.equal(convertHandler.initNum, 1.5);
      done();
    });

    test('Fractional Input w/ Decimal', done => {
      const input = '3/2.1L';
      const convertHandler = new ConvertHandler(input);
      assert.equal(convertHandler.initNum, 1.42857);
      done();
    });

    test('Invalid Input (double fraction)', done => {
      const input = '3/2/1L';
      const convertHandler = new ConvertHandler(input);
      assert.isNull(convertHandler.initNum);
      done();
    });

    test('No Numerical Input', done => {
      const input = 'L';
      const convertHandler = new ConvertHandler(input);
      assert.equal(convertHandler.initNum, 1);
      done();
    });

  });

  suite('Function convertHandler.initUnit', () => {

    test('For Each Valid Unit Inputs', done => {
      const input = [
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
        'GAL',
        'L',
        'MI',
        'KM',
        'LBS',
        'KG'];
      input.forEach(ele => {
        const convertHandler = new ConvertHandler(ele);
        assert.isNotNull(convertHandler.initUnit);
      });
      done();
    });

    test('Unknown Unit Input', done => {
      const input = [
        'gallon',
        'liter',
        'mile',
        'kilometer',
        'pounds',
        'kilogram',
      ];
      input.forEach(ele => {
        const convertHandler = new ConvertHandler(ele);
        assert.isNull(convertHandler.initUnit);
      });
      done();
    });

  });

  suite('Function convertHandler.returnUnit', () => {

    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((ele, i) => {
        const convertHandler = new ConvertHandler(ele);
        assert.equal(convertHandler.returnUnit, expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.toString()', () => {

    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = [
        '1 gallons',
        '1 liters',
        '1 miles',
        '1 kilometers',
        '1 pounds',
        '1 kilograms',
      ];
      input.forEach((ele, i) => {
        const convertHandler = new ConvertHandler(ele);
        assert.isTrue(convertHandler.toString().startsWith(expect[i]) );
      });
      done();
    });
  });

  suite('Function convertHandler.returnNum', () => {

    test('Gal to L', done => {
      const input = [5, 'gal'];
      const expected = 18.9271;
      const convertHandler = new ConvertHandler(input.join(''));
      //0.1 tolerance
      assert.approximately(convertHandler.returnNum, expected, 0.1);
      done();
    });

    test('L to Gal', done => {
      const input = [5, 'l'];
      const expected = 1.32086;
      const convertHandler = new ConvertHandler(input.join(''));
      //0.1 tolerance
      assert.approximately(convertHandler.returnNum, expected, 0.1);
      done();
    });

    test('Mi to Km', done => {
      const input = [5, 'mi'];
      const expected = 8.04672;
      const convertHandler = new ConvertHandler(input.join(''));
      //0.1 tolerance
      assert.approximately(convertHandler.returnNum, expected, 0.1);
      done();
    });

    test('Km to Mi', done => {
      const input = [5, 'km'];
      const expected = 3.10686;
      const convertHandler = new ConvertHandler(input.join(''));
      //0.1 tolerance
      assert.approximately(convertHandler.returnNum, expected, 0.1);
      done();
    });

    test('Lbs to Kg', done => {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      const convertHandler = new ConvertHandler(input.join(''));
      //0.1 tolerance
      assert.approximately(convertHandler.returnNum, expected, 0.1);
      done();
    });

    test('Kg to Lbs', done => {
      const input = [5, 'kg'];
      const expected = 11.0231;
      const convertHandler = new ConvertHandler(input.join(''));
      //0.1 tolerance
      assert.approximately(convertHandler.returnNum, expected, 0.1);
      done();
    });
  });
});