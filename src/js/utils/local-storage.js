const getLocalStorage = (key) => {
  // Retrieve the data from local storage
  const data = localStorage.getItem(key);

  // Try to retrieve the data from local storage
  try {
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
  } catch (error) {
    // If parsing fails, that means the data is not a valid JSON array
    // In that case, we can initialize it as an empty array
    localStorage.setItem(key, JSON.stringify([]));
  }

  // If the data is not an array or if parsing fails, return an empty array
  return [];
};

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export { getLocalStorage, setLocalStorage };
