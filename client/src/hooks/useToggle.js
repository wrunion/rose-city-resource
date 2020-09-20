import React, {useState } from 'react';

/* simple hook! exactly what it says on the tin */
const useToggle = (initialVal = false) => {
  const [val, setVal] = useState(initialVal);
  const toggle = () => {
    setVal(!val);
  }
  /* return state and a function to toggle it */
  return [val, toggle];
}

export default useToggle;