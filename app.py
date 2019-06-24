from flask import Flask, render_template, flash
from control import ActionButtons
from Naked.toolshed.shell import execute_js, muterun_js


app = Flask(__name__)

app.config['SECRET_KEY'] = '857c97a793ec5f9010971b2e0b4a68bf'


@app.route('/panel', methods=['GET','POST'])
def LoadPanel():
	form = ActionButtons()
	if form.is_submitted():
		if form.event01.data:
			print('event 1 triggered')
			
			#return render_template('connect.html')

		elif form.event02.data:
			print('event 2 triggered')

		elif form.activate.data:
			print('Server activated...')
			success = execute_js('serve.js')
		

	return render_template("panel.html", form=form)




if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0',port=8000)