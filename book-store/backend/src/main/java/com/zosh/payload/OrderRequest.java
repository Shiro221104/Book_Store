package com.zosh.payload;

import java.time.LocalDateTime;
import java.util.List;
public class OrderRequest {
    private UserDTO user;
    private String status;
    private String shippingAddress; 
    private double totalPrice;
    private List<BookOrderRequest> bookOrders;
   private LocalDateTime date;
  
    private String paymentMethod;

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<BookOrderRequest> getBookOrders() {
        return bookOrders;
    }

    public void setBookOrders(List<BookOrderRequest> bookOrders) {
        this.bookOrders = bookOrders;
    }


    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public LocalDateTime getDate() {
    return date;
}

public void setDate(LocalDateTime date) {
    this.date = date;
}
}
