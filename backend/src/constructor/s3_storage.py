import boto3 
from botocore.client import Config
from dotenv import load_dotenv
import os

load_dotenv()

class YandexS3Client:
    def __init__(self, access_key, secret_key, bucket_name):
        self.s3 = boto3.client('s3',
                               endpoint_url='https://storage.yandexcloud.net',
                               aws_access_key_id=access_key,
                               aws_secret_access_key=secret_key,
                               config=Config(signature_version='s3v4'))
        self.bucket_name = bucket_name

    
    def upload_file(self, file_path, object_name=None):
        """Загрузка файла в бакет S3"""
        if object_name is None:
            object_name = file_path.split('/')[-1]
        self.s3.upload_file(file_path, self.bucket_name, object_name)
        print(f"Файл {file_path} успешно загружен как {object_name}!")

    def download_file(self, object_name, file_path):
        """Скачивание файла из бакета в s3"""
        self.s3.download_file(self.bucket_name, object_name, file_path)
        print(f"Файл {object_name} успешно скачан как {file_path}!")

    def upload_photo(self, file_path):
        """Загрузка фото в бакет s3"""
        self.upload_file(file_path, f'photos/{file_path.split("/")[-1]}')
    
    def upload_video(self, file_path):
        self.upload_file(file_path, f'videos/{file_path.split("/")[-1]}')

    def upload_audio(self, file_path):
        self.upload_file(file_path, f'audios/{file_path.split("/")[-1]}')

    def get_file_url(self, object_name):
        """Получение URL файла в бакете S3"""
        url = self.s3.generate_presigned_url('get_object',
                                             Params={'Bucket': self.bucket_name, 'Key': object_name},
                                             ExpiresIn=3600)
        return url
    
# access_key = os.getenv("ACCESS_KEY")
# secret_key = os.getenv("SECRET_KEY")
# bucket_name = os.getenv("BUCKET_NAME")

# client = YandexS3Client(access_key, secret_key, bucket_name)

# client.upload_photo()
# client.upload_video()
# client.upload_audio()

# client.download_file('photos/photo.jpg', 'downloaded_photo.jpg')

# file_url = client.get_file_url('photos/photo.jpg')
# print(f"URL файла: {file_url}")