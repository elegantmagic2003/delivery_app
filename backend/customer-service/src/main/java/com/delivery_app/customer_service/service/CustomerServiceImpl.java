package com.delivery_app.customer_service.service;

import com.delivery_app.customer_service.DTO.CustomerRequestDTO;
import com.delivery_app.customer_service.DTO.CustomerResponseDTO;
import com.delivery_app.customer_service.entity.Customer;
import com.delivery_app.customer_service.repository.CustomerRepository;
import com.delivery_app.customer_service.entity.User;
import com.delivery_app.customer_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private CustomerResponseDTO mapToDTO(Customer customer) {
        return new CustomerResponseDTO(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress()
        );
    }

    private Customer mapToEntity(CustomerRequestDTO dto) {
        return Customer.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .build();
    }

    @Override
    public CustomerResponseDTO createCustomer(CustomerRequestDTO dto) {
        // Lưu customer
        Customer customer = mapToEntity(dto);
        Customer saved = customerRepository.save(customer);

        // Tạo user tự động với id trùng customer.id
        User user = User.builder()
                .id(saved.getId()) // ép id trùng với customer
                .username(saved.getEmail()) // hoặc phone nếu muốn
                .password(passwordEncoder.encode("123")) // mật khẩu mặc định
                .role("USER")
                .status("active")
                .fullName(saved.getName())
                .phone(saved.getPhone())
                .email(saved.getEmail())
                .build();

        userRepository.save(user);

        return mapToDTO(saved);
    }

    @Override
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public CustomerResponseDTO getCustomerById(Long id) {
        return customerRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }

    @Override
    public CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO dto) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        customer.setName(dto.getName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());

        Customer updated = customerRepository.save(customer);

        // Cập nhật thông tin user tương ứng
        userRepository.findById(id).ifPresent(user -> {
            user.setFullName(updated.getName());
            user.setEmail(updated.getEmail());
            user.setPhone(updated.getPhone());
            user.setUsername(updated.getEmail()); // hoặc phone
            userRepository.save(user);
        });

        return mapToDTO(updated);
    }

    @Override
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        customerRepository.deleteById(id);

        // Xoá luôn user tương ứng
        userRepository.deleteById(id);
    }
}
