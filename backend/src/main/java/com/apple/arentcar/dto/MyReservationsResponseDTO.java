package com.apple.arentcar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyReservationsResponseDTO {
    private String reservationCode;
    private String reservationDate;
    private String rentalDate;
    private String rentalLocationName;
    private String returnDate;
    private String returnLocationName;
    private String carTypeName;
    private String reservationStatus;
}
