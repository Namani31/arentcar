package com.apple.arentcar.service;

import com.apple.arentcar.mapper.BranchsMapper;
import com.apple.arentcar.model.Branchs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchsService {

    @Autowired
    private BranchsMapper branchsMapper;

    public List<Branchs> getAllBranchs() {
        return branchsMapper.getAllBranchs();
    }
}