#!/bin/bash
set -euo pipefail

echo "🚀 Monitoring GitHub Actions deployment with smoke tests..."
echo "Run this after: git push origin main"
echo

# Wait for new run to appear
echo "⏳ Waiting for new run to start..."
sleep 5

# Get the latest run
LATEST_RUN=$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')
echo "📊 Monitoring run: $LATEST_RUN"
echo "🔗 View at: https://github.com/Vikyath-N/Personal_Website/actions/runs/$LATEST_RUN"
echo

# Poll until completion
while true; do
    STATUS=$(gh run view $LATEST_RUN --json status,conclusion --jq '.status')
    CONCLUSION=$(gh run view $LATEST_RUN --json status,conclusion --jq '.conclusion // ""')
    
    echo "$(date '+%H:%M:%S') - Status: $STATUS${CONCLUSION:+ ($CONCLUSION)}"
    
    if [[ "$STATUS" != "in_progress" ]]; then
        break
    fi
    
    sleep 10
done

echo
if [[ "$CONCLUSION" == "success" ]]; then
    echo "✅ Deployment successful! Smoke tests passed."
    echo "🌐 Site: https://vikyath.me"
    echo "📊 Run details: https://github.com/Vikyath-N/Personal_Website/actions/runs/$LATEST_RUN"
else
    echo "❌ Deployment failed or smoke tests failed."
    echo "📋 Failed logs:"
    gh run view $LATEST_RUN --log-failed | head -50
    echo
    echo "🔗 Full logs: https://github.com/Vikyath-N/Personal_Website/actions/runs/$LATEST_RUN"
fi
