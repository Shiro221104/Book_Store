package com.zosh.controllers;

import java.time.LocalDateTime;
import java.util.List;

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
import com.zosh.models.Payment;
import com.zosh.models.User;
import com.zosh.payload.BookOrderRequest;
import com.zosh.payload.OrderRequest;
import com.zosh.repository.BookRepository;
import com.zosh.repository.OrderRepository;
import com.zosh.repository.UserRepository;
import com.zosh.security.services.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") 
public class OrderController {

    @Autowired
    private OrderService orderService;

    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        User user = userRepository.findById(request.getUser().getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.valueOf(request.getStatus()));
        order.setDate(LocalDateTime.now());
     order.setTotalPrice((double) request.getTotalPrice());
    order.setShippingAddress(request.getShippingAddress());


        // Set payment
        Payment payment = new Payment();
    
        order.setPayment(payment);

        // Set book orders
        for (BookOrderRequest item : request.getBookOrders()) {
    Book book = bookRepository.findById(item.getBookId())
        .orElseThrow(() -> new RuntimeException("Book not found"));

           

            BookOrder bookOrder = new BookOrder();
            bookOrder.setBook(book);
            bookOrder.setQuantity(item.getQuantity());
            bookOrder.setOrder(order);

            order.getBookOrders().add(bookOrder);
        }

        orderRepository.save(order);

           return ResponseEntity.ok("Order saved!");
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
