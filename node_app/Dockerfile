# 베이스 이미지 설정
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 파일 복사 및 설치
COPY package.json package-lock.json* ./

RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# 컨테이너 시작 시 실행할 명령어
CMD ["npm", "run", "start:dev"]
