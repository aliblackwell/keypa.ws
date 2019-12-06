import coremltools
from coremltools.models import MLModel

embedding_path = '../model/KeyPaws.mlproj/Models/KeyPaws 1.mlmodel'
embedding_model = MLModel(embedding_path)

embedding_spec = embedding_model.get_spec()
#print(embedding_spec.description)
predictionss = embedding_model.predict({'key_code': ';96;97;97;97;97;97;97','direction': ';down;down;down;down;down;down;down', 'time_stamp': ';8329878;8341498;334532;418666;503052;5866618;671206' })
print(predictionss)