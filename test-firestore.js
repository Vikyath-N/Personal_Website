#!/usr/bin/env node

// Test script to verify Firestore project view tracking is working
const fetch = require('node-fetch');

async function testProjectViewTracking() {
    console.log('🧪 Testing Firestore project view tracking...');
    
    const testSlug = 'test-project-' + Date.now();
    const url = 'http://localhost:3000/api/project-view';
    
    try {
        console.log(`📡 Sending POST request to ${url}`);
        console.log(`📝 Test slug: ${testSlug}`);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug: testSlug })
        });
        
        const data = await response.json();
        
        console.log(`📊 Response status: ${response.status}`);
        console.log(`📄 Response data:`, data);
        
        if (response.status === 200 && data.ok) {
            console.log('✅ Project view tracking is working!');
            if (data.message) {
                console.log(`ℹ️  Message: ${data.message}`);
            }
        } else {
            console.log('❌ Project view tracking failed');
        }
        
    } catch (error) {
        console.error('❌ Error testing project view tracking:', error.message);
        console.log('💡 Make sure your dev server is running on localhost:3000');
    }
}

// Run the test
testProjectViewTracking();
