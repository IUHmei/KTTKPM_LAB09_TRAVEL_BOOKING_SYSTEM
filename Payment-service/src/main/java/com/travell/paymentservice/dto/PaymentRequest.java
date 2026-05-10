package com.travell.paymentservice.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequest {

    @NotNull(message = "Booking ID không được để trống")
    private Long bookingId;

    @Min(value = 1, message = "Amount phải lớn hơn 0")
    private double amount;
}