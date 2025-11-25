package com.delivery_app.order_service.service;

import com.delivery_app.order_service.DTO.OrderRequestDTO;
import com.delivery_app.order_service.DTO.OrderResponseDTO;
import com.delivery_app.order_service.entity.Order;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO);
    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO updateOrder(Long id, OrderRequestDTO dto);
    void deleteOrder(Long id);
    OrderResponseDTO getOrderById(Long id);
    List<OrderResponseDTO> getOrdersByCustomer(Long customerId);


}
