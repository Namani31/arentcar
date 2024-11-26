package com.apple.arentcar.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

<<<<<<< HEAD
import java.time.LocalDateTime;

=======
>>>>>>> f8fc7f67076a81edcc716051e5aefbe2fa95984a
@Getter
@Setter
@NoArgsConstructor
public class RentalCars {

<<<<<<< HEAD
    private Integer carCode;
    private Integer carTypeCode;
    private String carNumber;
    private String modelYear;
    private Integer branchCode;
    private String carStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

=======
    private String carTypeName;

    private String fuelType;

    private String seatingCapacity;

    private String modelYear;

    private String carImageName;

    private String carManufacturer;

    private String branchName;

    private String brandImageName;

    private String branchLatitude;

    private String branchLongitude;
>>>>>>> f8fc7f67076a81edcc716051e5aefbe2fa95984a
}
