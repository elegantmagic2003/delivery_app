package com.delivery_app.order_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {

    private String customerName;
    private String product;
    private Integer quantity;
    private String status;
}
