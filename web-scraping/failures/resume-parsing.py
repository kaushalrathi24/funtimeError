from resume_parser import resumeparse

file = r"/home/saharsh/Desktop/Resumes/Saharsh's Resume v1.5.pdf"
data = resumeparse.read_file(file)

print(data)
