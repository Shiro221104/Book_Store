package com.zosh.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.models.Book;
import com.zosh.repository.BookRepository;
@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*") 
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam("query") String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }
  @PostMapping
public ResponseEntity<Book> addBook(@RequestBody Book book) {
    Book savedBook = bookRepository.save(book);
    return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
}
@PutMapping("/{id}")
public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
    return bookRepository.findById(id)
        .map(book -> {
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setPrice(updatedBook.getPrice());
            book.setDescription(updatedBook.getDescription());
            book.setCategory(updatedBook.getCategory());
            book.setGenre(updatedBook.getGenre());
            book.setImage(updatedBook.getImage());
            book.setPublisher(updatedBook.getPublisher());
            book.setQuantity(updatedBook.getQuantity());
            book.setTrending(updatedBook.isTrending());
            Book saved = bookRepository.save(book);
            return new ResponseEntity<>(saved, HttpStatus.OK);
        })
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
}
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
    if (bookRepository.existsById(id)) {
        bookRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}


}

