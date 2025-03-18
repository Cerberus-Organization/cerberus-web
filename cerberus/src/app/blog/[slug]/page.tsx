import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { AvatarGroup, Button, Column, Heading, Row, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import { getAllPostsFetch, getPostBySlugFetch } from "@/lib/ghost";

interface BlogParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const posts = await getAllPostsFetch();
    console.log('generateStaticParams - posts:', posts.length);
    return posts.map((post) => ({
      slug: post.slug || '',
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function generateMetadata({ params: { slug } }: BlogParams) {
  console.log('generateMetadata - slug:', slug);
  const post = await getPostBySlugFetch(slug);
  console.log('generateMetadata - post found:', !!post);

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The requested post could not be found.',
    };
  }

  const publishedTime = post.published_at || '';
  const title = post.title || '';
  const description = post.excerpt || '';
  const ogImage = post.feature_image ? post.feature_image : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: BlogParams) {
  console.log('Blog page - slug:', params.slug);
  
  try {
    const post = await getPostBySlugFetch(params.slug);
    console.log('Blog page - post found:', !!post);

    if (!post) {
      console.log('Blog page - post not found, returning 404');
      notFound();
    }

    // Get avatars from authors
    const avatars = post.authors?.map((author) => ({
      src: author.profile_image || '',
    })) || [];

    return (
      <Column as="section" maxWidth="xs" gap="l">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.published_at,
              dateModified: post.updated_at || post.published_at,
              description: post.excerpt,
              image: post.feature_image || `https://${baseURL}/og?title=${post.title}`,
              url: `https://${baseURL}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: post.primary_author?.name || person.name,
              },
            }),
          }}
        />
        <Button href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
          Posts
        </Button>
        <Heading variant="display-strong-s">{post.title}</Heading>
        <Row gap="12" vertical="center">
          {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.published_at && formatDate(post.published_at)}
          </Text>
        </Row>
        <Column as="article" fillWidth>
          <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
        </Column>
        <ScrollToHash />
      </Column>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}
