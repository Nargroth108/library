const bookContainer = document.querySelector('.book-container');
const showBtn = document.getElementById('show-dialog');
const submitBtn = document.getElementById('submit-button');
const dialog = document.getElementById('dialog');

const myLibrary = [
	{
		title: 'Eragon',
		author: 'Christopher Paolini',
		pages: '500',
		isRead: true,
	},
];

class Book {
	constructor(title, author, pages, isRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
	}
}

function clearAllCards() {
	const cards = document.querySelectorAll('[class^=card-]');
	cards.forEach((card) => {
		card.remove();
	});
}

function createCard(cardNumber) {
	const div = document.createElement('div');
	div.classList.add(`card-${cardNumber}`);
	bookContainer.appendChild(div);
}

function addCardElements(cardNumber) {
	const card = document.querySelector(`.card-${cardNumber}`);
	const pTitle = document.createElement('p');
	const pAuthor = document.createElement('p');
	const pPages = document.createElement('p');
	const buttonIsRead = document.createElement('button');
	const buttonDelete = document.createElement('button');

	buttonIsRead.classList.add(`buttonIsRead-${cardNumber}`);
	buttonDelete.classList.add(`buttonDelete-${cardNumber}`);

	pTitle.textContent = myLibrary[cardNumber].title;
	pAuthor.textContent = myLibrary[cardNumber].author;
	pPages.textContent = myLibrary[cardNumber].pages;
	if (myLibrary[cardNumber].isRead === true) {
		buttonIsRead.textContent = 'Read';
	} else {
		buttonIsRead.textContent = 'Not Read';
	}
	buttonDelete.textContent = 'Remove Book';

	card.appendChild(pTitle);
	card.appendChild(pAuthor);
	card.appendChild(pPages);
	card.appendChild(buttonIsRead);
	card.appendChild(buttonDelete);

	if (myLibrary[cardNumber].isRead === true) {
		buttonIsRead.classList.add('read');
	}
}

function displayBooksOnScreen() {
	for (const i in myLibrary) {
		createCard(i);
		addCardElements(i);
	}
}

displayBooksOnScreen();

showBtn.addEventListener('click', () => {
	dialog.showModal();
});

function removeBooks() {
	const removeBook = document.querySelectorAll('[class^=buttonDelete-]');
	removeBook.forEach((button) => {
		button.addEventListener('click', (e) => {
			const index = e.target.classList.value.split('-')[1];
			const cards = document.querySelectorAll('[class^=card-]');

			myLibrary.splice(Number(index), 1);
			cards.forEach((card) => {
				card.remove();
			});
			displayBooksOnScreen();
			removeBooks();
			readButtonToggle();
		});
	});
}

removeBooks();

function readButtonToggle() {
	const buttonRead = document.querySelectorAll('[class*=buttonIs]');
	buttonRead.forEach((button) => {
		button.addEventListener('click', (e) => {
			const index = Number(e.target.classList.value.split('-')[1][0]);

			button.classList.toggle('read');
			if (button.textContent === 'Read') {
				button.textContent = 'Not Read';
			} else {
				button.textContent = 'Read';
			}
			changeReadStatus(index);
		});
	});
}

function changeReadStatus(index) {
	if (myLibrary[index].isRead === true) {
		myLibrary[index].isRead = false;
	} else {
		myLibrary[index].isRead = true;
	}
}

readButtonToggle();

submitBtn.addEventListener('click', () => {
	const titleInput = document.getElementById('title-input').value;
	const authorInput = document.getElementById('author-input').value;
	const pagesInput = document.getElementById('pages-input').value;
	const readInput = document.getElementById('isRead').value;
	let book = new Book(titleInput, authorInput, pagesInput, readInput);
	myLibrary.push(book);
	clearAllCards();
	displayBooksOnScreen();
	removeBooks();
	readButtonToggle();
	dialog.close();
});

// git push library-class
// git checkout main
// git merge library-class
// git push origin main
// git branch -d library-class
// git push origin --delete library-class
