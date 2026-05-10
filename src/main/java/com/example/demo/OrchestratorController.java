package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Hỗ trợ CORS cho Frontend [cite: 92]
public class OrchestratorController {

	@Autowired
	private OrchestratorService orchestratorService;

	@PostMapping("/book-tour") // [cite: 345]
	public ResponseEntity<BookingResponse> bookTour(@RequestBody BookingRequest request) {
		BookingResponse response = orchestratorService.processBookTour(request);
		return ResponseEntity.ok(response);
	}
}