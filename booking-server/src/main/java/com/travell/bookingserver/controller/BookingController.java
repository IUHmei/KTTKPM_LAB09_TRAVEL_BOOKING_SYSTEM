package com.travell.bookingserver.controller;

import com.travell.bookingserver.dto.BookingRequest;
import com.travell.bookingserver.dto.BookingResponse;
import com.travell.bookingserver.service.BookingService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(
            @Valid @RequestBody BookingRequest request
    ) {

        return bookingService.createBooking(request);
    }
}