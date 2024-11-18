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
    List<Notices> getAllNotices();
    Notices getNotice(Integer postCode);
    void createNotice(Notices notice);

    List<Reviews> getAllReviews();
    List<Inquirys> getAllInquirys();
}
