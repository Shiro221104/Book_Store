package com.zosh.models;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDateTime date;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "totalprice")
    private double totalPrice;
    @Column(name = "shippingaddress", nullable = false)
private String shippingAddress;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<BookOrder> bookOrders;
    public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public LocalDateTime getDate() {
    return date;
}

public void setDate(LocalDateTime date) {
    this.date = date;
}

public OrderStatus getStatus() {
    return status;
}

public void setStatus(OrderStatus status) {
    this.status = status;
}

public double getTotalPrice() {
    return totalPrice;
}

public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
}
public String getShippingAddress() {
    return shippingAddress;
}

public void setShippingAddress(String shippingAddress) {
    this.shippingAddress = shippingAddress;
}
public User getUser() {
    return user;
}

public void setUser(User user) {
    this.user = user;
}

public Payment getPayment() {
    return payment;
}

public void setPayment(Payment payment) {
    this.payment = payment;
}

public List<BookOrder> getBookOrders() {
    return bookOrders;
}

public void setBookOrders(List<BookOrder> bookOrders) {
    this.bookOrders = bookOrders;
}
}