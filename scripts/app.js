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
            inputText.disabled = false
        }
        else if (event.currentTarget.id === 'vegetables') {

            player.chosenCategory = categories.vegetables
            categoryText.textContent = 'Vegetables'
            console.log(player.chosenCategory)
            console.log(generateWord())
            fruitsButton.disabled = true        // disable buttons after clicked
            vegetablesButton.disabled = true
            checkGuessButton.disabled = false
            inputText.disabled = false
            
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
        numberOfGuesses: 0,
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
                    ding.pause()
                    ding.currentTime = 0.4
                    ding.play()
                }
                else {
                    console.log('Wrong Guess!')
                    player.numberOfGuesses += 1
                    guessNumber.textContent = player.numberOfGuesses
                    console.log('Number of guesses ' + player.numberOfGuesses)
                    drawingSnowMan.classList.add(`wrong-${player.numberOfGuesses}`) // draw parts of the snowman on wrong guess
                    buzzer.pause()
                    buzzer.currentTime = 0.3
                    buzzer.play()

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
                    ding.pause()
                    ding.currentTime = 0.4
                    ding.play()
                    
                }
                else {
                    console.log('Wrong guess!')
                    player.numberOfGuesses += 1
                    guessNumber.textContent = player.numberOfGuesses
                    drawingSnowMan.classList.add(`wrong-${player.numberOfGuesses}`)
                    console.log('Number of Guesses left ' + player.numberOfGuesses)
                    buzzer.pause()
                    buzzer.currentTime = 0.3
                    buzzer.play()
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
            inputText.disabled = true
            displayDashes.textContent = "You guessed all letters! You win!"
            ding.pause()
            tadaa.play()
        }
        else if (player.numberOfGuesses === 8) {
            checkGuessButton.disabled = true
            inputText.disabled = true
            displayDashes.textContent = "Game Over! You lose!"
            buzzer.pause()
            sadTrombone.currentTime = 0.1
            sadTrombone.play()
        }
    }

    function resetAll(event) {
        if (event.currentTarget.id === 'reset') {
            
            player.chosenCategory = null
            player.numberOfGuesses = 0
            player.guessedLetters = []
            cpu.randomWord = null
            fruitsButton.disabled = false       // disable buttons after clicked
            vegetablesButton.disabled = false
            checkGuessButton.disabled = true
            inputText.disabled = true
            displayDashes.textContent = ''
            categoryText.textContent = ''
            guessNumber.textContent = ''
            drawingSnowMan.classList.remove('wrong-1','wrong-2','wrong-3','wrong-4','wrong-5','wrong-6','wrong-7','wrong-8')
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
    drawingSnowMan = document.querySelector('.snowman-container') //  div and its class of snowman container for drawing snowman
    displayDashes = document.getElementById('display-dashes') // used to display dashes or letters

    // Buttons

    fruitsButton.addEventListener('click', chooseCategory)
    vegetablesButton.addEventListener('click', chooseCategory)
    checkGuessButton.addEventListener('click', compare)
    resetButton.addEventListener('click', resetAll)

    // Audio

    ding = new Audio('assets/audio/Ding.mp3')
    buzzer = new Audio('assets/audio/buzzer.mp3')
    sadTrombone = new Audio('assets/audio/sadtrombone.mp3')
    tadaa = new Audio('assets/audio/win31.mp3')

    buzzer.volume = 0.3

    // keep button and text box disabled at first until one of the category is chosen
    
    checkGuessButton.disabled = true
    inputText.disabled = true

}

window.addEventListener('DOMContentLoaded', init)





  // Random thoughts
 // for (let i = 0; i <= player.guessedLetters; i++) {
            //     for (let j = 0; j <= splitWord; j++) {
                    
            //     }

            // }