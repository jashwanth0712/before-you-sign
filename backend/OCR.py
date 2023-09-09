import base64
from PIL import Image
import pytesseract
from io import BytesIO
import cv2


def image_to_base64(image_path):
    # Open the image file in binary mode
    with open(image_path, 'rb') as img_file:
        # Encode the binary data to base64
        base64_string = base64.b64encode(img_file.read()).decode('utf-8')

    return base64_string


def base64_to_text(base64_string):
    # Decode the base64 string
    img_data = base64.b64decode(base64_string)

    # Convert the bytes to a PIL Image object
    img = Image.open(BytesIO(img_data))

    # Perform OCR on the image
    text = pytesseract.image_to_string(img)

    return text


def highlight_text(image_path):
    # Load the image
    img = cv2.imread(image_path)

    # Perform OCR and get the bounding boxes for each word
    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

    # Draw rectangles around each word
    for i in range(len(data['text'])):
        # Get the coordinates of the bounding box
        x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]

        # Draw the rectangle on the image
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Convert the image to a PIL Image object
    img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

    return img_pil

# sexy_srav = image_to_base64("Divorce-Agreement-Sample.jpg")
# print(sexy_srav)