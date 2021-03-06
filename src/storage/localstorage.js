export const getStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  
  export const setStorageData = (key, values) => {
    localStorage.setItem(key, JSON.stringify(values));
  };
  