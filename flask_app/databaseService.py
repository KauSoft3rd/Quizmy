import mysql.connector

def getNewsList():
    mydb = mysql.connector.connect(
        host="quizmydb.cpiwaee4eftz.ap-northeast-2.rds.amazonaws.com",
        user="quizmy",
        password="eksrufthgkr2024!",
        database="QuizmyDB"
    )

    mycursor = mydb.cursor()
    mycursor.execute("SELECT newsLink FROM Crawling")
    result = [row[0] for row in mycursor.fetchall()]
    mydb.close()
    return result

def updateNewsList(newsList):
    mydb = mysql.connector.connect(
        host="quizmydb.cpiwaee4eftz.ap-northeast-2.rds.amazonaws.com",
        user="quizmy",
        password="eksrufthgkr2024!",
        database="QuizmyDB"
    )

    query = 'INSERT INTO Crawling (title, company, newsLink, date, img) VALUES (%s, %s, %s, DATE_ADD(%s, INTERVAL 9 HOUR), %s)'
    mycursor = mydb.cursor()
    for item in newsList:
        mycursor.execute(query, [item['title'], item['company'], item['newsLink'], item['date'], item['img']])
    mydb.commit()
    mydb.close()
