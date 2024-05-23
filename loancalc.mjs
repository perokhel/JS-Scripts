function calculateCarLoan(
  annualInterestRate,
  loanAmount,
  loanTermInYears,
  balloonPayment,
  establishmentFee,
  processingFee
) {
  // Convert arguments to usable values
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const loanTermInMonths = loanTermInYears * 12;
  const balloonPercentage =
    typeof balloonPayment === "string"
      ? parseFloat(balloonPayment) / 100
      : balloonPayment;
  const balloonAmount = loanAmount * balloonPercentage;

  // Calculate total loan amount with fees
  const totalLoanAmount = loanAmount + establishmentFee + processingFee;

  // Calculate monthly payment excluding balloon
  const monthlyPayment =
    ((totalLoanAmount - balloonAmount) *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTermInMonths))) /
    (Math.pow(1 + monthlyInterestRate, loanTermInMonths) - 1);

  // Initialize payment schedule
  const paymentSchedule = [];

  // Loop through each month
  for (let month = 1; month <= loanTermInMonths; month++) {
    const interestPayment =
      (totalLoanAmount - monthlyPayment * (month - 1)) * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    const remainingBalance = totalLoanAmount - monthlyPayment * month;

    // Handle last payment with balloon
    if (month === loanTermInMonths) {
      paymentSchedule.push({
        month,
        interestPayment,
        principalPayment: remainingBalance,
        remainingBalance: 0,
      });
    } else {
      paymentSchedule.push({
        month,
        interestPayment,
        principalPayment,
        remainingBalance,
      });
    }
  }

  return paymentSchedule;
}

// Example usage
const interestRate = 10.24;
const loanAmount = 30000;
const loanTerm = 5;
const balloon = "20"; // 50% balloon payment
const establishmentFee = 549;
const processingFee = 10;

const paymentSchedule = calculateCarLoan(
  interestRate,
  loanAmount,
  loanTerm,
  balloon,
  establishmentFee,
  processingFee
);

console.log(paymentSchedule);
