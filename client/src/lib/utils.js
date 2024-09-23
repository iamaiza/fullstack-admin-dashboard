export const getDateRange = (value, currentDate, start, end) => {
  return {
    startDate: start(
      currentDate,
      value === "weekly" && { weekStartsOn: 1 }
    ).toISOString(),
    endDate: end(
      currentDate,
      value === "weekly" && { weekStartsOn: 1 }
    ).toISOString(),
  };
};

export const formatDate = (value, currentDate, interval, start, end) => {
  const getTimeInterval = interval({
    start: start(currentDate, value === "weekly" && { weekStartsOn: 1 }),
    end: end(currentDate, value === "weekly" && { weekStartsOn: 1 }),
  });
  return getTimeInterval;
};

export const getQuantity = (sales) => {
  const quantity = sales?.reduce(
    (acc, order) => acc + parseInt(order.quantity, 10),
    0
  );

  return quantity
};
