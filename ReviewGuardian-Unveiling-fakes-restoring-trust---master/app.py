from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

# Load the pre-trained model
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
@app.route('/about.html')
def about():
    return render_template('about.html')

def classify_review(review_text):
    prediction = model.predict([review_text])
    return prediction[0]

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        return render_template('result.html')  # Redirect to the result page after form submission
    else:
        return render_template('home.html')

@app.route('/result', methods=['POST'])
def result():
    review_text = request.form['text']
    prediction = classify_review(review_text)
    if prediction == "CG":
        main_prediction = "Fake"
    else:
        main_prediction = "Original"
    return render_template('result.html', pred=main_prediction)

if __name__ == "__main__":
    app.run()
