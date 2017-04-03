from flask import *
import requests

app = Flask(__name__, template_folder="templates", static_url_path="/static",
            static_folder="static")

app = Flask(__name__)


@app.route('/')
def planets():
    planets_data = requests.get('http://swapi.co/api/planets')
    planets = planets_data.json()['results']
    
    for planet in planets:
        residents = planet['residents']
        resident_count = len(residents)
        planet['resident_count'] = resident_count

    previous_page = planets_data.json()['previous']
    next_page = planets_data.json()['next']

    return render_template(
        'home.html', planets=planets, previous=previous_page, next=next_page
    )


if '__main__' == __name__:
    app.run()