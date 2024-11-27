package com.apple.arentcar.controller;

import com.apple.arentcar.dto.ManagePaymentDTO;
import com.apple.arentcar.dto.ManagePaymentDetailDTO;
import com.apple.arentcar.dto.ManagePaymentRequestDTO;
import com.apple.arentcar.service.ManagePaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class ManagePaymentController {

    @Autowired
    private ManagePaymentService managePaymentService;

    @GetMapping("/manager/rentalrates")
    public List<ManagePaymentDTO> getAllManagePayment() {
        return managePaymentService.getAllManagePayment();
    }

    @GetMapping("/manager/rentalrates/count")
    public ResponseEntity<Integer> getTotalManagePaymentCount(@RequestParam(required = false) String managePayment) {
        int count;
        if (managePayment != null && !managePayment.isEmpty()) {
            count = managePaymentService.countByManagePayment(managePayment);
        } else {
            count = managePaymentService.countAllManagePayment();
        }
        return ResponseEntity.ok(count);
    }

    @GetMapping("/manager/rentalrates/detail/{id}")
    public ResponseEntity<?> getManagePaymentDetailById(@PathVariable("id") int id) {
        ManagePaymentDetailDTO detail = managePaymentService.getManagePaymentDetailById(id);
        if (detail != null) {
            return ResponseEntity.ok(detail);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/manager/rentalrates/search")
    public ResponseEntity<List<ManagePaymentRequestDTO>> getManagePaymentSearchData (
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String branchName,
            @RequestParam(required = false) String rentalDate,
            @RequestParam(required = false, defaultValue = "1") Integer pageNumber,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize
    ) {

        ManagePaymentRequestDTO searchDataDTO = new ManagePaymentRequestDTO();

        searchDataDTO.setUserName(userName);
        searchDataDTO.setBranchName(branchName);
        searchDataDTO.setRentalDate(rentalDate);
        searchDataDTO.setPageNumber(pageNumber);
        searchDataDTO.setPageSize(pageSize);

        List<ManagePaymentRequestDTO> managePayment = managePaymentService.getManagePaymentSearchData(searchDataDTO);
        return ResponseEntity.ok(managePayment);
    }
}
