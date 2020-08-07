#!/usr/bin/env bash

zip -q -r function.zip .

aws lambda update-function-code \
  --function-name $AWS_LAMBDA_NAME \
  --zip-file fileb://$PWD/function.zip
