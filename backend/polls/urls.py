from django.urls import path
from .views import QuestionDetail, QuestionList

app_name = 'polls'
urlpatterns = [
    path('questions/', QuestionList.as_view(), name='question-list'),
    path('questions/<int:pk>/',
         QuestionDetail.as_view(), name='question-detail'),
]

'''
path('', views.IndexView.as_view(), name='index'),
path('<int:pk>/', views.DetailView.as_view(), name='detail'),
path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
path('<int:question_id>/vote/', views.vote, name='vote'),
'''
