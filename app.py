from flask import Flask, render_template, flash
from control import ActionButtons


app = Flask(__name__)

app.config['SECRET_KEY'] = '857c97a793ec5f9010971b2e0b4a68bf'


@app.route('/panel', methods=['GET','POST'])
def LoadPanel():
	form = ActionButtons()
	if form.is_submitted():
		if form.button00.data:
			print('button00 pressed')
		elif form.button01.data:
			print('button01 pressed')
		

	return render_template("panel.html", form=form)




if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0',port=8000)