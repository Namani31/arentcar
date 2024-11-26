package com.apple.arentcar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
<<<<<<< HEAD:backend/src/main/java/com/apple/arentcar/model/RentalCars.java
public class RentalCars {
    
    private Integer carCode;
    private Integer carTypeCode;
    private String carNumber;
=======
public class CarCardDTO {

    private String carTypeName;

    private String fuelType;

    private String seatingCapacity;

>>>>>>> ec4f0ee82a7b386ae8eb5528337fed8a6523a37d:backend/src/main/java/com/apple/arentcar/dto/CarCardDTO.java
    private String modelYear;
    private Integer branchCode;
    private String carStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
