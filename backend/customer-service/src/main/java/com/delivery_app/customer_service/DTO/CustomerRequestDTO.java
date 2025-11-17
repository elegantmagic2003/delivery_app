package com.delivery_app.customer_service.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerRequestDTO {
    private String name;
    private String email;
    private String phone;
    private String address;
}
