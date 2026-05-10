package com.example.demo;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

//Phản hồi tổng hợp từ Orchestrator trả về Frontend [cite: 351]
@Data
@NoArgsConstructor
@Builder
@ToString
public class BookingResponse {

	public BookingResponse(String status, String message, Object details) {
		super();
		this.status = status;
		this.message = message;
		this.details = details;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getDetails() {
		return details;
	}

	public void setDetails(Object details) {
		this.details = details;
	}

	private String status;
	private String message;
	private Object details;
}