import coremltools
import onnxmltools
coreml_model = coremltools.utils.load_spec('./model/KeyPaws.mlproj/Models/KeyPaws 12.mlmodel')

# Convert the Core ML model into ONNX
onnx_model = onnxmltools.convert_coreml(coreml_model, 'Example Model')

# Save as protobuf
onnxmltools.utils.save_model(onnx_model, 'kp.onnx')