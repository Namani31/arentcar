package com.apple.arentcar.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationStatusRequestDTO {
    private String reservationStatus; // 예약 상태
    private String paymentStatus;     // 결제 상태
    private String carStatus;         // 차량 상태
}
