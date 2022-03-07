
export const dataBalance = (store) => {
    const initValue = {
            "currency": 'USD',
            "balance": 0,        
            "passive_balance" : 0,       
    };
    store.on('@init', () => ({dataBalance : initValue }))
    store.on('dataBalance/set', ({dataBalance}, obj) => {
        return {
            dataBalance : obj
        }
    });
}