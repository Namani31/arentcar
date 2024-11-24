package com.apple.arentcar.service;

import com.apple.arentcar.dto.ChartDataDTO;
import com.apple.arentcar.mapper.BranchsMapper;
import com.apple.arentcar.model.Branchs;
import com.apple.arentcar.model.Menus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchsService {

    @Autowired
    private BranchsMapper branchsMapper;

    public List<Branchs> getBranchsByBranchName(String branchName) {
        return branchsMapper.getBranchsByBranchName(branchName);
    }

    public List<ChartDataDTO> getBranchChartData(String startDate, String endDate) {
        return branchsMapper.getBranchChartData(startDate, endDate);
    }
}