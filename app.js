const bookContainer = document.querySelector('.book-container');
const showBtn = document.getElementById('show-dialog');
const submitBtn = document.getElementById('submit-button');
const dialog = document.getElementById('dialog');
const form = document.getElementById('form');

const myLibrary = [
  {
    title: 'Eragon',
    author: 'Christopher Paolini',
    pages: '500',
    isRead: 'true',
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
  if (myLibrary[cardNumber].isRead === 'true') {
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

  if (myLibrary[cardNumber].isRead === 'true') {
    buttonIsRead.classList.add('read');
  }
}

function displayBooksOnScreen() {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const i in myLibrary) {
    createCard(i);
    addCardElements(i);
  }
}

displayBooksOnScreen();

showBtn.addEventListener('click', () => {
  dialog.showModal();
});

function changeReadStatus(index) {
  if (myLibrary[index].isRead === 'true') {
    myLibrary[index].isRead = 'false';
  } else {
    myLibrary[index].isRead = 'true';
  }
}

function readButtonToggle() {
  const buttonRead = document.querySelectorAll('[class*=buttonIs]');
  buttonRead.forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = Number(e.target.classList.value.split('-')[1][0]);

      button.classList.toggle('read');
      if (button.textContent === 'Read') {
        // eslint-disable-next-line no-param-reassign
        button.textContent = 'Not Read';
      } else {
        // eslint-disable-next-line no-param-reassign
        button.textContent = 'Read';
      }
      changeReadStatus(index);
    });
  });
}

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

readButtonToggle();

const titleInput = document.getElementById('title-input');
const titleInputError = titleInput.nextElementSibling;
const authorInput = document.getElementById('author-input');
const authorInputError = authorInput.nextElementSibling;
const pagesInput = document.getElementById('pages-input');
const pagesInputError = pagesInput.nextElementSibling;
const readInput = document.getElementById('isRead');

function showError(input, span, type) {
  if (input.validity.valueMissing) {
    // eslint-disable-next-line no-param-reassign
    span.textContent = `You need to enter ${type}!`;
    // eslint-disable-next-line no-param-reassign
    span.className = 'error active';
  }
}

titleInput.addEventListener('input', () => {
  if (titleInput.validity.valid) {
    titleInputError.textContent = '';
    titleInputError.className = 'error';
  } else {
    showError(titleInput, titleInputError, 'a title');
  }
});
authorInput.addEventListener('input', () => {
  if (authorInput.validity.valid) {
    authorInputError.textContent = '';
    authorInputError.className = 'error';
  } else {
    showError(authorInput, authorInputError, 'an author');
  }
});
pagesInput.addEventListener('input', () => {
  if (pagesInput.validity.valid) {
    pagesInputError.textContent = '';
    pagesInputError.className = 'error';
  } else {
    showError(pagesInput, pagesInputError, 'a number of pages');
  }
});

form.addEventListener('submit', (e) => {
  if (!titleInput.validity.valid) {
    showError(titleInput, titleInputError, 'a title');
    e.preventDefault();
  } else if (!authorInput.validity.valid) {
    showError(authorInput, authorInputError, 'an author');
    e.preventDefault();
  } else if (!pagesInput.validity.valid) {
    showError(pagesInput, pagesInputError, 'a number of pages');
    e.preventDefault();
  } else {
    const book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
    myLibrary.push(book);
    clearAllCards();
    displayBooksOnScreen();
    removeBooks();
    readButtonToggle();
    dialog.close();
  }
});
