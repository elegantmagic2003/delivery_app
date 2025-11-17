package com.delivery_app.warehouse.service.service;

import com.delivery_app.warehouse.service.entity.Warehouse;
import com.delivery_app.warehouse.service.repository.WarehouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {
    private final WarehouseRepository repository;

    public WarehouseService(WarehouseRepository repository) {
        this.repository = repository;
    }

    public List<Warehouse> getAll() {
        return repository.findAll();
    }

    public Warehouse getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Warehouse save(Warehouse warehouse) {
        return repository.save(warehouse);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}