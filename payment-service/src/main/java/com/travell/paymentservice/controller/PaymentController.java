package com.travell.paymentservice.controller;

import com.travell.paymentservice.dto.PaymentRequest;
import com.travell.paymentservice.dto.PaymentResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @PostMapping
    public PaymentResponse pay(@RequestBody PaymentRequest req) {

        boolean success = new Random().nextBoolean();

        return new PaymentResponse(
                new Random().nextLong(1000, 9999),
                success ? "SUCCESS" : "FAILED"
        );
    }
}