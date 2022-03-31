import { promotionsAdds } from './ComponentStore/PromotionsAdds';
import createStore from 'storeon';
import { persistState } from '@storeon/localstorage';
import api from '../api';
import { STATUS_FETCHER } from '../const';
import { dataBalance } from './ComponentStore/Balance';

export const cart = (store) => {
  store.on('@init', () => ({ cart: {}, totalPrice: 0 }));
  store.on('cart/update', ({ cart }, obj) => {
    const { product } = obj;
    const { id } = product;
    const newCart = { ...cart };
    newCart[id] = obj;
    return {
      cart: { ...newCart },
    };
  });
  store.on('cart/remove', ({ cart }, { id }) => {
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
    const { product } = obj;
    const { id } = product;
    const newWishlist = { ...wishlist };
    newWishlist[id] = obj;
    return {
      wishlist: { ...newWishlist },
    };
  });
  store.on('wishlist/remove', ({ wishlist }, { id }) => {
    const newWishlist = { ...wishlist };
    delete newWishlist[id];
    return {
      wishlist: { ...newWishlist },
    };
  });
};

export const user = (store) => {
  store.on('@init', () => ({ currentUser: null }));
  store.on('user/save', ({ currentUser }, user) => ({

    currentUser: { ...currentUser, ...user },
  }));
  store.on('user/get', async ({ }, { callback }) => {
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
  store.on('page/set', ({ }, { page }) => {
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
    return {
      role_configuration: obj,
    };
  });
};

export const faq = (store) => {
  store.on('@init', () => ({
    faq: {
      show: false,
    },
  }));
  store.on('faq/update', ({ faq }, obj) => {
    return {
      faq: obj,
    };
  });
};

export const modal = (store) => {
  store.on('@init', () => ({
    modal: {
      show: false,
      content: null,
      addClass: false,
    },
  }));
  store.on('modal/update', ({ modal }, obj) => {
    return {
      modal: obj,
    };
  });
};

//============================================================================


export const orderFunc = (store) => {
  store.on('@init', () => ({ orderFunc: false }));
  store.on('orderFunc/state', ({ orderFunc }, obj) => {
    return { orderFunc: obj };
  })
}

//корзина заказов для опта -> что будет засунуто в оформление заказа
export const valueStock = store => {
  store.on('@init', () => ({ valueStock: [] }));
  store.on('valueStock/add', ({ valueStock }, obj) => {
    return { valueStock: obj }
  })
}

// данные wishlist записываем в хранилище
export const wishlistAl = (store) => {
  store.on('@init', () => ({ wishlistAl: [] }))
  store.on('wishlistAl/update', ({ wishlistAl }, obj) => {
    return { wishlistAl: obj }
  })
}



export const stateValuePoly = store => {
  const initialValue = {
    stateCart: false,
    stateWish: false,
    stateColorIncrement: false,
    stateColorDiscrement: false,
    stateBtnDisable: true,
    stateCurrency: false,
    statePayment: false,
    stateOrder: false,
    stateDelOrder: false,
    stateDelOrderItems: false,
    stateProductId: false,
    alreadySaw: false,
  }
  store.on('@init', () => ({ stateValuePoly: initialValue }))
  store.on('stateValuePoly/change', ({ stateValuePoly }, obj) => {

    return {
      stateValuePoly:
      {
        ...stateValuePoly,
        stateCart: obj.stateCart || false,
        stateWish: obj.stateWish || false,
        stateColorIncrement: obj.stateColorIncrement || false,
        stateColorDiscrement: obj.stateColorDiscrement || false,
        stateBtnDisable: obj.stateBtnDisable || false,
        stateCurrency: obj.stateCurrency || false,
        statePayment: obj.statePayment || false,
        stateOrder: obj.stateOrder || false,
        stateDelOrder: obj.stateDelOrder || false,
        stateDelOrderItems: obj.stateDelOrderItems || false,
        stateProductId: obj.stateProductId || false,
        alreadySaw: obj.alreadySaw || false,

      }
    }
  })
}

export const dataProductFromId = store => {
  store.on('@init', () => ({ dataProductFromId: 0 }));
  store.on('dataProductFromId/set', ({ dataProductFromId }, obj) => {
    return { dataProductFromId: obj }

  })
}

export const orderCreate = store => {
  store.on('@init', () => ({ orderCreate: [] }));
  store.on('orderCreate/add', ({ orderCreate }, obj) => {
    return (orderCreate = obj)
  })
}

export const userPage = store => {
  store.on('@init', () => ({ userPage: 0 }));
  store.on('userPage/add', ({ userPage }, obj) => {
    return { userPage: obj }
  })
}

//--------------------21.01.2022--------------------------------
//количество в моих желаниях иконка
export const stateCountWish = store => {
  const initialValue = {
    count: 0,
    mywishResult: []
  }
  store.on('@init', () => ({ stateCountWish: initialValue }));
  store.on('stateCountWish/add', ({ stateCountWish }, obj) => {
    return {
      stateCountWish: {
        count: obj.count,
        results: obj.results
      }
    }
  })
  // состояние на обновление mywish
  store.on('@init', () => ({ updateWish: false }));
  store.on('updateWish/add', ({ updateWish }, obj) => {
    return {updateWish: obj}
  })
 
}
//--------------------21.01.2022--------------------------------
//работа с карзиной 
export const stateCountCart = store => {
  const initialValue = { 
    in_cart: 0,
    is_performed: false,
    total_price: 0,
    delivery_price: 0,
    total_discount: 0,
    selected: 0,
    cartitem_set: [],
    in_stock: [],
    created_at: "",  
  }
  // переменная запрос на обновление карзины
  store.on('@init', () => ({ stateCountRestart: false }));
  store.on('stateCountRestart/add', ({ stateCountRestart }, obj) => {
     return { stateCountRestart: obj }
  })
  // получаем всю карзину
  store.on('@init', () => ({ stateCountCart: initialValue }));
  store.on('stateCountCart/add', ({ stateCountCart }, obj) => {
    return {
      stateCountCart: {
        ...obj
      }
      //  {
      //   in_cart: obj.in_cart,
      //   is_performed: obj.is_performed,
      //   total_price: obj.total_price,
      //   delivery_price: obj.delivery_price,
      //   total_discount: obj.total_discount,
      //   selected: obj.selected,
      //   cartitem_set: obj.cartitem_set,
      //   in_stock: obj.in_stock,
      //   created_at: obj.created_at,
      //   updated_at: obj.updated_at,

      // }
    }
  })
}
//--------------------22.01.2022--------------------------------
//данные товара для превью
    //*?????*********получаем ID товара для запроса************* */
export const reqestIdProduct = store => {
  store.on('@init', () => ( {reqestIdProduct:null} ));
  store.on('reqestIdProduct/add', ({ reqestIdProduct }, obj) => {
    return {reqestIdProduct : obj}
  })
}


//--------------------31.03.2022--------------------------------
//данные увидомления
    //*?????*********получаем ID товара для запроса************* */
    export const notificationCount = store => {
      store.on('@init', () => ( {notificationCount:null} ));
      store.on('notificationCount/update', ({ notificationCount }, obj) => {
    console.log(`notificationCount`,obj )

        return {notificationCount : obj}
      })
    }

/**
 * сдесь мы будем запихивать данные текущего продукта 
 * задумка локально менять в масивах listAlreadySaw
 * данные о товаре (is_likes, currency)
 * 
 * @param {*} store 
 */
export const stateInPreveiwGoods = store => {
  const initialValue = {
    brand: "",
    category: "",
    collections: [],
    colors: [],
    content: "",
    created_at: "",
    extra: "",
    id: 0,
    in_cart_count: 4,
    in_stock_count: 0,
    is_bestseller: false,
    is_closeout: false,
    is_collection: true,
    is_in_stock: false,
    is_liked: true,
    is_new: false,
    media: [],
    ordering: 0,
    page_type: 0,
    prices: {
      price: 0,
      more_3_item_price: 0,
      more_5_item_price: 0,
    },
    product_rc: "",
    review: {
      all_count: 0,
      all_count_percent: 0
    },
    seo_author: "",
    seo_description: "",
    seo_image: null,
    seo_keywords: "",
    seo_og_type: "",
    seo_title: "",
    short_content: "",
    sizes: [],
    slug: "",
    title: "",
    updated_at: "",
  }
  store.on('@init', () => ({ stateInPreveiwGoods: initialValue }));
  store.on('stateInPreveiwGoods/add', ({ stateInPreveiwGoods }, obj) => {
    return {
      stateInPreveiwGoods: obj
    }
  })
}

//--------------------25.01.2022--------------------------------
// данные про страны со стоимостью доставки
export const orderCountryPayment = store => {
  store.on('@init', () => ({ orderCountryPayment: [] }));
  store.on('orderCountryPayment/add', ({ orderCountryPayment }, obj) => {
    return { orderCountryPayment: obj }
  })

  store.on('@init', () => ({ statusRequstOrderCountryPayment: false }));
  store.on('statusRequstOrderCountryPayment/update', ({ statusRequstOrderCountryPayment }, obj) => {
    return { statusRequstOrderCountryPayment: obj }
  })
}
//--------------------27.01.2022--------------------------------
// текущее состояние валюты и состояние на обновление
export const currenssies = (store) => {
  store.on('@init', () => ({ currenssies: null }));
  store.on('currenssies/update', ({ currenssies }, obj) => {
    return {
      currenssies: obj,
    };
  });


store.on('@init', () => ({ updateCurrenssies: false }));
store.on('updateCurrenssies/update', ({ updateCurrenssies }, obj) => {
  return {
    updateCurrenssies: obj,
  };
});

  store.on('@init', () => ({ updateCurrenssiesForOrders: false }));
  store.on('updateCurrenssiesForOrders/update', ({ updateCurrenssiesForOrders }, obj) => {
    return {
      updateCurrenssiesForOrders: obj,
    };
  });


};
//--------------------12.02.2022--------------------------------
// активные пункты меню

export const activeItemMenu = store => {
 const initValue = {
    is_in_stock: false,
    is_new: false,
    is_bestseller: false,
    is_closeout: false,
    is_in_collection: false,
    is_not_range: false,
    is_import: false,
    is_polish: false,
  }
  store.on('@init', () => ({ activeItemMenu: initValue}))
  store.on('activeItemMenu/set', ({activeItemMenu}, value)=>{
    console.log('activeItemMenu=',value)
    console.log('activeItemMenu activeItemMenu=', activeItemMenu)

    // return 
  })

}

//--------------------04.03.2022--------------------------------
//обновление баланса
//*********************** */
export const stateUpdateBalance = store => {
  store.on('@init', () => ({ stateUpdateBalance: false }));
  store.on('stateUpdateBalance/update', ({ stateUpdateBalance }, obj) => {
    console.log('stateUpdateBalance', stateUpdateBalance)
    return { stateUpdateBalance: obj }
  })
}


export const storeonParams = [
  notificationCount,
  stateUpdateBalance,
  orderCountryPayment,
  wishlistAl,
  valueStock,
  orderFunc,
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
  stateInPreveiwGoods,
  reqestIdProduct,
  activeItemMenu,
];

