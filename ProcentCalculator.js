function calculateResult() {
    // Get the input values and operation selection
    var numberInput = document.getElementById("numberInput");
    var percentageInput = document.getElementById("percentageInput");
    var operationSelect = document.getElementById("operationSelect");
  
    // Convert input values to numbers
    var number = parseFloat(numberInput.value);
    var percentage = parseFloat(percentageInput.value);
  
    // Check if the input values are valid
    if (isNaN(number) || isNaN(percentage)) {
      alert("Please enter valid numbers.");
      return;
    }
  
    // Perform the selected operation
    var selectedOperation = operationSelect.value;
    var result;
  
    switch (selectedOperation) {
      case "add":
        result = number + (number * (percentage / 100));
        break;
      case "subtract":
        result = number - (number * (percentage / 100));
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
    var resultDiv = document.querySelector(".result");
    resultDiv.innerHTML = "Result: " + result.toFixed(2);
  }