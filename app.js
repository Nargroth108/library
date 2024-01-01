  function Book(title, author, numOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
    this.info = function() {
      let infos = (`${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.readStatus}.`);
      return infos
    };
    return this.info()
  }

const theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', 200, 'not read yet');
console.log(theHobbit.info())