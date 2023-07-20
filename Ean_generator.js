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
        "<div class='ean' ondblclick='removeElement()'  onclick='copyElementText(this)' >" +
        eanLikeNumber +
        "</div>";
    }
  }
}

function removeElement() {
  const element = document.querySelector(".ean");
  if (element) {
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

function copyElementText(element) {
  const textToCopy = element.innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("EAN copied : " + textToCopy);
    element.classList.add("copied");
  });
}
