package com.apple.arentcar.controller;

import com.apple.arentcar.model.Branchs;
import com.apple.arentcar.service.BranchsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class BranchsController {

    @Autowired
    private BranchsService branchsService;
    @GetMapping("/manager/branchs")
    public List<Branchs> getAllBranchs() {
        return branchsService.getAllBranchs();
    }
}
