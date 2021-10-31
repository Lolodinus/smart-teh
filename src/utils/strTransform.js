export const cutString = (line, charQuantity=10) => {
    if (typeof line === 'string' && line.length > charQuantity) {
        const newSyring = `${line.substr(0, charQuantity)}...`
        return newSyring;
    }
    return line
}