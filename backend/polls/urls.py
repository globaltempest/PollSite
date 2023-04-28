from django.urls import path
from .views import QuestionDetail, QuestionList, Vote

app_name = 'polls'
urlpatterns = [
    path('questions/', QuestionList.as_view(), name='question-list'),
    path('questions/<int:pk>/',
         QuestionDetail.as_view(), name='question-detail'),
    path('questions/<int:pk>/vote/', Vote.as_view(), name='vote'),
]

'''
path('', views.IndexView.as_view(), name='index'),
path('<int:pk>/', views.DetailView.as_view(), name='detail'),
path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
path('<int:question_id>/vote/', views.vote, name='vote'),
'''
