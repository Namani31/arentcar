package com.apple.arentcar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationStatusRequestDTO {
    private String reservationStatus; // 예약 상태
    private String paymentStatus;     // 결제 상태
    private String carStatus;         // 차량 상태
}
