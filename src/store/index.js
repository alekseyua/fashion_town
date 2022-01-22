import { promotionsAdds } from './ComponentStore/PromotionsAdds';
import createStore from 'storeon';
import { persistState } from '@storeon/localstorage';
import api from '../api';
import { STATUS_FETCHER } from '../const';
import { dataBalance } from './ComponentStore/Balance';

export const cart = (store) => {
  store.on('@init', () => ({ cart: {}, totalPrice: 0 }));
  store.on('cart/update', ({ cart }, obj) => {
  //  //console.log("cart/update")
    const { product } = obj;
    const { id } = product;
    const newCart = { ...cart };
    newCart[id] = obj;
    return {
      cart: { ...newCart },
    };
  });
  store.on('cart/remove', ({ cart }, { id }) => {
  //  //console.log("cart/remove")
    const newCart = { ...cart };
    delete newCart[id];
    return {
      cart: { ...newCart },
    };
  });
};

export const wishlist = (store) => {
  store.on('@init', () => ({ wishlist: {} }));
  store.on('wishlist/update', ({ wishlist }, obj) => {
  //  //console.log("wishlist/update")
    const { product } = obj;
    const { id } = product;
    const newWishlist = { ...wishlist };
    newWishlist[id] = obj;
    return {
      wishlist: { ...newWishlist },
    };
  });
  store.on('wishlist/remove', ({ wishlist }, { id }) => {
  //  //console.log("wishlist/remove")
    const newWishlist = { ...wishlist };
    delete newWishlist[id];
    return {
      wishlist: { ...newWishlist },
    };
  });
};

export const user = (store) => {
   store.on('@init', () => ({ currentUser: null }));
  ////console.log("user/save")
  store.on('user/save', ({ currentUser }, user) => ({
    
    currentUser: { ...currentUser, ...user },
  }));
  store.on('user/get', async ({}, { callback }) => {
  // //console.log("user/get")
    try {
      const data = await api.getCurrentUser();
      store.dispatch('user/save', {
        ...data,
        status: true,
      });
      callback();
    } catch (e) {
      store.dispatch('user/save', { status: false });
      callback();
    }
  });
};

export const page = (store) => {
  store.on('@init', () => ({ page: undefined }));
  store.on('page/set', ({}, { page }) => {
    return {
      page,
      currentUser: page?.data?.page?.user
        ? {
            ...page.data.page.user,
            status: true,
          }
        : { status: false },
    };
  });
  store.on('page/set/status', ({ page }, { status }) => {
    ////console.log("page/set/status")
    return {
      page: {
        ...page,
        status,
      },
    };
  });
};



export const role_configuration = (store) => {
  store.on('@init', () => ({
    role_configuration: {
      delivery_condition: '',
      payment_info: '',
      public_offer: '#',
      role: { number: 0, name: '' }, // была number: 1,
    },
  }));
  store.on('role_configuration/update', ({ role_configuration }, obj) => {
   //console.log("role_configuration/update store")
    return {
      role_configuration: obj,
    };
  });
};

export const faq = (store) => {
  //console.log("faq")
  store.on('@init', () => ({
    faq: {
      show: false,
    },
  }));
  store.on('faq/update', ({ faq }, obj) => {
    //console.log("faq/update")
    return {
      faq: obj,
    };
  });
};

export const modal = (store) => {
  //console.log("faq")
  store.on('@init', () => ({
    modal: {
      show: false,
      content: null,
      addClass: false,
    },
  }));
  store.on('modal/update', ({ modal }, obj) => {
    //console.log("modal/update")
    return {
      modal: obj,
    };
  });
};

//============================================================================
export const currenssies = (store) => {
  ////console.log("currenssies", store)
  store.on('@init', () => ({ currenssies: null }));
  store.on('currenssies/update', ({ currenssies }, obj) => {
    return {
      currenssies: obj,
    };
  });
};

export const cartAl = store => {

  store.on('@init', () => ({cartAl : 0}));

  store.on('cartAl/add', ({cartAl}, obj) => {
    return {cartAl : obj}      
  })

  store.on('cartAl/update', ({cartAl}, obj) => {
    // console.log('newCartobj', obj)
    // console.log('newCartobj', cartAl)
    //cartAl.cartitem_set.map(el =>{
     // else.id
    //})
    // const { product } = obj;
    // const { id } = product;
    // const newCart = { ...cart };
    // newCart[id] = obj;
    // return {
    //   cart: { ...newCart },
    // };      
  })

}


