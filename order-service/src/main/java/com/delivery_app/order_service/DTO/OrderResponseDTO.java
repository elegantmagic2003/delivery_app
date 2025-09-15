package com.delivery_app.order_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {

    private Long id;
    private String customerName;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemsDTO> items;
}
