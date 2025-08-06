#!/bin/bash
cd /home/kavia/workspace/code-generation/finance-tracker-29609-54451/finance_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

