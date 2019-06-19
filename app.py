from flask import Flask, render_template


app = Flask(__name__)


@app.route('/panel')
def Test():
	return render_template("panel.html")




if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0',port=8000)