package com.apple.arentcar.controller;

import com.apple.arentcar.model.RentalCars;
import com.apple.arentcar.service.RentalCarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
