"""pandora_x URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.views.i18n import JavaScriptCatalog

api_urls = [
    path('user/', include(('user.api.urls', 'django'), namespace='user')),
    path('space/', include(('space.api.urls', 'django'), namespace='space')),
    path('budget/', include(('budget.api.urls', 'django'), namespace='budget')),
    path('badge/', include(('badge.api.urls', 'django'), namespace='badge')),
    path('activity/', include(('activity.api.urls', 'django'), namespace='activity')),
    path('transaction/', include(('transaction.api.urls', 'django'), namespace='transaction')),
    path('team/', include(('team.api.urls', 'django'), namespace='team')),
]

urlpatterns = [
    path('', include(('frontview.urls', 'django'), namespace='frontview')),
    path('api/', include(api_urls)),

    path('admin/', admin.site.urls),

    path('i18n/', include('django.conf.urls.i18n')),
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),

]
