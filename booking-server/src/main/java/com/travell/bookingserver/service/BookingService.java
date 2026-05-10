package com.travell.bookingserver.service;


import com.travell.bookingserver.dto.BookingRequest;
import com.travell.bookingserver.dto.BookingResponse;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class BookingService {

    public BookingResponse createBooking(
            BookingRequest request
    ) {

        long bookingId =
                new Random().nextInt(10000);

        return new BookingResponse(
                bookingId,
                "SUCCESS",
                "Đặt tour thành công"
        );
    }
}