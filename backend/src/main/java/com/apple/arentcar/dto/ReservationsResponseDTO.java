package com.apple.arentcar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
public class ReservationsResponseDTO {
    private String reservationCode;       // 예약 코드
    private String userName;              // 사용자 이름
    private String carNumber;             // 차량 번호
    private String carTypeName;           // 차량 모델명
    private String rentalLocationName;    // 대여 지점 이름
    private LocalDate rentalDate;         // 대여 날짜
    private LocalDate returnDate;         // 반납 날짜
}
