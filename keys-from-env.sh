#!/bin/bash

# Get the keys from the environment variables

# OAuth2
# Check if the environment variable is set
if [ -z "$OAUTH2_KEYS" ]; then
    echo "OAUTH2_KEYS is not set"
    return 1
fi
# Create a JSON file on server/configuration with the keys
cat <<EOF > src/server/configuration/oauth2.keys.json
$OAUTH2_KEYS
EOF

# Cookies
# Check if the environment variable is set
if [ -z "$COOKIES_KEYS" ]; then
    echo "COOKIES_KEYS is not set"
    return 1
fi
# Create a JSON file on server/configuration with the keys
cat <<EOF > src/server/configuration/cookies.keys.json
$COOKIES_KEYS
EOF