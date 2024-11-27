package com.apple.arentcar.mapper;

import com.apple.arentcar.dto.ManagePaymentDTO;
import com.apple.arentcar.dto.ManagePaymentDetailDTO;
import com.apple.arentcar.dto.ManagePaymentRequestDTO;
import com.apple.arentcar.model.Menus;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Mapper
public interface ManagePaymentMapper {

    List<ManagePaymentDTO> getAllManagePayment();

    List<ManagePaymentDTO> getManagePaymentWithPaging(@Param("pageSize") int pageSize, @Param("offset") int offset);

    int countAllManagePayment();

    int countByManagePayment(@Param("managePayment") String managePayment);

    ManagePaymentDetailDTO getManagePaymentDetailById(@Param("id") int id);

    List<ManagePaymentRequestDTO> getManagePaymentSearchData (ManagePaymentRequestDTO searchDataDTO);

}
