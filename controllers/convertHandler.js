/*
*
*
*       Complete the handler logic below
*
*
*/

const roundResult = (num) => {
  return parseFloat(num.toFixed(5));
};

class ConvertHandler {
  constructor(input) {
    const inputRegEx = /^([\d\/.]*)([a-z]*)$/i;
    const fractionRegEx = /([\d.]+)\/([\d.]+)/;
    const unitRegEx = /^(gal|mi|lbs|l|km|kg)$/i;

    let value, unit;
    if (input.match(inputRegEx)) {
      value = input.replace(inputRegEx, '$1');
      unit = input.replace(inputRegEx, '$2');
    } else {
      value = null;
      unit = null;
    }
    if (!!value && value.match(fractionRegEx)) {
      value = +value.replace(fractionRegEx, '$1') /
          +value.replace(fractionRegEx, '$2');
    } else if (value === '') {
      value = 1;
    } else {
      value = +value;
    }
    if (Number.isNaN(+value)) {
      value = null;
    }
    if (!!value) {
      value = roundResult(value);
    }
    if (!!unit && unit.match(unitRegEx)) {
      unit = unit.toLowerCase();
    } else {
      unit = null;
    }
    this.input = input;
    this.initNum = value;
    this.initUnit = unit;
  }

  get returnNum() {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;
    const imperialUnits = ['gal', 'mi', 'lbs'];

    if (!this.initNum) {
      return null;
    }
    if (imperialUnits.includes(this.initUnit)) {
      switch (this.initUnit) {
        case 'gal':
          return roundResult(this.initNum * galToL);
        case 'mi':
          return roundResult(this.initNum * miToKm);
        case 'lbs':
          return roundResult(this.initNum * lbsToKg);
      }
    } else {
      switch (this.initUnit) {
        case 'l':
          return roundResult(this.initNum / galToL);
        case 'km':
          return roundResult(this.initNum / miToKm);
        case 'kg':
          return roundResult(this.initNum / lbsToKg);
      }
    }
  }

  get returnUnit() {
    const unitMap = {
      gal: 'l',
      mi: 'km',
      lbs: 'kg',
      l: 'gal',
      km: 'mi',
      kg: 'lbs',
    };
    return unitMap[this.initUnit] || null;
  };

  toString() {
    const spellOutUnit = (unit) => {
      const unitSpelling = {
        gal: 'gallons',
        mi: 'miles',
        lbs: 'pounds',
        l: 'liters',
        km: 'kilometers',
        kg: 'kilograms',
      };
      return unitSpelling[unit] || null;
    };

    const resultObj = this.toJSON();
    if (resultObj.hasOwnProperty('error')) {
      return resultObj.error;
    } else {
      return `${resultObj.initNum} ${spellOutUnit(
          resultObj.initUnit)} converts to ${resultObj.returnNum} ${spellOutUnit(
          resultObj.returnUnit)}`;
    }
  };

  toJSON() {
    if (this.initNum === null && this.initUnit === null) {
      return {error: 'Invalid number and unit'};
    } else if (this.initNum === null) {
      return {error: 'Invalid number'};
    } else if (this.initUnit === null) {
      return {error: 'Invalid unit'};
    } else {
      return {
        initNum: this.initNum,
        initUnit: this.initUnit,
        returnNum: this.returnNum,
        returnUnit: this.returnUnit,
      };
    }
  }
}

module.exports = ConvertHandler;
