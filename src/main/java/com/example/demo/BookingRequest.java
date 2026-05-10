package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;

//Yêu cầu từ Frontend gửi đến Orchestrator [cite: 345]
@Data
@AllArgsConstructor
public class BookingRequest {
	private Long userId;
	private Long tourId;
	private int quantity;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getTourId() {
		return tourId;
	}

	public void setTourId(Long tourId) {
		this.tourId = tourId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}