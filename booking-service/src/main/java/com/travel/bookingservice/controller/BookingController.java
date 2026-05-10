package com.travel.bookingservice.controller;

import com.travel.bookingservice.dto.BookingRequest;
import com.travel.bookingservice.dto.BookingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {

        // 1. Validate input
        if (request.getUserId() == null || request.getTourId() == null) {
            return ResponseEntity.badRequest()
                    .body("userId and tourId must not be null");
        }

        // 2. Simulate booking creation
        long bookingId = 1000 + new Random().nextInt(9000);

        BookingResponse response =
                new BookingResponse(bookingId, "CREATED");

        return ResponseEntity.ok(response);
    }
}