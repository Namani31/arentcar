package com.apple.arentcar.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ManagePaymentRequestDTO {

    private String userName;
    private String branchName;
    private String rentalDate;
    private int pageNumber;
    private int pageSize;
    private int offset;


}
