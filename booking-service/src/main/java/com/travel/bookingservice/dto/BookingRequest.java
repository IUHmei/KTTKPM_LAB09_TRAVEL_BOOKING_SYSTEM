package com.travel.bookingservice.dto;

import lombok.Data;

@Data
public class BookingRequest {
    private Long userId;
    private Long tourId;
}