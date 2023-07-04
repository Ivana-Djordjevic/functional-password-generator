const generateBtn = document.querySelector("#generate"); 

const characterMap = { 
  lower: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], 
  upper: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  special: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', '<', ',', '>', '?', '/' ], 
}

function getPasswordParameters() {

  const choiceArray = []
  
  function getPasswordParameter(prompt, key) {
    if (confirm(prompt)) {
      choiceArray.push(key)
    }
  }  

  const characterLengthResponse = prompt('How many characters would you like your password to contain? (min:8, max:128)');

  if (characterLengthResponse === null) {
    alert('Please enter a value to continue.');  
    return false;
  }

  const characterLength = Number(characterLengthResponse)

  if (isNaN(characterLength)) {
    alert(`${characterLength} is not a number`);
    return false;
  }
  
  if (characterLength < 8 || characterLength > 128) {
    alert('(The character length must be a number between 8 - 128, please try again (use digits)');
    return false;
  }

  getPasswordParameter('Would you like to include lowercase letters in your password?', 'lower')

  getPasswordParameter('Would you like to include uppercase letters in your password?', 'upper')

  getPasswordParameter('Would you like to include numeric characters in your password?', 'number')

  getPasswordParameter('Would you like to include special characters in your password?', 'special')
    
  if (choiceArray.length === 0) {
    alert('You must select at least one property.');
    return false;
  }

  return {
     characterTypes: choiceArray,
     characterLength: characterLength,
    };
}

function computeRandomNumberLessThan(max) { // computer random numbers
  return Math.floor(Math.random() * max);
}

function getRandomCharacter(characterTypes, characterMap) {

  const randomTypeIndex = computeRandomNumberLessThan(characterTypes.length) 
  const randomCharacterType = characterTypes[randomTypeIndex] 
  const characterOptions = characterMap[randomCharacterType]
  const randomCharacterIndex = computeRandomNumberLessThan(characterOptions.length)
  const randomCharacter = characterOptions[randomCharacterIndex]

  return randomCharacter;
}

function generatePassword() {

  const passwordParameters = getPasswordParameters();
  
  if (passwordParameters === false) { 
    return;
  } 

  const passwordLength = passwordParameters.characterLength
  const passwordCharacters = new Array(passwordLength)
  const characterTypes = passwordParameters.characterTypes

    for (let index = 0; index < passwordCharacters.length; index++) {
      passwordCharacters[index] = getRandomCharacter(characterTypes, characterMap)
    }
  
  const password = passwordCharacters.join('');
 
  return password;
}

function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password"); 

  passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword)
