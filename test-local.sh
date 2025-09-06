#!/bin/bash
set -euo pipefail

echo "🧪 Local smoke tests for vikyath.me"
echo "=================================="

# Test URLs
base="https://vikyath.me"
paths=("/" "/projects/" "/resume/" "/playground/")
timestamp=$(date +%s)

# User-Agent to look like a real browser
USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

echo "Testing with realistic browser headers..."
echo

for path in "${paths[@]}"; do
    url="${base}${path}?t=${timestamp}"
    echo "🔍 Testing: ${url}"
    
    # Make request with browser-like headers
    response=$(curl -s -w "\n%{http_code}\n%{content_type}\n%{size_download}" \
        -H "User-Agent: ${USER_AGENT}" \
        -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
        -H "Accept-Language: en-US,en;q=0.5" \
        -H "Accept-Encoding: gzip, deflate, br" \
        -H "DNT: 1" \
        -H "Connection: keep-alive" \
        -H "Upgrade-Insecure-Requests: 1" \
        --max-time 30 \
        "$url" 2>/dev/null || echo -e "\n000\n\n0")
    
    # Parse response (macOS compatible)
    lines=$(echo "$response" | wc -l)
    content_lines=$((lines - 3))
    http_code=$(echo "$response" | tail -n 3 | head -n 1)
    content_type=$(echo "$response" | tail -n 2 | head -n 1)
    content_size=$(echo "$response" | tail -n 1)
    content=$(echo "$response" | head -n "$content_lines")
    
    # Check results
    if [[ "$http_code" == "200" ]]; then
        echo "✅ Status: $http_code | Type: $content_type | Size: $content_size bytes"
        
        # Extract title if present
        title=$(echo "$content" | grep -i '<title>' | sed 's/.*<title>\(.*\)<\/title>.*/\1/' | head -1)
        if [[ -n "$title" ]]; then
            echo "📄 Title: $title"
        fi
        
        # Show first few words of content
        snippet=$(echo "$content" | sed -E 's/<[^>]+>/ /g' | tr -s ' ' | cut -c1-100)
        echo "📝 Snippet: $snippet..."
        
    elif [[ "$http_code" == "403" ]]; then
        echo "⚠️  Status: $http_code (Cloudflare blocking - this is expected)"
        echo "💡 Try opening in your browser: $url"
        
    else
        echo "❌ Status: $http_code | Type: $content_type | Size: $content_size bytes"
    fi
    
    echo "---"
done

echo
echo "🎯 Summary:"
echo "- If you see 200s: Site is working perfectly!"
echo "- If you see 403s: Cloudflare is protecting the site (normal)"
echo "- If you see other codes: There might be an issue"
echo
echo "🌐 Manual test: Open https://vikyath.me in your browser"
