package com.travell.paymentservice.service;
import com.travell.paymentservice.dto.PaymentRequest;
import com.travell.paymentservice.dto.PaymentResponse;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PaymentService {

    public PaymentResponse processPayment(PaymentRequest request) {

        boolean success = new Random().nextBoolean();

        if(success) {
            return new PaymentResponse(
                    "SUCCESS",
                    "Thanh toán thành công"
            );
        }

        return new PaymentResponse(
                "FAILED",
                "Thanh toán thất bại"
        );
    }
}
