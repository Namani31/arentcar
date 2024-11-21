package com.apple.arentcar.mapper;

import com.apple.arentcar.model.Branchs;
import com.apple.arentcar.model.Menus;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BranchsMapper {
    List<Branchs> getAllBranchs();
}
