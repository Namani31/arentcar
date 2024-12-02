package com.apple.arentcar.dto;

import lombok.Data;

@Data
public class ManagePaymentDTO {

    private int reservationCode;
    private String userName;
    private String branchName;
    private String carType;
    private String rentalPeriod;
    private String paymentAmount;

}
