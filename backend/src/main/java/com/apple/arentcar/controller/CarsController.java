package com.apple.arentcar.controller;

import com.apple.arentcar.model.Cars;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class CarsController {

    @GetMapping("/manager/cars")
    public List<Cars> getAllCars() { return null;}
}
