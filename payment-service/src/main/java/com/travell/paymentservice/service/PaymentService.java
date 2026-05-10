package com.travell.paymentservice.service;

import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PaymentService {

    private final AtomicLong idGen = new AtomicLong(5000);
    private final Random random = new Random();

    public String processPayment(Long bookingId, Double amount) {

        boolean success = random.nextBoolean();

        return success ? "SUCCESS" : "FAILED";
    }

    public Long generatePaymentId() {
        return idGen.incrementAndGet();
    }
}