from flask import Flask, jsonify
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # 0 = 모든 로그(기본값), 1 = INFO 로그를 제외한 모든 로그, 2 = WARNING 로그와 INFO 로그를 제외한 모든 로그, 3 = ERROR 로그를 제외한 모든 로그
import tensorflow as tf
tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import json

from apscheduler.schedulers.background import BackgroundScheduler
from newsService import getHeadlines
from databaseService import getNewsList
from databaseService import updateNewsList

currentDir = os.path.dirname(os.path.abspath(__file__))
modelPath = os.path.join(currentDir, 'news_classify.h5')
tokenPath = os.path.join(currentDir, 'tokenizer.json')

# 모델과 토크나이저 불러오기
model = load_model(modelPath)

# 토크나이저 불러오기
with open(tokenPath) as f:
    data = json.load(f)
    tokenizer = tokenizer_from_json(data)

def predict_news_category(news_title):
    news_sequence = tokenizer.texts_to_sequences([news_title])
    news_sequence = pad_sequences(news_sequence, maxlen=10, padding='post')
    prediction = model.predict(news_sequence, verbose = 0)[0][0]
    return prediction >= 0.6


app = Flask(__name__)
@app.route('/pred')
def home() :
    return 'This is home'

@app.route('/flasktest')
def home() :
    return 'This is flask home'

@app.route('/pred', methods=['GET'])
def pred() :
    newsList = getHeadlines()
    newsDBList = getNewsList()

    result = []

    for item in newsList:
        if (item['newsLink'] not in newsDBList) :
            if predict_news_category(item['title']) == True :
                result.append(item)
    updateNewsList(result)
    return jsonify({"status": "success", "updated_news_count": len(result)})
            

def task():
    newsList = getHeadlines()
    newsDBList = getNewsList()

    result = []

    for item in newsList:
        if (item['newsLink'] not in newsDBList) :
            if predict_news_category(item['title']) == True :
                result.append(item)
    updateNewsList(result)
    print("update is clear!!!")

scheduler = BackgroundScheduler()
scheduler.add_job(func=task, trigger="interval", minutes=30)
scheduler.start()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)