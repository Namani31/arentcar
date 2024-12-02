package com.apple.arentcar.mapper;

import com.apple.arentcar.dto.ManagePaymentDTO;
import com.apple.arentcar.dto.ManagePaymentDetailDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Mapper
public interface ManagePaymentMapper {

    List<ManagePaymentDTO> getAllManagePayment();

    List<ManagePaymentDTO> getManagePaymentWithPaging(
            @Param("pageSize") int pageSize,
            @Param("offset") int offset);

    List<ManagePaymentDTO> getManagePaymentBySearchWithPaging(
            @Param("userName") String userName,
            @Param("branchName") String branchName,
            @Param("rentalDate") String rentalDate,
            @Param("pagSize") int PagaSize,
            @Param("offset") int offset);

    int countAllManagePayment();

    int countBySearchData(
            @Param("userName") String userName,
            @Param("branchName") String branchName,
            @Param("rentalDate") String rentalDate);

    ManagePaymentDetailDTO getManagePaymentDetailById(@Param("reservationCode") Integer reservationCode);

}
