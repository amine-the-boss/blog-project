package com.projet.blog.service;

import com.projet.blog.entity.Post;

import java.util.List;

public interface PostService {
     Post savePost(Post post);
     List<Post> getAllPosts();
     Post getPostById(Long postId);
     void likePost(Long postId);
     List<Post> searchByName(String name);
}
