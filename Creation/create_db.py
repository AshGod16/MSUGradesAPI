import sqlite3
import csv


def main():
    connection = sqlite3.connect("./grades.db")
    cursor = connection.cursor()
    create_table = "CREATE TABLE grades (id INTEGER PRIMARY KEY , term text, subject text, code int, title text,"\
                   " instructor text, total int, average real, four int, threefive int," \
                   " three int, twofive int, two int, onefive int, one int, zero" \
                   " int, incomplete int, withdrawn int, passed int, nograde int);"
    cursor.execute(create_table)
    insert_query = "INSERT INTO grades VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    fp = open("Creation/MSUGradesMaster.csv")
    reader = csv.reader(fp)
    entries = []
    i = 1
    for row in reader:

        if row[9] != "N/A":
            entry = (i, row[0], row[2], row[3], row[4], row[5], row[6], row[9], row[10], row[11], row[12], row[13], row[14]
                     , row[15], row[16], row[17], row[18], row[19], row[20], row[21])
            entries.append(entry)
            i += 1
    cursor.executemany(insert_query, entries)
    connection.commit()
    connection.close()


if __name__ == "__main__":
    main()
