package com.apple.arentcar.service.post;

import com.apple.arentcar.mapper.post.PostsMapper;
import com.apple.arentcar.model.post.Inquirys;
import com.apple.arentcar.model.post.Notices;
import com.apple.arentcar.model.post.Reviews;
import com.apple.arentcar.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsService {

    @Autowired
    PostsMapper postsMapper;

    @Autowired
    JwtUtil jwtUtil;

    public List<Notices> getPostsAll() {return postsMapper.getPostsAll();}

    public List<Notices> getAllNotices(Integer pageSize, Integer pageNumber) { return postsMapper.getAllNotices(pageSize, pageNumber); }
    public int countAllNotices() { return postsMapper.countAllNotices(); }
    public Notices getNotice(Integer postCode) { return postsMapper.getNotice(postCode); }
    public List<Notices> getSarchNotices(String keyword, Integer pageSize, Integer pageNumber) { return postsMapper.getsSarchNotices(keyword, pageSize, pageNumber); }
    public int countSarchNotices(String keyword) { return postsMapper.countSarchNotices(keyword); }
    public int getAdminCode(String token) { //어드민 코드문
        String adminid = jwtUtil.extractUsername(token);
        int adminCode = postsMapper.adminCode(adminid);
        return adminCode;
    }
    public void createNotices(Notices notices) { postsMapper.createNotice(notices); }
    public void updateNotice(Notices notices) { postsMapper.updateNotice(notices); }
    public void deleteNotice(Integer postCode) { postsMapper.deleteNotice(postCode); }

    public List<Reviews> getAllReviews() { return postsMapper.getAllReviews(); }

    public List<Inquirys> getallInquirys() { return postsMapper.getAllInquirys(); }
}
