// Script para testar diferentes URLs da API do Ghost
require('dotenv').config({ path: '.env.local' });

const ghostUrl = process.env.GHOST_API_URL || 'http://127.0.0.1:8080';
const ghostKey = process.env.GHOST_CONTENT_API_KEY || '<ghostapi>';

async function testUrl(url) {
  console.log(`Testing URL: ${url}`);
  try {
    const response = await fetch(url);
    const status = response.status;
    console.log(`Status: ${status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
      return true;
    } else {
      console.log('Response not OK');
      return false;
    }
  } catch (error) {
    console.error(`Error testing URL ${url}:`, error.message);
    return false;
  }
}

async function testUrls() {
  console.log('Testing different Ghost API URLs...');
  console.log('Ghost URL:', ghostUrl);
  console.log('Ghost Key:', ghostKey);
  
  const urlsToTest = [
    `${ghostUrl}/ghost/api/v5/content/posts/?key=${ghostKey}`,
    `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}`,
    `${ghostUrl}/api/v5/content/posts/?key=${ghostKey}`,
    `${ghostUrl}/api/content/posts/?key=${ghostKey}`,
    `${ghostUrl}/ghost/api/v5/content/posts/`,
    `${ghostUrl}/ghost/api/content/posts/`,
    `${ghostUrl}/api/v5/content/posts/`,
    `${ghostUrl}/api/content/posts/`
  ];
  
  for (const url of urlsToTest) {
    const success = await testUrl(url);
    console.log(`URL ${url} ${success ? 'WORKS' : 'FAILS'}`);
    console.log('-----------------------------------');
  }
}

testUrls(); 
