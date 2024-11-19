package com.apple.arentcar.service;

import com.apple.arentcar.mapper.CarsMapper;
import com.apple.arentcar.model.CarTypes;
import com.apple.arentcar.model.Menus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarsService {

    @Autowired
    private CarsMapper carsMapper;

    public List<CarTypes> getAllCars() { return carsMapper.getAllCars(); }

    public CarTypes getCarsById(Integer carTypeCode)  {
        return carsMapper.getCarsById(carTypeCode);
    }

    public List<CarTypes> getCarsWithPaging(int pageSize, int pageNumber) {
        int offset = (pageNumber - 1) * pageSize;
        return carsMapper.getCarsWithPaging(pageSize, offset);
    }

    public List<CarTypes> getCarsByNameWithPaging(String carTypeName, int pageSize, int pageNumber) {
        int offset = (pageNumber - 1) * pageSize;
        return carsMapper.getCarsByNameWithPaging(carTypeName, pageSize, offset);
    }

    public int countAllCars() {
        return carsMapper.countAllCars();
    }

    public int countByNameCars(String carTypeName) {
        return carsMapper.countByNameCars(carTypeName);
    }

    public CarTypes createCars(CarTypes carTypes) {
        carsMapper.createCars(carTypes);
        return carTypes;
    }

}
