export default function lcmAndHcf(arr) {
  /**
   * Calculates the LCM (Least Common Multiple) and HCF (Highest Common Factor) of an array of positive integers.
   *
   * @param {number[]} arr - An array of positive integers.
   * @returns {object} An object containing the `lcm` and `hcf` properties, or an error object if the input is invalid.
   */

  // Input validation
  if (!arr || arr.length === 0) {
    return {
      error: "Invalid array: must contain at least one positive integer.",
    };
  }

  if (arr.some((num) => num <= 0)) {
    return { error: "Invalid array: must contain positive integers only." };
  }

  // Calculate LCM
  let lcm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    lcm = (lcm * arr[i]) / gcd(lcm, arr[i]);
  }

  // Calculate HCF using the Euclidean algorithm
  let hcf = arr[0];
  for (let i = 1; i < arr.length; i++) {
    hcf = gcd(hcf, arr[i]);
  }

  return { lcm, hcf };

  // Helper function for calculating GCD (Greatest Common Divisor)
  function gcd(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}

export function getGCD(a, b) {
  // Calculate the Greatest Common Divisor (GCD) using Euclid's algorithm
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

//---------------------------------------------------------------
// javascript code for finding the GCD of
// two floating numbers.

// Recursive function to return gcd
// of a and b
export function floatGCD(a, b) {
  if (a < b) return floatGCD(b, a);

  // base case
  if (Math.abs(b) < 0.001) return a;
  else return floatGCD(b, a - Math.floor(a / b) * b);
}
// This code is contributed by aashish1995
//----------------------------------------------------------------
