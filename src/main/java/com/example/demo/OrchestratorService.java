package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrchestratorService {

	@Autowired
	private RestTemplate restTemplate;

	@Value("${service.user.url}")
	private String userUrl;

	@Value("${service.tour.url}")
	private String tourUrl;

	@Value("${service.booking.url}")
	private String bookingUrl;

	@Value("${service.payment.url}")
	private String paymentUrl;

	public BookingResponse processBookTour(BookingRequest request) {
		try {
			// Bước 1: Validate User (User Service) [cite: 347]
			System.out.println("Step 1: Validating user...");
			Object user = restTemplate.getForObject(userUrl + "/api/users/" + request.getUserId(), Object.class);
			if (user == null)
				return new BookingResponse("FAIL", "User không tồn tại", null);

			// Bước 2: Lấy thông tin tour (Tour Service) [cite: 348]
			System.out.println("Step 2: Getting tour info...");
			Object tour = restTemplate.getForObject(tourUrl + "/api/tours/" + request.getTourId(), Object.class);
			if (tour == null)
				return new BookingResponse("FAIL", "Tour không tồn tại", null);

			// Bước 3: Tạo booking (Booking Service) [cite: 349]
			System.out.println("Step 3: Creating booking...");
			Object booking = restTemplate.postForObject(bookingUrl + "/api/bookings", request, Object.class);

			// Bước 4: Gọi Payment Service [cite: 350]
			System.out.println("Step 4: Processing payment...");
			// Giả lập gửi thông tin booking để thanh toán
			Object paymentResult = restTemplate.postForObject(paymentUrl + "/api/payments", booking, Object.class);

			// Bước 5: Trả kết quả về Frontend [cite: 351]
			return new BookingResponse("SUCCESS", "Đặt tour thành công!", paymentResult);

		} catch (Exception e) {
			return new BookingResponse("ERROR", "Lỗi hệ thống: " + e.getMessage(), null);
		}
	}
}