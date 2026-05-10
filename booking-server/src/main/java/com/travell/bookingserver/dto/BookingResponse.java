package com.travell.bookingserver.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingResponse {

    private Long bookingId;
    private String status;
    private String message;
}