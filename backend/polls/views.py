from .models import Choice, Question
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import QuestionSerializer, ChoiceSerializer
# Create your views here.


class QuestionList(APIView):
    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


class QuestionDetail(APIView):
    def get(self, request, pk):
        try:
            question = Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = QuestionSerializer(question)
        return Response(serializer.data)


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


'''class Vote(APIView):
    def post(self, request, choice_id):
        try:
            choice = Choice.objects.get(pk=choice_id)
        except Choice.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        choice.votes += 1
        choice.save()

        return Response({"success": "Vote submitted."}, status=status.HTTP_200_OK)'''


'''class QuestionList(APIView):
    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return JsonResponse(serializer.data, safe=False)


class QuestionDetail(APIView):
    def get(self, request, pk):
        question = Question.objects.get(pk=pk)
        serializer = QuestionSerializer(question)
        return JsonResponse(serializer.data, safe=False)'''


'''class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        return Question.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'

    def get_queryset(self):
        return Question.objects.filter(pub_date__lte=timezone.now())


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))'''
