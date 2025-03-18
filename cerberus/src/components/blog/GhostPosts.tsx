"use client";

import { useEffect, useState } from 'react';
import { Grid } from "@/once-ui/components";
import GhostPost from "./GhostPost";
import { getAllPosts } from '@/lib/ghost';

interface GhostPostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
}

export function GhostPosts({ range, columns = "1", thumbnail = false }: GhostPostsProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('GhostPosts - Fetching posts...');
        const allPosts = await getAllPosts();
        console.log(`GhostPosts - Fetched ${allPosts.length} posts`);
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (!posts.length) {
    return <div>No posts found</div>;
  }

  const displayedPosts = range
    ? posts.slice(range[0] - 1, range.length === 2 ? range[1] : posts.length)
    : posts;

  return (
    <>
      {displayedPosts.length > 0 && (
        <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="40" gap="m">
          {displayedPosts.map((post) => (
            <GhostPost key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
} 