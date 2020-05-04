from coremltools.models.utils import load_spec
from winmltools import convert_coreml
from winmltools.utils import save_model
model_coreml = load_spec('./model/KeyPaws.mlproj/Models/KeyPaws 12.mlmodel')
print(model_coreml.description) # Print the content of Core ML model description
model_onnx = convert_coreml(model_coreml, 7, name='ExampleModel')
save_model(model_onnx, 'keypaws.onnx')