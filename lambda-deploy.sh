zip -r function.zip .
aws lambda update-function-code \
  --function-name slack-calendar-topic \
  --zip-file fileb://$PWD/function.zip
