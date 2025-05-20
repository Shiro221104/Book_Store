package com.zosh.models;

import jakarta.persistence.Column;
import  jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
    public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public PaymentMethod getMethod() {
    return method;
}

public void setMethod(PaymentMethod method) {
    this.method = method;
}

public Order getOrder() {
    return order;
}

public void setOrder(Order order) {
    this.order = order;
}

}