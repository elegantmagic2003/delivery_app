package com.delivery_app.order_service.repository;

import com.delivery_app.order_service.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Custom query methods can be defined here if needed
    List<Order> findByCustomerId(Long customerId);

}
