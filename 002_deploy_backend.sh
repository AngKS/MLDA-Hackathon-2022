getVar() {
    VAR=$(grep $1 "./settings/.env" | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

ARTIFACT_STORE=$(getVar ARTIFACT_STORE)
ARTIFACT_PATH=$(getVar ARTIFACT_PATH)

BACKEND_STACK_NAME=$(getVar STACK_NAME)
AWS_REGION=$(getVar AWS_REGION)

# get aws profile; default is 'default'
AWS_PROFILE=$(getVar AWS_PROFILE)
if [ -z "$AWS_PROFILE" ]; then
    AWS_PROFILE="aks-root"
fi

echo "\n============================================"
echo "[ARTIFACT STORE]: $ARTIFACT_STORE"
echo "[ARTIFACT PATH]: $ARTIFACT_PATH"
echo "[STACK NAME]: $BACKEND_STACK_NAME"
echo "[Region]: $AWS_REGION"
echo "[PROFILE]: $AWS_PROFILE"
echo "============================================\n"


# package backend
echo "Packaging backend..."

cd ./aws

sam package \
    --template-file backend-stack.yaml \
    --output-template-file backend-config-packaged.yaml \
    --s3-bucket $ARTIFACT_STORE \
    --s3-prefix $ARTIFACT_PATH \
    --region $AWS_REGION \
    --profile $AWS_PROFILE

echo "Would you like to deploy the stack? [Y/n]"

read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
    echo "Deploying backend..."

    sam deploy \
        --template-file backend-config-packaged.yaml \
        --s3-bucket "$ARTIFACT_STORE" \
        --s3-prefix "$ARTIFACT_PATH" \
        --stack-name "$BACKEND_STACK_NAME" \
        --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
        --region "$AWS_REGION" \
        --profile "$AWS_PROFILE"

    read -n 1 -s -r -p "Stack Deployed! 🍺🍺 (press any key to exit.)";
    clear;

else
    read -n 1 -s -r -p "Backend deployment cancelled!"
fi
