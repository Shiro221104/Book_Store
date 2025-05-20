package com.zosh.security.services;

import java.util.List;

import com.zosh.models.Order;

public interface OrderService {
    Order createOrder(Order order);
    List<Order> getAllOrders();
    Order getOrderById(Long id);
    void deleteOrder(Long id);
}
