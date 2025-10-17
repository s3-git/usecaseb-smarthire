async function globalTeardown() {
  console.log('🧹 Starting global teardown...');
  
  try {
    // Perform any global cleanup tasks here
    // For example: cleanup test data, close connections, etc.
    
    console.log('✅ Global teardown completed successfully');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    throw error;
  }
}

module.exports = globalTeardown;
