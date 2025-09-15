package com.delivery_app.product_service.repository;

import com.delivery_app.product_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
