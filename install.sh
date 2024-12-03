#!/bin/bash

# Ensure deno is installed
if ! command -v deno &> /dev/null; then
    echo "Deno is required but not installed. Please install Deno first:"
    echo "curl -fsSL https://deno.land/x/install/install.sh | sh"
    exit 1
fi

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Create the executable script
cat > /usr/local/bin/invcc << EOL
#!/bin/bash
deno run --allow-read --allow-write "$SCRIPT_DIR/main.js" "\$@"
EOL

# Make it executable
chmod +x /usr/local/bin/invcc

echo "invcc has been installed successfully!"
echo "You can now use 'invcc' from anywhere in your terminal." 