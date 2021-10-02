export const getLocalStorage = (key) => {
    const LocalStorageItem = localStorage.getItem(key);

    if (LocalStorageItem && LocalStorageItem.length) {
        return JSON.parse(LocalStorageItem);
    } else {
        return false;
    }
}

export const setLocalStorage = (key, currentState) => {
    const state = JSON.stringify(currentState)
    localStorage.setItem(key, state);
}