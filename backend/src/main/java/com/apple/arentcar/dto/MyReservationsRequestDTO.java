package com.apple.arentcar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyReservationsRequestDTO {
    private String userCode;
    private String rentalLocationName;
    private String reservationDate;
    private int offset;
    private int pageSize;
}
