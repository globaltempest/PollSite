from .models import Choice, Question
from rest_framework import serializers


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    # uses choiceserializer to serialize related choice objects
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = '__all__'
