package com.apple.arentcar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RentalCarsDTO {

    private Integer carCode;
    private Integer carTypeCode;
    private String carNumber;
    private String modelYear;
    private Integer branchCode;
    private String carStatus;
    private String carTypeCategory;
    private String originType;
    private String seatingCapacity;
    private String fuelType;
    private String carManufacturer;

}
