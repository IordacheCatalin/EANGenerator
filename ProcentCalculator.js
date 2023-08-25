function calculateResult() {
  // Get the input values and operation selection
  const numberInput = document.getElementById("numberInput");
  const percentageInput = document.getElementById("percentageInput");
  const operationSelect = document.getElementById("operationSelect");

  const Vat = 1.19;

  // Convert input values to numbers
  const number = parseFloat(numberInput.value);
  const percentage = parseFloat(percentageInput.value);

  // Check if the input values are valid
  if (isNaN(number) || isNaN(percentage)) {
    alert("Please enter valid numbers.");
    return;
  }

  // Perform the selected operation
  const selectedOperation = operationSelect.value;
  var result;

  switch (selectedOperation) {
    case "add":
      result = number + number * (percentage / 100);
      break;
    case "subtract":
      result = number - number * (percentage / 100);
      break;
    case "multiply":
      result = number * (1 + percentage / 100);
      break;
    case "divide":
      result = number / (1 + percentage / 100);
      break;
    default:
      alert("Please select a valid operation.");
      return;
  }

  // Display the result
  const resultDiv = document.querySelector(".result");
  resultDiv.innerHTML = "Result: " + result.toFixed(2);

  const resultDivWhitVat = document.querySelector(".resultWhitVat");
  const VatResult = result.toFixed(2) * Vat;
  resultDivWhitVat.innerHTML = "Result Whit Vat: " + VatResult;
}
