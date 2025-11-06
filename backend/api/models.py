from django.db import models
from django.contrib.auth.models import User

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    anime_id = models.IntegerField()
    title = models.CharField(max_length=255)
    image_url = models.URLField()

    def __str__(self):
        return self.title
