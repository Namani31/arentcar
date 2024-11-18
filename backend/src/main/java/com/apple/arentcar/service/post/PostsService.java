package com.apple.arentcar.service.post;

import com.apple.arentcar.mapper.post.PostsMapper;
import com.apple.arentcar.model.post.Inquirys;
import com.apple.arentcar.model.post.Notices;
import com.apple.arentcar.model.post.Reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsService {

    @Autowired
    PostsMapper postsMapper;

    public List<Notices> getPostsAll() {return postsMapper.getPostsAll();}

    public List<Notices> getAllNotices(Integer pageSize, Integer pageNumber) { return postsMapper.getAllNotices(pageSize, pageNumber); }
    public int countAllNotices() { return postsMapper.countAllNotices(); }
    public Notices getNotice(Integer postCode) { return postsMapper.getNotice(postCode); }
    public List<Notices> getSarchNotices(String keyword, Integer pageSize, Integer pageNumber) { return postsMapper.getsSarchNotices(keyword, pageSize, pageNumber); }
    public int countSarchNotices(String keyword) { return postsMapper.countSarchNotices(keyword); }
    public void create(Notices notices) {
        postsMapper.createNotice(notices);
    }

    public List<Reviews> getAllReviews() { return postsMapper.getAllReviews(); }

    public List<Inquirys> getallInquirys() { return postsMapper.getAllInquirys(); }
}
