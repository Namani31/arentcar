package com.apple.arentcar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationsSearchRequestDTO {
    private String userName;
    private String rentalLocationName;
    private String rentalDate;
    private int pageNumber; // 페이지 번호
    private int pageSize;
}
