package com.delivery_app.order_service.service;

import com.delivery_app.order_service.DTO.OrderItemsDTO;
import com.delivery_app.order_service.DTO.OrderRequestDTO;
import com.delivery_app.order_service.DTO.OrderResponseDTO;
import com.delivery_app.order_service.entity.Order;
import com.delivery_app.order_service.entity.OrderItems;
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
                order.getStatus(),
                order.getCreatedAt(),
                order.getItems().stream()
                        .map(item -> new OrderItemsDTO(
                                item.getId(),
                                item.getProductId(),
                                item.getQuantity()
                        ))
                        .collect(toList())
        );
    }

    private Order mapToEntity(OrderRequestDTO dto) {
        Order order = new Order();
        order.setCustomerName(dto.getCustomerName());
        order.setStatus(dto.getStatus());

        if (dto.getItems() != null) {
            order.setItems(
                    dto.getItems().stream().map(itemDto -> {
                        OrderItems item = new OrderItems();
                        item.setProductId(itemDto.getProductId());
                        item.setQuantity(itemDto.getQuantity());
                        item.setOrder(order);
                        return item;
                    }).collect(Collectors.toList())
            );
        }

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
        order.setStatus(dto.getStatus());

        if (dto.getItems() != null) {
            order.getItems().clear(); // clear danh sách cũ
            dto.getItems().forEach(itemDto -> {
                OrderItems item = new OrderItems();
                item.setProductId(itemDto.getProductId());
                item.setQuantity(itemDto.getQuantity());
                item.setOrder(order);
                order.getItems().add(item);
            });
        }

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
