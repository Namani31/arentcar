package com.apple.arentcar.controller;

import com.apple.arentcar.model.RentalCars;
import com.apple.arentcar.service.RentalCarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class RentalCarsController {

    @Autowired
    private RentalCarsService rentalCarsService;

    @GetMapping("/manager/rentalcars")
    public List<RentalCars> getAllRentalCars() { return rentalCarsService.getAllRentalCars(); }

    @GetMapping("/manager/rentalcars/{carCode}")
    public ResponseEntity<RentalCars> getRentalCarsById(@PathVariable Integer carCode) {
        RentalCars rentalCars = rentalCarsService.getRentalCarsById(carCode);
        if (rentalCars != null) {
            return ResponseEntity.ok(rentalCars);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 차량 등록
    @PostMapping("/manager/rentalcars")
    public ResponseEntity<RentalCars> createRentalCars(@RequestBody RentalCars rentalCars) {
        RentalCars savedRentalCars = rentalCarsService.createRentalCars(rentalCars);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRentalCars);
    }

}
