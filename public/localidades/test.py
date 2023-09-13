import os
from PIL import Image

# Directorio donde se encuentran las imágenes jpg y webp
directorio = '.'

# Recorre todos los archivos en el directorio
for filename in os.listdir(directorio):
    if filename.endswith(".jpg") or filename.endswith(".webp"):
        img = Image.open(os.path.join(directorio, filename))
        # Si el ancho de la imagen es mayor a 3000, redimensiona la imagen
        if img.width > 3000:
            new_width = img.width // 2
            new_height = img.height // 2
            img = img.resize((new_width, new_height))
        # Convierte y guarda la imagen en formato webp con calidad del 80%
        img.save(os.path.join(directorio, filename.split('.')[0] + '.webp'), 'webp', quality=80)