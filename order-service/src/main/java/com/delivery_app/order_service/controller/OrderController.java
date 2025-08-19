package com.delivery_app.order_service.controller;

import com.delivery_app.order_service.entity.Order;
import com.delivery_app.order_service.service.OrderService;
import com.delivery_app.order_service.service.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/new")
    public Order createOrder(@RequestBody Order order) {
        // Logic to create a new order
        return orderService.createOrder(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        // Logic to retrieve all orders
        return orderService.getAllOrders();
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order order) {
        // Logic to update an existing order
        return orderService.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        // Logic to delete an order
        orderService.deleteOrder(id);
    }

}
