from django.contrib import admin
from .models import Choice, Question

# display choice model in row with 3 choices


class ChoicesInLine(admin.TabularInline):
    model = Choice
    extra = 3

# display question model with various fields
# has choice model inline
# displays list of questions with various fields
# able to filter list by publication date and search by question text


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['question_text']}),
        ('Date information', {'fields': [
         'pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoicesInLine]
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question_text']


# manage questions through admin website (CRUD operations)
admin.site.register(Question, QuestionAdmin)
