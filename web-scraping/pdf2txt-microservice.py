from flask import Flask
from pypdf import PdfReader

storage_dir = r"/root/funtimeError/backend/upload"

def pdf2txt(filename):
    # importing required modules
    
    file = rf"{storage_dir}/{filename}"
    # creating a pdf reader object
    reader = PdfReader(file)

    # printing number of pages in pdf file
    print(len(reader.pages))

    text = ""

    for i in range(len(reader.pages)):
        # getting a specific page from the pdf file
        page = reader.pages[i]
        # extracting text from page
        text += page.extract_text()

    # print(text)
    return text

app = Flask(__name__)

# Pass the required route to the decorator.
@app.route("/converter/<string:filename>")
def converter(filename):
    return pdf2txt(filename)

# @app.route('/allow/<int:Number>', methods=['GET', 'POST'])
# def allow(Number):
#     if Number < 25:
#         return f'You have been allowed to enter because\
#          your number is {str(Number)}'
#     else:
#        return f'You are not allowed'
    

@app.route("/test")
def test():
    return "<h1>Hello World!</h1>"

# @app.route("/upload/<string:file>")
# def upload(file):
#     request.files['file'].save(file)
#     return "File uploaded successfully"

if __name__ == "__main__":
	app.run(debug=True)

