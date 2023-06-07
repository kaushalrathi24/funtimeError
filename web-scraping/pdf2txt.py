
# importing required modules
from PyPDF2 import PdfReader

file = r"/home/saharsh/Desktop/Resumes/Saharsh's Resume v1.5.pdf"
# creating a pdf reader object
reader = PdfReader(file)
  
# printing number of pages in pdf file
print(len(reader.pages))
  
# getting a specific page from the pdf file
page = reader.pages[0]
  
# extracting text from page
text = page.extract_text()
print(text)