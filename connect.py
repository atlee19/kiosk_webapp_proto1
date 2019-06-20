import asyncio
import websockets


class Connect():

	def __init__(self):
		pass

	async def hello(self):
		async with websockets.connect('ws://localhost:8080') as websocket:
			
			name = input("What's your name? ")
			await websocket.send(name)
			print(f"> {name}")
			greeting = await websocket.recv()
			print(f"< {greeting}")

		asyncio.get_event_loop().run_until_complete(hello())
		#print a debug statement



