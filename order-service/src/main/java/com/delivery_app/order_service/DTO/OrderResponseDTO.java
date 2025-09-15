package com.delivery_app.order_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {

    private Long id;
    private String customerName;
    private String product;
    private Integer quantity;
    private String status;
    private LocalDateTime createdAt;
}
