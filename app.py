from flask import *

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home.html')


if '__main__' == __name__:
    app.run()