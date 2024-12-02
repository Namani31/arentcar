package com.apple.arentcar.service;

import com.apple.arentcar.dto.ManagePaymentDTO;
import com.apple.arentcar.dto.ManagePaymentDetailDTO;
import com.apple.arentcar.dto.ManagePaymentRequestDTO;
import com.apple.arentcar.mapper.ManagePaymentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagePaymentService {

    @Autowired
    private ManagePaymentMapper managePaymentMapper;

    public List<ManagePaymentDTO> getAllManagePayment() {
        return managePaymentMapper.getAllManagePayment();
    }

    public List<ManagePaymentDTO> getManagePaymentWithPaging(
            int pageSize, int pageNumber) {
        int offset = (pageNumber -1) * pageSize;
        return managePaymentMapper.getManagePaymentWithPaging(pageSize, offset);
    }

    public List<ManagePaymentDTO> getManagePaymentBySearchWithPaging(
            String userName,
            String branchName,
            String rentalDate,
            int pageSize,
            int pageNumber) {

        int offset = (pageNumber -1) * pageSize;

        return managePaymentMapper.getManagePaymentBySearchWithPaging(
                userName, branchName, rentalDate,pageSize,offset);
    }

    public int countAllManagePayment() {
        return managePaymentMapper.countAllManagePayment();
    }

    public int countBySearchData(
            String userName,
            String branchName,
            String rentalDate) {

        return managePaymentMapper.countBySearchData(
                userName, branchName, rentalDate);
    }

    public ManagePaymentDetailDTO getManagePaymentDetailById(Integer reservationCode) {
        return managePaymentMapper.getManagePaymentDetailById(reservationCode);
    }
}
