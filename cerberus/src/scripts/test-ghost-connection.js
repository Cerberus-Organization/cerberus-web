// Script para testar a conexão com o Ghost CMS
require('dotenv').config({ path: '.env.local' });
const GhostContentAPI = require('@tryghost/content-api');

// Ghost CMS API configuration
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || 'http://127.0.0.1:8080',
  key: process.env.GHOST_CONTENT_API_KEY || '28aca8c80111fce6249a3f5991',
  version: 'v5.0'
});

async function testConnection() {
  console.log('Testing connection to Ghost CMS...');
  console.log('API URL:', process.env.GHOST_API_URL || 'http://127.0.0.1:8080');
  console.log('API Key:', process.env.GHOST_CONTENT_API_KEY || '28aca8c80111fce6249a3f5991');
  
  try {
    // Try to fetch all posts
    const posts = await api.posts.browse({
      limit: 'all'
    });
    
    console.log(`Successfully connected to Ghost CMS!`);
    console.log(`Found ${posts.length} posts:`);
    
    // Print the titles and slugs of all posts
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (slug: ${post.slug})`);
    });
    
    // Try to fetch a specific post if any exists
    if (posts.length > 0) {
      const firstPost = posts[0];
      console.log(`\nTesting fetching a specific post with slug: ${firstPost.slug}`);
      
      const post = await api.posts.read({
        slug: firstPost.slug
      });
      
      console.log(`Successfully fetched post: ${post.title}`);
    }
    
  } catch (error) {
    console.error('Error connecting to Ghost CMS:', error);
  }
}

testConnection(); 