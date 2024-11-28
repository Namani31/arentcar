package com.apple.arentcar.service;


import com.apple.arentcar.dto.ReservationsSearchRequestDTO;
import com.apple.arentcar.dto.ReservationsResponseDTO;
import com.apple.arentcar.mapper.ReservationsMapper;
import com.apple.arentcar.model.Reservations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
}