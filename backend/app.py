""" Usage:
from pprint import pprint
import requests
baseurl = "http://localhost:5555"
pprint(requests.get(f"{baseurl}/todos").json())
new_note = {"date": "2023-01-05", "note": "taste cake", "user": "Tom"}
requests.post(f"{baseurl}/todos", json=new_note).json()
"""
from flask import Flask, jsonify, request

TODO_NOTES = [
    {"id": 1, "date": "2023-02-06", "note": "visit a hairdresser feb 7", "user": "Iryna"},
    {"id": 2, "date": "2023-02-06", "note": "visit an otolaryngologist feb 8", "user": "Iryna"},
]

app = Flask(__name__)

# CORS trick for browser
@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response


@app.route("/todos")
def list_notes():
    return jsonify(TODO_NOTES), 200


@app.route('/todos', methods=['POST'])
def add_node():
    note = request.get_json()
    print("add_node: " + repr(note))
    # validation
    is_valid = note.get("date") and note.get("note") and note.get("user")
    if not is_valid:
        return jsonify({"err_msg": "date, note, user - are mandatory fields"}), 400

    note["id"] = len(TODO_NOTES) + 1
    TODO_NOTES.append(note)
    return jsonify({"id": note["id"]}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="5555")

