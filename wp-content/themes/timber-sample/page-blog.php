<?php
/*
 * Template Name: Blog Index
 */


global $paged;
if (!isset($paged) || !$paged){
    $paged = 1;
}

// Grab the  post
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

// Grab the Curiosities
$args = array(
  'posts_per_page' => 10,
  'showposts' => 10,
  'paged' => $paged
);

query_posts($args);
$context['posts'] = Timber::get_posts();
$context['pagination'] = Timber::get_pagination();

Timber::render( array( 'landings/page-blog.twig'), $context );
