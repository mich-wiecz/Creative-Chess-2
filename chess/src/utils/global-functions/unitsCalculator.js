class UnitsCalculator {
    unitsInPixels = {
      px: 1,
      mm: 3.779527563816728,
      cm: 37.79527563816728,
      m: 3779.527563816728,
      in: 96.00000012094488,
      ft: 1152.0000014513384,
      yd: 3456.0000043540163,
    };
  
     constructor(unitsInPixels) {
      if (unitsInPixels) {
        this.unitsInPixels = {
          ...this.unitsInPixels,
          ...unitsInPixels,
        };
      }
    }
  
    static instance = null;
  
    static getInstance() {
      if (this.instance === null) {
        this.instance = new UnitsCalculator();
      }
      return this.instance;
    }
  
    doUnitExist(unit, showAlert = false) {
      if (!this.unitsInPixels.hasOwnProperty(unit)) {
        showAlert && alert(`Nie ma takiej jednostki w bazie danych: ${unit}`);
        return false;
      }
      return true;
    }
  
    getMultiplier(baseUnit, resultUnit = "px") {
      if (!this.doUnitExist(baseUnit, true)) return;
  
      if (resultUnit === "px") {
        return this.unitsInPixels[baseUnit];
      }
  
      if (!this.doUnitExist(resultUnit, true)) return;
      const resultUnitInPixels = this.getMultiplier(baseUnit);
      const baseUnitInPixels = this.getMultiplier(resultUnit);
      return resultUnitInPixels / baseUnitInPixels;
    }
  
    calculate(
      valuesArray,
      settings
    ) {
      const { baseUnit, resultUnit = "px", suffix, decimals = 2 } = settings;
      const multiplier = this.getMultiplier(baseUnit, resultUnit);
      if (!multiplier) return;
      return valuesArray.map((val) => {
        const transformedValue = (val * multiplier).toFixed(decimals);
        if (suffix) {
          return transformedValue + (suffix ? resultUnit : 0);
        }
        return Number(transformedValue);
      }) 
    }
  
    createExtendedCalculator(unitsInPixels) {
      return new UnitsCalculator({
        ...this.unitsInPixels,
        ...unitsInPixels,
      });
    }
  }
  
  const unitsCalculator = UnitsCalculator.getInstance();
  Object.freeze(unitsCalculator);

  export default unitsCalculator;


