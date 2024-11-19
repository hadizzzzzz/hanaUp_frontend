const AddTravelDateToFund = fundObjects => {
  const newFundObjects = fundObjects.map((item, index) => {
    const startDate = new Date(2024, index, index * 3);
    const endDate = new Date(2024, index, (index + 3) * (3 + index));

    return { ...item, startDate: startDate, endDate: endDate };
  });
  return newFundObjects;
};

export default AddTravelDateToFund;
