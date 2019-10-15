from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
from websocket import consumers


application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter([
            url(r'^ws/feed/(?P<space_slug>\w+)/$', consumers.FeedConsumer),
        ])
    ),
})
