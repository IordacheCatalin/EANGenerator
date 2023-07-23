const generatedNumbers = new Set();

function generateRandomDigits(length) {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function calculateEANChecksum(productCode) {
  let total = 0;
  for (let i = 0; i < productCode.length; i++) {
    let digit = parseInt(productCode[i]);
    total += i % 2 === 0 ? digit : digit * 3;
  }
  let checksum = (10 - (total % 10)) % 10;
  return checksum.toString();
}

function generateNumbers() {
  const numberOfNumbers = 50;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";
  generatedNumbers.clear();

  while (generatedNumbers.size < numberOfNumbers) {
    let productCode = generateRandomDigits(12);
    let eanLikeNumber = productCode + calculateEANChecksum(productCode);

    if (!generatedNumbers.has(eanLikeNumber)) {
      generatedNumbers.add(eanLikeNumber);
     

      outputDiv.innerHTML +=
      "<div class='ean' ondblclick='removeElement(event)' onclick='copyElementText(this, event)' >" +
      eanLikeNumber +
      "</div>";
    }
  }
}

function removeElement(event) {
  const element = event.target;
  if (element && element.classList.contains("ean")) {
    element.remove();
  }
}

let eanContainer = document.getElementById("output");

function checkEANContainer() {
  if (eanContainer.innerHTML.trim() === "") {
    eanContainer.style.display = "none";
  } else {
    eanContainer.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", checkEANContainer);
eanContainer.addEventListener("DOMSubtreeModified", checkEANContainer);

let clickTimeout; // Global variable to hold the timeout reference
const copiedElements = new Set(); // Set to store the copied elements

function copyElementText(element, event) {
  // Clear the previous timeout if it exists
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
  }

  // Check if the event type is "dblclick" (double-click)
  if (event && event.type === "dblclick") {
    alert("EAN copied on double-click: " + element.innerText);
    return; // Do nothing and exit the function on double-click
  }

  if (copiedElements.has(element)) {
    // Element has already been copied, so return without copying or showing the alert
    return;
  }

  const textToCopy = element.innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
    element.classList.add("copied");
    copiedElements.add(element); // Mark the element as copied

    clickTimeout = setTimeout(() => {
      alert("EAN copied on single-click: " + textToCopy);
    }, 500); // Delay the alert by 500ms
  });
}
