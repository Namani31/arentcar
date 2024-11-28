package com.apple.arentcar.controller;

import com.apple.arentcar.dto.ReservationsSearchRequestDTO;
import com.apple.arentcar.dto.ReservationsResponseDTO;
import com.apple.arentcar.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class ReservationsController {

    @Autowired
    private ReservationsService reservationsService;

    @GetMapping("/manager/reservations")
    public ResponseEntity<List<ReservationsResponseDTO>> getReservations(
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String rentalLocationName,
            @RequestParam(required = false) String rentalDate,
            @RequestParam(defaultValue = "1") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {

        pageNumber = Math.max(pageNumber, 1);
        int offset = (pageNumber - 1) * pageSize;

        ReservationsSearchRequestDTO requestDTO = new ReservationsSearchRequestDTO();
        requestDTO.setUserName(userName);
        requestDTO.setRentalLocationName(rentalLocationName);
        requestDTO.setRentalDate(rentalDate);
        requestDTO.setOffset(offset);
        requestDTO.setPageSize(pageSize);

        List<ReservationsResponseDTO> reservations = reservationsService.getReservations(requestDTO);

        if (reservations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(reservations);
    }
    @GetMapping("/manager/reservations/count")
    public ResponseEntity<Integer> getTotalReservationsCount(
        @RequestParam(required = false) String rentalLocationName,
        @RequestParam(required = false) String rentalDate,
        @RequestParam(required = false) String userName) {
            int count;

            // 조건별 조회
            if ((rentalLocationName != null && !rentalLocationName.isEmpty()) ||
                    (rentalDate != null && !rentalDate.isEmpty()) ||
                    (userName != null && !userName.isEmpty())) {

                // 조건별 DTO 생성
                ReservationsSearchRequestDTO searchRequestDTO = new ReservationsSearchRequestDTO();
                searchRequestDTO.setRentalLocationName(rentalLocationName);
                searchRequestDTO.setRentalDate(rentalDate);
                searchRequestDTO.setUserName(userName);

                // 조건에 따른 개수 조회
                count = reservationsService.countByConditions(searchRequestDTO);
            } else {
                // 전체 예약 개수 조회
                count = reservationsService.countAllReservations();
            }

            return ResponseEntity.ok(count);
    }

}