#!/bin/bash
npx hardhat typechain
[ -d ../frontend ] && cp -r src/types ../frontend/lib &&
  echo "Copied typechain types to frontend"
