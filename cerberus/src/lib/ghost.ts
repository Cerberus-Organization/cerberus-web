import GhostContentAPI from '@tryghost/content-api';

// Ghost CMS API configuration
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || 'http://127.0.0.1:8080',
  key: process.env.GHOST_CONTENT_API_KEY || '28aca8c80111fce6249a3f5991',
  version: 'v5.0'
});

// Base URL and key for direct fetch API calls
const ghostUrl = process.env.GHOST_API_URL || 'http://127.0.0.1:8080';
const ghostKey = process.env.GHOST_CONTENT_API_KEY || '<api ghost>';

// Get all posts with their metadata using fetch (for server components)
export async function getAllPostsFetch() {
  console.log('Fetching all posts from Ghost CMS using fetch...');
  console.log('API URL:', ghostUrl);
  
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&limit=all&include=tags,authors`;
    console.log('Request URL:', url);
    
    const response = await fetch(url, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.posts.length} posts using fetch`);
    return data.posts;
  } catch (err) {
    console.error('Error fetching all posts using fetch:', err);
    return [];
  }
}

// Get a single post by its slug using fetch (for server components)
export async function getPostBySlugFetch(slug: string) {
  console.log(`Fetching post with slug: ${slug} using fetch`);
  console.log('API URL:', ghostUrl);
  
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/slug/${slug}/?key=${ghostKey}&include=tags,authors`;
    console.log('Request URL:', url);
    
    const response = await fetch(url, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Post found using fetch: ${data.posts[0].title}`);
    return data.posts[0];
  } catch (err) {
    console.error(`Error fetching post with slug ${slug} using fetch:`, err);
    return null;
  }
}

// Get all posts with their metadata using Ghost Content API (for client components)
export async function getAllPosts() {
  console.log('Fetching all posts from Ghost CMS...');
  console.log('API URL:', process.env.GHOST_API_URL || 'http://127.0.0.1:8080');
  
  try {
    const posts = await api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
      order: 'published_at DESC'
    });
    
    console.log(`Successfully fetched ${posts.length} posts`);
    return posts;
  } catch (err) {
    console.error('Error fetching all posts:', err);
    return [];
  }
}

// Get a single post by its slug using Ghost Content API (for client components)
export async function getPostBySlug(slug: string) {
  console.log(`Fetching post with slug: ${slug}`);
  console.log('API URL:', process.env.GHOST_API_URL || 'http://127.0.0.1:8080');
  
  try {
    const post = await api.posts.read({
      slug,
      // @ts-ignore - The type definitions are incomplete
      include: ['tags', 'authors']
    });
    
    console.log(`Post found: ${post.title}`);
    return post;
  } catch (err) {
    console.error(`Error fetching post with slug ${slug}:`, err);
    return null;
  }
}

// Get posts with pagination
export async function getPaginatedPosts(page = 1, limit = 10) {
  return await api.posts
    .browse({
      limit,
      page,
      include: ['tags', 'authors'],
      order: 'published_at DESC'
    })
    .catch(err => {
      console.error(err);
      return { posts: [], meta: { pagination: { pages: 0 } } };
    });
}

// Get posts by tag
export async function getPostsByTag(tag: string) {
  return await api.posts
    .browse({
      filter: `tag:${tag}`,
      include: ['tags', 'authors'],
      order: 'published_at DESC'
    })
    .catch(err => {
      console.error(err);
      return [];
    });
} 
