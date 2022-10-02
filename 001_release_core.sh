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
echo "Releasing Good Vibes Application Core Stack..."
echo "[Region]: $AWS_REGION"
echo "[PROFILE]: $AWS_PROFILE"
echo "============================================\n"



echo "Would you like to deploy the stack? [Y/n]"

read -r response


if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
    echo "Deploying backend..."

    STACK_NAME="good-vibes-application-core"

    cd aws

    if aws cloudformation describe-stack --region "$AWS_REGION" --profile "$AWS_PROFILE" --stack-name "$STACK_NAME" &> /dev/null; then

        aws cloudformation update-stack --region "$AWS_REGION" \
            --profile "$AWS_PROFILE" \
            --stack-name "$STACK_NAME" \
            --template-body file://core-stack.yaml \
            --capabilities CAPABILITY_AUTO_EXPAND \
        
    else
        aws cloudformation create-stack --region "$AWS_REGION" \
            --profile "$AWS_PROFILE" \
            --stack-name "$STACK_NAME" \
            --template-body file://core-stack.yaml \
            --capabilities CAPABILITY_AUTO_EXPAND \
        
    fi


    read -n 1 -s -r -p "Stack Deployed! 🍺🍺 (press any key to exit.)";
    clear;

else
    read -n 1 -s -r -p "Core Stack deployment cancelled!"
fi
