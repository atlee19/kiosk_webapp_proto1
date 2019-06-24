from flask_wtf import FlaskForm 
from wtforms import SubmitField

class ActionButtons(FlaskForm):
	event01 = SubmitField('EVENT 1')
	event02 = SubmitField('EVENT 2')
	activate = SubmitField('ACTIVATE SERVER')
	deactivate = SubmitField('DEACTIVATE SERVER')


	