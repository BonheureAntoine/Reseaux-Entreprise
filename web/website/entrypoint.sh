#!/bin/bash

echo "Starting entrypoint.sh";
npx prisma db push;
echo "Prisma db push done";
npm run start;
echo "Started server";