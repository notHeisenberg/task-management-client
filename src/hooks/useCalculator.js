import { useState, useEffect, useCallback } from 'react';

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  // Helper functions
  const factorial = useCallback((n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  }, []);

  const permutation = useCallback((n, r) => {
    if (n < r || n < 0 || r < 0) return NaN;
    return factorial(n) / factorial(n - r);
  }, [factorial]);

  const combination = useCallback((n, r) => {
    if (n < r || n < 0 || r < 0) return NaN;
    return factorial(n) / (factorial(r) * factorial(n - r));
  }, [factorial]);

  const handleNumber = useCallback((num) => {
    if (display === '0' || resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(prev => prev + num);
    }
  }, [display, resetDisplay]);

  const handleOperation = useCallback((op) => {
    setPreviousValue(display);
    setOperation(op);
    setResetDisplay(true);
  }, [display]);

  const calculateResult = useCallback((prev, current, op) => {
    const p = parseFloat(prev);
    const c = parseFloat(current);
    switch (op) {
      case '+': return p + c;
      case '-': return p - c;
      case '*': return p * c;
      case '/': return p / c;
      case '%': return (p * c) / 100;
      case 'mod': return p % c;
      default: return c;
    }
  }, []);

  const handleEqual = useCallback(() => {
    if (!previousValue || !operation) return;
    const result = calculateResult(previousValue, display, operation);
    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
  }, [previousValue, operation, display, calculateResult]);

  const handleScientific = useCallback((op) => {
    const value = parseFloat(display);
    let result;

    switch (op) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'nPr':
        if (previousValue) {
          result = permutation(parseFloat(previousValue), value);
          setPreviousValue(null);
          setOperation(null);
        } else {
          setPreviousValue(display);
          setOperation('P');
          setResetDisplay(true);
          return;
        }
        break;
      case 'nCr':
        if (previousValue) {
          result = combination(parseFloat(previousValue), value);
          setPreviousValue(null);
          setOperation(null);
        } else {
          setPreviousValue(display);
          setOperation('C');
          setResetDisplay(true);
          return;
        }
        break;
      default:
        return;
    }

    if (isNaN(result) || !isFinite(result)) {
      setDisplay('Error');
    } else {
      setDisplay(result.toFixed(8).replace(/\.?0+$/, ''));
    }
    setResetDisplay(true);
  }, [display, previousValue, permutation, combination]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  }, []);

  const handleDelete = useCallback(() => {
    setDisplay(prev => prev.length === 1 ? '0' : prev.slice(0, -1));
  }, []);

  const handleDecimal = useCallback(() => {
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  }, [display]);

  return {
    display,
    previousValue,
    operation,
    handleNumber,
    handleOperation,
    handleEqual,
    handleClear,
    handleDelete,
    handleDecimal,
    handleScientific,
  };
}
