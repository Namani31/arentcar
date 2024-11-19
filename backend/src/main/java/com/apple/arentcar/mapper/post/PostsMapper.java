package com.apple.arentcar.mapper.post;

import com.apple.arentcar.model.Menus;
import com.apple.arentcar.model.post.Inquirys;
import com.apple.arentcar.model.post.Notices;
import com.apple.arentcar.model.post.Reviews;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostsMapper {
    List<Notices> getPostsAll();
    List<Notices> getAllNotices(Integer pageSize, Integer pageNumber);
    int countAllNotices();
    List<Notices> getsSarchNotices(String keyword, Integer pageSize, Integer pageNumber);
    int countSarchNotices(String keyword);
    Notices getNotice(Integer postCode);
    void createNotice(Notices notice);
    void deleteNotice(int postCode);
    List<Reviews> getAllReviews();
    List<Inquirys> getAllInquirys();
}
