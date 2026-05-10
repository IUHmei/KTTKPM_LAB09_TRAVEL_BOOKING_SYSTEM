package com.travell.paymentservice.controller;

import com.travell.paymentservice.dto.PaymentRequest;
import com.travell.paymentservice.dto.PaymentResponse;
import com.travell.paymentservice.service.PaymentService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public PaymentResponse payment(
            @Valid @RequestBody PaymentRequest request
    ) {

        return paymentService.processPayment(request);
    }
}