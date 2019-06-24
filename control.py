from flask_wtf import FlaskForm 
from wtforms import SubmitField

class ActionButtons(FlaskForm):
	event01 = SubmitField('EVENT 1')
	event02 = SubmitField('EVENT 2')
	event03 = SubmitField('EVENT 3')
	event04 = SubmitField('EVENT 4')
	event05 = SubmitField('EVENT 5')
	activate = SubmitField('ACTIVATE SERVER')
	deactivate = SubmitField('DEACTIVATE SERVER')


	