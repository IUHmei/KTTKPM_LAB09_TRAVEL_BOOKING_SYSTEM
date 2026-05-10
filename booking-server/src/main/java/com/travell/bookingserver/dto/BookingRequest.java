package com.travell.bookingserver.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingRequest {

    @NotNull(message = "User ID không được để trống")
    private Long userId;

    @NotNull(message = "Tour ID không được để trống")
    private Long tourId;

    @Min(value = 1, message = "Quantity phải >= 1")
    private int quantity;
}