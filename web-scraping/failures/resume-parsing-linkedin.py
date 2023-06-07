import os
import re
import sqlite3
import argparse
import sys
import glob
from collections import OrderedDict
from pdfminer.high_level import extract_text
from pdfminer.layout import LTTextLineHorizontal, LTLine, LTChar
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfdevice import PDFDevice
from pdfminer.layout import LAParams, LTTextBox, LTTextLine, LTFigure, LTImage

def main(argv):
    def create_database(output_folder):
        if not os.path.exists(os.path.split(output_folder)[0]):
            os.makedirs(os.path.split(output_folder)[0])
        conn = sqlite3.connect(os.path.abspath(output_folder))
        c = conn.cursor()
        c.execute('DROP TABLE IF EXISTS Title')
        c.execute('''CREATE TABLE Title
                     (TitleId INTEGER PRIMARY KEY NOT NULL,Title VARCHAR)''')
        c.execute('DROP TABLE IF EXISTS Person')
        c.execute('''CREATE TABLE Person
                     (PersonId INTEGER PRIMARY KEY NOT NULL,Name VARCHAR,Surname VARCHAR)''')
        c.execute('DROP TABLE IF EXISTS Experience')
        c.execute('''CREATE TABLE Experience
                     (ExperienceID INTEGER PRIMARY KEY NOT NULL,PersonID INTEGER,CompanyID INTEGER,TitleID INTEGER,StartMonth VARCHAR,StartYear VARCHAR,EndMonth VARCHAR,EndYear VARCHAR,Ongoing INTEGER )''')
        c.execute('DROP TABLE IF EXISTS Company')
        c.execute('''CREATE TABLE Company
                     (CompanyId INTEGER PRIMARY KEY NOT NULL,CompanyName VARCHAR)''')
        c.execute('DROP TABLE IF EXISTS Major')
        c.execute('''CREATE TABLE Major
                     (MajorId INTEGER PRIMARY KEY NOT NULL,Major VARCHAR)''')
        c.execute('DROP TABLE IF EXISTS School')
        c.execute('''CREATE TABLE School
                     (SchoolId INTEGER PRIMARY KEY NOT NULL,School VARCHAR)''')
        c.execute('DROP TABLE IF EXISTS Education')
        c.execute('''CREATE TABLE Education
                     (EducationId INTEGER PRIMARY KEY NOT NULL,PersonID INTEGER,DegreeId INTEGER,SchoolId INTEGER,MajorId INTEGER,StartMonth VARCHAR,StartYear VARCHAR,EndMonth VARCHAR,EndYear VARCHAR,Ongoing INTEGER )''')
        c.execute('DROP TABLE IF EXISTS Degree')
        c.execute('''CREATE TABLE Degree
                     (DegreeId INTEGER PRIMARY KEY NOT NULL,Degree VARCHAR)''')
        return conn

    def getfilelist(path, extension=None):
        filenames = []
        for root, dirs, files in os.walk(path):
            for file in files:
                if (extension):
                    if file.endswith(extension):
                        filenames.append(os.path.join(root, file))
                else:
                    filenames.append(os.path.join(root, file))
        return filenames

    def insert(table, column, row_value, c):
        """Checks if a row with 'value' exists in a 'column' of a 'table' using database cursor 'c', if so it returns an Id of 
        first matching row, otherwise it inserts a new row and returns its id
        """
        data = c.execute(f"SELECT * FROM {table} WHERE {column} = ?", [row_value]).fetchone()

        if data is None:
            c.execute(f"INSERT INTO {table} VALUES (NULL,?)", [row_value])
            dataId = c.lastrowid
        else:
            dataId = data[0]
        return dataId

    def parse_date(dates):
                # Initialize the date variables
        from_month = ""
        from_year = ""
        to_month = ""
        to_year = ""
        ongoing = 0

        # Use regular expressions to extract the dates from the string
        date_regex = r"(?P<month>[a-zA-Z]+)?\s?(?P<year>\d{4})?"
        date_match = re.search(date_regex, dates)

        if date_match:
            month = date_match.group("month")
            year = date_match.group("year")

            if month:
                from_month = month[:3].capitalize()

            if year:
                from_year = year

        # Check if the date range is ongoing
        if "Present" in dates:
            ongoing = 1
        else:
            to_dates = dates.split("-")
            if len(to_dates) == 2:
                to_month_match = re.search(date_regex, to_dates[0])
                to_year_match = re.search(date_regex, to_dates[1])

                if to_month_match:
                    month = to_month_match.group("month")
                    if month:
                        to_month = month[:3].capitalize()

                if to_year_match:
                    year = to_year_match.group("year")
                    if year:
                        to_year = year

        return {
            "from_month": from_month,
            "from_year": from_year,
            "to_month": to_month,
            "to_year": to_year,
            "ongoing": ongoing,
        }

    def extract_text_from_pdf(file_path):
        """Extracts text content from a PDF file using pdfminer"""
        text = ""
        with open(file_path, "rb") as file:
            parser = PDFParser(file)
            document = PDFDocument(parser)
            if not document.is_extractable:
                return ""
            rsrcmgr = PDFResourceManager()
            device = PDFDevice(rsrcmgr)
            interpreter = PDFPageInterpreter(rsrcmgr, device)
            for page in PDFPage.create_pages(document):
                interpreter.process_page(page)
                layout = device.get_result()
                for element in layout:
                    if isinstance(element, (LTTextBox, LTTextLine)):
                        text += element.get_text()
        return text

    def extract_information_from_resume(file_path, conn):
        """Extracts information from a resume file and inserts it into the SQLite database"""
        text = extract_text_from_pdf(file_path)

        # Extract name and surname using regular expressions
        name_regex = r"(?P<name>[A-Z][a-z]+)\s+(?P<surname>[A-Z][a-z]+)"
        name_match = re.search(name_regex, text)
        name = name_match.group("name") if name_match else ""
        surname = name_match.group("surname") if name_match else ""

        # Insert name and surname into the Person table
        person_id = insert("Person", "Name", name, c)
        insert("Person", "Surname", surname, c)

        # Extract experience information using regular expressions
        experience_regex = r"Experience\s*([^|]*)\s*\|\s*([^|]*)\s*\|\s*([^|]*)"
        experience_matches = re.findall(experience_regex, text)

        for match in experience_matches:
            company = match[0].strip()
            title = match[1].strip()
            dates = match[2].strip()

            # Insert company, title, and experience information into the corresponding tables
            company_id = insert("Company", "CompanyName", company, c)
            title_id = insert("Title", "Title", title, c)
            date_info = parse_date(dates)
            insert(
                "Experience",
                "PersonId, CompanyId, TitleId, FromMonth, FromYear, ToMonth, ToYear, Ongoing",
                f"{person_id}, {company_id}, {title_id}, '{date_info['from_month']}', '{date_info['from_year']}', '{date_info['to_month']}', '{date_info['to_year']}', {date_info['ongoing']}",
                c,
            )

        conn.commit()
        return person_id

