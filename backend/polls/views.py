from .models import Choice, Question
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import QuestionSerializer, ChoiceSerializer
# Create your views here.

# get request for list of all polls


class QuestionList(APIView):
    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

# get request for the details of a single poll


class QuestionDetail(APIView):
    def get(self, request, pk):
        try:
            question = Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = QuestionSerializer(question)
        return Response(serializer.data)

# post request for adding votes to a poll


class Vote(APIView):
    def post(self, request, *args, **kwargs):
        question_id = self.kwargs['pk']
        try:
            question = Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            choice_id = request.data['choice']
            selected_choice = question.choices.get(pk=choice_id)
        except (KeyError, Choice.DoesNotExist):
            return Response({"error": "Invalid choice"}, status=status.HTTP_400_BAD_REQUEST)

        selected_choice.votes += 1
        selected_choice.save()

        serializer = QuestionSerializer(question)
        return Response(serializer.data)
