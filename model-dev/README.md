# Model Development

Proposed Model as POC:

- [ ] Sentiment Analysis
- [ ] Hate Speech Detection

## Hate Speech Detection

Hate Speech Detection: Model built and trained to predict toxic comments.

### Model Architecture

The classification network is based on a base version of the Bidirectional Encoder Representations from Transformers (BERT), fine-tuned specifically for toxic classification. [1] Refer to [HuggingFace `bert-base-uncased`](https://huggingface.co/bert-base-uncased) for the base model source code.

```txt
================================================================================
Layer (type:depth-idx)                                  Param #
================================================================================
BertForSequenceClassification                           --
├─BertModel: 1-1                                        --
│    └─BertEmbeddings: 2-1                              --
│    │    └─Embedding: 3-1                              23,440,896
│    │    └─Embedding: 3-2                              393,216
│    │    └─Embedding: 3-3                              1,536
│    │    └─LayerNorm: 3-4                              1,536
│    │    └─Dropout: 3-5                                --
│    └─BertEncoder: 2-2                                 --
│    │    └─ModuleList: 3-6                             85,054,464
│    └─BertPooler: 2-3                                  --
│    │    └─Linear: 3-7                                 590,592
│    │    └─Tanh: 3-8                                   --
├─Dropout: 1-2                                          --
├─Linear: 1-3                                           4,614
================================================================================
Total params: 109,486,854
Trainable params: 109,486,854
Non-trainable params: 0
================================================================================
```

The pre-trained weights is taken from Laura et al and the Unitary team [2] ()[https://huggingface.co/unitary/toxic-bert]

Laura et al trained a bert

| Challenge | Year | Goal | Original Data Source | Detoxify Model Name | Top Kaggle Leaderboard Score* | Detoxify Score* |
|-|-|-|-|-|-|-|
| [Toxic Comment Classification Challenge](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge) | 2018 |  build a multi-headed model that’s capable of detecting different types of of toxicity like threats, obscenity, insults, and identity-based hate. | Wikipedia Comments | `original` | 0.98856 | 0.98636 |

*Evaluation metrics are based on the mean ROC AUC of each class.

## References

- [1] Devlin, J., Chang, M.-W., Lee, K., &amp; Toutanova, K. (2019, May 24). Bert: Pre-training of deep bidirectional Transformers for language understanding. arXiv.org. Retrieved October 1, 2022, from https://arxiv.org/abs/1810.04805
- [2] Unitaryai. (n.d.). UNITARYAI/detoxify: Trained models &amp; code to predict toxic comments on all 3 jigsaw toxic comment challenges. built using ⚡ pytorch lightning and 🤗 transformers. for access to our API, please email us at contact@unitary.ai. GitHub. Retrieved October 1, 2022, from https://github.com/unitaryai/detoxify
