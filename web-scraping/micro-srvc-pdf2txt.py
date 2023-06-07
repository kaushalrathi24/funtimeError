from flask import Flask

app = Flask(__name__)

# Pass the required route to the decorator.
@app.route("/converter/<string:filename>")
def converter(filename):
    # importing required modules
    from pypdf import PdfReader

    file = rf"/home/<username>/{filename}.pdf"
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
	
if __name__ == "__main__":
	app.run(debug=True)

