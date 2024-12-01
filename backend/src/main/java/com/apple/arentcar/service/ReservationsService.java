package com.apple.arentcar.service;


import com.apple.arentcar.dto.CarReturnRequestDTO;
import com.apple.arentcar.dto.ReservationDetailDTO;
import com.apple.arentcar.dto.ReservationsSearchRequestDTO;
import com.apple.arentcar.dto.ReservationsResponseDTO;
import com.apple.arentcar.mapper.ReservationsMapper;
import com.apple.arentcar.model.Reservations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReservationsService {
    @Autowired
    private ReservationsMapper reservationsMapper;

    public List<ReservationsResponseDTO> getReservations(ReservationsSearchRequestDTO requestDTO) {
        return reservationsMapper.getReservations(requestDTO);
    }

    public int countByConditions(ReservationsSearchRequestDTO searchRequestDTO) {
        return reservationsMapper.countByConditions(searchRequestDTO);
    }

    public int countAllReservations() {
        return reservationsMapper.countAllReservations();
    }

    public ReservationDetailDTO getReservationDetailById(String reservationCode) {
        return reservationsMapper.getReservationsDetailById(reservationCode);
    }
    public void updateCarStatus(String carNumber, Map<String, Object> carReturnRequest) {
        // Map에서 carStatus 값 추출
        String carStatus = (String) carReturnRequest.get("carStatus");

        // 디버깅 로그
        System.out.println("Service 호출 - carNumber: " + carNumber);
        System.out.println("Service 호출 - carStatus: " + carStatus);

        // Mapper 호출
        reservationsMapper.updateCarStatus(carNumber, carStatus);

        // 디버깅 로그
        System.out.println("Mapper 호출 완료 - carNumber: " + carNumber);
        System.out.println("Mapper 호출 완료 - carStatus: " + carStatus);
    }
}