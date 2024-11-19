package com.apple.arentcar.service;

import com.apple.arentcar.mapper.CarsMapper;
import com.apple.arentcar.model.CarTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarsService {

    @Autowired
    private CarsMapper carsMapper;

    public List<CarTypes> getAllCars() { return carsMapper.getAllCars(); }
}
