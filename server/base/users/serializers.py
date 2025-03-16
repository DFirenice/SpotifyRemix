from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source='avatar_image', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'avatar']

    def get_avatar(self, obj):
        if obj.avatar_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar_image.url)
            return obj.avatar_image.url
        return None