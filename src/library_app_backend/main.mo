import Text "mo:base/Text";
import Int32 "mo:base/Int32";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Option "mo:base/Option";
import Bool "mo:base/Bool";

actor Library {
  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

  public type BookId = Nat32;
  public type AuthorId = Nat32;

  public type Book = {
    author : AuthorId;
    genre : Text;
    pages : Int32;
    synopsis : Text;
    title : Text;
  };

  public type Author = {
    name : Text;
    books : [BookId];
  };

  private stable var nextBookId : BookId = 0;
  private stable var nextAuthorId : AuthorId = 0;

  private stable var books : Trie.Trie<BookId, Book> = Trie.empty();
  private stable var authors : Trie.Trie<AuthorId, Author> = Trie.empty();

  public func createAuthor(author : Author) : async AuthorId {
    let authorId = nextAuthorId;
    nextAuthorId += 1;

    authors := Trie.put<AuthorId, Author>(authors, key(authorId), Nat32.equal, author).0;

    return authorId;
  };

  public func getAuthors() : async [Author] {
    let authorArray = Trie.toArray<AuthorId, Author, Author>(authors, func(k, v) = v);

    return authorArray;
  };

  public func getAuthorById(authorId : AuthorId) : async ?Author {
    let result = Trie.find(authors, key(authorId), Nat32.equal);

    return result;
  };

  public func updateAuthor(authorId : AuthorId, author : Author) : async Bool {
    let result = Trie.find(authors, key(authorId), Nat32.equal);
    let exists = Option.isSome(result);

    if (exists) {
      authors := Trie.replace(authors, key(authorId), Nat32.equal, ?author).0;
    };

    return exists;
  };

  public func removeAuthor(authorId : AuthorId) : async Bool {
    let result = Trie.find(authors, key(authorId), Nat32.equal);
    let exists = Option.isSome(result);

    if (exists) {
      authors := Trie.replace(authors, key(authorId), Nat32.equal, null).0;
    };

    return exists;
  };

  public func getAuthor(authorId : AuthorId) : async ?Author {
    let result = Trie.find(authors, key(authorId), Nat32.equal);

    return result;
  };

  public func createBook(book : Book) : async ?BookId {
    var author = Trie.find(authors, key(book.author), Nat32.equal);
    let exists = Option.isSome(author);

    if (exists) {
      let bookId = nextBookId;
      nextBookId += 1;

      // TODO: Add book to author's list of books
      books := Trie.put<BookId, Book>(books, key(bookId), Nat32.equal, book).0;

      return ?bookId;
    };

    return null;
  };

  public func getBooks() : async [Book] {
    let bookArray = Trie.toArray<BookId, Book, Book>(books, func(k, v) = v);

    return bookArray;
  };

  public func getBook(bookId : BookId) : async ?Book {
    let result = Trie.find(books, key(bookId), Nat32.equal);

    return result;
  };

  public func removeBook(bookId : BookId) : async Bool {
    let result = Trie.find(books, key(bookId), Nat32.equal);
    let exists = Option.isSome(result);

    if (exists) {
      // TODO: Remove book from author's list of books
      books := Trie.replace(books, key(bookId), Nat32.equal, null).0;
    };

    return exists;
  };

  public func updateBook(bookId : BookId, book : Book) : async Bool {
    let result = Trie.find(books, key(bookId), Nat32.equal);
    let exists = Option.isSome(result);

    if (exists) {
      books := Trie.replace(
        books,
        key(bookId),
        Nat32.equal,
        ?book,
      ).0;
    };
    return exists;
  };

  private func key(x : BookId) : Trie.Key<BookId> {
    return { hash = x; key = x };
  };
};
