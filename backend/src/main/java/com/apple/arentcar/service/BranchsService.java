package com.apple.arentcar.service;

import com.apple.arentcar.dto.BranchsSearchDTO;
import com.apple.arentcar.dto.CarTypesDTO;
import com.apple.arentcar.dto.ChartDataDTO;
import com.apple.arentcar.mapper.BranchsMapper;
import com.apple.arentcar.model.Branchs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchsService {

    @Autowired
    private BranchsMapper branchsMapper;

    public List<Branchs> findAllBranches() {
        return branchsMapper.findAllBranches();
    }

    public List<Branchs> findBranchsByBranchName(String branchName) {
        return branchsMapper.findBranchsByBranchName(branchName);
    }

    public List<ChartDataDTO> getBranchChartData(String startDate, String endDate) {
        return branchsMapper.getBranchChartData(startDate, endDate);
    }

    // 지점 조회 및 페이지네이션 (검색 기능 포함)
    public List<BranchsSearchDTO> getBranchsNameWithPaging(String branchName,
                                                           int pageSize,
                                                           int pageNumber) {
        int offset = (pageNumber - 1) * pageSize;
        return branchsMapper.getBranchsNameWithPaging(branchName, pageSize, offset);
    }

    // 지점 조회 및 페이지네이션
    public List<BranchsSearchDTO> getBranchsWithPaging(int pageSize, int pageNumber) {
        int offset = (pageNumber - 1) * pageSize; // offset 계산 식
        return branchsMapper.getBranchsWithPaging(pageSize, offset);
    }

    // 전체 차종 수 조회(검색 기능 포함)
    public int countBranchByName(String branchName) {
        return branchsMapper.countBranchByName(branchName);
    }

    // 전체 지점 수 조회
    public int countAllBranchs() {
        return branchsMapper.countAllBranchs();
    }
}