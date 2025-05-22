 

class Book {
  id: number;
  author: string;
  title: string;
  borrowed: boolean = false;
  borrower: number | null = null;

  constructor(author: string, title: string, isbn: number) {
    this.id = isbn;
    this.author = author;
    this.title = title
  }

  borrowBook(borrowerId: number) {
    this.borrowed = true;
    this.borrower = borrowerId;

    return `${this.title.charAt(0).toUpperCase() + this.title.slice(1).toLowerCase()} was successfully borrowed.`
  }

  returnBook(borrowerId: number){
    // I collected the borrowerId so i can first check if the book was legitly returned
    if(this.borrower === borrowerId) {
      this.borrower = null;
      this.borrowed = false;

      return `${this.title.charAt(0).toUpperCase() + this.title.slice(1).toLowerCase()} was sucessfully returned.`
    }else {
      return "Borrower Details does not match."
    }
  }
} 

class Member{
  id: number;
  name: string;
  role: "student" | "staff";

  constructor(name: string, role: "student" | "staff", matNo: number){
    this.id = matNo;
    this.name = name;
    this.role = role;
  }
}


class Library {
  libraryName: string;
  yearEstablished: number;
  books: Book[] = [];
  members: Member[] = [];


  constructor(libraryName: string, yearEstablished: number) {
    this.libraryName = libraryName;
    this.yearEstablished = yearEstablished;
  }

  confirmMember(borrowerId: number): boolean {
    const isMember = this.members.some(member => member.id === borrowerId);
    return isMember;
  }

  returnBook(bookTitle: string, borrowerId: number): string {
    //Confirm if the borrower is an original borrower
    const isMember = this.confirmMember(borrowerId);
    if(!isMember){
      return "You are not a member of our library."
    }

    // Find the borrowedBook
    const borrowedBook = this.books.find((book) => book.title.toLowerCase() === bookTitle.toLowerCase());
    if(!borrowedBook) {
      return "The book you are returning does not match any of our books." 
    }

    const returnMsg = borrowedBook.returnBook(borrowerId);
    return returnMsg;
  }

  borrowBook(bookTitle: string, borrowerId: number): string {
    // Confirm if the borrower is not a fake member of our library.
    const isMember = this.confirmMember(borrowerId);
    if(!isMember){
      return "You are not a member of our library."
    }

    const bookToBorrow = this.books.find((book) => book.title.toLowerCase() === bookTitle.toLowerCase());
    if(!bookToBorrow){
      return "There is no book by this name."
    }
    const isBookBorrowed = bookToBorrow?.borrowed;

    if(isBookBorrowed) {
      // Book is borrowed, tell the user the book is borrowed
      const borrowerDetails = this.members.find((member) => member.id === bookToBorrow.borrower);
      return `Member with name: ${borrowerDetails?.name} and id:${borrowerDetails?.id} has borrowed the book ${bookToBorrow.title.charAt(0).toUpperCase() + bookToBorrow.title.slice(1).toLowerCase()}.`
    }else {
      // Book is not borrowed, borrow the book.
      const borrowMsg = bookToBorrow.borrowBook(borrowerId);
      return borrowMsg;
    }
  }

  addBook(author: string, title: string, isbn: number): string {
    const checkISBNexists = this.books.find(book => book.id === isbn);
    if(checkISBNexists){
      return "Book is already in the library "
    }
    const newBook = new Book(author, title, isbn);
    this.books.push(newBook);
    return `${title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()} was successfully added to the library.`
  }

  createMember(name: string, role: "student" | "staff", matNo: number): string {
    const newMember = new Member(name, role, matNo);
    this.members.push(newMember);
    return `Member ${newMember.id} was created successfully.`

  }
}


const library = new Library("JB Library", 2025);
console.log(library.addBook("chinua achebe", "Things fall apart", 2245));
console.log(library.addBook("trish leigh", "Mind Over Explicit Matter", 3467));
console.log(library.addBook("james clear", "Atomic Habits", 6782));

console.log(library.borrowBook("Things fall apart",45678))

console.log(library.createMember("Tolu Ojo", "student", 230407001));
console.log(library.createMember("David Emmanuel", "student", 230407011));

console.log(library.borrowBook("Things fall apart",230407001))

console.log(library.borrowBook("Things fall apart",230407002))

console.log(library.borrowBook("Things fall apart",230407011))


console.log(library.returnBook("Things fall apart",230407001))


