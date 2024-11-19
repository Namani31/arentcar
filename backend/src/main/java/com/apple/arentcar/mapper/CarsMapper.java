package com.apple.arentcar.mapper;

import com.apple.arentcar.model.CarTypes;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CarsMapper {

    List<CarTypes> getAllCars();
}
