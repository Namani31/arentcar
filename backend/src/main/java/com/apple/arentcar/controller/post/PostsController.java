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

    @GetMapping("/manager/post")
    public List<Notices> getPostsAll(){ return postsService.getPostsAll(); }

    @GetMapping("/manager/post/notices")
    public ResponseEntity<List<Notices>> getAllNotices(
        @RequestParam int pageSize,
        @RequestParam int pageNumber,
        @RequestParam(required = false) String postName ){
        List<Notices> notices;
        if(postName != null && !postName.isEmpty()){
            notices = postsService.getSarchNotices(postName, pageSize, pageNumber);
        } else {
            notices = postsService.getAllNotices(pageSize, pageNumber);
        }
        return ResponseEntity.ok(notices);
    }

    @GetMapping("/manager/post/notices/count")
    public ResponseEntity<Integer> getNoticesCount( @RequestParam(required = false) String postName ){
        int count;
        if(postName != null && !postName.isEmpty()){
            count = postsService.countSarchNotices(postName);
        } else {
            count = postsService.countAllNotices();
        }
        return ResponseEntity.ok(count);
    }


    @GetMapping("/manager/post/notices/{postCode}")
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
