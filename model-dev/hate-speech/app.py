import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import json

def hate_speech_inference(
        query: str,
        tokenizer=AutoTokenizer.from_pretrained("unitary/toxic-bert"),
        model=AutoModelForSequenceClassification.from_pretrained("unitary/toxic-bert")
    ):
    id2label = model.config.id2label
    # disables pytorch's automatic differentiation engine
    with torch.no_grad():
        tokens = tokenizer(query, return_tensors='pt') # convert text to token i.e. word to numbers
        logits = model(**tokens).logits # run inference
        proba = F.softmax(logits, dim=1) # softmax probabilities
        return dict(
            proba = proba,
            id2label = id2label,
            pred_class = id2label[proba.argmax().item()]
        )

def handler(event, context):
    try:
        json_res = json.dumps(hate_speech_inference(event['text']))
        return {
            'statusCode': 200, 
            'result': json_res
        }
    except Exception as e:
        res = {"statusCode": 404, "body": e}
        return res