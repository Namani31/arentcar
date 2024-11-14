package com.apple.arentcar.service;

import com.apple.arentcar.mapper.CarMapper;
import com.apple.arentcar.mapper.MenusMapper;
import com.apple.arentcar.model.Menus;
import com.apple.arentcar.model.RentalCars;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarMapper CarMapper;

    public List<RentalCars> getAllCars() {
        return CarMapper.getAllCars();
    }
}
