module.exports.calculateElectricityCost = (fromDate, toDate, usage) => {
  // Parse the input dates
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  // Calculate the number of days between the two dates (inclusive)
  const daysInRange = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  // Initialize variables
  let totalBaseline = 0;

  // Calculate the baseline allocation for each day based on the month
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1

    // Determine the baseline based on the month
    const baselinePerDay = (currentMonth >= 6 && currentMonth <= 9) ? 19.3 : 12.1;

    // Add the daily baseline to the total baseline
    totalBaseline += baselinePerDay;

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

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
    totalBaseline: totalBaseline.toFixed(2),
    excessUsage,
    baselineCost: baselineCost.toFixed(2),
    excessCost: excessCost.toFixed(2),
    totalCost: totalCost.toFixed(2)
  };
};
