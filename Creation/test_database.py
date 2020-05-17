import sqlite3


def main():
    connection = sqlite3.connect("grades.db")
    cursor = connection.cursor()
    statement = "SELECT * FROM grades " \
                "WHERE term = term and subject = 'MTH' and code = 234"
    for row in cursor.execute(statement):
        print(row)


if __name__ == "__main__":
    main()
