package com.apple.arentcar.service;

import com.apple.arentcar.mapper.RentalCarsMapper;
import com.apple.arentcar.model.RentalCars;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentalCarsService {

    @Autowired
    private RentalCarsMapper rentalCarsMapper;

    public List<RentalCars> getAllRentalCars() { return rentalCarsMapper.getAllRentalCars(); }

    public RentalCars getRentalCarsById(Integer carCode) { return rentalCarsMapper.getRentalCarsById(carCode); }

    // 차량 등록
    public RentalCars createRentalCars(RentalCars rentalCars) {
        rentalCarsMapper.createRentalCars(rentalCars);
        return rentalCars;
    }

}
