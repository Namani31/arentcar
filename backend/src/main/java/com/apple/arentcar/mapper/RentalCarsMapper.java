package com.apple.arentcar.mapper;

import com.apple.arentcar.model.RentalCars;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RentalCarsMapper {

    List<RentalCars> getAllRentalCars();
}
