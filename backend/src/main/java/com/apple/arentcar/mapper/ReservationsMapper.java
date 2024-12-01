package com.apple.arentcar.mapper;

import com.apple.arentcar.dto.CarReturnRequestDTO;
import com.apple.arentcar.dto.ReservationsSearchRequestDTO;
import com.apple.arentcar.dto.ReservationsResponseDTO;
import com.apple.arentcar.dto.ReservationDetailDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReservationsMapper {
    List<ReservationsResponseDTO> getReservations(ReservationsSearchRequestDTO requestDTO);
    // 조건에 따른 예약 개수 조회
    int countByConditions(ReservationsSearchRequestDTO searchRequestDTO);
    // 전체 예약 개수 조회
    int countAllReservations();

    ReservationDetailDTO getReservationsDetailById(@Param("reservationCode") String reservationCode);

    void updateCarStatus(@Param("carNumber") String carNumber, @Param("carStatus") String carStatus);
}