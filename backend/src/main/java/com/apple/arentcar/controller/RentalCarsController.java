package com.apple.arentcar.controller;

import com.apple.arentcar.model.RentalCars;
import com.apple.arentcar.service.RentalCarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
