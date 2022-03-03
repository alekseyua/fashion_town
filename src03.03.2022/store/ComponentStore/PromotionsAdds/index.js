import { v4 } from 'uuid';

export const promotionsAdds = (store) => {
  //todo: сделать запрос за рекламкой

  //todo: убрать localStorage
  const defaultDataPromotionsAdds = {
    isOpen: false,
    uuid: v4(),
    content: [
      { title: 'Black Friday Sale: -30% на новую коллекцию и доп. -20% на sale' },
      { title: 'Скидка применяется в корзине автоматически' },
      { title: 'Подробности акции' },
    ],
  };
  const nameKey = `promotionsAdds ${defaultDataPromotionsAdds.uuid}`;
  defaultDataPromotionsAdds.isOpen = true
  store.on('@init', () => ({ promotionsAdds: defaultDataPromotionsAdds }));
  store.on('promotionsAdds', ({ promotionsAdds }, promotions) => {
    // localStorage.setItem(nameKey, false);
    return {
      promotionsAdds: { ...promotions },
    };
  });
};
