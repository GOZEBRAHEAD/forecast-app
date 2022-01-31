// ============ FUNCTIONS ============ //
export const debounce = (func, delay) => {

  let timeoutID;

  return (...args) => {

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => func(...args), delay);
  };
};

export const throttle = (func, delay) => {
	
  let lastMoment = 0;

	return (...args) => {

		const actualMoment = new Date().getTime();

		if (actualMoment - lastMoment < delay) {
			return;
		}

		lastMoment = actualMoment;
		return func(...args);
	};
}