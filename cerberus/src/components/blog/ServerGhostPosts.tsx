import { Grid } from "@/once-ui/components";
import GhostPost from "./GhostPost";
import { getAllPostsFetch } from '@/lib/ghost';

interface ServerGhostPostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
}

export async function ServerGhostPosts({ range, columns = "1", thumbnail = false }: ServerGhostPostsProps) {
  console.log('ServerGhostPosts - Fetching posts...');
  const posts = await getAllPostsFetch();
  console.log(`ServerGhostPosts - Fetched ${posts.length} posts`);

  if (!posts.length) {
    return <div>No posts found</div>;
  }

  const displayedPosts = range
    ? posts.slice(range[0] - 1, range.length === 2 ? range[1] : posts.length)
    : posts;

  return (
    <>
      {displayedPosts.length > 0 && (
        <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="16" gap="s">
          {displayedPosts.map((post) => (
            <GhostPost key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
} 