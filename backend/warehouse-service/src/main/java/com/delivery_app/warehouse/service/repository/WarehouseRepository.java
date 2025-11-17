package com.delivery_app.warehouse.service.repository;

import com.delivery_app.warehouse.service.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}
