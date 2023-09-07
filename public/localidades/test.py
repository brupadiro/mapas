import os

def reemplazar_comision_por_comision_en_nombre(directorio):
    # Recorrer todos los archivos en el directorio
    for filename in os.listdir(directorio):
        if 'COMISSION' in filename:
            # Reemplazar 'COMISSION' por 'COMMISSION' en el nombre del archivo
            nuevo_nombre = filename.replace('COMISSION', 'COMMISSION')
            # Renombrar el archivo
            os.rename(os.path.join(directorio, filename), os.path.join(directorio, nuevo_nombre))

reemplazar_comision_por_comision_en_nombre('.')

