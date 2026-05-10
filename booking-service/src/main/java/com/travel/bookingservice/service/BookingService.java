package com.travel.bookingservice.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class BookingService {

    private final AtomicLong idGen = new AtomicLong(1000);

    public Long createBooking(Long userId, Long tourId) {
        return idGen.incrementAndGet();
    }
}