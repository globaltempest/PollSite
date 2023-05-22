from django.urls import path
from .views import QuestionDetail, QuestionList, Vote

app_name = 'polls'
urlpatterns = [
    path('questions/', QuestionList.as_view(), name='question-list'),
    path('questions/<int:pk>/',
         QuestionDetail.as_view(), name='question-detail'),
    path('questions/<int:pk>/vote/', Vote.as_view(), name='vote'),
]
