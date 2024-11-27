package com.apple.arentcar.service;

import com.apple.arentcar.dto.ManagePaymentDTO;
import com.apple.arentcar.dto.ManagePaymentDetailDTO;
import com.apple.arentcar.dto.ManagePaymentRequestDTO;
import com.apple.arentcar.mapper.ManagePaymentMapper;
import com.apple.arentcar.model.Menus;
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

    public List<ManagePaymentDTO> getManagePaymentWithPaging(int pageSize, int pageNumber) {
        int offset = (pageNumber - 1) * pageSize;
        return managePaymentMapper.getManagePaymentWithPaging(pageSize, offset);
    }

    public int countAllManagePayment() {
        return managePaymentMapper.countAllManagePayment();
    }

    public int countByManagePayment(String managePayment) {
        return managePaymentMapper.countByManagePayment(managePayment);
    }

    public ManagePaymentDetailDTO getManagePaymentDetailById(int id) {
        return managePaymentMapper.getManagePaymentDetailById(id);
    }

    public List<ManagePaymentRequestDTO> getManagePaymentSearchData (ManagePaymentRequestDTO searchDataDTO) {

        int offset = (searchDataDTO.getPageNumber() - 1) * searchDataDTO.getPageSize();
        searchDataDTO.setOffset(offset); // 계산된 offset을 DTO에 설정

        return managePaymentMapper.getManagePaymentSearchData(searchDataDTO);
    }

}
