package com.apple.arentcar.controller;

import com.apple.arentcar.model.Menus;
import com.apple.arentcar.model.RentalCars;
import com.apple.arentcar.service.CarService;
import com.apple.arentcar.service.MenusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/user/cars")
    public List<RentalCars> getAllCars() {
        return carService.getAllCars();
    }
}
