"use client";

import { Column, Flex, Heading, SmartImage, SmartLink, Tag, Text } from "@/once-ui/components";
import styles from "./Posts.module.scss";
import { formatDate } from "@/app/utils/formatDate";
import { PostOrPage } from "@tryghost/content-api";

interface GhostPostProps {
  post: PostOrPage;
  thumbnail: boolean;
}

export default function GhostPost({ post, thumbnail }: GhostPostProps) {
  // Extract tags from the post
  const tags = post.tags ? post.tags.map(tag => tag.name) : [];
  
  // Format the date
  const publishedDate = post.published_at ? new Date(post.published_at) : null;
  
  // Truncate excerpt to limit text size
  const truncateExcerpt = (text: string, maxLength: number = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Log the post slug for debugging
  console.log('GhostPost - Rendering post with slug:', post.slug);
  
  return (
    <SmartLink
      fillWidth
      className={styles.hover}
      unstyled
      key={post.slug}
      href={`/blog/${post.slug}`}
    >
      <Flex
        position="relative"
        mobileDirection="column"
        fillWidth
        paddingY="8"
        paddingX="12"
        gap="16"
      >
        {post.feature_image && thumbnail && (
          <SmartImage
            priority
            maxWidth={20}
            className={styles.image}
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.feature_image}
            alt={"Thumbnail of " + post.title}
            aspectRatio="16 / 9"
          />
        )}
        <Column position="relative" fillWidth gap="4" vertical="center">
          <Heading as="h3" variant="heading-strong-m" wrap="balance">
            {post.title}
          </Heading>
          <Text variant="label-default-xs" onBackground="neutral-weak">
            {publishedDate && formatDate(publishedDate.toISOString(), false)}
          </Text>
          {tags.length > 0 && (
            <Flex gap="4" wrap>
              {tags.map((tag: string, index: number) =>
                index < 2 ? <Tag key={index} label={tag} variant="neutral" size="s" /> : null
              )}
            </Flex>
          )}
          {post.excerpt && (
            <Text variant="body-default-s" onBackground="neutral-weak" style={{ maxWidth: '100%', overflow: 'hidden' }}>
              {truncateExcerpt(post.excerpt, 80)}
            </Text>
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
} 