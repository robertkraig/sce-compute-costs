module.exports.calculateElectricityCost = (fromDate, toDate, usage) => {
  // Parse the input dates
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  // Calculate the number of days between the two dates (inclusive)
  const daysInRange = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  // Baseline allocation per day
  const baselinePerDay = 19.6; // kwh

  // Monthly baseline allocation based on the number of days in the range
  const totalBaseline = baselinePerDay * daysInRange;

  // Cost per kW/h
  const baselineRate = 0.32; // cents per kW/h
  const excessRate = 0.41; // cents per kW/h

  // Calculate excess usage
  const excessUsage = Math.max(0, usage - totalBaseline);

  // Calculate the cost
  const baselineCost = totalBaseline * baselineRate;
  const excessCost = excessUsage * excessRate;

  // Total cost
  const totalCost = baselineCost + excessCost;

  return {
    daysInRange,
    totalBaseline,
    excessUsage,
    baselineCost: Number(baselineCost.toFixed(2)),
    excessCost: Number(excessCost.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2))
  };
};