const setStorage = (link: string, issues: object) => {
  localStorage.setItem(link, JSON.stringify(issues));
};

const getStorageData = (link: string) => {
  const localStorageData = localStorage.getItem(link);
  return JSON.parse(localStorageData ?? "null");
};

export { setStorage, getStorageData };
