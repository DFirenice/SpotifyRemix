from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.core.files.base import ContentFile
from PIL import Image, ImageDraw, ImageFont
import io

class CustomUser(AbstractUser):
    groups = models.ManyToManyField(Group, related_name="custom_users", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_users_permissions", blank=True)
    avatar_image = models.ImageField(upload_to="avatars/", blank=True, null=True)

    def generate_avatar(self):
        image_size = (200, 200)
        background_color = (156, 163, 175)
        text_color = (255, 255, 255)

        img = Image.new("RGB", image_size, background_color)
        draw = ImageDraw.Draw(img)

        try:
            font = ImageFont.truetype("arial.ttf", 70)
        except IOError:
            font = ImageFont.load_default()

        text = self.username[:2].upper()
        text_size = draw.textbbox((0, 0), text, font=font)
        text_x = (image_size[0] - text_size[2]) / 2
        text_y = (image_size[1] - text_size[3]) / 2
        draw.text((text_x, text_y), text, font=font, fill=text_color)

        image_io = io.BytesIO()
        img.save(image_io, format="PNG")
        self.avatar_image.save(f"{self.username}_profile.png", ContentFile(image_io.getvalue()), save=False)

    def save(self, *args, **kwargs):
        if not self.avatar_image:
            self.generate_avatar()
        super().save(*args, **kwargs)

    @property
    def avatar(self):
        if self.avatar_image:
            return self.avatar_image.url
        return None