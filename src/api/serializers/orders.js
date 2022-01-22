const orderSerializers = order => {
  const { total } = order;
  console.log('orderSerializers',total);
  return {
    ...order,
    total: total ? total : 0
  }
}

export default orderSerializers;