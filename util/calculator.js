//IM Number - IM/2021/117
//Logic of the calculator

export const initialState = {
  currentValue: '0',
  operator: null,
  previousValue: null,
  resultDisplayed: false, // Tracks if a result is displayed
  isNewNumber: true, // Flag to handle number concatenation
};

const handleNumber = (value, state) => {
  const maxLength = 15;
  
  // If a result was just displayed or it's a new input, reset currentValue
  if (state.resultDisplayed || state.isNewNumber) {
    return {
      currentValue: value === '.' ? '0.' : `${value}`, // If input is '.', start with '0.'
      resultDisplayed: false,
      isNewNumber: false,
    };
  }

  if (value === '.' && state.currentValue.includes('.')) {
    return state; // Prevent multiple decimals
  }

  // Prevent starting a number with '0' unless it's a decimal
  if (state.currentValue === '0' && value !== '.') {
    return { currentValue: `${value}` };
  }

  // Check if currentValue length is already 15
  if (state.currentValue.length >= maxLength && value !== '.') {
    return state;  
  }

  // Concatenate the new number to the current value
  return { currentValue: `${state.currentValue}${value}` };
};

const handleOperator = (operator, state) => {
  const { currentValue, previousValue, operator: prevOperator } = state;

  // If an operator was already selected and a new operator is entered, calculate the result first
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

// Executes the calculation based on the current operator and values.
const handleEqual = (state) => {
  const { previousValue, currentValue, operator } = state;

  // Return unchanged state if calculation is not possible
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
        // Clear input if result is displayed or only one character remains
        return {
          currentValue: '0',
          isNewNumber: true,
        };
      }
      return {
        currentValue: state.currentValue.slice(0, -1), // Remove the last character from currentValue
      };
    default:
      return state;
  }
};

export default calculator;
