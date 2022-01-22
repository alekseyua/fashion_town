
export const dataBalance = (store) => {
    const initValue = {
            "currency": 'USD',
            "balance": 90.41,        
            "passive_balance" : 570.3,       
    };
    store.on('@init', () => ({dataBalance : initValue }))
    store.on('dataBalance/set', ({dataBalance}, obj) => {
        return {
            dataBalance : obj
        }
    });
}