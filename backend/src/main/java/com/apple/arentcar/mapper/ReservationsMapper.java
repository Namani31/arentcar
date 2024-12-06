package com.apple.arentcar.mapper;

import com.apple.arentcar.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReservationsMapper {
    List<ReservationsResponseDTO> getReservations(ReservationsSearchRequestDTO requestDTO);

    int countByConditions(ReservationsSearchRequestDTO searchRequestDTO);

    int countAllReservations();

    ReservationDetailDTO getReservationsDetailById(@Param("reservationCode") String reservationCode);

    void updateCarStatus(@Param("carNumber") String carNumber, @Param("carStatus") String carStatus);

    void updateReservationStatus(@Param("reservationCode") String reservationCode, @Param("reservationStatus") String reservationStatus);

    List<MyReservationsResponseDTO> findReservationsByUserCode(MyReservationsRequestDTO myrequestDTO);

    int countMyReservations(MyReservationsRequestDTO SearchRequestDTO);

    int countAllMyReservations(String userCode);
}