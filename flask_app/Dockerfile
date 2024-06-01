# 베이스 이미지 설정
FROM python:3.11-slim

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install -r requirements.txt

# 애플리케이션 소스 코드 복사
COPY app.py .
COPY databaseService.py databaseService.py
COPY news_classify.h5 news_classify.h5
COPY newsService.py newsService.py
COPY tokenizer.json tokenizer.json


# 컨테이너 시작 시 실행할 명령어
CMD ["python", "app.py"]
