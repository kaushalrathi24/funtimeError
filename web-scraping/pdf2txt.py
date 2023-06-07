# importing required modules
from pypdf import PdfReader

file = r"/path/to/pdf/file.pdf"
# creating a pdf reader object
reader = PdfReader(file)
  
# printing number of pages in pdf file
print(len(reader.pages))
  
# getting a specific page from the pdf file
page = reader.pages[0]
  
# extracting text from page
text = page.extract_text()
print(text)