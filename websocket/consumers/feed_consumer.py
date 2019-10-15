from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from django.db.models import ObjectDoesNotExist
from channels.db import database_sync_to_async
import json




class FeedConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.space_slug = self.scope['url_route']['kwargs']['space_slug']
        self.group_name = f"feed_{self.space_slug}"

        # Authentication
        # if not await self.check_auth():
        #     self.close()
        #     return

        # Join room group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()


    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )


    # Receive message from WebSocket
    async def receive(self, text_data):
        return


    # Receive message from room group
    async def default_message(self, event):
        message = event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps(message))


    @database_sync_to_async
    def check_auth(self):
        if not self.scope["user"].is_authenticated(): return False
        try:
            space = self.scope["user"].member_set.get(space__slug__iexact=self.space_slug).space
        except ObjectDoesNotExist:
            return False
        return True
