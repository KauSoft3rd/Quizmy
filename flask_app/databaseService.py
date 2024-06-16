import mysql.connector
import os

def getNewsList():
    mydb = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_TABLE'),
    )

    mycursor = mydb.cursor()
    mycursor.execute("SELECT newsLink FROM Crawling")
    result = [row[0] for row in mycursor.fetchall()]
    mydb.close()
    return result

def updateNewsList(newsList):
    mydb = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_TABLE'),
    )

    query = 'INSERT INTO Crawling (title, company, newsLink, date, img) VALUES (%s, %s, %s, DATE_ADD(%s, INTERVAL 9 HOUR), %s)'
    mycursor = mydb.cursor()
    for item in newsList:
        mycursor.execute(query, [item['title'], item['company'], item['newsLink'], item['date'], item['img']])
    mydb.commit()


    count_query = 'SELECT COUNT(*) FROM Crawling'
    mycursor.execute(count_query)
    total_count = mycursor.fetchone()[0]


    if total_count > 100:
        delete_query = '''
        DELETE FROM Crawling
        WHERE id IN (
            SELECT id FROM (
                SELECT id FROM Crawling
                ORDER BY date ASC
                LIMIT %s
            ) AS subquery
        )
        ''' 

        items_to_delete = total_count - 100
        mycursor.execute(delete_query, (items_to_delete, ))
        mydb.commit()
    mydb.close()
