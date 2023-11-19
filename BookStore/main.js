const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// مصفوفة لتخزين بينات الكتب
const books = [
  [1, 'Start with why', 'Simon Sinek', 80.0, 13],
  [2, 'But how do it know', 'J. Clark Scott', 59.9, 22],
  [3, 'Clean Code', 'Robert Cecil Martin', 50.0, 5],
  [4, 'Zero to One', 'Peter Thiel', 45.0, 12],
  [5, "You don't know JS", 'Kyle Simpson', 39.9, 9]
];
// هذه الدالة لعرض الكتب
function displayBooks() {
  console.log('Book Id | Title | Author | Price | Quantity');
  books.forEach(book => {
    console.log(book.join(' | '));
  });
}
// هذه الدالة تمكننا من البحث عن الكتاب بوسطة عنوان او رقمه او مؤلفه
function searchBook(id, title, author) {
  const result = [];
  books.forEach(book => {
    if ((id && book[0] === id) || (title && book[1] === title) || (author && book[2] === author)) {
      result.push(book);
    }
  });
  return result;
}



function sellBook(title, quantity, balance) {
  // نبحث عن الكتاب بواسطة العنوان
  const book = books.find(book => book[1] === title);

  // هل الكتاب موجود
  if (book) {
    const bookId = book[0];
    const bookPrice = book[3];
    const availableQuantity = book[4];

    // فحص اذا الكمية المطلوبة موجودة
    if (availableQuantity >= quantity) {
      // فحص اذا يوجد رصيد كاف او لا
      const totalPrice = bookPrice * quantity;
      if (balance >= totalPrice) {
        // تحديث الكمية وتحديث الرصيد
        book[4] -= quantity;
        balance -= totalPrice;
        console.log('The Bill');
        // Generate and display the invoice
        console.log(`Book Title: ${title}`+`\nBook ID: ${bookId}`);
        console.log(`Quantity: ${quantity}`+`\nTotal Price: ${totalPrice}`);
        console.log(`Remaining Balance: ${balance}`);
      } else {
        console.log('رصيدك غير كافي');
      }
    } else {
      console.log('الكمية المطلوبة غير متوفرة');
    }
  } else {
    console.log('الكتبا ليس موجود لدينا.');
  }
    
}


function Menu() {
  console.log('\n1. Add Book\n2. Edit Book\n3. Delete Book\n4. Display Books\n5. Search Books\n6. Sell Book\n7. Exit');
  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '1':
        books.push([11,"Hello C++",'john smith',60.0,20])
        console.log("Book Added Successfully");
        Menu();
        break;
      case '2':
        console.log("Book edited successfully.");
        Menu();
        break;
      case '3':
       console.log("no books selected");
       Menu();
        break;
      case '4':
        displayBooks();
        Menu();
        break;
      case '5':
        const searchResult = searchBook(3, 'Zero to One', 'John Smith');

        if (searchResult.length > 0) {
          console.log('Book Found:');
          searchResult.forEach(book => {
            console.log(`Book ID: ${book[0]}, Title: ${book[1]}, Author: ${book[2]}, Price: ${book[3]}, Quantity: ${book[4]}`);
          });
        } else {
          console.log('Book Not Found.');
        }
        Menu();
        break;
      case '6':
        console.log("silling Book:");
        const currentBalance = 200; 
        sellBook('Clean Code', 3, currentBalance);
        console.log("selling 2");
        sellBook(`You don't know JS`, 3, 100);
        Menu();
        break;
      case '7':
        rl.close();
        break;
      default:
        console.log('Invalid option. Please try again.');
        Menu();
    }
  });
}

// Start the program
Menu();
