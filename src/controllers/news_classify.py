import sys
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # 0 = 모든 로그(기본값), 1 = INFO 로그를 제외한 모든 로그, 2 = WARNING 로그와 INFO 로그를 제외한 모든 로그, 3 = ERROR 로그를 제외한 모든 로그
import tensorflow as tf
tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import json


# currentDir = os.path.dirname(os.path.abspath(__file__))
# modelPath = os.path.join(currentDir, 'news_classify.h5')
# tokenPath = os.path.join(currentDir, 'tokenizer.json')

# # 모델과 토크나이저 불러오기
# model = load_model(modelPath)

# # 토크나이저 불러오기
# with open(tokenPath) as f:
#     data = json.load(f)
#     tokenizer = tokenizer_from_json(data)

def predict_news_category(news_title):

    currentDir = os.path.dirname(os.path.abspath(__file__))
    modelPath = os.path.join(currentDir, 'news_classify.h5')
    tokenPath = os.path.join(currentDir, 'tokenizer.json')

    # 모델과 토크나이저 불러오기
    model = load_model(modelPath)

    # 토크나이저 불러오기
    with open(tokenPath) as f:
        data = json.load(f)
        tokenizer = tokenizer_from_json(data)

    news_sequence = tokenizer.texts_to_sequences([news_title])
    news_sequence = pad_sequences(news_sequence, maxlen=10, padding='post')
    
    prediction = model.predict(news_sequence, verbose = 0)[0][0]
    return prediction >= 0.6

if __name__ == '__main__':
    news_title = ' '.join(sys.argv[1:]) # 2140 수정
    prediction = predict_news_category(news_title)
    if prediction == True:
        sys.exit(1)
    else:
        sys.exit(0)