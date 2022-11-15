const questions = [
	{
		question: "Что такое DOM?",
		answers: [
			"Это программный интерфейс к браузерному API",
			"Это программный интерфейс к CSS-документам",
			"Это программный интерфейс к HTML-документам",
			"Это программный интерфейс к JS-документам"],
		correct: 3,
	},
	{
		question: "Что такое Promise?",
		answers: [
			"Объект, который изменяет последовательность выполнения асинхронной операции",
			"Объект, который содержит будущее значение асинхронной операции",
			"Объект, который планирует запуск выполнения асинхронного кода",
		],
		correct: 2,
	},
	{
		question: "Какие единицы измерения в CSS описывают разрешение экрана в точках на дюйм?",
		answers: ["dpcm", "dpi", "dpx", "dppx"],
		correct: 2,
	},
	{
		question: "Какое значение свойства display установлено по-умолчанию у HTML-элемента span?",
		answers: ["flex", "block", "inline-block", "inline"],
		correct: 4,
	},
	{
		question: "Для чего нужен doctype?",
		answers: [
			"Чтобы браузер получал более подробную информацию о хостинге сайта",
			"Чтобы браузер понимал, как следует обрабатывать веб-страницу",
			"Чтобы браузер мог работать с JSX разметкой в HTML файле",
			"Чтобы браузер понимал, какие теги имеют повышенный приоритет интерпретации"
		],
		correct: 2,
	},
]

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

let score = 0
let questionIndex = 0

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer

function clearPage() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion() {
	const headerTemplate = `<h2 class="title">%title%</h2>`
	headerContainer.innerHTML = headerTemplate.replace('%title%', questions[questionIndex]['question'])

	let answerNumber = 1
	for (let answerText of questions[questionIndex]['answers']) {
		const questionTemplate =
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`
		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', answerNumber)
		listContainer.innerHTML += answerHTML
		answerNumber++
	}
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if (!checkedRadio) {
		submitBtn.blur()
		return
	}

	const userAnswer = parseInt(checkedRadio.value)
	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearPage()
		showQuestion()
		return
	} else {
		clearPage()
		showResults()
	}
}

function showResults() {
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`

	let title, message
	if (score === questions.length) {
		title = 'Вы - молодец!'
		message = 'Вы ответили верно на все вопросы!'
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохо!'
		message = 'Вы дали более половины правильных ответов'
	} else {
		title = 'Стоит постараться'
		message = 'Пока у вас меньше половины правильных ответов'
	}

	let result = `${score} из ${questions.length}`
	headerContainer.innerHTML = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result)
	submitBtn.blur()
	submitBtn.innerText = 'Начать заново'
	submitBtn.onclick = () => history.go()
}