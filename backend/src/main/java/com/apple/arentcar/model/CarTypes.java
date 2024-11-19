package com.apple.arentcar.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CarTypes {

    private Integer carTypeCode;

    private String carTypeCategory;

    private String originType;

    private String carTypeName;

    private String seatingCapacity;

    private String fuelType;

    private String speedLimit;

    private String licenseRestriction;

    private String carManufacturer;

    private String modelYear;

    private String carImageName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
