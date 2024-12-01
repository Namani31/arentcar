package com.apple.arentcar.service;

import com.apple.arentcar.dto.RentalCarRankingDataDTO;
import com.apple.arentcar.mapper.RentalCarsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentalCarsService {

    @Autowired
    private RentalCarsMapper rentalCarsMapper;

    public List<RentalCarRankingDataDTO> getTop5ReservedCars(String startDate, String endDate) {
        return rentalCarsMapper.getTop5ReservedCars(startDate, endDate);
    }
}
