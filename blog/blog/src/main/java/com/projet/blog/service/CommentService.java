package com.projet.blog.service;

import com.projet.blog.entity.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Long postId, String postedBy, String content);
    List<Comment> getCommentsByPostId(Long postId);
}
