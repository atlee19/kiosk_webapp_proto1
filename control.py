from flask_wtf import FlaskForm 
from wtforms import SubmitField

class ActionButtons(FlaskForm):
	button00 = SubmitField('Button00')
	button01 = SubmitField('Button01')


