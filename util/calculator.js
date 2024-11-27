export const initialState = {
  currentValue: '0',
  operator: null,
  previousValue: null,
  history: [],
};

export const handleNumber = (value, state) => {
  if (state.currentValue === '0' && value !== '.') {
    return { currentValue: `${value}` };
  }

  if (!state.currentValue.includes('.') || value !== '.') {
    return { currentValue: `${state.currentValue}${value}` };
  }

  return state;
};

const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = { operator: null, previousValue: null };

  switch (operator) {
    case '+':
      return {
        currentValue: `${previous + current}`,
        previousValue: `${previous} + ${current} =`,
        ...resetState,
        history: [...state.history, `${previous} + ${current} = ${previous + current}`],
      };
    case '-':
      return {
        currentValue: `${previous - current}`,
        previousValue: `${previous} - ${current} =`,
        ...resetState,
        history: [...state.history, `${previous} - ${current} = ${previous - current}`],
      };
    case '*':
      return {
        currentValue: `${previous * current}`,
        previousValue: `${previous} * ${current} =`,
        ...resetState,
        history: [...state.history, `${previous} * ${current} = ${previous * current}`],
      };
    case '/':
      if (current === 0) {
        return {
          currentValue: 'Error: Division by zero',
          ...resetState,
        };
      }
      return {
        currentValue: `${previous / current}`,
        previousValue: `${previous} / ${current} =`,
        ...resetState,
        history: [...state.history, `${previous} / ${current} = ${previous / current}`],
      };
    default:
      return state;
  }
};

const handlePosNeg = (state) => {
  const currentValue = parseFloat(state.currentValue);

  if (currentValue === 0) {
    return state; // No change if the value is 0
  }

  const newValue = currentValue * -1;

  return {
    currentValue: newValue.toString(),
  };
};

//Main function to process the input type & update the state
const calculator = (type, value, state) => {
  switch (type) {
    case 'number':
      return handleNumber(value, state);
    case 'clear':
      return initialState;
    case 'posneg':
      return handlePosNeg(state);
    case 'percentage':
      return {
        currentValue: (parseFloat(state.currentValue) * 0.01).toString(),
      };
    case 'operator':
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: '0',
      };
    case 'equal':
      return handleEqual(state);
    case 'backspace':
      return {
        ...state,
        currentValue:
          state.currentValue.length > 1
            ? state.currentValue.slice(0, -1)
            : '0', // Reset to "0" if empty
      };
    default:
      return state;
  }
};

export default calculator;