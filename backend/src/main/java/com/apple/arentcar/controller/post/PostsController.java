package com.apple.arentcar.controller.post;


import com.apple.arentcar.model.post.Inquirys;
import com.apple.arentcar.model.post.Notices;
import com.apple.arentcar.model.post.Reviews;
import com.apple.arentcar.service.post.PostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/arentcar")
public class PostsController {

    @Autowired
    PostsService postsService;

    @GetMapping("/user/post/notices")
    public List<Notices> getAllNotices(){ return postsService.getAllNotices(); }

    @GetMapping("/user/post/notices/{postCode}")
    public ResponseEntity<Notices> getNotice(@PathVariable Integer postCode) {
        Notices notices = postsService.getNotice(postCode);

        if (notices != null) {
            return ResponseEntity.ok(notices);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/manager/post/notices")
    public ResponseEntity<Notices> createNotice(@RequestBody Notices notices) {
        System.out.println(notices);

        return ResponseEntity.status(HttpStatus.CREATED).body(notices);
    }

    @GetMapping("/user/post/reviews")
    public List<Reviews> getAllReviews(){ return postsService.getAllReviews(); }

    @GetMapping("/user/post/inquirys")
    public List<Inquirys> getallInquirys(){ return postsService.getallInquirys(); }

}
