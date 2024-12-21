export const convertUnit = (value, fromUnit, toUnit, type) => {
  // Base units: meters for length, grams for mass, celsius for temperature
  const conversions = {
    length: {
      m: 1,
      km: 0.001,
      cm: 100,
      mm: 1000,
      inch: 39.3701,
      ft: 3.28084,
    },
    mass: {
      kg: 0.001,
      g: 1,
      mg: 1000,
      lb: 0.00220462,
      oz: 0.035274,
    },
    temperature: {
      '°C': (value) => value,
      '°F': (value) => (value * 9/5) + 32,
      'K': (value) => value + 273.15,
    },
  };

  if (type === 'temperature') {
    // First convert to Celsius
    let celsius;
    switch (fromUnit) {
      case '°F':
        celsius = (value - 32) * 5/9;
        break;
      case 'K':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }
    // Then convert to target unit
    return conversions.temperature[toUnit](celsius);
  }

  // For length and mass
  const baseValue = value / conversions[type][fromUnit];
  return baseValue * conversions[type][toUnit];
}; 