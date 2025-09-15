package com.delivery_app.order_service.service;

import com.delivery_app.order_service.DTO.OrderRequestDTO;
import com.delivery_app.order_service.DTO.OrderResponseDTO;
import com.delivery_app.order_service.entity.Order;
import com.delivery_app.order_service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    private OrderResponseDTO mapToDTO(Order order) {
        return new OrderResponseDTO(
                order.getId(),
                order.getCustomerName(),
                order.getProduct(),
                order.getQuantity(),
                order.getStatus(),
                order.getCreatedAt()
        );
    }

    private Order mapToEntity(OrderRequestDTO dto) {
        Order order = new Order();
        order.setCustomerName(dto.getCustomerName());
        order.setProduct(dto.getProduct());
        order.setQuantity(dto.getQuantity());
        order.setStatus(dto.getStatus());
        return order;
    }

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO dto) {
        Order order = mapToEntity(dto);
        return mapToDTO(orderRepository.save(order));
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO updateOrder(Long id, OrderRequestDTO dto) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setCustomerName(dto.getCustomerName());
        order.setProduct(dto.getProduct());
        order.setQuantity(dto.getQuantity());
        order.setStatus(dto.getStatus());

        return mapToDTO(orderRepository.save(order));
    }

    @Override
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }

    @Override
    public OrderResponseDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return mapToDTO(order);
    }


}
