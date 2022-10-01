import copy
from typing import Union
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def hate_speech_inference(
        query: Union[str, list],
        tokenizer=AutoTokenizer.from_pretrained("unitary/toxic-bert"),
        model=AutoModelForSequenceClassification.from_pretrained("unitary/toxic-bert")
    ) -> dict:
    id2label = model.config.id2label
    # disables pytorch's automatic differentiation engine
    with torch.no_grad():
        tokens = tokenizer(query, return_tensors='pt', padding=True, truncation=True) # convert text to token i.e. word to numbers
        logits = model(**tokens).logits # run inference
        proba = torch.sigmoid(logits) # sigmoid probabilites
        pred_class = copy.deepcopy(logits)
        pred_class = pred_class.apply_(lambda x: 1 if x >= 0.5 else 0) # predict class as one-hot encodings
        return dict(
            proba = proba,
            id2label = id2label,
            pred_class = pred_class
        )

def handler(event, context):
    try:
        json_res = json.dumps(hate_speech_inference(event['text']))
        return {'statusCode': 200, 'json': json_res}
    except Exception as e:
        res = {"statusCode": 404, "body": e}
        return res