package com.apple.arentcar.controller;

import com.apple.arentcar.model.CarTypes;
import com.apple.arentcar.service.CarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class CarsController {

    @Autowired
    private CarsService carsService;

    @GetMapping("/manager/cars")
    public List<CarTypes> getAllCars() { return carsService.getAllCars(); }
}
