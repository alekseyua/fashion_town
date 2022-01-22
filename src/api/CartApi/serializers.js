export const serializeCartItemForMultipleDelete = (items) => {
  return items.map((el) => {
    return {
        item_id: el.id,
        is_pack: el.is_pack
    };
  });
};