export const userPage = store => {
  store.on('@init', () => ({userPage : 0}));
  store.on('userPage/add',({userPage}, obj) => {
    return {userPage : obj}
  })
}


export const orderFunc = (store) => {
  store.on('@init', ()=>({orderFunc:false}));
  store.on('orderFunc/state', ({orderFunc},obj) => {
    return {orderFunc : obj};
  })
}

//корзина заказов для опта -> что будет засунуто в оформление заказа
export const valueStock = store =>{
  store.on('@init', ()=>({valueStock:[]}));
  store.on('valueStock/add', ({valueStock}, obj)=>{
    return { valueStock : obj}
  })
}

// данные wishlist записываем в хранилище
export const wishlistAl = (store) =>{
  store.on('@init', ()=>({wishlistAl:[]}))
  store.on('wishlistAl/update', ({wishlistAl},obj)=>{
    return {wishlistAl:obj}
  })
}

//
export const orderCountryPayment = store =>{
  store.on('@init', ()=>({orderCountryPayment:[]}));
  store.on('orderCountryPayment/add', ({orderCountryPayment}, obj)=>{
    return {orderCountryPayment : obj}
  })
}

export const stateValuePoly = store => {
  const initialValue = {
    stateCart : false,
    stateWish : false,
    stateColorIncrement : false,
    stateColorDiscrement : false,
    stateBtnDisable : true,
    stateCurrency : false,
    statePayment : false,
    stateOrder : false,
    stateDelOrder : false,
    stateDelOrderItems : false,
    stateProductId : false,
    alreadySaw:false,
  }
  store.on('@init', ()=>({stateValuePoly: initialValue}))
  store.on('stateValuePoly/change', ({stateValuePoly}, obj)=>{

    return {
      stateValuePoly : 
            {
              ...stateValuePoly,
              stateCart : obj.stateCart || null,
              stateWish : obj.stateWish || null,
              stateColorIncrement : obj.stateColorIncrement || null,
              stateColorDiscrement : obj.stateColorDiscrement || null,
              stateBtnDisable : obj.stateBtnDisable || null,
              stateCurrency : obj.stateCurrency || null,
              statePayment : obj.statePayment || null,
              stateOrder : obj.stateOrder || null,
              stateDelOrder : obj.stateDelOrder || null,
              stateDelOrderItems : obj.stateDelOrderItems || null,
              stateProductId : obj.stateProductId || null,
              alreadySaw : obj.alreadySaw || null,

            }
    }
  })
}

export const dataProductFromId = store => {
  store.on('@init', ()=>({dataProductFromId:0}));
  store.on('dataProductFromId/set', ({dataProductFromId}, obj)=>{
    return {dataProductFromId : obj}
    
  })
}

export const orderCreate = store =>{
  store.on('@init', ()=>({orderCreate:[]}));
  store.on('orderCreate/add', ({orderCreate}, obj)=>{
    console.log('orderCreate',obj);
    return (orderCreate = obj)
  })
}

//--------------------21.01.2022--------------------------------
//количество в моих желаниях иконка
export const stateCountWish = store => {
  const initialValue = {mywishCount : 0}
  store.on('@init', () => ({ stateCountWish: initialValue }));
  store.on('stateCountWish/add', ({ stateCountWish }, obj) => {
    return {
      stateCountWish: {
        mywishCount: obj.count,
      }
    }
  })
}
//--------------------21.01.2022--------------------------------
//количество в карзине иконка
export const stateCountCart = store => {
  const initialValue = {countCart : 0}
  store.on('@init', () => ({ stateCountCart: initialValue }));
  store.on('stateCountCart/add', ({ stateCountCart }, obj) => {
   // console.log('obj',obj);
    return {
      stateCountCart: {
        countCart: obj.in_cart,
      }
    }
  })
}


export const storeonParams = [
  orderCountryPayment,
  wishlistAl,
  valueStock,
  orderFunc,
  cartAl,
  promotionsAdds,
  user,
  cart,
  wishlist,
  page,
  currenssies,
  role_configuration,
  faq,
  modal,
  userPage,
  dataBalance,
  stateValuePoly,
  dataProductFromId,
  orderCreate,
  // --------
  stateCountWish,
  stateCountCart,
];

