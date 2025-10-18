/**
 * Example script showing how to fetch news from the backend API
 * Run with: node examples/fetch-news.js
 */

const BASE_URL = 'http://localhost:3001';

async function fetchHealth() {
  console.log('🔍 Checking server health...\n');
  const response = await fetch(`${BASE_URL}/health`);
  const data = await response.json();
  console.log('Health Status:', data);
  console.log('---\n');
}

async function fetchNewsLinks() {
  console.log('📋 Fetching news source links...\n');
  const response = await fetch(`${BASE_URL}/api/news/links`);
  const data = await response.json();
  
  console.log(`Found ${data.count} news sources:`);
  data.data.forEach((link, index) => {
    console.log(`  ${index}. ${link.name} - ${link.url}`);
  });
  console.log('---\n');
}

async function fetchNewsBySource(sourceIndex = 0) {
  console.log(`📰 Fetching news from source ${sourceIndex}...\n`);
  const response = await fetch(`${BASE_URL}/api/news/source/${sourceIndex}`);
  const data = await response.json();
  
  if (data.success) {
    console.log(`Source: ${data.data.source}`);
    console.log(`URL: ${data.data.url}`);
    console.log(`Status: ${data.data.data.status} ${data.data.data.statusText}`);
    console.log(`Content Type: ${data.data.data.contentType}`);
    console.log(`Fetched At: ${data.data.fetchedAt}`);
  } else {
    console.log('Error:', data.message);
  }
  console.log('---\n');
}

async function fetchAllNews() {
  console.log('🌐 Fetching news from all sources...\n');
  const response = await fetch(`${BASE_URL}/api/news`);
  const data = await response.json();
  
  console.log(`Successfully fetched from ${data.count} sources:`);
  data.data.forEach((item) => {
    console.log(`  ✓ ${item.source} - ${item.success ? 'Success' : 'Failed'}`);
  });
  console.log('---\n');
}

// Main execution
async function main() {
  try {
    console.log('=== TruthCapital Backend API Examples ===\n');
    
    await fetchHealth();
    await fetchNewsLinks();
    await fetchNewsBySource(0);
    await fetchAllNews();
    
    console.log('✅ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
