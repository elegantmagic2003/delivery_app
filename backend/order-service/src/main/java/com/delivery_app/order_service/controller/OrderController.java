package com.delivery_app.order_service.controller;

import com.delivery_app.order_service.DTO.OrderRequestDTO;
import com.delivery_app.order_service.DTO.OrderResponseDTO;
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
    public OrderResponseDTO createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        // Logic to create a new order
        return orderService.createOrder(orderRequestDTO);
    }

    @GetMapping
    public List<OrderResponseDTO> getAllOrders() {
        // Logic to retrieve all orders
        return orderService.getAllOrders();
    }

    @PutMapping("/{id}")
    public OrderResponseDTO updateOrder(@PathVariable Long id, @RequestBody OrderRequestDTO dto) {
        // Logic to update an existing order
        return orderService.updateOrder(id, dto);
    }

    @GetMapping("/{id}")
    public OrderResponseDTO getOrderById(@PathVariable Long id) {
        // Logic to get an order by ID
        return orderService.getOrderById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        // Logic to delete an order
        orderService.deleteOrder(id);
    }

}
