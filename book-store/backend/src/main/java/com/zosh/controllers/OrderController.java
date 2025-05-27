package com.zosh.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.models.Book;
import com.zosh.models.BookOrder;
import com.zosh.models.Order;
import com.zosh.models.OrderStatus;
import com.zosh.models.PaymentMethod;
import com.zosh.models.User;
import com.zosh.payload.BookOrderRequest;
import com.zosh.payload.OrderRequest;
import com.zosh.repository.BookRepository;
import com.zosh.repository.OrderRepository;
import com.zosh.repository.UserRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {

        Optional<User> optionalUser = userRepository.findById(request.getUser().getId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = optionalUser.get();

  
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.valueOf(request.getStatus()));
        order.setShippingAddress(request.getShippingAddress());
        order.setTotalPrice(request.getTotalPrice());
        order.setDate(request.getDate() != null ? request.getDate() : LocalDateTime.now());
        order.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()));

        List<BookOrder> bookOrderList = new ArrayList<>();

        for (BookOrderRequest bor : request.getBookOrders()) {
            Optional<Book> optionalBook = bookRepository.findById(bor.getBookId());
            if (optionalBook.isEmpty()) {
                return ResponseEntity.badRequest().body("Book not found: ID " + bor.getBookId());
            }

            BookOrder bookOrder = new BookOrder(order, optionalBook.get(), bor.getQuantity());
            bookOrderList.add(bookOrder);
        }

        order.setBookOrders(bookOrderList);

   
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        orderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
