//Logic of the calculator

export const initialState = {
  currentValue: '0',
  operator: null,
  previousValue: null,
  history: [],
  resultDisplayed: false, // Tracks if a result is displayed
  isNewNumber: true, // Flag to handle number concatenation
};

const handleNumber = (value, state) => {
  const maxLength = 15;
  
  if (state.resultDisplayed || state.isNewNumber) {
    return {
      currentValue: value === '.' ? '0.' : `${value}`,
      resultDisplayed: false,
      isNewNumber: false,
    };
  }

  if (value === '.' && state.currentValue.includes('.')) {
    return state; // Prevent multiple decimals
  }

  if (state.currentValue === '0' && value !== '.') {
    return { currentValue: `${value}` };
  }

  // Check if currentValue length is already 15
  if (state.currentValue.length >= maxLength && value !== '.') {
    return state;  // Prevent adding more digits if it's already 15 digits
  }

  return { currentValue: `${state.currentValue}${value}` };
};

const handleOperator = (operator, state) => {
  const { currentValue, previousValue, operator: prevOperator } = state;

  if (prevOperator && !state.isNewNumber) {
    const updatedState = handleEqual(state); // Perform calculation with existing operator
    return {
      ...updatedState,
      operator,
      isNewNumber: true,
    };
  }

  return {
    previousValue: currentValue,
    operator,
    currentValue: '0',
    isNewNumber: true,
  };
};

const handleEqual = (state) => {
  const { previousValue, currentValue, operator } = state;

  if (!operator || !previousValue || !currentValue) {
    return state;
  }

  // Perform calculation
  const previous = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      if (previous == 0 && current == 0) {
        result = 'Infinity'
      } else if (current === 0) {
        result = 'NaN';
      } else {
        result = previous / current;
      }
      break;
    default:
      return state;
  }

  // Return the updated state with the result
  return {
    ...state,
    currentValue: result.toString(),
    previousValue: null,
    operator: null,
    isNewNumber: true,
  };
};


const calculator = (type, value, state) => {
  switch (type) {
    case 'number':
      return handleNumber(value, state);
    case 'clear':
      return initialState;
    case 'posneg':
      return {
        currentValue: (-parseFloat(state.currentValue)).toString(),
      };
    case 'percentage':
      return {
        currentValue: (parseFloat(state.currentValue) * 0.01).toString(),
      };
    case 'operator':
      return handleOperator(value, state);
    case 'equal':
      return handleEqual(state);
    case 'backspace':
      if (state.resultDisplayed || state.currentValue.length <= 1) {
        return {
          currentValue: '0',
          isNewNumber: true,
        };
      }
      return {
        currentValue: state.currentValue.slice(0, -1),
      };
    default:
      return state;
  }
};

const formatDecimal = (value, decimalPlaces) => {
  const num = parseFloat(value);
  return isNaN(num) ? '0' : num.toFixed(decimalPlaces);
};


const roundResult = (number, decimals = 8) => {
  return parseFloat(number.toFixed(decimals));
};

export default calculator;
