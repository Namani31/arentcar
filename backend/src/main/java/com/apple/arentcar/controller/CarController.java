package com.apple.arentcar.controller;

import com.apple.arentcar.dto.*;
import com.apple.arentcar.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/user/cars")
    public List<CarCardDTO> getAllCars(
            @RequestParam(name = "branchName",required = false, defaultValue = "수원 본점") String branchName,
            @RequestParam(name = "fuelType",required = false) String fuelType,
            @RequestParam(name = "carTypeCategory",required = false) String carTypeCategory,
            @RequestParam(name = "carManufacturer",required = false) String carManufacturer,
            @RequestParam(name = "seatingCapacity",required = false) String seatingCapacity
    ) {
        return carService.getAllCars(branchName,fuelType,carTypeCategory,carManufacturer,seatingCapacity);
    }

    @GetMapping("/user/cars/filter/countall")
    public Integer getFilterCarsCount(
            @RequestParam(name = "branchName",required = false, defaultValue = "수원 본점") String branchName,
            @RequestParam(name = "fuelType",required = false) String fuelType,
            @RequestParam(name = "carTypeCategory",required = false) String carTypeCategory,
            @RequestParam(name = "carManufacturer",required = false) String carManufacturer,
            @RequestParam(name = "seatingCapacity",required = false) String seatingCapacity
    ) {
        return carService.getFilterCarsCount(branchName,fuelType,carTypeCategory,carManufacturer, seatingCapacity);
    }

    @GetMapping("/user/cars/filter/cartype")
    public List<CarTypeDTO> getCarType() {
        return carService.getCarType();
    }

    @GetMapping("/user/cars/filter/carmanufacturer")
    public List<CarManufacturerDTO> getCarManufacturer() {
        return carService.getCarManufacturer();
    }

    @GetMapping("/user/cars/filter/fueltype")
    public List<FuelTypeDTO> getFuelType() {
        return carService.getFuelType();
    }

    @GetMapping("/user/cars/filter/seatingcapacity")
    public List<SeatingCapacityDTO> getSeatingCapacity() {
        return carService.getSeatingCapacity();
    }

    @GetMapping("/user/cars/filter/modelyear")
    public List<ModelYearDTO> getModelYear() {
        return carService.getModelYear();
    }

    @GetMapping("/user/cars/filter/cartypecategory")
    public List<CarTypeCategoryDTO> getCarTypeCategory() {
        return carService.getCarTypeCategory();
    }

    @GetMapping("/user/cars/branchs")
    public List<BranchsDTO> getAllBranchs() {
        return carService.getAllBranchs();
    }
}
