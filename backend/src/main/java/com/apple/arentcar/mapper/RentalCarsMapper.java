package com.apple.arentcar.mapper;

import com.apple.arentcar.dto.RentalCarRankingDataDTO;
import com.apple.arentcar.model.Admins;
import com.apple.arentcar.model.RentalCars;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RentalCarsMapper {

    List<RentalCars> getAllRentalCars();

    // 많이 예약된 차 5개 조회
    List<RentalCarRankingDataDTO> getTop5ReservedCars();
}
