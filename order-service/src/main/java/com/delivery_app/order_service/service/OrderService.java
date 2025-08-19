package com.delivery_app.order_service.service;

import com.delivery_app.order_service.entity.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(Order order);
    List<Order> getAllOrders();
    Order updateOrder(Long id, Order order);
    void deleteOrder(Long id);
    Order getOrderById(Long id);

}
