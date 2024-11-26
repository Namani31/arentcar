package com.apple.arentcar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequestDTO {
    private String userName;
    private String rentalLocationName;
    private String rentalDate;
}
