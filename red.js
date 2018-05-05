var quiz = {
    quizActive: null,
    initialize: function () {
        var quiz1Button = document.querySelector('#quiz1')
        var self = this
        quiz1Button.addEventListener('click', function () {
            self.quizActive = 'quiz1'
            self.startQuiz()
        })

        var quiz2Button = document.querySelector('#quiz2')
        quiz2Button.addEventListener('click', function () {
            self.quizActive = 'quiz2'
            self.startQuiz()
        })
    },
    questions: {
        quiz1: [
            {
                question: 'What is the name of your dog?',
                options: ['Bob', 'Brandon', 'Phinchik', 'Dave'],
                correctAnswer: 'Bob'
            },
            {
                question: 'What is the name of your cat?',
                options: ['Greece', 'Tony', 'Cat', 'Jen'],
                correctAnswer: 'Jen'
            }
        ],
        quiz2: [
            {
                question: 'What is the name of your car?',
                options: ['Bob', 'Brandon', 'Phinchik', 'Dave'],
                correctAnswer: 'Bob'
            },
            {
                question: 'What is the name of your cheetah?',
                options: ['Greece', 'Tony', 'Cat', 'Jen'],
                correctAnswer: 'Jen'
            }
        ]
    },
    score: 0,
    questionNumber: 0,
    startQuiz: function () {
        var startTitle = document.querySelector('#startTitle')
        var quiz1Button = document.querySelector('#quiz1')
        var quiz2Button = document.querySelector('#quiz2')
        var score = document.querySelector('#score')

        startTitle.style.display = 'none'
        quiz1Button.style.display = 'none'
        quiz2Button.style.display = 'none'
        score.style.display = 'block'
        score.innerHTML = 'Score: ' + this.score + "/" + this.questions[this.quizActive].length

        this.renderQuestion()
    },
    renderQuestion: function () {


        if (this.questionNumber > this.questions[this.quizActive].length - 1) {
            this.displayFinalScore()
        } else {
            var score = document.querySelector('#score')
            var displayMessage = document.querySelector('#displayMessage')
            var question = document.querySelector('#question')
            question.innerHTML = this.questions[this.quizActive][this.questionNumber].question

            var optionsList = document.querySelector('#options')

            for (i = 0; i < this.questions[this.quizActive][this.questionNumber].options.length; i++) {
                var option = document.createElement('li')
                option.innerHTML = this.questions[this.quizActive][this.questionNumber].options[i]

                var self = this
                option.addEventListener('click', function (e) {
                    if (e.target.innerHTML === self.questions[self.quizActive][self.questionNumber].correctAnswer) {
                        self.score += 1
                        score.innerHTML = "Score: " + self.score + "/" + self.questions[self.quizActive].length

                        displayMessage.innerHTML = 'Correct!'
                        e.target.style.color = 'green'

                        for (i = 0; i < optionsList.children.length; i++) {
                            if (optionsList.children[i].innerHTML !== self.questions[self.quizActive][self.questionNumber].correctAnswer) {
                                optionsList.children[i].style.color = 'red'
                            }
                        }

                        setTimeout(function () {
                            self.nextQuestion()
                        }, 2000)
                    } else {
                        displayMessage.innerHTML = 'Incorrect!'
                        for (i = 0; i < optionsList.children.length; i++) {
                            if (optionsList.children[i].innerHTML !== self.questions[self.quizActive][self.questionNumber].correctAnswer) {
                                optionsList.children[i].style.color = 'red'
                            } else {
                                optionsList.children[i].style.color = 'green'
                            }
                        }
                        setTimeout(function () {
                            self.nextQuestion()
                        }, 2000)
                    }
                })

                optionsList.appendChild(option)
            }
        }
    },
    nextQuestion: function () {
        var optionsList = document.querySelector('#options')
        var displayMessage = document.querySelector('#displayMessage')

        optionsList.innerHTML = ''
        displayMessage.innerHTML = ''


        this.renderQuestion(this.questionNumber++)
    },
    displayFinalScore: function () {
        var score = document.querySelector('#score')
        var question = document.querySelector('#question')

        score.innerHTML = ''
        question.innerHTML = ''

        var displayMessage = document.querySelector('#displayMessage')
        displayMessage.innerHTML = "Your final score is " + this.score + "/" + this.questions[this.quizActive].length + " (" + this.score / this.questions[this.quizActive].length * 100 + "%)"
    }
}

quiz.initialize()