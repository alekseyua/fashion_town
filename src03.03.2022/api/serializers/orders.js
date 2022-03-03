const orderSerializers = order => {
  const { total } = order;
  return {
    ...order,
    total: total ? total : 0
  }
}

export default orderSerializers;