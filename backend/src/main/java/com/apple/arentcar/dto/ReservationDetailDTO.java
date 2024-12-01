package com.apple.arentcar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
public class ReservationDetailDTO {
    private String reservationCode;      // 예약 ID
    private String userName;             // 사용자 이름
    private String userBirthDate;        // 생년월일
    private String userPhoneNumber;      // 연락처
    private String userEmail;            // 이메일
    private String licenseIssueDate;     // 면허 발급일
    private String licenseExpiryDate;    // 면허 갱신일
    private String carNumber;            // 차량 번호
    private String carTypeName;          // 차량명
    private String modelYear;            // 차량 연도
    private String fuelTypeName;         // 연료 유형 이름
    private String rentalLocationName;   // 대여 지점 이름
    private LocalDate rentalDate;        // 대여 날짜 (LocalDate)
    private LocalTime rentalTime;        // 대여 시간 (LocalTime)
    private String returnLocationName;   // 반납 지점 이름
    private LocalDate returnDate;        // 반납 날짜 (LocalDate)
    private LocalTime returnTime;        // 반납 시간 (LocalTime)
    private String insuranceName;        // 보험 유형 이름
    private String paymentCategoryName;  // 결제 카테고리 이름
    private String paymentTypeName;      // 결제 방식 이름
    private String paymentAmount;        // 결제 금액
}
