function init() {

    // Choose Category based on button clicked

    function chooseCategory(event) {
        if (event.currentTarget.id === 'fruits') {

            player.chosenCategory = categories.fruits
            categoryText.textContent = 'Fruits'
            console.log(player.chosenCategory)
            console.log(generateWord())
            fruitsButton.disabled = true        // disable buttons after clicked
            vegetablesButton.disabled = true
            checkGuessButton.disabled = false
        }
        else if (event.currentTarget.id === 'vegetables') {

            player.chosenCategory = categories.vegetables
            categoryText.textContent = 'Vegetables'
            console.log(player.chosenCategory)
            console.log(generateWord())
            fruitsButton.disabled = true        // disable buttons after clicked
            vegetablesButton.disabled = true
            checkGuessButton.disabled = false
            
        }
        
    }

    // Storing different categories of words that can be guessed

    const categories = {
        fruits: ['apple', 'banana', 'pineapple'],
        vegetables: ['cabbage', 'carrot', 'potato', 'brocolli']
    }

    // Storing player/Computer choices
    
    const player = {
        chosenCategory: null,
        numberOfGuesses: 10,
        // guessedLetters: null
        guessedLetters: []
    }

    const cpu = {
        randomWord: null
    }

    // Computer generates a random word for user to guess

    function generateWord() {
        randomInt = Math.floor(Math.random() * player.chosenCategory.length)
        cpu.randomWord = player.chosenCategory[randomInt]
        splitWord = cpu.randomWord.split('')    // splits word to be guessed into letter

        // add dashes according to length of word 
        
        for (let i = 0; i < cpu.randomWord.length; i++) {

            // displayDashes.textContent = '- '.repeat(splitWord.length)
            player.guessedLetters.push('_')
            

        }
        displayDashes.textContent = player.guessedLetters.join(' ')
        guessNumber.textContent = player.numberOfGuesses
        return cpu.randomWord
    }

    // Comparing  

    function compare(event) {
        if (event.currentTarget.id === 'check') {

            // If User inputs only one letter at a time
            // if(inputText.value = '')return;
            
            if (inputText.value.length === 1) {

                playerInput = inputText.value.toLowerCase()
                inputText.value = ''

                if (splitWord.includes(playerInput) === true) {
                    for (let j = 0; j < cpu.randomWord.length; j++) {
                        if (cpu.randomWord[j] === playerInput) {
                            player.guessedLetters[j] = playerInput
                            console.log(player.guessedLetters)
                            
                        } 
                    }
                    displayDashes.textContent = player.guessedLetters.join(' ')
                }
                else {
                    console.log('Wrong Guess!')
                    player.numberOfGuesses -= 1
                    guessNumber.textContent = player.numberOfGuesses
                    console.log('Number of guesses ' + player.numberOfGuesses)
                }
                
                // if (splitWord.includes(playerInput) === true) {
                //     console.log('You guessed a letter')
                //     player.guessedLetters.push(playerInput) 
                //     console.log(player.guessedLetters)
                // }
                // else {
                //     console.log('Wrong guess!')
                //     player.numberOfGuesses -= 1
                //     console.log('Number of Guesses left' + player.numberOfGuesses)
                // }

            } // If user inputs the whole word instead
            else {

                // player.guessedLetters = inputText.value.toLowerCase()
                // inputText.value = ''
                // console.log('Complete word: ' + player.guessedLetters)

                playerInput = inputText.value.toLowerCase()
                inputText.value = ''

                if (cpu.randomWord.includes(playerInput) === true) {
                    player.guessedLetters = null
                    playerGuessSplit = playerInput.split('')
                    player.guessedLetters = playerGuessSplit
                    displayDashes.textContent = player.guessedLetters.join(' ')
                    
                }
                else {
                    console.log('Wrong guess!')
                    player.numberOfGuesses -= 1
                    console.log('Number of Guesses left ' + player.numberOfGuesses)
                }

            }
            checkWinner()
        }

    }

    function checkWinner() {
        const allLettersMatch = splitWord.every(element => {
            return player.guessedLetters.includes(element)
        })

        if (allLettersMatch === true) {
            checkGuessButton.disabled = true
            displayDashes.textContent = "You guessed all letters! You win!"
        }
        else if (player.numberOfGuesses === 0) {
            checkGuessButton.disabled = true
            displayDashes.textContent = "Game Over! You lose!"
        }
    }

    function resetAll(event) {
        if (event.currentTarget.id === 'reset') {
            
            player.chosenCategory = null
            player.numberOfGuesses = 10
            player.guessedLetters = []
            cpu.randomWord = null
            fruitsButton.disabled = false       // disable buttons after clicked
            vegetablesButton.disabled = false
            checkGuessButton.disabled = true
            displayDashes.textContent = ''
            // displayWinner.textContent = ''
            categoryText.textContent = ''
        }
    }



    // Grabbing elements
    
    fruitsButton = document.getElementById('fruits')
    vegetablesButton = document.getElementById('vegetables')
    categoryText = document.getElementById('category')
    inputText = document.getElementById('text')
    checkGuessButton = document.getElementById('check')
    resetButton = document.getElementById('reset')
    guessNumber = document.getElementById('guess-number')
    // displayWinner = document.getElementById('display-winner')
    displayDashes = document.getElementById('display-dashes') // used to display dashes or letters

    // Buttons

    fruitsButton.addEventListener('click', chooseCategory)
    vegetablesButton.addEventListener('click', chooseCategory)
    checkGuessButton.addEventListener('click', compare)
    resetButton.addEventListener('click', resetAll)

    // keep button disabled at first until one of the category is chosen
    
    checkGuessButton.disabled = true


}

window.addEventListener('DOMContentLoaded', init)





  // Random thoughts
 // for (let i = 0; i <= player.guessedLetters; i++) {
            //     for (let j = 0; j <= splitWord; j++) {
                    
            //     }

            // }