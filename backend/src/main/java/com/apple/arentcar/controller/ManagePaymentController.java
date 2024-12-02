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

    @GetMapping("/manager/rentalrates/paged")
    public ResponseEntity<List<ManagePaymentDTO>> getManagePaymentWithPaging(
            @RequestParam int pageSize,
            @RequestParam int pageNumber,
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String branchName,
            @RequestParam(required = false) String rentalDate) {

        List<ManagePaymentDTO> managePayment;

        if ((userName != null && !userName.isEmpty()) ||
            (branchName != null && !branchName.isEmpty()) ||
            (rentalDate != null && !rentalDate.isEmpty())) {

            managePayment = managePaymentService.getManagePaymentBySearchWithPaging(
                    userName, branchName, rentalDate, pageNumber, pageSize);
        } else {
            managePayment = managePaymentService.getManagePaymentWithPaging(pageSize, pageNumber);
        }

        return ResponseEntity.ok(managePayment);
    }

    @GetMapping("/manager/rentalrates/count")
    public ResponseEntity<Integer> getTotalManagePaymentCount (
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String branchName,
            @RequestParam(required = false) String rentalDate) {

        int count;
        if ((userName != null && !userName.isEmpty()) ||
            (branchName != null && !branchName.isEmpty()) ||
            (rentalDate != null && !rentalDate.isEmpty())) {

            count = managePaymentService.countBySearchData(userName, branchName, rentalDate);
        } else {
            count = managePaymentService.countAllManagePayment();
        }
        return ResponseEntity.ok(count);
    }

    @GetMapping("/manager/rentalrates/detail/{reservationCode}")
    public ResponseEntity<?> getManagePaymentDetailById(@PathVariable("reservationCode") Integer reservationCode) {
        ManagePaymentDetailDTO detail = managePaymentService.getManagePaymentDetailById(reservationCode);
        if (detail != null) {
            return ResponseEntity.ok(detail);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
