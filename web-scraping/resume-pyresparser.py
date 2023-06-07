from pyresparser import ResumeParser

file = r"/home/saharsh/Desktop/Resumes/Saharsh's Resume v1.5.pdf"
data = ResumeParser(file).get_extracted_data()

print(data)
