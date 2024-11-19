package com.apple.arentcar.mapper;

import com.apple.arentcar.model.CarTypes;
import com.apple.arentcar.model.Menus;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Mapper
public interface CarsMapper {

    List<CarTypes> getAllCars();

    CarTypes getCarsById(Integer carTypeCode);

    List<CarTypes> getCarsWithPaging(@Param("pageSize") int pageSize, @Param("offset") int offset);

    List<CarTypes> getCarsByNumWithPaging(@Param("carTypeName") String carTypeName, @Param("pageSize") int pageSize, @Param("offset") int offset);

    int countAllCars();

    int countByNameCars(@Param("carTypeName") String carTypeName);
}
