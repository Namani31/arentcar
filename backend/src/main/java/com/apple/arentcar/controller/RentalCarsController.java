package com.apple.arentcar.controller;

import com.apple.arentcar.dto.RentalCarRankingDataDTO;
import com.apple.arentcar.model.RentalCars;
import com.apple.arentcar.service.RentalCarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class RentalCarsController {

    @Autowired
    private RentalCarsService rentalCarsService;

    @GetMapping("/manager/rentalcars")
    public ResponseEntity<List<RentalCarRankingDataDTO>> getTop5ReservedCars(@RequestParam String startDate, @RequestParam String endDate) {
        List<RentalCarRankingDataDTO> rentalCarRankingDataDto = rentalCarsService.getTop5ReservedCars(startDate, endDate);
        return ResponseEntity.ok(rentalCarRankingDataDto);
    }

}
