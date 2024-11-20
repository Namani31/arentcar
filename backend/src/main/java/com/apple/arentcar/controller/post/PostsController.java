package com.apple.arentcar.controller.post;


import com.apple.arentcar.model.post.Inquirys;
import com.apple.arentcar.model.post.Notices;
import com.apple.arentcar.model.post.Reviews;
import com.apple.arentcar.service.post.PostsService;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/manager/post/notices/{postCode}")
    public ResponseEntity<Notices> getNotice(@PathVariable Integer postCode) {
        Notices notices = postsService.getNotice(postCode);

        if (notices != null) {
            return ResponseEntity.ok(notices);
        } else {
            return ResponseEntity.notFound().build();
        }
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

    @GetMapping("/manager/adminCode")
    public ResponseEntity<Integer> getUserId(@RequestParam String token){
        int adminCode = postsService.getAdminCode(token);
         return ResponseEntity.ok(adminCode);
    }

    @PostMapping("/manager/post/notices")
    public ResponseEntity<Notices> createNotice(@RequestBody Notices notices) {
        System.out.println(notices.getPostTitle());
        System.out.println(notices.getPostContent());
        System.out.println(notices.getAuthorCode());

        postsService.createNotices(notices);
        return ResponseEntity.ok(notices);
    }

    @PutMapping("/manager/post/notices/{postCode}")
    public ResponseEntity<Notices> updateNotice(
            @RequestBody Notices notices,
            @PathVariable Integer postCode){
        notices.setPostCode(postCode);

        postsService.updateNotice(notices);
        return ResponseEntity.ok(notices);
    }

    @DeleteMapping("/manager/post/notices/{postCode}")
    public ResponseEntity<Notices> deleteNotice(@PathVariable Integer postCode) {
        postsService.deleteNotice(postCode);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/user/post/reviews")
    public List<Reviews> getAllReviews(){ return postsService.getAllReviews(); }

    @GetMapping("/user/post/inquirys")
    public List<Inquirys> getallInquirys(){ return postsService.getallInquirys(); }

}
