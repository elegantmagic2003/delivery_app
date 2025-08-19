package com.delivery_app.order_service.service;

import com.delivery_app.order_service.entity.Order;
import com.delivery_app.order_service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrder(Long id, Order order) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        existingOrder.setCustomerName(order.getCustomerName());
        existingOrder.setProduct(order.getProduct());
        existingOrder.setQuantity(order.getQuantity());
        existingOrder.setStatus(order.getStatus());
        return orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }

    @Override
    public Order getOrderById(Long id) {
        return null;
    }


}
