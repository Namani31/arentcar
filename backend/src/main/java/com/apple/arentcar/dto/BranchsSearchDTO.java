package com.apple.arentcar.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class BranchsSearchDTO {
    private int branchCode;
    private String branchName;
    private int regionCode;
    private String postCode;
    private String branchDetailedAddress;
    private String availablePickupTime;
    private String availableReturnTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
