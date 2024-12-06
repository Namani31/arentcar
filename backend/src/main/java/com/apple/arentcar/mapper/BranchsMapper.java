package com.apple.arentcar.mapper;

import com.apple.arentcar.dto.*;
import com.apple.arentcar.model.Branchs;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BranchsMapper {

    List<Branchs> findAllBranches();

    List<Branchs> findBranchsByBranchName(@Param("branchname") String branchName);

    List<ChartDataDTO> getBranchChartData(@Param("startDate") String startDate, @Param("endDate") String endDate);


    // 지점 조회 및 페이지네이션(검색 기능 포함)
    List<BranchsSearchDTO> getBranchsNameWithPaging(@Param("branchName") String branchName,
                                                    @Param("pageSize") int pageSize,
                                                    @Param("offset") int offset);

    // 지점 조회 및 페이지네이션
    List<BranchsSearchDTO> getBranchsWithPaging(@Param("pageSize") int pageSize, @Param("offset") int offset);

    Branchs getManageBranchsDetailById(
            @Param("branchCode") String branchCode);

    // 전체 차종 수 조회(검색 기능 포함)
    int countBranchByName(@Param("branchName") String branchName);

    // 전체 차종 수 조회
    int countAllBranchs();

    // 지점 추가
    void createBranchs(Branchs branchs);

    // 중복된 지점명 카운트
    int duplicateCountByBranchName(@Param("branchName") String branchName);

    // 지점 수정
    void updateBranchsById(Branchs branchs);

    // 지점 삭제
    void deleteBranchsById(@Param("branchCode") Integer branchCode);
}
