#!/bin/bash
# Fix WSL ownership + Node, then deploy the portfolio
set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

cd "$(dirname "$0")"
PROJECT_DIR="$(pwd)"

echo "🔧 Portfolio WSL Fix + Deploy"
echo "=============================="
echo "Project: $PROJECT_DIR"
echo ""

# --- 1. Fix ownership (root-owned files break git init) ---
OWNER="$(stat -c '%U' .)"
if [ "$OWNER" != "$(whoami)" ]; then
  echo -e "${YELLOW}⚠️  Project is owned by '$OWNER', not '$(whoami)'.${NC}"
  echo "   Fixing ownership (sudo password may be required)..."
  sudo chown -R "$(whoami):$(whoami)" "$PROJECT_DIR"
  echo -e "${GREEN}✅ Ownership fixed${NC}"
else
  echo -e "${GREEN}✅ Directory ownership OK${NC}"
fi

# --- 2. Ensure Linux Node (not Windows npm via /mnt/c) ---
is_windows_or_missing() {
  local p
  p="$(command -v "$1" 2>/dev/null || true)"
  if [ -z "$p" ]; then
    return 0
  fi
  case "$p" in
    /mnt/c/*|/mnt/d/*) return 0 ;;
    *) return 1 ;;
  esac
}

load_nvm() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    return 1
  fi
  # nvm.sh may warn if "default" is missing — don't abort
  set +e
  # shellcheck disable=SC1090
  . "$NVM_DIR/nvm.sh"
  set -e
  return 0
}

install_nvm_node() {
  export NVM_DIR="$HOME/.nvm"
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo -e "${YELLOW}📦 Installing nvm (Node Version Manager)...${NC}"
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  fi
  load_nvm || {
    echo -e "${RED}❌ Failed to load nvm from $NVM_DIR/nvm.sh${NC}"
    exit 1
  }

  echo -e "${YELLOW}📦 Installing Node.js LTS via nvm...${NC}"
  nvm install --lts
  nvm alias default 'lts/*'
  nvm use --lts
}

# Always prefer nvm when present (even if Windows node is also on PATH)
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  load_nvm || true
  nvm use --lts >/dev/null 2>&1 || nvm use default >/dev/null 2>&1 || true
fi

if is_windows_or_missing node || is_windows_or_missing npm; then
  echo -e "${YELLOW}⚠️  Windows Node/npm detected on PATH (or missing Linux Node).${NC}"
  echo "   That causes: UNC paths / 'vite' is not recognized"
  install_nvm_node
fi

# Strip Windows paths from PATH so npm scripts never hit cmd.exe
CLEAN_PATH=""
IFS=':' read -ra PARTS <<< "${PATH:-}"
for p in "${PARTS[@]+"${PARTS[@]}"}"; do
  case "$p" in
    /mnt/c/*|/mnt/d/*) ;;
    *) CLEAN_PATH="${CLEAN_PATH:+$CLEAN_PATH:}$p" ;;
  esac
done
export PATH="$CLEAN_PATH"

NODE_BIN="$(command -v node || true)"
NPM_BIN="$(command -v npm || true)"
if [ -z "$NODE_BIN" ] || [ -z "$NPM_BIN" ]; then
  echo -e "${RED}❌ Linux Node/npm still not available.${NC}"
  echo "   Run: source ~/.nvm/nvm.sh && nvm install --lts"
  exit 1
fi
case "$NODE_BIN" in /mnt/c/*|/mnt/d/*)
  echo -e "${RED}❌ Still using Windows Node: $NODE_BIN${NC}"
  exit 1
  ;;
esac
case "$NPM_BIN" in /mnt/c/*|/mnt/d/*)
  echo -e "${RED}❌ Still using Windows npm: $NPM_BIN${NC}"
  exit 1
  ;;
esac

echo -e "${GREEN}✅ Using Node: $NODE_BIN ($(node -v))${NC}"
echo -e "${GREEN}✅ Using npm:  $NPM_BIN ($(npm -v))${NC}"

# --- 3. Always reinstall broken/incomplete node_modules ---
NEED_INSTALL=0
if [ ! -d node_modules ] || [ ! -d node_modules/.bin ] || [ ! -e node_modules/.bin/vite ]; then
  NEED_INSTALL=1
elif head -1 node_modules/.bin/vite 2>/dev/null | grep -qiE 'cmd|windows|MSYS'; then
  NEED_INSTALL=1
fi

if [ "$NEED_INSTALL" -eq 1 ]; then
  echo -e "${YELLOW}📦 Reinstalling dependencies with Linux npm...${NC}"
  rm -rf node_modules
  npm install
else
  echo -e "${GREEN}✅ node_modules looks OK${NC}"
fi

if [ ! -e node_modules/.bin/vite ]; then
  echo -e "${RED}❌ vite still missing after npm install${NC}"
  exit 1
fi

# --- 4. Build smoke test ---
echo ""
echo -e "${YELLOW}🔨 Building...${NC}"
npm run build
echo -e "${GREEN}✅ Build OK${NC}"

# --- 5. Continue with deploy script ---
echo ""
echo -e "${YELLOW}🚀 Continuing with DEPLOY_NOW.sh...${NC}"
# Ensure nvm is visible to the deploy script too
exec bash ./DEPLOY_NOW.sh
