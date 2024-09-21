import fitz

def read_pdf(file_path):
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

pdf_file = "C:\VILLANOVA\Resume Version\[Khanh Le] My Resume.pdf"
pdf_text = read_pdf(pdf_file)
print(pdf_text)