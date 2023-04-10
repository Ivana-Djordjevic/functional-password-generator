// Assignment Code

// 1. prompt the user for the password criteria
//    a. password length: 8-128
//          How many characters would you like your password to contain? (min:8, max:128)
//    b. lowercase, uppercase, numeric, and/or special characters
//          Would you like to include lowercase letters?
//          Would you like to include uppercase letters?
//          Would you like to include numeric characters?
//          Would you like to include special characters?
// 2. validate the input
// 3. generate password based on criteria
// 4. display the generated password on the page

// SubmitButton.onClick => collect password criteria from user
//    validate the input and store it
//    randomize the values

// in order to so, we must render a function to 'generatePassword' as there is none in the starter code


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
/**
 * function only responsible for random numbers - is solo . can be used but does not influence.
 * computes the list of numbers in whatever array is selected
 * @param max 
 * @returns a random integer >0 & <max
 */
function computeRandomNumberLessThan(max) { // computer random numbers
  return Math.floor(Math.random() * max);
}
//* the getRandomChracter function is responsible for 
//* (1) desired character types picked
//* to select one each time until characterlength runs out 
//* (use loop until character length runs out)

/** process data from the passwordParameters to give a series of randomized ouput based upon the consecutive choices
 * @param characterTypes : Array of CharacterTypes selected by the user, min 1 - 'lower' | 'upper' | 
 * @param characterMap : Object with keys of CharacterTypes, and values string[] 
 * @returns randomCharacter : 
 */

function getRandomCharacter(characterTypes, characterMap) {
/** it is a random index within the array of character types selected by the user*/
  const randomTypeIndex = computeRandomNumberLessThan(characterTypes.length) // first dice  , (0, 1, 2,3 ) charoptions
/** the characater type that is selected from the user's options*/
  const randomCharacterType = characterTypes[randomTypeIndex] // 
  
  /** it keys into the map using the key generated above, and presents you with the possible elements */
  const characterOptions = characterMap[randomCharacterType]
/** random index choosen from the given elements */
  const randomCharacterIndex = computeRandomNumberLessThan(characterOptions.length)
/** so the choosen index will translate into the actual element */
  const randomCharacter = characterOptions[randomCharacterIndex]
 console.log({
  randomTypeIndex, randomCharacterType, characterOptions, randomCharacterIndex, randomCharacter
 })
  return randomCharacter;
}

function generatePassword() {
  // check if return from getPrompts is true or false and either quit or continue 
  const passwordParameters = getPasswordParameters();
  
  if (passwordParameters === false) { // to do: option to retry
    return;
  } 

  const passwordLength = passwordParameters.characterLength
/** creating password length slots for random characters */
  const passwordCharacters = new Array(passwordLength)
  const characterTypes = passwordParameters.characterTypes

// for password length = 5 
// const passwordCharacters = [_, _, _, _, _]

    for (let index = 0; index < passwordCharacters.length; index++) {
      // we want to randomize each character in the password & abide the user's criteria
      // figure out which character type is gonna be (the value) (upper, etc)
      // which char of that type its gonna be (ie 3, d)

      passwordCharacters[index] = getRandomCharacter(characterTypes, characterMap)
    }

  console.log(passwordCharacters)
  // password length: 10 aaaaaaaaa
  // get a random number to grab a random char from choice array (look math.random) x4 
  // use for loops around the random number code and for loop chara length, random loop choice arrays 
  // add the random cchars to a new var you made, use return, 
  /** we have arrays of strings that were selected per the randomization process, and they need to be consolidated in one array 
   * and insure that the password is valid or else regenerate */
 const password = passwordCharacters.join('');
 // const password =  computeRandomNumberLessThan(passwordCharacters) + computeRandomNumberLessThan(characterTypes);
/** password is output of the randomizations and the user's criteria */
  return password; // return the variable here so it is displayed on the screen
}

// Write password to the #password input
function writePassword() {
  //need to make a function for "generatePassword" does not have any rules right now
  const password = generatePassword();
  const passwordText = document.querySelector("#password"); //this is where the generated password displays on the screen

  //takes the value from the generated password and it plugs it into what is displayed on the screen
  passwordText.value = password;
}

// Add event listener to generate button
// when a user clicks the generate button it will call the "writePassword" function
generateBtn.addEventListener("click", writePassword)
