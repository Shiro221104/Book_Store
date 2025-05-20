package com.zosh.repository;
import java.util.List;

import  org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.models.Book;
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);

}